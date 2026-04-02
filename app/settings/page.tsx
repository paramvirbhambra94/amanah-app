'use client';

import { useAmanah } from "@/components/amanah-provider";

export default function SettingsPage() {
  const {
    settingsState,
    setSettingsField,
    resetSettings,
  } = useAmanah();

  return (
    <section className="page-shell">
      <div className="section-top">
        <div>
          <p className="section-eyebrow">Settings</p>
          <h2 className="page-title">Set the direction of the app around your real priorities.</h2>
          <p className="page-text">
            These settings shape your reminders, your visible goals, and the
            long-term intention behind how you use Amanah.
          </p>
        </div>
      </div>

      <div className="settings-layout">
        <div className="settings-main">
          <div className="content-card">
            <h3 className="content-title">Profile name</h3>
            <textarea
              className="journal-textarea small"
              placeholder="Your name or how you want the dashboard to address you."
              value={settingsState.profileName}
              onChange={(e) => setSettingsField("profileName", e.target.value)}
            />
          </div>

          <div className="content-card">
            <h3 className="content-title">Core goals</h3>
            <textarea
              className="journal-textarea"
              placeholder="What is the core mission behind this season of your life?"
              value={settingsState.coreGoals}
              onChange={(e) => setSettingsField("coreGoals", e.target.value)}
            />
          </div>

          <div className="settings-grid">
            <div className="content-card">
              <h3 className="content-title">Qur’an goal</h3>
              <textarea
                className="journal-textarea small"
                placeholder="Daily or weekly Qur’an focus."
                value={settingsState.quranGoal}
                onChange={(e) => setSettingsField("quranGoal", e.target.value)}
              />
            </div>

            <div className="content-card">
              <h3 className="content-title">Wife goal</h3>
              <textarea
                className="journal-textarea small"
                placeholder="Marriage focus you want to keep visible."
                value={settingsState.wifeGoal}
                onChange={(e) => setSettingsField("wifeGoal", e.target.value)}
              />
            </div>

            <div className="content-card">
              <h3 className="content-title">Trigger defaults</h3>
              <textarea
                className="journal-textarea small"
                placeholder="Patterns, weak points, or things you want remembered."
                value={settingsState.triggerDefaults}
                onChange={(e) => setSettingsField("triggerDefaults", e.target.value)}
              />
            </div>

            <div className="content-card">
              <h3 className="content-title">App preferences</h3>
              <textarea
                className="journal-textarea small"
                placeholder="Any app behavior or preference notes."
                value={settingsState.appPreferences}
                onChange={(e) => setSettingsField("appPreferences", e.target.value)}
              />
            </div>
          </div>

          <div className="content-card">
            <h3 className="content-title">Onboarding answers</h3>
            <textarea
              className="journal-textarea"
              placeholder="Store useful background answers or personal context here."
              value={settingsState.onboardingAnswers}
              onChange={(e) => setSettingsField("onboardingAnswers", e.target.value)}
            />
          </div>
        </div>

        <aside className="settings-side">
          <div className="content-card">
            <h3 className="content-title">Sync status</h3>
            <div className="mini-note-box">
              Cloud sync is active. Your core Amanah data is now saving across the app.
            </div>
          </div>

          <div className="content-card">
            <h3 className="content-title">How settings help</h3>
            <ul className="prompt-list">
              <li>Keep your main goals visible.</li>
              <li>Give the dashboard real direction.</li>
              <li>Anchor the app around your long-term priorities.</li>
              <li>Store personal defaults so they do not get lost.</li>
            </ul>
          </div>

          <div className="content-card">
            <h3 className="content-title">App info</h3>
            <p>Project: Amanah</p>
            <p>Status: Cloud-backed core app</p>
            <p>Focus: Reflection, discipline, protection, and progress</p>
            <p>Notifications: removed</p>

            <div className="section-actions">
              <button type="button" className="secondary-btn" onClick={resetSettings}>
                Reset settings
              </button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
