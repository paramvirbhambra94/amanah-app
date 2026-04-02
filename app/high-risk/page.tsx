'use client';

import { useAmanah } from "@/components/amanah-provider";

const triggers = [
  "Loneliness",
  "Late-night scrolling",
  "Boredom",
  "Stress",
  "Tiredness",
  "Isolation",
] as const;

const emergencyActions = [
  "Leave the room",
  "Make wudu",
  "Put the phone away",
  "Read Qur’an",
  "Walk for 10 minutes",
  "Message or call wife",
];

export default function HighRiskPage() {
  const {
    highRiskState,
    setUrgeLevel,
    toggleTrigger,
    toggleEmergencyMode,
    setHighRiskField,
    resetHighRisk,
  } = useAmanah();

  return (
    <section className="page-shell">
      <div className="section-top">
        <div>
          <p className="section-eyebrow">High-Risk</p>
          <h2 className="page-title">Catch the pattern early and protect yourself properly.</h2>
          <p className="page-text">
            This section is for awareness, interruption, and return. No shame spiral.
            Just honesty, protection, and action.
          </p>
        </div>
      </div>

      <div className="risk-layout">
        <div className="content-card">
          <div className="section-block-header">
            <div>
              <h3 className="content-title">Current urge level</h3>
              <p className="block-subtext">Name it early before it gets stronger.</p>
            </div>
            <span className="stat-pill">
              {highRiskState.urgeLevel ? `Level ${highRiskState.urgeLevel}` : "Not set"}
            </span>
          </div>

          <div className="urge-scale">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                type="button"
                className={`urge-btn ${highRiskState.urgeLevel === level ? "is-active" : ""}`}
                onClick={() => setUrgeLevel(level)}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="risk-two-col">
          <div className="risk-main">
            <div className="content-card">
              <div className="section-block-header">
                <div>
                  <h3 className="content-title">Main triggers</h3>
                  <p className="block-subtext">Know the doors before they open.</p>
                </div>
              </div>

              <div className="trigger-grid">
                {triggers.map((trigger) => {
                  const active = highRiskState.triggers[trigger];

                  return (
                    <button
                      key={trigger}
                      type="button"
                      className={`habit-row ${active ? "is-active" : ""}`}
                      onClick={() => toggleTrigger(trigger)}
                    >
                      <span className={`habit-check ${active ? "is-active" : ""}`} />
                      <span>{trigger}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="content-card">
              <h3 className="content-title">What pulled me toward weakness today?</h3>
              <textarea
                className="journal-textarea small"
                placeholder="Be specific. What happened, when, and why did it feel risky?"
                value={highRiskState.pulledTowardWeakness}
                onChange={(e) =>
                  setHighRiskField("pulledTowardWeakness", e.target.value)
                }
              />
            </div>

            <div className="content-card">
              <h3 className="content-title">Pattern notes</h3>
              <textarea
                className="journal-textarea small"
                placeholder="Write down patterns you keep noticing so you can break them earlier."
                value={highRiskState.patternNotes}
                onChange={(e) => setHighRiskField("patternNotes", e.target.value)}
              />
            </div>
          </div>

          <div className="risk-side">
            <div className={`content-card emergency-card ${highRiskState.emergencyMode ? "is-active" : ""}`}>
              <div className="section-block-header">
                <div>
                  <h3 className="content-title">Emergency mode</h3>
                  <p className="block-subtext">Interrupt the cycle immediately.</p>
                </div>
                <span className="stat-pill">
                  {highRiskState.emergencyMode ? "Active" : "Inactive"}
                </span>
              </div>

              <button
                type="button"
                className={`danger-btn ${highRiskState.emergencyMode ? "is-active" : ""}`}
                onClick={toggleEmergencyMode}
              >
                {highRiskState.emergencyMode
                  ? "Emergency mode activated"
                  : "Activate emergency mode"}
              </button>
            </div>

            <div className="content-card">
              <h3 className="content-title">Immediate actions</h3>
              <div className="action-list">
                {emergencyActions.map((action) => (
                  <div key={action} className="habit-row">
                    <span className="habit-check" />
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="content-card">
              <h3 className="content-title">Return mindset</h3>
              <ul className="prompt-list">
                <li>Return quickly. Do not sink deeper.</li>
                <li>Name the trigger and shut the door.</li>
                <li>Do one clean action immediately.</li>
                <li>Move toward Allah, not away.</li>
              </ul>

              <div className="section-actions">
                <button type="button" className="secondary-btn" onClick={resetHighRisk}>
                  Reset high-risk
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
