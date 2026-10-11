/**
 * خدمة المصادقة (نسخة محلية للتجربة).
 *
 * مهم: هذه النسخة تحفظ الحسابات في متصفح المستخدم نفسه (localStorage) حتى يعمل
 * التطبيق بدون سيرفر. قبل الإطلاق الحقيقي استبدل الدوال الثلاث
 * (registerUser / loginUser / socialLogin) باستدعاءات لسيرفرك (API)،
 * وتحقق من رموز Google و Apple في السيرفر وليس في المتصفح.
 */

export type AuthProvider = 'password' | 'google' | 'apple';

export interface AuthUser {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
  provider: AuthProvider;
}

interface StoredUser extends AuthUser {
  salt?: string;
  hash?: string;
  providerId?: string;
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

/* ---------- التحقق من المدخلات ---------- */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizeIdentifier(raw: string): { type: 'email' | 'phone'; value: string } | null {
  const v = raw.trim();
  if (!v) return null;
  if (v.includes('@')) {
    return EMAIL_RE.test(v) ? { type: 'email', value: v.toLowerCase() } : null;
  }
  // رقم هاتف: نقبل + وأرقام ومسافات وشرطات، ونحوّل الأرقام العربية إلى إنجليزية
  const latin = v.replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));
  const digits = latin.replace(/[\s\-()]/g, '');
  return /^\+?\d{8,15}$/.test(digits) ? { type: 'phone', value: digits } : null;
}

export function validatePassword(pw: string): string | null {
  if (pw.length < 8) return 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
  if (!/[A-Za-z\u0600-\u06FF]/.test(pw)) return 'كلمة المرور يجب أن تحتوي على حرف واحد على الأقل';
  if (!/\d/.test(pw)) return 'كلمة المرور يجب أن تحتوي على رقم واحد على الأقل';
  return null;
}

/** قوة كلمة المرور من 0 إلى 4 */
export function passwordStrength(pw: string): number {
  let s = 0;
  if (pw.length >= 8) s++;
  if (pw.length >= 12) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

/* ---------- التخزين ---------- */

const USERS_KEY = 'nashama.users';
const SESSION_KEY = 'nashama.session';
const LOCK_KEY = 'nashama.lock';

function readUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
}
function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function toPublic(u: StoredUser): AuthUser {
  return { id: u.id, name: u.name, email: u.email, phone: u.phone, avatar: u.avatar, provider: u.provider };
}

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function randomId(): string {
  return crypto.randomUUID();
}

/* ---------- حماية من تخمين كلمة المرور ---------- */

const MAX_ATTEMPTS = 5;
const LOCK_MS = 30_000;

function checkLock() {
  try {
    const raw = JSON.parse(localStorage.getItem(LOCK_KEY) || 'null') as { n: number; until: number } | null;
    if (raw && raw.until > Date.now()) {
      const secs = Math.ceil((raw.until - Date.now()) / 1000);
      throw new AuthError(`محاولات كثيرة، أعد المحاولة بعد ${secs} ثانية`);
    }
  } catch (e) {
    if (e instanceof AuthError) throw e;
  }
}
function registerFailure() {
  let n = 1;
  try {
    const raw = JSON.parse(localStorage.getItem(LOCK_KEY) || 'null') as { n: number } | null;
    n = (raw?.n ?? 0) + 1;
  } catch {
    /* تجاهل */
  }
  localStorage.setItem(LOCK_KEY, JSON.stringify({ n, until: n >= MAX_ATTEMPTS ? Date.now() + LOCK_MS : 0 }));
  if (n >= MAX_ATTEMPTS) localStorage.setItem(LOCK_KEY, JSON.stringify({ n: 0, until: Date.now() + LOCK_MS }));
}
function clearFailures() {
  localStorage.removeItem(LOCK_KEY);
}

/* ---------- الجلسة ---------- */

export function saveSession(user: AuthUser, remember: boolean) {
  const store = remember ? localStorage : sessionStorage;
  (remember ? sessionStorage : localStorage).removeItem(SESSION_KEY);
  store.setItem(SESSION_KEY, JSON.stringify(user));
}

export function loadSession(): AuthUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY) ?? sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
}

/* ---------- العمليات ---------- */

export async function registerUser(input: {
  name: string;
  identifier: string;
  password: string;
}): Promise<AuthUser> {
  const name = input.name.trim();
  if (name.length < 3) throw new AuthError('الرجاء إدخال الاسم الكامل (3 أحرف على الأقل)');

  const id = normalizeIdentifier(input.identifier);
  if (!id) throw new AuthError('أدخل بريداً إلكترونياً أو رقم هاتف صحيحاً');

  const pwError = validatePassword(input.password);
  if (pwError) throw new AuthError(pwError);

  const users = readUsers();
  const exists = users.some((u) => (id.type === 'email' ? u.email === id.value : u.phone === id.value));
  if (exists) throw new AuthError('هذا الحساب مسجل مسبقاً، سجّل الدخول بدلاً من ذلك');

  const salt = randomId();
  const hash = await sha256(salt + input.password);
  const user: StoredUser = {
    id: randomId(),
    name,
    email: id.type === 'email' ? id.value : undefined,
    phone: id.type === 'phone' ? id.value : undefined,
    provider: 'password',
    salt,
    hash,
  };
  writeUsers([...users, user]);
  return toPublic(user);
}

export async function loginUser(input: { identifier: string; password: string }): Promise<AuthUser> {
  checkLock();
  const id = normalizeIdentifier(input.identifier);
  if (!id) throw new AuthError('أدخل بريداً إلكترونياً أو رقم هاتف صحيحاً');
  if (!input.password) throw new AuthError('أدخل كلمة المرور');

  const user = readUsers().find((u) => (id.type === 'email' ? u.email === id.value : u.phone === id.value));
  // نفس الرسالة في الحالتين حتى لا نكشف هل الحساب موجود
  const generic = 'بيانات الدخول غير صحيحة';
  if (!user || !user.salt || !user.hash) {
    registerFailure();
    throw new AuthError(generic);
  }
  const hash = await sha256(user.salt + input.password);
  if (hash !== user.hash) {
    registerFailure();
    throw new AuthError(generic);
  }
  clearFailures();
  return toPublic(user);
}

export interface SocialProfile {
  provider: 'google' | 'apple';
  providerId: string;
  name?: string;
  email?: string;
  avatar?: string;
}

export async function socialLogin(p: SocialProfile): Promise<AuthUser> {
  const users = readUsers();
  let user = users.find((u) => u.provider === p.provider && u.providerId === p.providerId);

  if (user) {
    // Apple لا يرسل الاسم إلا في أول مرة، فنحافظ على المحفوظ
    user = { ...user, name: p.name || user.name, avatar: p.avatar || user.avatar };
    writeUsers(users.map((u) => (u.id === user!.id ? user! : u)));
  } else {
    user = {
      id: randomId(),
      name: p.name || 'سائق نشامى',
      email: p.email?.toLowerCase(),
      avatar: p.avatar,
      provider: p.provider,
      providerId: p.providerId,
    };
    writeUsers([...users, user]);
  }
  return toPublic(user);
}
