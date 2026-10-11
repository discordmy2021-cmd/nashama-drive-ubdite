import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSlogan?: boolean;
  sloganText?: string;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showSlogan = false,
  sloganText = 'شريكك في كل طريق',
  className = ''
}) => {
  const sizeClasses = {
    sm: {
      car: 'w-7 h-4',
      title: 'text-xl',
      slogan: 'text-[10px]'
    },
    md: {
      car: 'w-10 h-5',
      title: 'text-2xl',
      slogan: 'text-xs'
    },
    lg: {
      car: 'w-14 h-7',
      title: 'text-3xl md:text-4xl',
      slogan: 'text-sm'
    },
    xl: {
      car: 'w-20 h-9',
      title: 'text-5xl md:text-6xl',
      slogan: 'text-lg'
    }
  }[size];

  return (
    <div className={`inline-flex flex-col items-start select-none ${className}`}>
      {/* Aerodynamic Car Silhouette */}
      <div className="relative mb-0.5">
        <svg
          viewBox="0 0 120 40"
          className={`${sizeClasses.car} text-[#E50914] drop-shadow-[0_0_8px_rgba(229,9,20,0.8)]`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sleek sports car roof & hood stroke */}
          <path
            d="M5 28 C15 28, 22 24, 32 16 C42 8, 70 8, 88 18 C100 23, 110 26, 115 28"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Subtle bottom chassis streak */}
          <path
            d="M12 33 H108"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeOpacity="0.75"
          />
          {/* Front headlight flash */}
          <circle cx="108" cy="27" r="2" fill="#ffffff" />
          {/* Rear taillight glow */}
          <circle cx="12" cy="27" r="2.5" fill="#ff4d4d" className="animate-pulse" />
        </svg>
      </div>

      {/* Brand Name: نشاما درايف */}
      <div className={`font-black tracking-tight flex items-baseline gap-1.5 ${sizeClasses.title}`}>
        <span className="text-white drop-shadow-sm font-['Cairo']">درايف</span>
        <span className="text-[#E50914] drop-shadow-[0_0_12px_rgba(229,9,20,0.7)] font-['Cairo']">نشاما</span>
      </div>

      {/* Optional Slogan */}
      {showSlogan && (
        <span className={`text-zinc-300 font-medium tracking-wide mt-0.5 ${sizeClasses.slogan}`}>
          {sloganText}
        </span>
      )}
    </div>
  );
};
