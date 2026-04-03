'use client';

import { useAmanah } from "@/components/amanah-provider";

const jummahItems = [
  "Ghusl completed",
  "Read Surah Al-Kahf",
  "Send salawat",
  "Make du’a",
  "Attend Jummah",
  "Wear clean clothes / itr",
  "Give sadaqah",
] as const;

export default function JummahPage() {
  const {
    todayKey,
    jummahState,
    toggleJummahChecklist,
    setJummahField,
    resetJummah,
  } = useAmanah();

  const today = new Date();
  const isFriday = today.getDay() === 5;

  const completedCount = jummahItems.filter(
    (item) => jummahState.checklist[item]
  ).length;

  if (!isFriday) {
    return (
      <section className="page-shell">
        <div className="section-top">
          <div>
            <p className="section-eyebrow">Jummah</p>
            <h2 className="page-title">This section becomes active on Fridays.</h2>
            <p className="page-text">
              Come back on Friday to use your Jummah checklist and reflection space.
            </p>
          </div>
        </div>

        <div className="content-card">
          <div className="mini-note-box">
            Today is not Friday, so the Jummah page is resting for now.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-shell">
      <div className="section-top">
        <div>
          <p className="section-eyebrow">Jummah</p>
          <h2 className="page-title">Protect your Friday properly.</h2>
          <p className="page-text">
            A focused Friday checklist for worship, presence, preparation, and reflection.
          </p>
        </div>
      </div>

      <div className="content-card">
        <div className="section-block-header">
          <div>
            <h3 className="content-title">Friday checklist</h3>
            <p className="block-subtext">A simple way to honour the day well.</p>
          </div>
          <span className="stat-pill">{completedCount} / 7 complete</span>
        </div>

        <div className="daily-save-note">
          Saved for: <strong>{todayKey}</strong>
        </div>

        <div className="habit-list">
          {jummahItems.map((item) => {
            const active = jummahState.checklist[item];

            return (
              <button
                key={item}
                type="button"
                className={`habit-row ${active ? "is-active" : ""}`}
                onClick={() => toggleJummahChecklist(item)}
              >
                <span className={`habit-check ${active ? "is-active" : ""}`} />
                <span>{item}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="journal-grid">
        <div className="content-card">
          <h3 className="content-title">Khutbah reflection</h3>
          <textarea
            className="journal-textarea"
            placeholder="What stood out to you from the khutbah today?"
            value={jummahState.khutbahReflection}
            onChange={(e) => setJummahField("khutbahReflection", e.target.value)}
          />
        </div>

        <div className="content-card">
          <h3 className="content-title">Jummah notes</h3>
          <textarea
            className="journal-textarea"
            placeholder="Write reminders, du’as, or things you want to carry into the week."
            value={jummahState.jummahNotes}
            onChange={(e) => setJummahField("jummahNotes", e.target.value)}
          />
        </div>
      </div>

      <div className="content-card">
        <div className="section-actions">
          <button type="button" className="secondary-btn" onClick={resetJummah}>
            Reset Jummah
          </button>
        </div>
      </div>
    </section>
  );
}
