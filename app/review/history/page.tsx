'use client';

import Link from "next/link";
import { useMemo, useState } from "react";
import { useAmanah } from "@/components/amanah-provider";

function formatDate(dateKey: string) {
  const d = new Date(`${dateKey}T00:00:00`);
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function ReviewHistoryPage() {
  const {
    todayKey,
    journalEntries,
    dailyProgress,
    highRiskMap,
    wifeConnectionMap,
    fitnessMap,
  } = useAmanah();

  const [openDate, setOpenDate] = useState<string | null>(null);

  const historyDates = useMemo(() => {
    const dateSet = new Set<string>();

    Object.keys(dailyProgress).forEach((date) => dateSet.add(date));
    Object.keys(highRiskMap).forEach((date) => dateSet.add(date));
    Object.keys(wifeConnectionMap).forEach((date) => dateSet.add(date));
    Object.keys(fitnessMap).forEach((date) => dateSet.add(date));
    journalEntries.forEach((entry) => {
      if (entry.createdDateKey) dateSet.add(entry.createdDateKey);
    });

    return Array.from(dateSet).sort((a, b) => b.localeCompare(a));
  }, [dailyProgress, highRiskMap, wifeConnectionMap, fitnessMap, journalEntries]);

  function toggleDay(dateKey: string) {
    setOpenDate((prev) => (prev === dateKey ? null : dateKey));
  }

  return (
    <section className="page-shell">
      <div className="section-top">
        <div className="history-page-top">
          <div>
            <p className="section-eyebrow">Review History</p>
            <h2 className="page-title">Your saved daily progress</h2>
            <p className="page-text">
              Open any saved day and review what actually happened across your tracked sections.
            </p>
          </div>

          <Link href="/review" className="secondary-btn history-back-btn">
            Back to Review
          </Link>
        </div>
      </div>

      <div className="content-card">
        <div className="section-block-header">
          <div>
            <h3 className="content-title">Saved days</h3>
            <p className="block-subtext">
              Click a day to open or hide the full daily progress record.
            </p>
          </div>
          <span className="stat-pill">{historyDates.length} total</span>
        </div>

        {historyDates.length === 0 ? (
          <div className="mini-note-box">
            No saved review history yet.
          </div>
        ) : (
          <div className="history-entry-list">
            {historyDates.map((dateKey) => {
              const isOpen = openDate === dateKey;
              const progress = dailyProgress[dateKey];
              const wife = wifeConnectionMap[dateKey];
              const fitness = fitnessMap[dateKey];
              const risk = highRiskMap[dateKey];
              const journalCount = journalEntries.filter(
                (entry) => entry.createdDateKey === dateKey
              ).length;

              const prayers = progress
                ? Object.values(progress.prayers).filter(Boolean).length
                : 0;
              const habits = progress
                ? Object.values(progress.habits).filter(Boolean).length
                : 0;
              const wifeCount = wife
                ? Object.values(wife.checklist).filter(Boolean).length
                : 0;
              const fitnessChecks = fitness
                ? Object.values(fitness.dailyChecks).filter(Boolean).length
                : 0;
              const workouts = fitness
                ? Object.values(fitness.workouts).filter(Boolean).length
                : 0;

              return (
                <div key={dateKey} className="history-entry-card">
                  <div className="history-entry-top">
                    <button
                      type="button"
                      className="history-entry-open"
                      onClick={() => toggleDay(dateKey)}
                    >
                      <span className="history-entry-date">{formatDate(dateKey)}</span>
                      <span className="history-entry-toggle">
                        {isOpen ? "Hide day" : "Open day"}
                      </span>
                    </button>

                    <span className="history-chip">
                      {dateKey === todayKey ? "Today" : "Saved day"}
                    </span>
                  </div>

                  {isOpen ? (
                    <div className="history-entry-body">
                      <div className="history-grid">
                        <div className="history-stat">
                          <span className="history-stat-label">Prayers</span>
                          <span className="history-stat-value">{prayers} / 5</span>
                        </div>

                        <div className="history-stat">
                          <span className="history-stat-label">Habits</span>
                          <span className="history-stat-value">{habits} / 8</span>
                        </div>

                        <div className="history-stat">
                          <span className="history-stat-label">Journal entries</span>
                          <span className="history-stat-value">{journalCount}</span>
                        </div>

                        <div className="history-stat">
                          <span className="history-stat-label">Wife actions</span>
                          <span className="history-stat-value">{wifeCount} / 5</span>
                        </div>

                        <div className="history-stat">
                          <span className="history-stat-label">Fitness checks</span>
                          <span className="history-stat-value">{fitnessChecks} / 4</span>
                        </div>

                        <div className="history-stat">
                          <span className="history-stat-label">Workout marks</span>
                          <span className="history-stat-value">{workouts} / 3</span>
                        </div>

                        <div className="history-stat">
                          <span className="history-stat-label">Urge level</span>
                          <span className="history-stat-value">
                            {risk?.urgeLevel ? `Level ${risk.urgeLevel}` : "Not set"}
                          </span>
                        </div>

                        <div className="history-stat">
                          <span className="history-stat-label">Emergency mode</span>
                          <span className="history-stat-value">
                            {risk?.emergencyMode ? "Used" : "Off"}
                          </span>
                        </div>
                      </div>

                      {risk?.pulledTowardWeakness ? (
                        <div className="history-entry-section">
                          <p className="history-entry-label">Pulled toward weakness</p>
                          <p className="entry-meta">{risk.pulledTowardWeakness}</p>
                        </div>
                      ) : null}

                      {risk?.patternNotes ? (
                        <div className="history-entry-section">
                          <p className="history-entry-label">Pattern notes</p>
                          <p className="entry-meta">{risk.patternNotes}</p>
                        </div>
                      ) : null}

                      {wife?.relationshipNotes ? (
                        <div className="history-entry-section">
                          <p className="history-entry-label">Relationship notes</p>
                          <p className="entry-meta">{wife.relationshipNotes}</p>
                        </div>
                      ) : null}

                      {fitness?.progressLog ? (
                        <div className="history-entry-section">
                          <p className="history-entry-label">Fitness progress log</p>
                          <p className="entry-meta">{fitness.progressLog}</p>
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <p className="entry-preview history-preview-line">
                      {prayers}/5 prayers • {habits}/8 habits • {journalCount} journal
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
