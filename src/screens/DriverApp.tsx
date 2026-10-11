import { useState } from 'react';
import { ClipboardList, LayoutDashboard, LogOut, MapPin, ShieldCheck, UserRound } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import DashboardScreen from './DashboardScreen';
import DriverProfileScreen from './DriverProfileScreen';
import LiveTripScreen from './LiveTripScreen';
import VerifyScreen from './VerifyScreen';
import WorkLogScreen from './WorkLogScreen';

const tabs = [
  { id: 'dashboard', label: 'اللوحة', icon: LayoutDashboard },
  { id: 'worklog', label: 'السجل', icon: ClipboardList },
  { id: 'verify', label: 'التحقق', icon: ShieldCheck },
  { id: 'profile', label: 'الملف', icon: UserRound },
  { id: 'live', label: 'الرحلة', icon: MapPin },
] as const;

type TabId = (typeof tabs)[number]['id'];

export default function DriverApp() {
  const { user, logout } = useAuth();
  const [tab, setTab] = useState<TabId>('dashboard');

  const go = (id: string) => setTab(id as TabId);

  return (
    <div dir="rtl" className="min-h-screen bg-[#0a0a0a] font-[Tajawal,Cairo,system-ui,sans-serif] text-white">
      <div className="mx-auto flex min-h-screen max-w-md flex-col bg-[radial-gradient(ellipse_at_top,rgba(220,20,30,0.28),transparent_55%)]">
        <header className="flex items-center justify-between px-5 pb-3 pt-5">
          <div>
            <h1 className="text-lg font-extrabold">
              نشاما <span className="text-red-500">درايف</span>
            </h1>
            <p className="text-xs text-white/50">أهلاً {user?.name}</p>
          </div>
          <button
            onClick={logout}
            aria-label="تسجيل الخروج"
            className="flex items-center gap-1.5 rounded-xl border border-white/15 px-3 py-2 text-xs font-bold text-white/70 transition hover:border-red-500/60 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            خروج
          </button>
        </header>

        <main className="flex-1 px-5 pb-28 pt-2">
          {tab === 'dashboard' && <DashboardScreen onNavigate={go} />}
          {tab === 'worklog' && <WorkLogScreen />}
          {tab === 'verify' && <VerifyScreen />}
          {tab === 'profile' && <DriverProfileScreen onTrack={() => setTab('live')} />}
          {tab === 'live' && <LiveTripScreen />}
        </main>

        <nav
          aria-label="التنقل الرئيسي"
          className="fixed inset-x-0 bottom-0 z-10 mx-auto max-w-md border-t border-white/10 bg-[#0e0e0e]/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur"
        >
          <ul className="grid grid-cols-5">
            {tabs.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <button
                  onClick={() => setTab(id)}
                  aria-current={tab === id ? 'page' : undefined}
                  className={`flex w-full flex-col items-center gap-1 rounded-xl py-2 text-[11px] font-bold transition ${
                    tab === id ? 'text-red-500' : 'text-white/45 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
