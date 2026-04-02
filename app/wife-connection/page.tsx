'use client';

import { useAmanah } from "@/components/amanah-provider";

const connectionItems = [
  "Daily call",
  "Make du’a for wife",
  "Support her emotionally",
  "Be loving and reassuring",
  "Ask how she is really doing",
] as const;

export default function WifeConnectionPage() {
  const {
    todayKey,
    wifeConnectionState,
    toggleWifeChecklist,
    setWifeField,
    resetWifeConnection,
  } = useAmanah();

  const completedCount = connectionItems.filter(
    (item) => wifeConnectionState.checklist[item]
  ).length;

  return (
    <section className="page-shell">
      <div className="section-top">
        <div>
          <p className="section-eyebrow">Wife Connection</p>
          <h2 className="page-title">Protect the marriage daily, not only when things feel hard.</h2>
          <p className="page-text">
            This section is for softness, reassurance, effort, and intentional care.
            The goal is not just to react to tension, but to build daily connection.
          </p>
        </div>
      </div>

      <div className="wife-layout">
        <div className="content-card">
          <div className="section-block-header">
            <div>
              <h3 className="content-title">Daily connection checklist</h3>
              <p className="block-subtext">Simple actions that protect the bond.</p>
            </div>
            <span className="stat-pill">{completedCount} / 5 complete</span>
          </div>

          <div className="daily-save-note">
            Saved for: <strong>{todayKey}</strong>
          </div>

          <div className="habit-list">
            {connectionItems.map((item) => {
              const active = wifeConnectionState.checklist[item];

              return (
                <button
                  key={item}
                  type="button"
                  className={`habit-row ${active ? "is-active" : ""}`}
                  onClick={() => toggleWifeChecklist(item)}
                >
                  <span className={`habit-check ${active ? "is-active" : ""}`} />
                  <span>{item}</span>
                </button>
              );
            })}
          </div>

          <div className="section-actions">
            <button type="button" className="secondary-btn" onClick={resetWifeConnection}>
              Reset today
            </button>
          </div>
        </div>

        <div className="wife-two-col">
          <div className="wife-main">
            <div className="content-card">
              <h3 className="content-title">One thing I appreciate about my wife</h3>
              <textarea
                className="journal-textarea small"
                placeholder="Write something sincere, specific, and grateful."
                value={wifeConnectionState.appreciationNote}
                onChange={(e) => setWifeField("appreciationNote", e.target.value)}
              />
            </div>

            <div className="content-card">
              <h3 className="content-title">How can I support her better right now?</h3>
              <textarea
                className="journal-textarea small"
                placeholder="Think emotionally, practically, spiritually, and relationally."
                value={wifeConnectionState.supportNote}
                onChange={(e) => setWifeField("supportNote", e.target.value)}
              />
            </div>

            <div className="content-card">
              <h3 className="content-title">Relationship notes</h3>
              <textarea
                className="journal-textarea small"
                placeholder="Anything important from today’s call, conversation, or emotional state."
                value={wifeConnectionState.relationshipNotes}
                onChange={(e) => setWifeField("relationshipNotes", e.target.value)}
              />
            </div>
          </div>

          <div className="wife-side">
            <div className="content-card">
              <h3 className="content-title">Speak with rahmah</h3>
              <ul className="prompt-list">
                <li>Was I patient in my tone?</li>
                <li>Did I listen properly?</li>
                <li>Did I reassure instead of reacting?</li>
                <li>Did I make her feel emotionally safe?</li>
              </ul>
            </div>

            <div className="content-card">
              <h3 className="content-title">Future conversation / planning</h3>
              <textarea
                className="journal-textarea small"
                placeholder="What do we need to talk about next? What should I prepare for?"
                value={wifeConnectionState.futurePlanning}
                onChange={(e) => setWifeField("futurePlanning", e.target.value)}
              />
            </div>

            <div className="content-card">
              <h3 className="content-title">Today’s marriage focus</h3>
              <div className="mini-note-box">
                Lead with gentleness, reassurance, and presence.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
