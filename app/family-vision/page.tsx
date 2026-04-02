'use client';

import { useAmanah } from "@/components/amanah-provider";

const visionBlocks = [
  { key: "husbandIdentity", title: "The husband I want to become" },
  { key: "homeVision", title: "The kind of home we want" },
  { key: "familyValues", title: "Family values" },
  { key: "barakahInHome", title: "Barakah in the home" },
  { key: "futureChildrenHopes", title: "Future children hopes" },
  { key: "financialStabilityVision", title: "Financial stability vision" },
] as const;

export default function FamilyVisionPage() {
  const { familyVisionState, setFamilyVisionField, resetFamilyVision } = useAmanah();

  return (
    <section className="page-shell">
      <div className="section-top">
        <div>
          <p className="section-eyebrow">Family Vision</p>
          <h2 className="page-title">Keep the future visible so the present has direction.</h2>
          <p className="page-text">
            This section holds the home, family culture, values, and long-term
            direction you are trying to build with intention.
          </p>
        </div>
      </div>

      <div className="family-layout">
        <div className="family-grid">
          {visionBlocks.map((item) => (
            <div key={item.key} className="content-card">
              <h3 className="content-title">{item.title}</h3>
              <textarea
                className="journal-textarea small"
                placeholder={`Write your thoughts for: ${item.title}`}
                value={familyVisionState[item.key]}
                onChange={(e) => setFamilyVisionField(item.key, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="family-two-col">
          <div className="content-card">
            <h3 className="content-title">Short-term family goals</h3>
            <textarea
              className="journal-textarea"
              placeholder="What matters over the next few months? Stability, routine, communication, finances, immigration, emotional connection..."
              value={familyVisionState.shortTermGoals}
              onChange={(e) => setFamilyVisionField("shortTermGoals", e.target.value)}
            />
          </div>

          <div className="content-card">
            <h3 className="content-title">Long-term family dream</h3>
            <textarea
              className="journal-textarea"
              placeholder="Describe the kind of family life, peace, structure, deen, and environment you want to build long term."
              value={familyVisionState.longTermDream}
              onChange={(e) => setFamilyVisionField("longTermDream", e.target.value)}
            />
          </div>
        </div>

        <div className="content-card">
          <h3 className="content-title">Family mission statement</h3>
          <textarea
            className="journal-textarea"
            placeholder="Write a clear statement for what your family stands for, how your home should feel, and what kind of leadership you want to bring."
            value={familyVisionState.missionStatement}
            onChange={(e) => setFamilyVisionField("missionStatement", e.target.value)}
          />
        </div>

        <div className="family-two-col">
          <div className="content-card">
            <h3 className="content-title">Reflection prompts</h3>
            <ul className="prompt-list">
              <li>What kind of husband do I want my wife to experience?</li>
              <li>What habits do I want in our home?</li>
              <li>What should never define our family culture?</li>
              <li>How do I want peace and barakah to feel in our home?</li>
            </ul>
          </div>

          <div className="content-card">
            <h3 className="content-title">Current family focus</h3>
            <div className="mini-note-box">
              Build a home rooted in deen, mercy, structure, and emotional safety.
            </div>

            <div className="section-actions">
              <button type="button" className="secondary-btn" onClick={resetFamilyVision}>
                Reset section
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
