'use client';

import { useAmanah } from "@/components/amanah-provider";

const checklist = [
  "30k job or income sorted",
  "Saving £1000+ every month if applicable",
  "Accommodation sorted",
  "Driving passed",
] as const;

const supportBlocks = [
  { key: "documentsChecklist", title: "Documents checklist" },
  { key: "evidenceChecklist", title: "Evidence checklist" },
  { key: "currentBlockers", title: "Current blockers" },
  { key: "importantDeadlines", title: "Important deadlines" },
] as const;

export default function ImmigrationProgressPage() {
  const { immigrationState, toggleImmigrationChecklist, setImmigrationField, resetImmigration } =
    useAmanah();

  const completedCount = checklist.filter(
    (item) => immigrationState.checklist[item]
  ).length;

  return (
    <section className="page-shell">
      <div className="section-top">
        <div>
          <p className="section-eyebrow">Immigration Progress</p>
          <h2 className="page-title">Turn pressure into practical steps and visible movement.</h2>
          <p className="page-text">
            This section is for structure, proof, deadlines, and forward motion.
            Keep it clear, calm, and step by step.
          </p>
        </div>
      </div>

      <div className="immigration-layout">
        <div className="content-card">
          <div className="section-block-header">
            <div>
              <h3 className="content-title">Core checklist</h3>
              <p className="block-subtext">The main pillars that need to get sorted.</p>
            </div>
            <span className="stat-pill">{completedCount} / 4 complete</span>
          </div>

          <div className="habit-list">
            {checklist.map((item) => {
              const active = immigrationState.checklist[item];

              return (
                <button
                  key={item}
                  type="button"
                  className={`habit-row ${active ? "is-active" : ""}`}
                  onClick={() => toggleImmigrationChecklist(item)}
                >
                  <span className={`habit-check ${active ? "is-active" : ""}`} />
                  <span>{item}</span>
                </button>
              );
            })}
          </div>

          <div className="section-actions">
            <button type="button" className="secondary-btn" onClick={resetImmigration}>
              Reset section
            </button>
          </div>
        </div>

        <div className="immigration-two-col">
          <div className="immigration-main">
            <div className="content-card">
              <h3 className="content-title">Next action step</h3>
              <textarea
                className="journal-textarea small"
                placeholder="What is the next practical move? One step only."
                value={immigrationState.nextActionStep}
                onChange={(e) => setImmigrationField("nextActionStep", e.target.value)}
              />
            </div>

            <div className="content-card">
              <h3 className="content-title">Progress notes</h3>
              <textarea
                className="journal-textarea"
                placeholder="Write updates, research notes, conversations, or anything that moves the process forward."
                value={immigrationState.progressNotes}
                onChange={(e) => setImmigrationField("progressNotes", e.target.value)}
              />
            </div>
          </div>

          <div className="immigration-side">
            {supportBlocks.map((item) => (
              <div key={item.key} className="content-card">
                <h3 className="content-title">{item.title}</h3>
                <textarea
                  className="journal-textarea small"
                  placeholder={`Write notes for: ${item.title}`}
                  value={immigrationState[item.key]}
                  onChange={(e) =>
                    setImmigrationField(item.key, e.target.value)
                  }
                />
              </div>
            ))}

            <div className="content-card">
              <h3 className="content-title">Current focus</h3>
              <div className="mini-note-box">
                Keep the process visible, documented, and moving one action at a time.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
