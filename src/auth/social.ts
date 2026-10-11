/**
 * تسجيل الدخول عبر Google و Apple.
 *
 * يحتاج متغيرات البيئة (انظر .env.example):
 *   VITE_GOOGLE_CLIENT_ID   من Google Cloud Console (OAuth Client ID نوع Web)
 *   VITE_APPLE_CLIENT_ID    الـ Services ID من Apple Developer
 *   VITE_APPLE_REDIRECT_URI رابط موقعك بـ https (مسجل في Apple)
 */

import { AuthError, type SocialProfile } from './authService';

/* ---------- تعريفات الأنواع للسكربتات الخارجية ---------- */

interface GoogleTokenResponse {
  access_token?: string;
  error?: string;
}
interface GoogleTokenClient {
  requestAccessToken: (opts?: { prompt?: string }) => void;
}
interface AppleSignInResponse {
  authorization: { id_token: string; code: string };
  user?: { name?: { firstName?: string; lastName?: string }; email?: string };
}

declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient: (cfg: {
            client_id: string;
            scope: string;
            callback: (r: GoogleTokenResponse) => void;
            error_callback?: (e: { type?: string }) => void;
          }) => GoogleTokenClient;
        };
      };
    };
    AppleID?: {
      auth: {
        init: (cfg: {
          clientId: string;
          scope: string;
          redirectURI: string;
          usePopup: boolean;
        }) => void;
        signIn: () => Promise<AppleSignInResponse>;
      };
    };
  }
}

const GOOGLE_SRC = 'https://accounts.google.com/gsi/client';
const APPLE_SRC = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';

const env = import.meta.env as Record<string, string | undefined>;
const GOOGLE_CLIENT_ID = env.VITE_GOOGLE_CLIENT_ID;
const APPLE_CLIENT_ID = env.VITE_APPLE_CLIENT_ID;
const APPLE_REDIRECT_URI = env.VITE_APPLE_REDIRECT_URI || (typeof window !== 'undefined' ? window.location.origin : '');

export const googleEnabled = Boolean(GOOGLE_CLIENT_ID);
export const appleEnabled = Boolean(APPLE_CLIENT_ID);

const loading = new Map<string, Promise<void>>();

function loadScript(src: string): Promise<void> {
  const existing = loading.get(src);
  if (existing) return existing;
  const p = new Promise<void>((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => {
      loading.delete(src);
      reject(new AuthError('تعذر تحميل خدمة تسجيل الدخول، تحقق من اتصالك بالإنترنت'));
    };
    document.head.appendChild(s);
  });
  loading.set(src, p);
  return p;
}

/** حمّل السكربتات مبكراً حتى لا يمنع المتصفح النافذة المنبثقة عند الضغط */
export function preloadSocialScripts() {
  if (googleEnabled) void loadScript(GOOGLE_SRC).catch(() => undefined);
  if (appleEnabled) void loadScript(APPLE_SRC).catch(() => undefined);
}

/* ---------- Google ---------- */

export async function googleSignIn(): Promise<SocialProfile> {
  if (!GOOGLE_CLIENT_ID) throw new AuthError('لم يتم إعداد Google بعد (VITE_GOOGLE_CLIENT_ID)');
  await loadScript(GOOGLE_SRC);
  const oauth2 = window.google?.accounts.oauth2;
  if (!oauth2) throw new AuthError('خدمة Google غير متاحة حالياً');

  const accessToken = await new Promise<string>((resolve, reject) => {
    const client = oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: 'openid email profile',
      callback: (r) => (r.access_token ? resolve(r.access_token) : reject(new AuthError('تم إلغاء تسجيل الدخول'))),
      error_callback: () => reject(new AuthError('تم إغلاق نافذة Google قبل إكمال الدخول')),
    });
    client.requestAccessToken({ prompt: 'select_account' });
  });

  const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new AuthError('تعذر جلب بيانات حساب Google');
  const info = (await res.json()) as { sub: string; name?: string; email?: string; picture?: string };
  return { provider: 'google', providerId: info.sub, name: info.name, email: info.email, avatar: info.picture };
}

/* ---------- Apple ---------- */

function decodeJwt(token: string): Record<string, unknown> {
  const payload = token.split('.')[1] ?? '';
  const b64 = payload.replace(/-/g, '+').replace(/_/g, '/');
  const json = decodeURIComponent(
    atob(b64)
      .split('')
      .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join(''),
  );
  return JSON.parse(json);
}

export async function appleSignIn(): Promise<SocialProfile> {
  if (!APPLE_CLIENT_ID) throw new AuthError('لم يتم إعداد Apple بعد (VITE_APPLE_CLIENT_ID)');
  await loadScript(APPLE_SRC);
  const apple = window.AppleID?.auth;
  if (!apple) throw new AuthError('خدمة Apple غير متاحة حالياً');

  apple.init({ clientId: APPLE_CLIENT_ID, scope: 'name email', redirectURI: APPLE_REDIRECT_URI, usePopup: true });

  try {
    const r = await apple.signIn();
    const claims = decodeJwt(r.authorization.id_token) as { sub: string; email?: string };
    const first = r.user?.name?.firstName ?? '';
    const last = r.user?.name?.lastName ?? '';
    return {
      provider: 'apple',
      providerId: claims.sub,
      name: `${first} ${last}`.trim() || undefined,
      email: r.user?.email ?? claims.email,
    };
  } catch (e) {
    if (e instanceof AuthError) throw e;
    throw new AuthError('تم إلغاء تسجيل الدخول عبر Apple');
  }
}
