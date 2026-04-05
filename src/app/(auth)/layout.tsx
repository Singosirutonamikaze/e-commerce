import React from 'react';
import Link from 'next/link';
import { ROUTES } from '@/lib/utils/constants/routes';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-neutral-50 px-4 py-8">
      <div className="w-full max-w-md bg-white p-6 md:p-8 border border-neutral-200 rounded-sm shadow-sm my-auto">
        {children}
      </div>
    </div>
  );
}
