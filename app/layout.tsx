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
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "#0b1220",
          color: "#f8fafc",
        }}
      >
        <AmanahProvider>
          <div
            style={{
              minHeight: "100vh",
              display: "grid",
              gridTemplateColumns: "280px minmax(0, 1fr)",
              background:
                "radial-gradient(circle at top, rgba(212, 175, 55, 0.08), transparent 30%), #0b1220",
            }}
          >
            <aside
              style={{
                borderRight: "1px solid rgba(255, 255, 255, 0.08)",
                background: "rgba(8, 15, 30, 0.88)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div
                style={{
                  position: "sticky",
                  top: 0,
                  padding: "28px 18px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "28px",
                  minHeight: "100vh",
                  boxSizing: "border-box",
                }}
              >
                <div style={{ padding: "8px 8px 2px" }}>
                  <p
                    style={{
                      margin: "0 0 8px",
                      color: "#d4af37",
                      fontSize: "0.82rem",
                      letterSpacing: "0.18em",
                      fontWeight: 700,
                    }}
                  >
                    AMANAH
                  </p>
                  <h1
                    style={{
                      margin: 0,
                      fontSize: "1.9rem",
                      lineHeight: 1.05,
                      fontWeight: 800,
                      color: "#f8fafc",
                    }}
                  >
                    Protect what matters
                  </h1>
                </div>

                <nav
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "12px 14px",
                        borderRadius: "16px",
                        color: "#e5e7eb",
                        textDecoration: "none",
                        fontSize: "1rem",
                        fontWeight: 600,
                        border: "1px solid transparent",
                      }}
                    >
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "999px",
                          background: "#d4af37",
                          flex: "0 0 auto",
                        }}
                      />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>

            <main
              style={{
                minWidth: 0,
                padding: "28px",
              }}
            >
              {children}
            </main>
          </div>
        </AmanahProvider>
      </body>
    </html>
  );
}
