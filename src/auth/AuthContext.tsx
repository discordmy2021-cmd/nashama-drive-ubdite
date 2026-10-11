import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  clearSession,
  loadSession,
  loginUser,
  registerUser,
  saveSession,
  socialLogin,
  type AuthUser,
} from './authService';
import { appleSignIn, googleSignIn } from './social';

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (identifier: string, password: string, remember: boolean) => Promise<void>;
  register: (name: string, identifier: string, password: string) => Promise<void>;
  loginWithGoogle: (remember?: boolean) => Promise<void>;
  loginWithApple: (remember?: boolean) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(loadSession());
    setLoading(false);
  }, []);

  const finish = useCallback((u: AuthUser, remember: boolean) => {
    saveSession(u, remember);
    setUser(u);
  }, []);

  const login = useCallback(
    async (identifier: string, password: string, remember: boolean) => {
      finish(await loginUser({ identifier, password }), remember);
    },
    [finish],
  );

  const register = useCallback(
    async (name: string, identifier: string, password: string) => {
      finish(await registerUser({ name, identifier, password }), true);
    },
    [finish],
  );

  const loginWithGoogle = useCallback(
    async (remember = true) => {
      finish(await socialLogin(await googleSignIn()), remember);
    },
    [finish],
  );

  const loginWithApple = useCallback(
    async (remember = true) => {
      finish(await socialLogin(await appleSignIn()), remember);
    },
    [finish],
  );

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, register, loginWithGoogle, loginWithApple, logout }),
    [user, loading, login, register, loginWithGoogle, loginWithApple, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth يجب أن يُستخدم داخل AuthProvider');
  return ctx;
}
