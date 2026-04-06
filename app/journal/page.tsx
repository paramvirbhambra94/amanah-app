'use client';

import Link from "next/link";
import { useMemo, useState } from "react";
import { useAmanah } from "@/components/amanah-provider";

type RelationshipInsight = {
  pulse: string;
  summary: string;
  nextStep: string;
};

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

  const combinedText = [
    main,
    feeling,
    offTrack,
    grateful,
    needAllah,
    appreciationNote,
    supportNote,
    relationshipNotes,
    futurePlanning,
  ]
    .join(" ")
    .toLowerCase();

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
    "argument",
    "clash",
    "frustrated",
    "overwhelmed",
    "drained",
  ];

  const repairWords = [
    "sorry",
    "repair",
    "soft",
    "reassure",
    "reassured",
    "understand",
    "listen",
    "calm",
    "gentle",
    "gentleness",
    "apologise",
    "apologize",
  ];

  const positiveWords = [
    "grateful",
    "love",
    "appreciate",
    "appreciation",
    "support",
    "kind",
    "peace",
    "calm",
    "warm",
    "good",
    "better",
    "close",
    "together",
  ];

  const heavyScore = heavyWords.filter((word) =>
    combinedText.includes(word)
  ).length;

  const repairScore = repairWords.filter((word) =>
    combinedText.includes(word)
  ).length;

  const positiveScore = positiveWords.filter((word) =>
    combinedText.includes(word)
  ).length;

  const hasOffTrack = offTrack.trim().length > 0;
  const hasRelationshipTension = relationshipNotes.trim().length > 0;
  const hasCareSignals =
    wifeChecklistCount >= 2 ||
    appreciationNote.trim().length > 0 ||
    supportNote.trim().length > 0;
  const hasFutureIntent = futurePlanning.trim().length > 0;

  if ((heavyScore >= 2 || hasOffTrack) && hasRelationshipTension && !hasCareSignals) {
    return {
      pulse: "Tense day",
      summary:
        "Today seems emotionally heavy and that strain may have spilled into the marriage dynamic. Your heart may have been trying to protect what matters, but the day reads as more pressured than connected.",
      nextStep:
        "Lead tomorrow with reassurance before correction. Ask her side calmly, listen fully, and then explain your concern without repeating it harshly.",
    };
  }

  if ((heavyScore >= 1 || hasOffTrack) && hasCareSignals) {
    return {
      pulse: "Repair day",
      summary:
        "Today carried strain, but there are still clear signs of care in how you showed up. That means the relationship is not just sitting in tension — it still has room for softness, repair, and understanding.",
      nextStep:
        "Do not reopen the issue with force. Start with warmth, affirm the relationship, and then move into clarity only after she feels emotionally safe.",
    };
  }

  if (hasCareSignals && positiveScore >= 2 && !hasRelationshipTension) {
    return {
      pulse: "Connected day",
      summary:
        "Today shows effort, care, and relational presence. The emotional tone feels more supportive than defensive, which is a good sign for the marriage dynamic.",
      nextStep:
        "Build on the warmth. Keep appreciation visible tomorrow and stay intentional with small acts of reassurance and emotional presence.",
    };
  }

  if (hasFutureIntent && hasCareSignals) {
    return {
      pulse: "Forward-looking day",
      summary:
        "Even if the day was not perfect, there are signs that you still want to move the relationship forward with intention. That matters because direction often matters as much as mood.",
      nextStep:
        "Keep tomorrow practical and calm. Focus on one meaningful action that helps your wife feel seen, not just managed.",
    };
  }

  if (heavyScore >= 2) {
    return {
      pulse: "Emotionally heavy day",
      summary:
        "Your journal reads like the day carried emotional pressure, and that can shape how your words land in marriage. The issue may not only be what you meant, but how the weight inside you came through.",
      nextStep:
        "Slow the tone tomorrow. Speak after grounding yourself, and make emotional safety your first goal before discussing anything sensitive.",
    };
  }

  if (hasCareSignals) {
    return {
      pulse: "Steady day",
      summary:
        "There are healthy signs of care and relational effort today. Even if nothing dramatic happened, the small signals of support and attention still strengthen the marriage.",
      nextStep:
        "Keep consistency over intensity. A calm, caring follow-up tomorrow will do more good than a big emotional conversation.",
    };
  }

  return {
    pulse: "Mixed day",
    summary:
      "Today feels mixed — there is emotional movement, but not total clarity yet. Some of the day points to strain, while other parts show intention and concern.",
    nextStep:
      "Use tomorrow to bring clarity with gentleness. Ask one honest question, listen properly, and keep the conversation anchored in care.",
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
            Your relationship insight below will combine this with Wife Connection so the reflection
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
