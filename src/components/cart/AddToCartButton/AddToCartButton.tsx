"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart/useCart";
import { cn } from "@/lib/utils/cn";
import { ProductWithImages } from "@/types/product";
import { ROUTES } from "@/lib/utils/constants/routes";
import { createClient } from "@/lib/supabase/client";

interface AddToCartButtonProps {
  product: ProductWithImages;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
  requireAuth?: boolean;
  onAuthRequired?: () => void;
}

export function AddToCartButton({
  product,
  variant = "default",
  className,
  requireAuth = false,
  onAuthRequired,
}: Readonly<AddToCartButtonProps>) {
  const { addItem } = useCart();
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);

  const handleAdd = async () => {
    if (product.stock === 0) return;

    // Si auth requise et callback fourni (modal dashboard), appeler le callback
    if (requireAuth && onAuthRequired) {
      onAuthRequired();
      return;
    }

    // Si auth requise mais pas de callback (landing page), vérifier l'authentification
    if (requireAuth && !onAuthRequired) {
      setIsCheckingAuth(true);
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          // Pas authentifié : rediriger vers login
          router.push(ROUTES.AUTH.LOGIN);
          setIsCheckingAuth(false);
          return;
        }

        // Authentifié : rediriger vers dashboard
        router.push(ROUTES.DASHBOARD.ROOT);
        setIsCheckingAuth(false);
        return;
      } catch (error) {
        console.error("Auth check error:", error);
        router.push(ROUTES.AUTH.LOGIN);
        setIsCheckingAuth(false);
        return;
      }
    }

    // Pas d'auth requise : ajouter directement
    setIsAdding(true);

    // Simulate slight delay for feedback
    await new Promise((resolve) => setTimeout(resolve, 500));

    addItem({
      id: Math.random().toString(36).substring(7),
      produitId: product.id,
      nom: product.nom,
      prix: Number(product.prix),
      image: product.images?.[0]?.url || "/placeholder.png",
      quantite: 1,
      stock: product.stock,
    });

    setIsAdding(false);
    setIsAdded(true);

    // Reset "Added" state after 2 seconds
    setTimeout(() => setIsAdded(false), 2000);
  };

  let buttonIcon = <ShoppingCart className="h-5 w-5" />;
  if (isAdding || isCheckingAuth) {
    buttonIcon = <Loader2 className="h-5 w-5 animate-spin" />;
  } else if (isAdded) {
    buttonIcon = <Check className="h-5 w-5" />;
  }

  let buttonLabel = "Ajouter au panier";
  if (product.stock === 0) {
    buttonLabel = "Rupture de stock";
  } else if (isAdding || isCheckingAuth) {
    buttonLabel = isCheckingAuth ? "Vérification..." : "Ajout...";
  } else if (isAdded) {
    buttonLabel = "Ajoute !";
  }

  return (
    <Button
      onClick={handleAdd}
      disabled={product.stock === 0 || isAdding || isCheckingAuth}
      variant={variant}
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        isAdded ? "bg-success hover:bg-success text-white border-success" : "",
        className,
      )}
    >
      <div className="flex items-center justify-center gap-2">
        {buttonIcon}
        <span className="font-bold">{buttonLabel}</span>
      </div>
    </Button>
  );
}
