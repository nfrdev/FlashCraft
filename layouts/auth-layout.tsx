import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/20 p-4 md:p-8">
      <div className="w-full max-w-md flex flex-col justify-center bg-card p-8 rounded-xl border border-border shadow-sm">
        {children}
      </div>
    </div>
  );
}
