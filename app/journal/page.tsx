'use client';

import Link from "next/link";
import { useMemo, useState } from "react";
import { useAmanah } from "@/components/amanah-provider";

type RelationshipInsight = {
  pulse: string;
  summary: string;
  nextStep: string;
};

function countMatches(text: string, words: string[]) {
  return words.reduce((count, word) => {
    return text.includes(word) ? count + 1 : count;
  }, 0);
}

function buildRelationshipInsight(args: {
  main: string;
  feeling: string;
  offTrack: string;
  grateful: string;
  needAllah: string;
  wifeChecklistCount: number;
  appreciationNote: string;
  supportNote: string;
  relationshipNotes: string;
  futurePlanning: string;
}): RelationshipInsight | null {
  const {
    main,
    feeling,
    offTrack,
    grateful,
    needAllah,
    wifeChecklistCount,
    appreciationNote,
    supportNote,
    relationshipNotes,
    futurePlanning,
  } = args;

  const journalText = [main, feeling, offTrack, grateful, needAllah]
    .join(" ")
    .toLowerCase();

  const wifeText = [
    appreciationNote,
    supportNote,
    relationshipNotes,
    futurePlanning,
  ]
    .join(" ")
    .toLowerCase();

  const combinedText = `${journalText} ${wifeText}`.trim();

  const hasMeaningfulJournal =
    [main, feeling, offTrack, grateful, needAllah].join("").trim().length > 0;

  const hasMeaningfulWifeData =
    wifeChecklistCount > 0 ||
    appreciationNote.trim().length > 0 ||
    supportNote.trim().length > 0 ||
    relationshipNotes.trim().length > 0 ||
    futurePlanning.trim().length > 0;

  if (!hasMeaningfulJournal && !hasMeaningfulWifeData) {
    return null;
  }

  const heavyWords = [
    "anxious",
    "anxiety",
    "stress",
    "stressed",
    "heavy",
    "hurt",
    "upset",
    "angry",
    "fear",
    "afraid",
    "tense",
    "drained",
    "overwhelmed",
    "pressure",
    "panic",
    "frustrated",
    "frustration",
    "sad",
    "worry",
    "worried",
    "shaken",
  ];

  const conflictWords = [
    "clash",
    "argument",
    "argued",
    "fight",
    "issue",
    "problem",
    "disagree",
    "disagreed",
    "boundary",
    "boundaries",
    "not comfortable",
    "uncomfortable",
    "misunderstood",
    "wouldn't understand",
    "wouldnt understand",
    "she doesn't understand",
    "she doesnt understand",
    "defensive",
    "control",
    "forcing",
    "restriction",
    "restrict",
    "respect",
    "disrespect",
    "tension",
    "friction",
  ];

  const repairWords = [
    "reassure",
    "reassured",
    "soft",
    "softness",
    "gentle",
    "gently",
    "listen",
    "understand",
    "understood",
    "calm",
    "calmly",
    "repair",
    "peace",
    "sorry",
    "apologise",
    "apologize",
    "promise",
    "together",
    "make it possible",
    "tomorrow",
  ];

  const positiveWords = [
    "grateful",
    "love",
    "appreciate",
    "appreciation",
    "support",
    "kind",
    "warm",
    "care",
    "caring",
    "close",
    "peaceful",
    "team",
    "gentleness",
    "connection",
  ];

  const spiritualNeedWords = [
    "allah",
    "guidance",
    "patience",
    "sabr",
    "calm",
    "softness",
    "strength",
    "help",
    "mercy",
    "forgiveness",
  ];

  const heavyScore = countMatches(combinedText, heavyWords);
  const conflictScore = countMatches(combinedText, conflictWords);
  const repairScore = countMatches(combinedText, repairWords);
  const positiveScore = countMatches(combinedText, positiveWords);
  const spiritualNeedScore = countMatches(combinedText, spiritualNeedWords);

  const hasOffTrack = offTrack.trim().length > 0;
  const hasRelationshipNotes = relationshipNotes.trim().length > 0;
  const hasFutureIntent = futurePlanning.trim().length > 0;
  const hasAppreciation = appreciationNote.trim().length > 0;
  const hasSupport = supportNote.trim().length > 0;

  const careSignalScore =
    wifeChecklistCount +
    (hasAppreciation ? 1 : 0) +
    (hasSupport ? 1 : 0) +
    (hasFutureIntent ? 1 : 0);

  const hasStrongTension =
    heavyScore >= 2 ||
    conflictScore >= 2 ||
    (hasOffTrack && (heavyScore >= 1 || conflictScore >= 1));

  const hasMixedSignals =
    hasStrongTension && careSignalScore >= 2;

  const hasLowRelationalCare = careSignalScore <= 1;

  if (hasStrongTension && hasLowRelationalCare) {
    return {
      pulse: "Tense day",
      summary:
        "Today reads as emotionally strained, and that strain seems to have affected the relationship dynamic. There are signs of pressure, discomfort, or misunderstanding, without enough softness in the day to fully steady it.",
      nextStep:
        "Do not go in tomorrow trying to win the point. Start by lowering the emotional temperature, acknowledge the weight of the conversation, and then speak with calm clarity.",
    };
  }

  if (hasMixedSignals) {
    return {
      pulse: "Repair day",
      summary:
        "Today seems to have carried both care and tension. There are real signs of effort in the relationship, but also enough emotional strain to show that something important did not land cleanly between you both.",
      nextStep:
        "Lead tomorrow with reassurance first. Let her feel heard before you restate your position, so the relationship feels protected while the boundary stays clear.",
    };
  }

  if (conflictScore >= 1 && repairScore >= 1) {
    return {
      pulse: "Mixed day",
      summary:
        "There was friction in the relationship today, but also signs that you still wanted to handle it with care. That means the day was not simply bad — it was a day that needs wisdom and follow-through.",
      nextStep:
        "Keep tomorrow gentle and deliberate. Revisit the issue only after connection is rebuilt, and make understanding the first step before resolution.",
    };
  }

  if (heavyScore >= 2 && spiritualNeedScore >= 1) {
    return {
      pulse: "Emotionally heavy day",
      summary:
        "Today feels emotionally weighty. Your reflections suggest that inner pressure may have shaped how you carried yourself in the relationship, even if your intentions were sincere.",
      nextStep:
        "Ground yourself before the next conversation. Ask Allah for calm and patience, then speak from steadiness rather than from inner pressure.",
    };
  }

  if (careSignalScore >= 3 && positiveScore >= 2 && conflictScore === 0 && heavyScore === 0) {
    return {
      pulse: "Connected day",
      summary:
        "Today shows healthy relational effort. There are clear signs of care, support, and emotional attention, which strengthens trust even when the day itself is ordinary.",
      nextStep:
        "Build on the warmth. Keep your care visible tomorrow through one small act of reassurance or appreciation rather than waiting for a big moment.",
    };
  }

  if (hasFutureIntent && careSignalScore >= 2) {
    return {
      pulse: "Forward-looking day",
      summary:
        "Even if today was not emotionally perfect, the relationship still shows intention. There are signs that you want to move things forward with care rather than leave them stuck.",
      nextStep:
        "Keep the next step simple and relational. Show her that your direction is not just about rules, but about building something good together.",
    };
  }

  if (careSignalScore >= 2 && heavyScore === 0 && conflictScore === 0) {
    return {
      pulse: "Steady day",
      summary:
        "There are healthy signs of care and relational effort today. Even without a major emotional breakthrough, the small signals of support and attention still strengthen the marriage.",
      nextStep:
        "Keep consistency over intensity. A calm, caring follow-up tomorrow will do more good than a big emotional conversation.",
    };
  }

  return {
    pulse: "Mixed day",
    summary:
      "Today carries a blend of effort, emotion, and incomplete clarity. The relationship does not read as disconnected, but it does seem to need a little more wisdom, softness, and follow-through.",
    nextStep:
      "Approach tomorrow with warmth and intention. Focus on understanding first, then bring clarity in a way that protects both the boundary and the bond.",
  };
}

export default function JournalPage() {
  const {
    todayKey,
    journalDraft,
    wifeConnectionState,
    setJournalField,
    clearJournalDraft,
    saveJournalEntry,
  } = useAmanah();

  const [saveMessage, setSaveMessage] = useState("");

  const wifeChecklistCount = Object.values(wifeConnectionState.checklist).filter(Boolean).length;

  const relationshipInsight = useMemo(
    () =>
      buildRelationshipInsight({
        main: journalDraft.main,
        feeling: journalDraft.feeling,
        offTrack: journalDraft.offTrack,
        grateful: journalDraft.grateful,
        needAllah: journalDraft.needAllah,
        wifeChecklistCount,
        appreciationNote: wifeConnectionState.appreciationNote,
        supportNote: wifeConnectionState.supportNote,
        relationshipNotes: wifeConnectionState.relationshipNotes,
        futurePlanning: wifeConnectionState.futurePlanning,
      }),
    [journalDraft, wifeChecklistCount, wifeConnectionState]
  );

  async function handleSave() {
    const success = await saveJournalEntry();

    if (success) {
      setSaveMessage("Journal entry saved.");
      setTimeout(() => setSaveMessage(""), 2500);
      return;
    }

    setSaveMessage("Write something first before saving.");
    setTimeout(() => setSaveMessage(""), 2500);
  }

  return (
    <section className="page-shell">
      <div className="section-top">
        <div>
          <p className="section-eyebrow">Journal</p>
          <h2 className="page-title">Tell the truth about the day, then leave with direction.</h2>
          <p className="page-text">
            Use this space to unload what happened, what you felt, and what you need from Allah.
            Your relationship insight below combines Journal and Wife Connection so the reflection
            becomes practical.
          </p>
        </div>
      </div>

      <div className="content-card">
        <div className="section-block-header">
          <div>
            <h3 className="content-title">Today’s entry</h3>
            <p className="block-subtext">Saved for: {todayKey}</p>
          </div>
          <Link href="/journal/history" className="secondary-btn">
            Recent entries
          </Link>
        </div>

        <div className="journal-stack">
          <div>
            <label className="journal-label">What happened today?</label>
            <textarea
              className="journal-textarea"
              placeholder="What happened? What is sitting heavy on your chest?"
              value={journalDraft.main}
              onChange={(e) => setJournalField("main", e.target.value)}
            />
          </div>

          <div className="journal-grid">
            <div>
              <label className="journal-label">How do you feel right now?</label>
              <textarea
                className="journal-textarea small"
                placeholder="Anxious, calm, frustrated, hopeful, tired..."
                value={journalDraft.feeling}
                onChange={(e) => setJournalField("feeling", e.target.value)}
              />
            </div>

            <div>
              <label className="journal-label">Where did you go off-track?</label>
              <textarea
                className="journal-textarea small"
                placeholder="Be honest without beating yourself up."
                value={journalDraft.offTrack}
                onChange={(e) => setJournalField("offTrack", e.target.value)}
              />
            </div>
          </div>

          <div className="journal-grid">
            <div>
              <label className="journal-label">What are you grateful for?</label>
              <textarea
                className="journal-textarea small"
                placeholder="What mercy, blessing, or kindness showed up today?"
                value={journalDraft.grateful}
                onChange={(e) => setJournalField("grateful", e.target.value)}
              />
            </div>

            <div>
              <label className="journal-label">What do you need from Allah right now?</label>
              <textarea
                className="journal-textarea small"
                placeholder="Guidance, calm, protection, firmness, softness..."
                value={journalDraft.needAllah}
                onChange={(e) => setJournalField("needAllah", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="section-actions" style={{ marginTop: 20 }}>
          <button type="button" className="primary-btn" onClick={handleSave}>
            Save entry
          </button>
          <button type="button" className="secondary-btn" onClick={clearJournalDraft}>
            Clear draft
          </button>
        </div>

        {saveMessage ? (
          <div className="mini-note-box" style={{ marginTop: 16 }}>
            {saveMessage}
          </div>
        ) : null}
      </div>

      <div className="content-card">
        <div className="section-block-header">
          <div>
            <h3 className="content-title">Relationship insight</h3>
            <p className="block-subtext">
              Built from today’s Journal + Wife Connection entries.
            </p>
          </div>
          <span className="stat-pill">{wifeChecklistCount} wife actions today</span>
        </div>

        {relationshipInsight ? (
          <div className="journal-stack">
            <div className="mini-note-box">
              <strong>Relationship pulse:</strong> {relationshipInsight.pulse}
            </div>

            <div className="content-card" style={{ padding: 18 }}>
              <p className="journal-label" style={{ marginBottom: 8 }}>
                What today revealed
              </p>
              <p className="page-text" style={{ margin: 0 }}>
                {relationshipInsight.summary}
              </p>
            </div>

            <div className="content-card" style={{ padding: 18 }}>
              <p className="journal-label" style={{ marginBottom: 8 }}>
                Suggested way forward
              </p>
              <p className="page-text" style={{ margin: 0 }}>
                {relationshipInsight.nextStep}
              </p>
            </div>
          </div>
        ) : (
          <div className="mini-note-box">
            Write in Journal and add something in Wife Connection to generate your relationship insight.
          </div>
        )}
      </div>
    </section>
  );
}
