'use client';

import Link from "next/link";
import { useState } from "react";
import { useAmanah } from "@/components/amanah-provider";

function formatEntryDate(value?: string) {
  if (!value) return "Unknown date";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-GB");
}

export default function JournalHistoryPage() {
  const { journalEntries, deleteJournalEntry } = useAmanah();
  const [openEntryId, setOpenEntryId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    await deleteJournalEntry(id);

    if (openEntryId === id) {
      setOpenEntryId(null);
    }
  }

  function handleToggle(id: string) {
    setOpenEntryId((prev) => (prev === id ? null : id));
  }

  return (
    <section className="page-shell">
      <div className="section-top">
        <div className="history-page-top">
          <div>
            <p className="section-eyebrow">Journal History</p>
            <h2 className="page-title">Your past journal entries</h2>
            <p className="page-text">
              Open previous entries, look back properly, and track your journey over time.
            </p>
          </div>

          <Link href="/journal" className="secondary-btn history-back-btn">
            Back to Journal
          </Link>
        </div>
      </div>

      <div className="content-card">
        <div className="section-block-header">
          <div>
            <h3 className="content-title">Saved entries</h3>
            <p className="block-subtext">
              Click an entry to open or hide the full details.
            </p>
          </div>
          <span className="stat-pill">{journalEntries.length} total</span>
        </div>

        {journalEntries.length === 0 ? (
          <div className="mini-note-box">
            No saved entries yet.
          </div>
        ) : (
          <div className="history-entry-list">
            {journalEntries.map((entry) => {
              const isOpen = openEntryId === entry.id;

              return (
                <div key={entry.id} className="history-entry-card">
                  <div className="history-entry-top">
                    <button
                      type="button"
                      className="history-entry-open"
                      onClick={() => handleToggle(entry.id)}
                    >
                      <span className="history-entry-date">
                        {formatEntryDate(entry.createdAt)}
                      </span>
                      <span className="history-entry-toggle">
                        {isOpen ? "Hide entry" : "Open entry"}
                      </span>
                    </button>

                    <button
                      type="button"
                      className="entry-delete-btn"
                      onClick={() => handleDelete(entry.id)}
                    >
                      Delete
                    </button>
                  </div>

                  {isOpen ? (
                    <div className="history-entry-body">
                      {entry.main ? (
                        <div className="history-entry-section">
                          <p className="history-entry-label">Main entry</p>
                          <p className="entry-preview">{entry.main}</p>
                        </div>
                      ) : null}

                      {entry.feeling ? (
                        <div className="history-entry-section">
                          <p className="history-entry-label">Feeling</p>
                          <p className="entry-meta">{entry.feeling}</p>
                        </div>
                      ) : null}

                      {entry.offTrack ? (
                        <div className="history-entry-section">
                          <p className="history-entry-label">Off track</p>
                          <p className="entry-meta">{entry.offTrack}</p>
                        </div>
                      ) : null}

                      {entry.grateful ? (
                        <div className="history-entry-section">
                          <p className="history-entry-label">Grateful</p>
                          <p className="entry-meta">{entry.grateful}</p>
                        </div>
                      ) : null}

                      {entry.needAllah ? (
                        <div className="history-entry-section">
                          <p className="history-entry-label">Need from Allah</p>
                          <p className="entry-meta">{entry.needAllah}</p>
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <p className="entry-preview history-preview-line">
                      {entry.main || "No preview available"}
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
