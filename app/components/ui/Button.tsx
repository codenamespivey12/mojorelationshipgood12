import { forwardRef } from 'react';
import { cn } from '~/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:-translate-y-0.5 active:scale-95';

    const variants = {
      primary: 'bg-gradient-to-r from-[#471396] to-[#B13BFF] text-white hover:from-[#5a1bb8] hover:to-[#c44fff] focus:ring-[#B13BFF]/50 shadow-lg hover:shadow-xl',
      secondary: 'bg-gradient-to-r from-[#FFCC00] to-[#FFB800] text-[#090040] hover:from-[#FFD700] hover:to-[#FFC000] focus:ring-[#FFCC00]/50 shadow-lg hover:shadow-xl font-bold',
      outline: 'border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 focus:ring-white/50 backdrop-blur-sm',
      ghost: 'text-white hover:bg-white/10 focus:ring-white/50',
    };

    const sizes = {
      sm: 'px-5 py-2.5 text-sm min-h-[40px]',
      md: 'px-7 py-3.5 text-base min-h-[48px]',
      lg: 'px-9 py-4.5 text-lg min-h-[56px]',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };