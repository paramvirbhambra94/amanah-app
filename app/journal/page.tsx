'use client';

import Link from "next/link";
import { useState } from "react";
import { useAmanah } from "@/components/amanah-provider";

export default function JournalPage() {
  const {
    journalDraft,
    journalEntries,
    setJournalField,
    clearJournalDraft,
    saveJournalEntry,
  } = useAmanah();

  const [saveMessage, setSaveMessage] = useState("");

  async function handleSave() {
    const saved = await saveJournalEntry();
    setSaveMessage(saved ? "Journal entry saved to cloud." : "Write something before saving.");

    window.setTimeout(() => {
      setSaveMessage("");
    }, 2000);
  }

  return (
    <section className="page-shell">
      <div className="section-top">
        <div>
          <p className="section-eyebrow">Journal</p>
          <h2 className="page-title">Reflect honestly. Return clearly.</h2>
          <p className="page-text">
            This is your daily space to process your thoughts, name your
            struggles, remember your blessings, and reset your direction.
          </p>
        </div>
      </div>

      <div className="journal-layout">
        <div className="journal-main">
          <div className="content-card">
            <h3 className="content-title">Today&apos;s journal entry</h3>
            <p className="field-label">Write freely</p>
            <textarea
              className="journal-textarea"
              placeholder="Be honest. What happened today? What did you feel? Where did you do well? Where did you slip? What needs to change tomorrow?"
              value={journalDraft.main}
              onChange={(e) => setJournalField("main", e.target.value)}
            />
          </div>

          <div className="journal-prompts-grid">
            <div className="content-card">
              <h3 className="content-title">How do I feel today?</h3>
              <textarea
                className="journal-textarea small"
                placeholder="Name your state honestly."
                value={journalDraft.feeling}
                onChange={(e) => setJournalField("feeling", e.target.value)}
              />
            </div>

            <div className="content-card">
              <h3 className="content-title">What pulled me off track?</h3>
              <textarea
                className="journal-textarea small"
                placeholder="Triggers, distractions, mistakes, pressure..."
                value={journalDraft.offTrack}
                onChange={(e) => setJournalField("offTrack", e.target.value)}
              />
            </div>

            <div className="content-card">
              <h3 className="content-title">What am I grateful for?</h3>
              <textarea
                className="journal-textarea small"
                placeholder="Write the blessings you do not want to overlook."
                value={journalDraft.grateful}
                onChange={(e) => setJournalField("grateful", e.target.value)}
              />
            </div>

            <div className="content-card">
              <h3 className="content-title">What do I need from Allah today?</h3>
              <textarea
                className="journal-textarea small"
                placeholder="Guidance, strength, patience, forgiveness, rizq..."
                value={journalDraft.needAllah}
                onChange={(e) => setJournalField("needAllah", e.target.value)}
              />
            </div>
          </div>

          <div className="journal-actions">
            <button type="button" className="primary-btn" onClick={handleSave}>
              Save entry
            </button>
            <button type="button" className="secondary-btn" onClick={clearJournalDraft}>
              Clear
            </button>
          </div>

          {saveMessage ? <p className="save-message">{saveMessage}</p> : null}
        </div>

        <aside className="journal-side">
          <div className="content-card">
            <h3 className="content-title">Journal guidance</h3>
            <ul className="prompt-list">
              <li>Be truthful, not dramatic.</li>
              <li>Name the real issue, not just the symptom.</li>
              <li>Write one lesson, not just frustration.</li>
              <li>End with a direction for tomorrow.</li>
            </ul>
          </div>

          <div className="content-card">
            <h3 className="content-title">Suggested tags</h3>
            <div className="tag-list">
              <span className="tag-chip">Gratitude</span>
              <span className="tag-chip">Marriage</span>
              <span className="tag-chip">Struggle</span>
              <span className="tag-chip">Triggers</span>
              <span className="tag-chip">Deen</span>
              <span className="tag-chip">Goals</span>
            </div>
          </div>

          <div className="content-card">
            <div className="section-block-header">
              <div>
                <h3 className="content-title">Recent entries</h3>
                <p className="block-subtext">
                  Open your journal history folder and view past entries properly.
                </p>
              </div>
              <span className="stat-pill">{journalEntries.length} saved</span>
            </div>

            <Link href="/journal/history" className="history-folder-card">
              <div className="history-folder-icon">📁</div>
              <div>
                <p className="history-folder-title">Open Journal History</p>
                <p className="history-folder-text">
                  View all saved entries and open them one by one.
                </p>
              </div>
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
