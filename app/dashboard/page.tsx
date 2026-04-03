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

  const today = new Date();
  const isFriday = today.getDay() === 5;

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

      <div className="dashboard-top-grid">
        <div className={`content-card dashboard-hero-card ${isFriday ? "dashboard-span-5" : "dashboard-span-6"}`}>
          <p className="section-eyebrow">Core intention</p>
          <h3 className="content-title dashboard-hero-value">
            {settingsState.coreGoals || "Set your core goal in Settings."}
          </h3>
        </div>

        <div className={`content-card dashboard-hero-card ${isFriday ? "dashboard-span-3" : "dashboard-span-6"}`}>
          <p className="section-eyebrow">Current urge level</p>
          <h3 className="content-title dashboard-hero-value">
            {todayHighRisk?.urgeLevel ? `Level ${todayHighRisk.urgeLevel}` : "Not set"}
          </h3>
        </div>

        {isFriday && (
          <div className="content-card dashboard-hero-card dashboard-span-4">
            <p className="section-eyebrow">Jummah</p>
            <h3 className="content-title dashboard-hero-value">
              Friday-only checklist will live here.
            </h3>
          </div>
        )}
      </div>

      <div className="dashboard-stats-grid">
        {statCards.map((item) => (
          <div key={item.label} className="content-card dashboard-stat-card">
            <p className="section-eyebrow">{item.label}</p>
            <h3 className="metric-value dashboard-stat-value">{item.value}</h3>
          </div>
        ))}
      </div>

      <div className="dashboard-middle-grid">
        <div className="content-card">
          <h3 className="content-title">Goal reminders</h3>

          <div className="dashboard-note-stack">
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

        <div className="content-card">
          <h3 className="content-title">Quick access</h3>

          <div className="dashboard-links">
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

      <div className="dashboard-sections-wrap">
        <p className="section-eyebrow">Core sections</p>
        <h3 className="page-title dashboard-sections-title">Your Amanah areas</h3>

        <div className="dashboard-sections-grid">
          {coreSections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              className="dashboard-section-link"
            >
              <div className="content-card dashboard-section-card">
                <div className="dashboard-section-image">
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />

                  <span className="dashboard-section-tag">{section.tag}</span>
                </div>

                <div className="dashboard-section-body">
                  <h3 className="dashboard-section-title">{section.title}</h3>
                  <p className="dashboard-section-description">
                    {section.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .dashboard-top-grid {
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .dashboard-span-6 {
          grid-column: span 6;
        }

        .dashboard-span-5 {
          grid-column: span 5;
        }

        .dashboard-span-4 {
          grid-column: span 4;
        }

        .dashboard-span-3 {
          grid-column: span 3;
        }

        .dashboard-hero-card {
          min-height: 140px;
        }

        .dashboard-hero-value {
          margin-top: 10px;
        }

        .dashboard-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .dashboard-stat-card {
          min-height: 126px;
        }

        .dashboard-stat-value {
          margin-top: 12px;
        }

        .dashboard-middle-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
          margin-bottom: 28px;
        }

        .dashboard-note-stack {
          display: grid;
          gap: 12px;
          margin-top: 16px;
        }

        .dashboard-links {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 16px;
        }

        .dashboard-sections-wrap {
          margin-top: 12px;
        }

        .dashboard-sections-title {
          font-size: 2rem;
          margin-top: 8px;
        }

        .dashboard-sections-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .dashboard-section-link {
          text-decoration: none;
          color: inherit;
        }

        .dashboard-section-card {
          overflow: hidden;
          min-height: 360px;
          padding: 0;
          display: flex;
          flex-direction: column;
        }

        .dashboard-section-image {
          height: 160px;
          border-bottom: 1px solid var(--line);
          position: relative;
          overflow: hidden;
        }

        .dashboard-section-tag {
          position: absolute;
          top: 16px;
          left: 16px;
          display: inline-flex;
          align-items: center;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.76);
          border: 1px solid rgba(255, 255, 255, 0.12);
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          backdrop-filter: blur(8px);
          z-index: 2;
        }

        .dashboard-section-body {
          padding: 22px 22px 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }

        .dashboard-section-title {
          margin: 0;
          font-size: 2rem;
          font-weight: 800;
          line-height: 1.05;
        }

        .dashboard-section-description {
          margin: 0;
          color: var(--muted);
          line-height: 1.75;
          font-size: 1rem;
        }

        @media (max-width: 1024px) {
          .dashboard-top-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .dashboard-span-6,
          .dashboard-span-5,
          .dashboard-span-4,
          .dashboard-span-3 {
            grid-column: span 1;
          }

          .dashboard-stats-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .dashboard-middle-grid {
            grid-template-columns: 1fr;
          }

          .dashboard-sections-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .dashboard-top-grid {
            grid-template-columns: 1fr;
            gap: 14px;
            margin-bottom: 14px;
          }

          .dashboard-stats-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
            margin-bottom: 14px;
          }

          .dashboard-middle-grid {
            gap: 14px;
            margin-bottom: 18px;
          }

          .dashboard-sections-grid {
            gap: 14px;
            margin-top: 14px;
          }

          .dashboard-hero-card {
            min-height: auto;
          }

          .dashboard-stat-card {
            min-height: auto;
          }

          .dashboard-hero-value {
            font-size: 1.9rem;
            line-height: 1.2;
          }

          .dashboard-stat-value {
            font-size: 2rem;
            line-height: 1.15;
            word-break: break-word;
          }

          .dashboard-section-card {
            min-height: auto;
          }

          .dashboard-section-image {
            height: 140px;
          }

          .dashboard-section-body {
            padding: 18px;
          }

          .dashboard-section-title {
            font-size: 1.65rem;
          }

          .dashboard-section-description {
            font-size: 0.96rem;
            line-height: 1.6;
          }

          .dashboard-sections-title {
            font-size: 1.7rem;
          }

          .dashboard-links {
            flex-direction: column;
            align-items: stretch;
          }
        }
      `}</style>
    </section>
  );
}
