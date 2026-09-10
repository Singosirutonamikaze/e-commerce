"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/lib/utils/constants/routes";
import logo from "@/assets/logo.png";

export function Footer() {
  const pathname = usePathname();

  const socialLinks = [
    {
      name: "twitter",
      href: "#",
      svg: (
        <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "instagram",
      href: "#",
      svg: (
        <svg className="h-3.5 w-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
    },
    {
      name: "linkedin",
      href: "#",
      svg: (
        <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6" />
        </svg>
      ),
    },
    {
      name: "github",
      href: "#",
      svg: (
        <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
        </svg>
      ),
    },
  ];

  const footerLinks = {
    navigation: [
      { name: "collections", href: ROUTES.CATEGORIES },
      { name: "catalogue", href: ROUTES.PRODUCTS },
      { name: "promotions", href: ROUTES.HOME },
    ],
    informations: [
      { name: "à propos", href: ROUTES.HOME },
      { name: "livraison", href: ROUTES.SHIPPING },
      { name: "confidentialité", href: ROUTES.PRIVACY },
    ],
    assistance: [
      { name: "compte client", href: ROUTES.DASHBOARD.PROFILE },
      { name: "commandes", href: ROUTES.DASHBOARD.ORDERS },
      { name: "favoris", href: ROUTES.DASHBOARD.WISHLIST },
      { name: "support & faq", href: ROUTES.FAQ },
    ],
  };

  const isShopPage =
    !pathname.startsWith("/admin") &&
    !pathname.startsWith("/auth") &&
    !pathname.startsWith("/dashboard");
  if (!isShopPage) return null;

  return (
    <footer className="bg-slate-950 pt-16 pb-10 border-t border-slate-800 text-slate-400">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          <div className="lg:col-span-3 flex flex-col gap-4">
            <Link href={ROUTES.HOME} className="flex items-center gap-3">
              <div className="relative h-8 w-24 flex items-center">
                <Image
                  src={logo}
                  alt="Velure"
                  width={120}
                  height={36}
                  className="h-7 w-auto object-contain brightness-0 invert"
                />
              </div>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-normal">
              Style contemporain et pièces soignées confectionnées pour votre vestiaire au quotidien.
            </p>
            <div className="flex gap-2 pt-1">
              {socialLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="h-8 w-8 flex items-center justify-center border border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white hover:bg-slate-900 transition-all"
                >
                  {item.svg}
                </Link>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="lg:col-span-1 flex flex-col gap-3">
              <h3 className="text-xs font-semibold text-white pb-1 border-b border-slate-800/80">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-xs text-slate-400 hover:text-white transition-colors block py-0.5"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-normal">
          <p>© 2026 Velure. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <Link
              href={ROUTES.PRIVACY}
              className="hover:text-white transition-colors"
            >
              Politique de confidentialité
            </Link>
            <Link
              href={ROUTES.SHIPPING}
              className="hover:text-white transition-colors"
            >
              Expédition & livraison
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
