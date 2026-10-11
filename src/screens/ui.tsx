import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Star } from 'lucide-react';

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-white/10 bg-white/[0.04] p-4 ${className}`}>{children}</div>;
}

export function ScreenTitle({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div>
        <h2 className="text-xl font-extrabold">{title}</h2>
        {subtitle && <p className="mt-0.5 text-xs text-white/50">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function PrimaryButton({
  children,
  className = '',
  variant = 'solid',
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'solid' | 'outline' }) {
  const styles =
    variant === 'solid'
      ? 'bg-red-600 text-white shadow-[0_8px_24px_rgba(220,20,30,0.3)] hover:bg-red-500'
      : 'border border-red-500/60 bg-red-600/10 text-red-300 hover:bg-red-600/20';
  return (
    <button
      {...rest}
      className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-extrabold transition disabled:opacity-60 ${styles} ${className}`}
    >
      {children}
    </button>
  );
}

export function Stars({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`التقييم ${value} من 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={i <= Math.round(value) ? 'fill-amber-400 text-amber-400' : 'text-white/20'}
        />
      ))}
    </span>
  );
}

export function Avatar({ name, src, size = 64 }: { name: string; src?: string; size?: number }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('');
  return src ? (
    <img src={src} alt={name} style={{ width: size, height: size }} className="rounded-full border-2 border-red-500 object-cover" />
  ) : (
    <span
      style={{ width: size, height: size, fontSize: size / 2.6 }}
      className="flex items-center justify-center rounded-full border-2 border-red-500 bg-gradient-to-br from-red-700 to-red-950 font-extrabold"
    >
      {initials}
    </span>
  );
}

export const money = (n: number) => `${n.toFixed(2)} د.أ`;
