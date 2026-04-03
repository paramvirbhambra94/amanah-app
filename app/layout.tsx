import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { AmanahProvider } from "@/components/amanah-provider";

export const metadata: Metadata = {
  title: "Amanah",
  description: "Protect what matters.",
};

function isFridayNow() {
  return new Date().getDay() === 5;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const showJummah = isFridayNow();

  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/journal", label: "Journal" },
    { href: "/salah-habits", label: "Salah & Habits" },
    { href: "/high-risk", label: "High-Risk" },
    { href: "/wife-connection", label: "Wife Connection" },
    { href: "/family-vision", label: "Family Vision" },
    { href: "/immigration-progress", label: "Immigration Progress" },
    { href: "/fitness-health", label: "Fitness & Health" },
    ...(showJummah ? [{ href: "/jummah", label: "Jummah" }] : []),
    { href: "/review", label: "Review" },
    { href: "/settings", label: "Settings" },
  ];

  return (
    <html lang="en">
      <body>
        <AmanahProvider>
          <div className="app-shell">
            <aside className="sidebar">
              <div className="sidebar-inner">
                <div className="sidebar-brand">
                  <p className="sidebar-eyebrow">AMANAH</p>
                  <h1 className="sidebar-title">Protect what matters</h1>
                </div>

                <nav className="sidebar-nav">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href} className="sidebar-link">
                      <span className="sidebar-dot" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>

            <section className="content">{children}</section>
          </div>
        </AmanahProvider>
      </body>
    </html>
  );
}
