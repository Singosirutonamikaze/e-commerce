import { ShopChrome } from "@/components/layout/ShopChrome/ShopChrome";

export default async function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <ShopChrome>
        <main className="flex-1">{children}</main>
      </ShopChrome>
    </div>
  );
}
