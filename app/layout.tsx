import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { AmanahProvider } from "@/components/amanah-provider";

export const metadata: Metadata = {
  title: "Amanah",
  description: "Protect what matters.",
};

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Journal", href: "/journal" },
  { label: "Salah & Habits", href: "/salah-habits" },
  { label: "High-Risk", href: "/high-risk" },
  { label: "Wife Connection", href: "/wife-connection" },
  { label: "Family Vision", href: "/family-vision" },
  { label: "Immigration Progress", href: "/immigration-progress" },
  { label: "Fitness & Health", href: "/fitness-health" },
  { label: "Review", href: "/review" },
  { label: "Settings", href: "/settings" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AmanahProvider>
          <main className="amanah-app">
            <aside className="sidebar">
              <div className="sidebar-inner">
                <div className="brand-block">
                  <div className="brand-icon-wrap">
                    <Image
                      src="/amanah.png"
                      alt="Amanah icon"
                      width={44}
                      height={44}
                      className="brand-icon"
                    />
                  </div>
                  <div>
                    <p className="brand-eyebrow">Amanah</p>
                    <h1 className="brand-title">Protect what matters</h1>
                  </div>
                </div>

                <nav className="nav">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href} className="nav-link">
                      <span className="nav-item">
                        <span className="nav-dot" />
                        <span>{item.label}</span>
                      </span>
                    </Link>
                  ))}
                </nav>

            
              </div>
            </aside>

            <section className="content">{children}</section>
          </main>
        </AmanahProvider>
      </body>
    </html>
  );
}
