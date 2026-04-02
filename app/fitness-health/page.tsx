'use client';

import { useAmanah } from "@/components/amanah-provider";

const dailyChecks = [
  "Diet followed properly",
  "Water intake on track",
  "Sleep target respected",
  "Recovery / rest handled properly",
] as const;

const trainingDays = [
  "Swimming & Steam",
  "Gym",
  "Gym and Sauna & Steam",
] as const;

export default function FitnessHealthPage() {
  const {
    todayKey,
    fitnessState,
    toggleFitnessCheck,
    toggleWorkout,
    setFitnessField,
    resetFitness,
  } = useAmanah();

  const completedChecks = dailyChecks.filter(
    (item) => fitnessState.dailyChecks[item]
  ).length;

  const completedWorkouts = trainingDays.filter(
    (item) => fitnessState.workouts[item]
  ).length;

  return (
    <section className="page-shell">
      <div className="section-top">
        <div>
          <p className="section-eyebrow">Fitness & Health</p>
          <h2 className="page-title">Train your body with the same discipline you want in your life.</h2>
          <p className="page-text">
            This section is for physical consistency, better energy, cleaner
            habits, and steady progress in your health without overcomplicating it.
          </p>
        </div>
      </div>

      <div className="fitness-layout">
        <div className="content-card">
          <div className="section-block-header">
            <div>
              <h3 className="content-title">Weekly training structure</h3>
              <p className="block-subtext">A simple 3-session rhythm you can stay consistent with.</p>
            </div>
            <span className="stat-pill">{completedWorkouts} / 3 marked</span>
          </div>

          <div className="daily-save-note">
            Saved for: <strong>{todayKey}</strong>
          </div>

          <div className="fitness-grid">
            {trainingDays.map((day) => {
              const active = fitnessState.workouts[day];

              return (
                <button
                  key={day}
                  type="button"
                  className={`tracker-card ${active ? "is-active" : ""}`}
                  onClick={() => toggleWorkout(day)}
                >
                  <span className="tracker-title">{day}</span>
                  <span className="tracker-sub">
                    {active ? "Marked complete" : "Not marked yet"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="content-card">
          <div className="section-block-header">
            <div>
              <h3 className="content-title">Daily health checks</h3>
              <p className="block-subtext">Small things that keep your body and energy in order.</p>
            </div>
            <span className="stat-pill">{completedChecks} / 4 complete</span>
          </div>

          <div className="habit-list">
            {dailyChecks.map((item) => {
              const active = fitnessState.dailyChecks[item];

              return (
                <button
                  key={item}
                  type="button"
                  className={`habit-row ${active ? "is-active" : ""}`}
                  onClick={() => toggleFitnessCheck(item)}
                >
                  <span className={`habit-check ${active ? "is-active" : ""}`} />
                  <span>{item}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="fitness-grid">
          <div className="content-card">
            <h3 className="content-title">This week’s training plan</h3>
            <textarea
              className="journal-textarea small"
              placeholder="Write your plan for Swimming & Steam, Gym, and Gym and Sauna & Steam."
              value={fitnessState.trainingPlan}
              onChange={(e) => setFitnessField("trainingPlan", e.target.value)}
            />
          </div>

          <div className="content-card">
            <h3 className="content-title">Diet planner</h3>
            <textarea
              className="journal-textarea small"
              placeholder="Meals, targets, rules, or structure."
              value={fitnessState.dietPlanner}
              onChange={(e) => setFitnessField("dietPlanner", e.target.value)}
            />
          </div>

          <div className="content-card">
            <h3 className="content-title">Weight / progress log</h3>
            <textarea
              className="journal-textarea small"
              placeholder="Weight, measurements, strength changes, observations."
              value={fitnessState.progressLog}
              onChange={(e) => setFitnessField("progressLog", e.target.value)}
            />
          </div>

          <div className="content-card">
            <h3 className="content-title">Weekly fitness review</h3>
            <textarea
              className="journal-textarea small"
              placeholder="How did your training, food, sleep, and consistency go this week?"
              value={fitnessState.weeklyReview}
              onChange={(e) => setFitnessField("weeklyReview", e.target.value)}
            />
          </div>
        </div>

        <div className="fitness-two-col">
          <div className="content-card">
            <h3 className="content-title">Current goals</h3>
            <textarea
              className="journal-textarea"
              placeholder="Write your current fitness and health goals. Strength, consistency, weight, discipline, energy, body composition..."
              value={fitnessState.currentGoals}
              onChange={(e) => setFitnessField("currentGoals", e.target.value)}
            />
          </div>

          <div className="fitness-side">
            <div className="content-card">
              <h3 className="content-title">Reflection prompts</h3>
              <ul className="prompt-list">
                <li>Did I stay disciplined with food today?</li>
                <li>Did I protect my sleep and recovery?</li>
                <li>Am I staying consistent with my 3-session training structure?</li>
                <li>What health habit needs more consistency right now?</li>
              </ul>
            </div>

            <div className="content-card">
              <h3 className="content-title">Current focus</h3>
              <div className="mini-note-box">
                Build strength, energy, and consistency through a sustainable weekly routine.
              </div>

              <div className="section-actions">
                <button type="button" className="secondary-btn" onClick={resetFitness}>
                  Reset today
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
