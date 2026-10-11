/**
 * مثال الربط: انسخ محتواه إلى src/App.tsx (أو ادمجه مع ما عندك).
 * إذا كان عندك صفحة هبوط حالية، اعرضها عندما user === null مع زر يفتح LoginPage.
 */
import { AuthProvider, useAuth } from './auth/AuthContext';
import LoginPage from './auth/LoginPage';
import DriverApp from './screens/DriverApp';

function Gate() {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <DriverApp /> : <LoginPage />;
}

export default function App() {
  return (
    <AuthProvider>
      <Gate />
    </AuthProvider>
  );
}
