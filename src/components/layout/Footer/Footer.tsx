import React from 'react';
import Link from 'next/link';
import { FaInstagram, FaTwitter, FaFacebook, FaYoutube } from 'react-icons/fa';
import { Mail, Phone, MapPin } from 'lucide-react';
import { ROUTES } from '@/lib/utils/constants/routes';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    "La Boutique": [
      { name: "Tous les produits", href: ROUTES.PRODUCTS },
      { name: "Nouvelle Collection", href: `${ROUTES.PRODUCTS}?new=true` },
      { name: "Promotions", href: `${ROUTES.PRODUCTS}?promo=true` },
      { name: "Catégories", href: ROUTES.CATEGORIES },
    ],
    "Compte": [
      { name: "Mon Profil", href: ROUTES.ACCOUNT.PROFILE },
      { name: "Mes Commandes", href: ROUTES.ACCOUNT.ORDERS },
      { name: "Liste de souhaits", href: ROUTES.ACCOUNT.WISHLIST },
      { name: "Panier", href: ROUTES.CART },
    ],
    "Assistance": [
      { name: "FAQ", href: ROUTES.FAQ },
      { name: "Livraison & Retours", href: ROUTES.SHIPPING },
      { name: "Nous contacter", href: ROUTES.CONTACT },
      { name: "RGPD & Confidentialité", href: ROUTES.PRIVACY },
    ],
  };

  return (
    <footer className="bg-surface-alt pt-24 pb-12 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2">
            <Link href={ROUTES.HOME} className="flex items-center gap-2 mb-6">
              <div className="h-8 w-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-xl italic tracking-tighter">V</span>
              </div>
              <span className="text-2xl font-black tracking-tighter text-text-primary uppercase">Velure</span>
            </Link>
            <p className="text-text-muted mb-8 max-w-sm">
              L&apos;élégance redéfinie pour le monde moderne. Une sélection exclusive de mode premium
              conçue avec passion et savoir-faire artisanal.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-border text-text-primary hover:bg-accent hover:text-white transition-all">
                <FaInstagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-border text-text-primary hover:bg-accent hover:text-white transition-all">
                <FaTwitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-border text-text-primary hover:bg-accent hover:text-white transition-all">
                <FaFacebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-border text-text-primary hover:bg-accent hover:text-white transition-all">
                <FaYoutube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-black uppercase tracking-widest text-text-primary mb-6">
                {title}
              </h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted hover:text-accent transition-colors font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-white rounded-3xl border border-border mb-16">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-accent-light text-accent">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-text-hint uppercase tracking-tighter">Email</p>
              <p className="text-sm font-bold text-text-primary">contact@velure.com</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-accent-light text-accent">
              <Phone className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-text-hint uppercase tracking-tighter">Téléphone</p>
              <p className="text-sm font-bold text-text-primary">+33 (0)1 23 45 67 89</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-accent-light text-accent">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-text-hint uppercase tracking-tighter">Boutique</p>
              <p className="text-sm font-bold text-text-primary">Paris, France</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border gap-4">
          <p className="text-xs font-medium text-text-muted">
            &copy; {currentYear} Velure Maison de Mode. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <Link href={ROUTES.PRIVACY} className="text-xs font-medium text-text-muted hover:text-accent">Conditions Générales</Link>
            <Link href={ROUTES.PRIVACY} className="text-xs font-medium text-text-muted hover:text-accent">Mentions Légales</Link>
            <Link href={ROUTES.PRIVACY} className="text-xs font-medium text-text-muted hover:text-accent">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
