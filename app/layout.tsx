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
          <style
            dangerouslySetInnerHTML={{
              __html: `
                html, body {
                  margin: 0;
                  padding: 0;
                  min-height: 100%;
                }

                body {
                  background: #0b1220;
                  color: #f8fafc;
                }

                .amanah-shell {
                  min-height: 100vh;
                  display: grid;
                  grid-template-columns: 280px minmax(0, 1fr);
                  background:
                    radial-gradient(circle at top, rgba(212, 175, 55, 0.08), transparent 30%),
                    #0b1220;
                }

                .amanah-sidebar {
                  border-right: 1px solid rgba(255, 255, 255, 0.08);
                  background: rgba(8, 15, 30, 0.88);
                  backdrop-filter: blur(10px);
                }

                .amanah-sidebar-inner {
                  position: sticky;
                  top: 0;
                  padding: 28px 18px;
                  display: flex;
                  flex-direction: column;
                  gap: 28px;
                  min-height: 100vh;
                  box-sizing: border-box;
                }

                .amanah-brand {
                  padding: 8px 8px 2px;
                }

                .amanah-brand-eyebrow {
                  margin: 0 0 8px;
                  color: #d4af37;
                  font-size: 0.82rem;
                  letter-spacing: 0.18em;
                  font-weight: 700;
                }

                .amanah-brand-title {
                  margin: 0;
                  font-size: 1.9rem;
                  line-height: 1.05;
                  font-weight: 800;
                  color: #f8fafc;
                }

                .amanah-nav {
                  display: flex;
                  flex-direction: column;
                  gap: 8px;
                }

                .amanah-nav-link {
                  display: flex;
                  align-items: center;
                  gap: 12px;
                  padding: 12px 14px;
                  border-radius: 16px;
                  color: #e5e7eb;
                  text-decoration: none;
                  font-size: 1rem;
                  font-weight: 600;
                  border: 1px solid transparent;
                  box-sizing: border-box;
                }

                .amanah-nav-link:hover {
                  background: rgba(255, 255, 255, 0.04);
                  border-color: rgba(212, 175, 55, 0.2);
                }

                .amanah-nav-dot {
                  width: 8px;
                  height: 8px;
                  border-radius: 999px;
                  background: #d4af37;
                  flex: 0 0 auto;
                }

                .amanah-main {
                  min-width: 0;
                  padding: 28px;
                  box-sizing: border-box;
                }

                @media (max-width: 900px) {
                  .amanah-shell {
                    grid-template-columns: 1fr;
                  }

                  .amanah-sidebar {
                    border-right: 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                  }

                  .amanah-sidebar-inner {
                    position: static;
                    min-height: auto;
                    padding: 18px 14px;
                    gap: 16px;
                  }

                  .amanah-brand-title {
                    font-size: 1.45rem;
                  }

                  .amanah-nav {
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    gap: 8px;
                  }

                  .amanah-nav-link {
                    min-width: 0;
                    padding: 10px 12px;
                    font-size: 0.95rem;
                  }

                  .amanah-main {
                    padding: 16px 12px 28px;
                  }
                }

                @media (max-width: 560px) {
                  .amanah-nav {
                    grid-template-columns: 1fr;
                  }

                  .amanah-brand-title {
                    font-size: 1.25rem;
                  }

                  .amanah-main {
                    padding: 14px 10px 24px;
                  }
                }
              `,
            }}
          />

          <div className="amanah-shell">
            <aside className="amanah-sidebar">
              <div className="amanah-sidebar-inner">
                <div className="amanah-brand">
                  <p className="amanah-brand-eyebrow">AMANAH</p>
                  <h1 className="amanah-brand-title">Protect what matters</h1>
                </div>

                <nav className="amanah-nav">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="amanah-nav-link"
                    >
                      <span className="amanah-nav-dot" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>

            <main className="amanah-main">{children}</main>
          </div>
        </AmanahProvider>
      </body>
    </html>
  );
}
