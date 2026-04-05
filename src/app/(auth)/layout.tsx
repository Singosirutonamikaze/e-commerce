import React from 'react';
import Link from 'next/link';
import { ROUTES } from '@/lib/utils/constants/routes';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full flex-col bg-bg md:flex-row">
      {/* Brand Section */}
      <div className="hidden h-full flex-1 flex-col justify-between bg-accent p-12 text-white md:flex">
        <Link href={ROUTES.HOME} className="text-3xl font-bold tracking-tighter">
          VELURE
        </Link>
        <div className="max-w-md">
          <blockquote className="space-y-2">
            <p className="text-lg font-medium italic">
              &ldquo;L&apos;élégance est la seule beauté qui ne se fane jamais.
              VELURE redéfinit le shopping moderne avec une sélection
              exclusive et une expérience fluide.&rdquo;
            </p>
            <footer className="text-sm font-light opacity-80">— Audrey Hepburn</footer>
          </blockquote>
        </div>
        <div className="flex space-x-6 text-sm font-medium opacity-80">
          <span>&copy; {new Date().getFullYear()} VELURE</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex h-full flex-1 items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-8">
          <div className="md:hidden">
            <Link href={ROUTES.HOME} className="text-2xl font-bold tracking-tighter text-accent">
              VELURE
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
