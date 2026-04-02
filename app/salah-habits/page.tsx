'use client';

import { useAmanah } from "@/components/amanah-provider";

const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;
const habits = [
  "Quran",
  "Dhikr",
  "Tahajjud prep",
  "Lower gaze / no private scrolling",
  "Focused work block",
  "Daily du’a",
  "Returned quickly after slip",
  "Sleep on time",
] as const;

export default function SalahHabitsPage() {
  const {
    todayKey,
    salahState,
    habitsState,
    togglePrayer,
    toggleHabit,
    resetSalahAndHabits,
  } = useAmanah();

  const completedPrayers = prayers.filter((prayer) => salahState[prayer]).length;
  const completedHabits = habits.filter((habit) => habitsState[habit]).length;

  return (
    <section className="page-shell">
      <div className="section-top">
        <div>
          <p className="section-eyebrow">Salah & Habits</p>
          <h2 className="page-title">Build consistency through prayer and daily discipline.</h2>
          <p className="page-text">
            This section is for your core structure: salah first, then the habits
            that protect your day and keep your heart steady.
          </p>
        </div>
      </div>

      <div className="sh-layout">
        <div className="content-card">
          <div className="section-block-header">
            <div>
              <h3 className="content-title">Today’s salah</h3>
              <p className="block-subtext">Mark each prayer as you complete it.</p>
            </div>
            <span className="stat-pill">{completedPrayers} / 5 complete</span>
          </div>

          <div className="daily-save-note">
            Saved for: <strong>{todayKey}</strong>
          </div>

          <div className="prayer-grid">
            {prayers.map((prayer) => {
              const completed = salahState[prayer];

              return (
                <button
                  key={prayer}
                  type="button"
                  className={`tracker-card ${completed ? "is-active" : ""}`}
                  onClick={() => togglePrayer(prayer)}
                >
                  <span className="tracker-title">{prayer}</span>
                  <span className="tracker-sub">
                    {completed ? "Completed" : "Not marked yet"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="sh-two-col">
          <div className="content-card">
            <div className="section-block-header">
              <div>
                <h3 className="content-title">Daily habits</h3>
                <p className="block-subtext">Quiet wins that keep you steady.</p>
              </div>
              <span className="stat-pill">{completedHabits} / 8 complete</span>
            </div>

            <div className="habit-list">
              {habits.map((habit) => {
                const completed = habitsState[habit];

                return (
                  <button
                    key={habit}
                    type="button"
                    className={`habit-row ${completed ? "is-active" : ""}`}
                    onClick={() => toggleHabit(habit)}
                  >
                    <span className={`habit-check ${completed ? "is-active" : ""}`} />
                    <span>{habit}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="sh-side">
            <div className="content-card">
              <h3 className="content-title">Today’s focus</h3>
              <div className="mini-note-box">
                Pray on time, read a little Qur’an, and protect your eyes.
              </div>
            </div>

            <div className="content-card">
              <h3 className="content-title">Quick reflection</h3>
              <ul className="prompt-list">
                <li>Did I pray with presence or rush?</li>
                <li>Did I protect my eyes today?</li>
                <li>Did I return quickly after weakness?</li>
                <li>What one habit needs more attention?</li>
              </ul>
            </div>

            <div className="content-card">
              <h3 className="content-title">Progress snapshot</h3>
              <div className="snapshot-grid">
                <div className="snapshot-card">
                  <p className="snapshot-label">Prayers</p>
                  <p className="snapshot-value">{completedPrayers} / 5</p>
                </div>
                <div className="snapshot-card">
                  <p className="snapshot-label">Habits</p>
                  <p className="snapshot-value">{completedHabits} / 8</p>
                </div>
              </div>

              <div className="section-actions">
                <button type="button" className="secondary-btn" onClick={resetSalahAndHabits}>
                  Reset today
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
