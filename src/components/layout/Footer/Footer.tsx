import React from 'react';
import Link from 'next/link';
import { FaInstagram, FaTwitter, FaFacebook, FaYoutube } from 'react-icons/fa';

import { ROUTES } from '@/lib/utils/constants/routes';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    "Produits": [
      { name: "Catalogue", href: ROUTES.PRODUCTS },
      { name: "Saisons", href: `${ROUTES.PRODUCTS}?new=true` },
      { name: "Exclusivités", href: `${ROUTES.PRODUCTS}?promo=true` },
      { name: "Univers", href: ROUTES.CATEGORIES },
    ],
    "Société": [
      { name: "Héritage", href: ROUTES.FAQ },
      { name: "Savoir-faire", href: ROUTES.SHIPPING },
      { name: "Confidentialité", href: ROUTES.PRIVACY },
      { name: "Conditions", href: ROUTES.PRIVACY },
    ],
    "Assistance": [
      { name: "Compte Client", href: ROUTES.ACCOUNT.PROFILE },
      { name: "Commandes", href: ROUTES.ACCOUNT.ORDERS },
      { name: "Wishlist", href: ROUTES.ACCOUNT.WISHLIST },
      { name: "Support et FAQ", href: ROUTES.FAQ },
    ],
  };

  return (
    <footer className="bg-white pt-24 pb-12 px-6 border-t border-neutral-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-20">
          {/* Brand Presentation - Minimalist Icon Only */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            <Link href={ROUTES.HOME} className="flex items-center">
              <div className="h-10 w-10 bg-black rounded-sm flex items-center justify-center text-white font-bold text-xl">
                V
              </div>
            </Link>
            <p className="text-[10px] font-bold text-neutral-400 max-w-sm leading-relaxed uppercase tracking-[0.2em]">
              L&apos;excellence du minimalisme contemporain. <br />
              Artisanat et vision pour un vestiaire d&apos;exception.
            </p>
            <div className="flex gap-4">
              {[FaInstagram, FaTwitter, FaFacebook, FaYoutube].map((Icon, idx) => (
                <Link key={idx} href="#" className="h-10 w-10 flex items-center justify-center rounded-sm border border-neutral-100 text-neutral-300 hover:border-black hover:text-black hover:bg-neutral-50 transition-all">
                  <Icon className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="lg:col-span-1 flex flex-col gap-8">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-black border-b border-neutral-50 pb-4">
                {title}
              </h3>
              <ul className="flex flex-col gap-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[9px] text-neutral-400 hover:text-black transition-all font-bold uppercase tracking-widest"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Professional Contact Registry */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 p-12 bg-neutral-950 rounded-sm border border-neutral-900 mb-24 text-center md:text-left shadow-xl shadow-black/10 transition-all hover:bg-black group">
           <div className="flex flex-col gap-4 border-l border-neutral-800 pl-8">
              <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-neutral-500 group-hover:text-neutral-400 transition-colors">Service Client</span>
              <div className="flex flex-col gap-1">
                 <p className="text-[11px] font-bold text-white uppercase tracking-[0.2em]">contact@velure.tg</p>
                 <p className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest">+228 90 00 00 00</p>
              </div>
           </div>
           <div className="flex flex-col gap-4 border-l border-neutral-800 pl-8">
              <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-neutral-500 group-hover:text-neutral-400 transition-colors">Boutique Officielle</span>
              <div className="flex flex-col gap-1">
                 <p className="text-[11px] font-bold text-white uppercase tracking-[0.2em]">Quartier Administratif</p>
                 <p className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest">Lomé, Togo</p>
              </div>
           </div>
           <div className="flex flex-col gap-4 border-l border-neutral-800 pl-8">
              <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-neutral-500 group-hover:text-neutral-400 transition-colors">Expédition et Engagement</span>
              <div className="flex flex-col gap-1">
                 <p className="text-[11px] font-bold text-white uppercase tracking-[0.2em]">Livraison Rapide</p>
                 <p className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest">Qualité Exceptionnelle</p>
              </div>
           </div>
        </div>

        {/* Legal Footer - High Contrast Pro */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-neutral-100 gap-8">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-black">
              &copy; {currentYear} &bull; Tous droits réservés
            </p>
            <p className="text-[8px] font-bold text-neutral-500 uppercase tracking-widest">
              L&apos;élégance à l&apos;état pur &bull; Velure Officiel
            </p>
          </div>
          <div className="flex items-center gap-8">
            {['Confidentialité', 'Sécurité', 'Légal'].map((item) => (
              <Link key={item} href={ROUTES.PRIVACY} className="text-[9px] font-bold uppercase tracking-widest text-neutral-500 hover:text-black transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
