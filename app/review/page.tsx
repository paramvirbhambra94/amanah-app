'use client';

import { useMemo } from "react";
import Link from "next/link";
import { useAmanah } from "@/components/amanah-provider";

function getLastNDates(count: number) {
  const dates: string[] = [];
  const now = new Date();

  for (let i = 0; i < count; i += 1) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    dates.push(`${year}-${month}-${day}`);
  }

  return dates;
}

function formatDate(dateKey: string) {
  const d = new Date(`${dateKey}T00:00:00`);
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function ReviewPage() {
  const {
    todayKey,
    journalEntries,
    dailyProgress,
    highRiskMap,
    wifeConnectionMap,
    fitnessMap,
    immigrationState,
    familyVisionState,
    settingsState,
  } = useAmanah();

  const todayProgress = dailyProgress[todayKey];
  const todayHighRisk = highRiskMap[todayKey];
  const todayWife = wifeConnectionMap[todayKey];
  const todayFitness = fitnessMap[todayKey];

  const todaysPrayerCount = todayProgress
    ? Object.values(todayProgress.prayers).filter(Boolean).length
    : 0;

  const todaysHabitCount = todayProgress
    ? Object.values(todayProgress.habits).filter(Boolean).length
    : 0;

  const todaysWifeCount = todayWife
    ? Object.values(todayWife.checklist).filter(Boolean).length
    : 0;

  const todaysFitnessChecks = todayFitness
    ? Object.values(todayFitness.dailyChecks).filter(Boolean).length
    : 0;

  const todaysWorkoutMarks = todayFitness
    ? Object.values(todayFitness.workouts).filter(Boolean).length
    : 0;

  const journaledToday = journalEntries.some(
    (entry) => entry.createdDateKey === todayKey
  );

  const last7Dates = useMemo(() => getLastNDates(7), []);

  const weeklyStats = useMemo(() => {
    return last7Dates.reduce(
      (acc, dateKey) => {
        const progress = dailyProgress[dateKey];
        const wife = wifeConnectionMap[dateKey];
        const fitness = fitnessMap[dateKey];
        const highRisk = highRiskMap[dateKey];

        acc.prayers += progress
          ? Object.values(progress.prayers).filter(Boolean).length
          : 0;

        acc.habits += progress
          ? Object.values(progress.habits).filter(Boolean).length
          : 0;

        acc.wife += wife
          ? Object.values(wife.checklist).filter(Boolean).length
          : 0;

        acc.fitnessChecks += fitness
          ? Object.values(fitness.dailyChecks).filter(Boolean).length
          : 0;

        acc.workouts += fitness
          ? Object.values(fitness.workouts).filter(Boolean).length
          : 0;

        acc.highRiskDays += highRisk?.urgeLevel ? 1 : 0;

        acc.journalDays += journalEntries.some(
          (entry) => entry.createdDateKey === dateKey
        )
          ? 1
          : 0;

        return acc;
      },
      {
        prayers: 0,
        habits: 0,
        wife: 0,
        fitnessChecks: 0,
        workouts: 0,
        highRiskDays: 0,
        journalDays: 0,
      }
    );
  }, [last7Dates, dailyProgress, wifeConnectionMap, fitnessMap, highRiskMap, journalEntries]);

  const historyDates = useMemo(() => {
    const dateSet = new Set<string>();

    Object.keys(dailyProgress).forEach((date) => dateSet.add(date));
    Object.keys(highRiskMap).forEach((date) => dateSet.add(date));
    Object.keys(wifeConnectionMap).forEach((date) => dateSet.add(date));
    Object.keys(fitnessMap).forEach((date) => dateSet.add(date));
    journalEntries.forEach((entry) => {
      if (entry.createdDateKey) dateSet.add(entry.createdDateKey);
    });

    return Array.from(dateSet).sort((a, b) => b.localeCompare(a));
  }, [dailyProgress, highRiskMap, wifeConnectionMap, fitnessMap, journalEntries]);

  const immigrationCount = Object.values(immigrationState.checklist).filter(Boolean).length;

  const familyFieldsCompleted = Object.values(familyVisionState).filter(
    (value) => value.trim().length > 0
  ).length;

  const settingsFieldsCompleted = Object.values(settingsState).filter(
    (value) => value.trim().length > 0
  ).length;

  return (
    <section className="page-shell">
      <div className="section-top">
        <div>
          <p className="section-eyebrow">Review</p>
          <h2 className="page-title">A live progress report built from your real sections.</h2>
          <p className="page-text">
            This page reads your actual activity, daily tracking, and saved
            progress so you can see how you’re doing today and this week.
          </p>
        </div>
      </div>

      <div className="review-overview-grid">
        <div className="content-card metric-card">
          <p className="metric-label">Today’s prayers</p>
          <p className="metric-value">{todaysPrayerCount} / 5</p>
        </div>

        <div className="content-card metric-card">
          <p className="metric-label">Today’s habits</p>
          <p className="metric-value">{todaysHabitCount} / 8</p>
        </div>

        <div className="content-card metric-card">
          <p className="metric-label">Journaled today</p>
          <p className="metric-value">{journaledToday ? "Yes" : "No"}</p>
        </div>

        <div className="content-card metric-card">
          <p className="metric-label">Urge level</p>
          <p className="metric-value">
            {todayHighRisk?.urgeLevel ? `Level ${todayHighRisk.urgeLevel}` : "Not set"}
          </p>
        </div>

        <div className="content-card metric-card">
          <p className="metric-label">Wife connection</p>
          <p className="metric-value">{todaysWifeCount} / 5</p>
        </div>

        <div className="content-card metric-card">
          <p className="metric-label">Fitness checks</p>
          <p className="metric-value">{todaysFitnessChecks} / 4</p>
        </div>

        <div className="content-card metric-card">
          <p className="metric-label">Workout marks</p>
          <p className="metric-value">{todaysWorkoutMarks} / 3</p>
        </div>

        <div className="content-card metric-card">
          <p className="metric-label">Today</p>
          <p className="metric-value small-date">{formatDate(todayKey)}</p>
        </div>
      </div>

      <div className="review-section-grid">
        <div className="content-card">
          <div className="section-block-header">
            <div>
              <h3 className="content-title">7-day snapshot</h3>
              <p className="block-subtext">Your last week at a glance.</p>
            </div>
          </div>

          <div className="weekly-grid">
            <div className="snapshot-card">
              <p className="snapshot-label">Prayers</p>
              <p className="snapshot-value">{weeklyStats.prayers}</p>
            </div>
            <div className="snapshot-card">
              <p className="snapshot-label">Habits</p>
              <p className="snapshot-value">{weeklyStats.habits}</p>
            </div>
            <div className="snapshot-card">
              <p className="snapshot-label">Journal days</p>
              <p className="snapshot-value">{weeklyStats.journalDays}</p>
            </div>
            <div className="snapshot-card">
              <p className="snapshot-label">Wife actions</p>
              <p className="snapshot-value">{weeklyStats.wife}</p>
            </div>
            <div className="snapshot-card">
              <p className="snapshot-label">Fitness checks</p>
              <p className="snapshot-value">{weeklyStats.fitnessChecks}</p>
            </div>
            <div className="snapshot-card">
              <p className="snapshot-label">Workout marks</p>
              <p className="snapshot-value">{weeklyStats.workouts}</p>
            </div>
            <div className="snapshot-card">
              <p className="snapshot-label">High-risk days</p>
              <p className="snapshot-value">{weeklyStats.highRiskDays}</p>
            </div>
          </div>
        </div>

        <div className="content-card">
          <div className="section-block-header">
            <div>
              <h3 className="content-title">Ongoing progress</h3>
              <p className="block-subtext">Sections that are not daily-tracked.</p>
            </div>
          </div>

          <div className="ongoing-grid">
            <div className="snapshot-card">
              <p className="snapshot-label">Immigration checklist</p>
              <p className="snapshot-value">{immigrationCount} / 4</p>
            </div>
            <div className="snapshot-card">
              <p className="snapshot-label">Family vision fields</p>
              <p className="snapshot-value">{familyFieldsCompleted} / 9</p>
            </div>
            <div className="snapshot-card">
              <p className="snapshot-label">Settings filled</p>
              <p className="snapshot-value">{settingsFieldsCompleted} / 7</p>
            </div>
          </div>

          <div className="mini-note-box review-note-box">
            This review now updates automatically from your real sections instead
            of relying on manual review text boxes.
          </div>
        </div>
      </div>

      <div className="content-card">
        <div className="section-block-header">
          <div>
            <h3 className="content-title">Review history</h3>
            <p className="block-subtext">
              Open your saved daily progress folder and review previous days properly.
            </p>
          </div>
          <span className="stat-pill">{historyDates.length} saved days</span>
        </div>

        <Link href="/review/history" className="history-folder-card">
          <div className="history-folder-icon">📁</div>
          <div>
            <p className="history-folder-title">Open Review History</p>
            <p className="history-folder-text">
              View saved daily progress records and open each day one by one.
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
}
