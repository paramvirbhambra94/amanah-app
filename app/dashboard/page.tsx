'use client';

import Link from "next/link";
import Image from "next/image";
import { useAmanah } from "@/components/amanah-provider";

function formatSavedDate(dateKey: string) {
  const date = new Date(`${dateKey}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateKey;
  return date.toLocaleDateString("en-GB");
}

const coreSections = [
  {
    title: "Journal",
    href: "/journal",
    tag: "Reflect",
    description: "Reflect honestly, process your day, and return with clarity.",
    image: "/journal.png",
  },
  {
    title: "Salah & Habits",
    href: "/salah-habits",
    tag: "Discipline",
    description: "Protect the prayers and build your daily discipline.",
    image: "/salah-habits.png",
  },
  {
    title: "High-Risk",
    href: "/high-risk",
    tag: "Protect",
    description: "Spot your patterns early and interrupt the cycle fast.",
    image: "/high-risk.png",
  },
  {
    title: "Wife Connection",
    href: "/wife-connection",
    tag: "Marriage",
    description: "Lead the marriage with softness, reassurance, and care.",
    image: "/wife-connection.png",
  },
  {
    title: "Family Vision",
    href: "/family-vision",
    tag: "Vision",
    description: "Keep the home and family you want visible and intentional.",
    image: "/family-vision.png",
  },
  {
    title: "Immigration Progress",
    href: "/immigration-progress",
    tag: "Progress",
    description: "Turn pressure into structure, steps, and steady movement.",
    image: "/immigration-progress.png",
  },
  {
    title: "Fitness & Health",
    href: "/fitness-health",
    tag: "Health",
    description: "Build strength, energy, and consistency in a sustainable way.",
    image: "/fitness-health.png",
  },
  {
    title: "Review",
    href: "/review",
    tag: "Review",
    description: "Look back properly so your next week gets sharper.",
    image: "/review.png",
  },
];

export default function DashboardPage() {
  const {
    todayKey,
    journalEntries,
    dailyProgress,
    highRiskMap,
    wifeConnectionMap,
    fitnessMap,
    immigrationState,
    settingsState,
  } = useAmanah();

  const todayProgress = dailyProgress[todayKey];
  const todayHighRisk = highRiskMap[todayKey];
  const todayWife = wifeConnectionMap[todayKey];
  const todayFitness = fitnessMap[todayKey];

  const prayerCount = todayProgress
    ? Object.values(todayProgress.prayers).filter(Boolean).length
    : 0;

  const habitCount = todayProgress
    ? Object.values(todayProgress.habits).filter(Boolean).length
    : 0;

  const journalDone = journalEntries.some(
    (entry) => entry.createdDateKey === todayKey
  );

  const wifeCount = todayWife
    ? Object.values(todayWife.checklist).filter(Boolean).length
    : 0;

  const fitnessChecks = todayFitness
    ? Object.values(todayFitness.dailyChecks).filter(Boolean).length
    : 0;

  const workoutMarks = todayFitness
    ? Object.values(todayFitness.workouts).filter(Boolean).length
    : 0;

  const immigrationCount = Object.values(
    immigrationState.checklist
  ).filter(Boolean).length;

  const statCards = [
    { label: "Prayers", value: `${prayerCount} / 5` },
    { label: "Habits", value: `${habitCount} / 8` },
    { label: "Journal", value: journalDone ? "Done" : "Not yet" },
    { label: "Wife connection", value: `${wifeCount} / 5` },
    { label: "Fitness checks", value: `${fitnessChecks} / 4` },
    { label: "Workout marks", value: `${workoutMarks} / 3` },
    { label: "Immigration", value: `${immigrationCount} / 4` },
    { label: "Saved for", value: formatSavedDate(todayKey) },
  ];

  return (
    <section className="page-shell">
      <div className="section-top">
        <div>
          <p className="section-eyebrow">Dashboard</p>
          <h2 className="page-title">
            {settingsState.profileName
              ? `Welcome back, ${settingsState.profileName}`
              : "Your Amanah dashboard"}
          </h2>
          <p className="page-text">
            A clear view of your deen, discipline, protection, marriage, health,
            and progress — all in one place.
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
          gap: "20px",
          marginBottom: "24px",
        }}
      >
        <div className="content-card" style={{ gridColumn: "span 5" }}>
          <p className="section-eyebrow">Core intention</p>
          <h3 className="content-title" style={{ marginTop: "10px" }}>
            {settingsState.coreGoals || "Set your core goal in Settings."}
          </h3>
        </div>

        <div className="content-card" style={{ gridColumn: "span 3" }}>
          <p className="section-eyebrow">Current urge level</p>
          <h3 className="content-title" style={{ marginTop: "10px" }}>
            {todayHighRisk?.urgeLevel ? `Level ${todayHighRisk.urgeLevel}` : "Not set"}
          </h3>
        </div>

        <div className="content-card" style={{ gridColumn: "span 4" }}>
          <p className="section-eyebrow">Jummah</p>
          <h3 className="content-title" style={{ marginTop: "10px" }}>
            Friday-only checklist will live here.
          </h3>
        </div>

        {statCards.map((item) => (
          <div
            key={item.label}
            className="content-card"
            style={{ gridColumn: "span 3", minHeight: "126px" }}
          >
            <p className="section-eyebrow">{item.label}</p>
            <h3 className="metric-value" style={{ marginTop: "12px" }}>
              {item.value}
            </h3>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
          gap: "20px",
          marginBottom: "28px",
        }}
      >
        <div className="content-card" style={{ gridColumn: "span 6" }}>
          <h3 className="content-title">Goal reminders</h3>

          <div style={{ display: "grid", gap: "12px", marginTop: "16px" }}>
            <div className="mini-note-box">
              <strong>Qur’an goal:</strong>{" "}
              {settingsState.quranGoal || "Set in Settings"}
            </div>

            <div className="mini-note-box">
              <strong>Wife goal:</strong>{" "}
              {settingsState.wifeGoal || "Set in Settings"}
            </div>

            <div className="mini-note-box">
              <strong>Trigger defaults:</strong>{" "}
              {settingsState.triggerDefaults || "Set in Settings"}
            </div>
          </div>
        </div>

        <div className="content-card" style={{ gridColumn: "span 6" }}>
          <h3 className="content-title">Quick access</h3>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginTop: "16px",
            }}
          >
            <Link href="/journal" className="secondary-btn">
              Open Journal
            </Link>
            <Link href="/review" className="secondary-btn">
              Open Review
            </Link>
            <Link href="/settings" className="secondary-btn">
              Open Settings
            </Link>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "12px" }}>
        <p className="section-eyebrow">Core sections</p>
        <h3 className="page-title" style={{ fontSize: "2rem", marginTop: "8px" }}>
          Your Amanah areas
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {coreSections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                className="content-card"
                style={{
                  overflow: "hidden",
                  minHeight: "360px",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    height: "160px",
                    borderBottom: "1px solid var(--line)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />

                  <span
                    style={{
                      position: "absolute",
                      top: "16px",
                      left: "16px",
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "8px 14px",
                      borderRadius: "999px",
                      background: "rgba(15, 23, 42, 0.76)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      backdropFilter: "blur(8px)",
                      zIndex: 2,
                    }}
                  >
                    {section.tag}
                  </span>
                </div>

                <div
                  style={{
                    padding: "22px 22px 24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    flex: 1,
                  }}
                >
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "2rem",
                      fontWeight: 800,
                      lineHeight: 1.05,
                    }}
                  >
                    {section.title}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      color: "var(--muted)",
                      lineHeight: 1.75,
                      fontSize: "1rem",
                    }}
                  >
                    {section.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
