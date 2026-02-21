import React from 'react';
import { cn } from '../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  onClick?: () => void;
}

export const Card = ({ children, className, title, subtitle, onClick }: CardProps) => {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "bg-[#121212] border border-zinc-800 rounded-2xl overflow-hidden shadow-xl", 
        onClick && "cursor-pointer active:scale-[0.98] transition-all hover:border-zinc-700",
        className
      )}
    >
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-900/50">
          {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
          {subtitle && <p className="text-sm text-zinc-500">{subtitle}</p>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};
