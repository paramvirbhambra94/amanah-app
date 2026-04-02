'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

type JournalDraft = {
  main: string;
  feeling: string;
  offTrack: string;
  grateful: string;
  needAllah: string;
};

type JournalEntry = {
  id: string;
  createdAt: string;
  createdDateKey?: string;
  main: string;
  feeling: string;
  offTrack: string;
  grateful: string;
  needAllah: string;
};

type PrayerKey = 'Fajr' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';

type HabitKey =
  | 'Quran'
  | 'Dhikr'
  | 'Tahajjud prep'
  | 'Lower gaze / no private scrolling'
  | 'Focused work block'
  | 'Daily du’a'
  | 'Returned quickly after slip'
  | 'Sleep on time';

type SalahState = Record<PrayerKey, boolean>;
type HabitsState = Record<HabitKey, boolean>;

type DailyProgressRecord = {
  prayers: SalahState;
  habits: HabitsState;
};

type DailyProgressMap = Record<string, DailyProgressRecord>;

type TriggerKey =
  | 'Loneliness'
  | 'Late-night scrolling'
  | 'Boredom'
  | 'Stress'
  | 'Tiredness'
  | 'Isolation';

type HighRiskTriggers = Record<TriggerKey, boolean>;

type HighRiskRecord = {
  urgeLevel: number | null;
  triggers: HighRiskTriggers;
  emergencyMode: boolean;
  pulledTowardWeakness: string;
  patternNotes: string;
};

type HighRiskMap = Record<string, HighRiskRecord>;

type WifeChecklistKey =
  | 'Daily call'
  | 'Make du’a for wife'
  | 'Support her emotionally'
  | 'Be loving and reassuring'
  | 'Ask how she is really doing';

type WifeChecklistState = Record<WifeChecklistKey, boolean>;

type WifeConnectionRecord = {
  checklist: WifeChecklistState;
  appreciationNote: string;
  supportNote: string;
  relationshipNotes: string;
  futurePlanning: string;
};

type WifeConnectionMap = Record<string, WifeConnectionRecord>;

type FitnessCheckKey =
  | 'Diet followed properly'
  | 'Water intake on track'
  | 'Sleep target respected'
  | 'Recovery / rest handled properly';

type FitnessCheckState = Record<FitnessCheckKey, boolean>;

type WorkoutKey = 'Swimming & Steam' | 'Gym' | 'Gym and Sauna & Steam';

type WorkoutState = Record<WorkoutKey, boolean>;

type FitnessRecord = {
  dailyChecks: FitnessCheckState;
  workouts: WorkoutState;
  trainingPlan: string;
  dietPlanner: string;
  progressLog: string;
  weeklyReview: string;
  currentGoals: string;
};

type FitnessMap = Record<string, FitnessRecord>;

type ImmigrationChecklistKey =
  | '30k job or income sorted'
  | 'Saving £1000+ every month if applicable'
  | 'Accommodation sorted'
  | 'Driving passed';

type ImmigrationChecklistState = Record<ImmigrationChecklistKey, boolean>;

type ImmigrationState = {
  checklist: ImmigrationChecklistState;
  nextActionStep: string;
  progressNotes: string;
  documentsChecklist: string;
  evidenceChecklist: string;
  currentBlockers: string;
  importantDeadlines: string;
};

type FamilyVisionState = {
  husbandIdentity: string;
  homeVision: string;
  familyValues: string;
  barakahInHome: string;
  futureChildrenHopes: string;
  financialStabilityVision: string;
  shortTermGoals: string;
  longTermDream: string;
  missionStatement: string;
};

type SettingsState = {
  profileName: string;
  coreGoals: string;
  quranGoal: string;
  wifeGoal: string;
  triggerDefaults: string;
  appPreferences: string;
  onboardingAnswers: string;
};

type AmanahContextType = {
  journalDraft: JournalDraft;
  journalEntries: JournalEntry[];
  todayKey: string;
  dailyProgress: DailyProgressMap;
  salahState: SalahState;
  habitsState: HabitsState;
  highRiskMap: HighRiskMap;
  highRiskState: HighRiskRecord;
  wifeConnectionMap: WifeConnectionMap;
  wifeConnectionState: WifeConnectionRecord;
  fitnessMap: FitnessMap;
  fitnessState: FitnessRecord;
  immigrationState: ImmigrationState;
  familyVisionState: FamilyVisionState;
  settingsState: SettingsState;
  setJournalField: (field: keyof JournalDraft, value: string) => void;
  clearJournalDraft: () => void;
  saveJournalEntry: () => Promise<boolean>;
  deleteJournalEntry: (id: string) => Promise<void>;
  togglePrayer: (prayer: PrayerKey) => void;
  toggleHabit: (habit: HabitKey) => void;
  resetSalahAndHabits: () => void;
  setUrgeLevel: (level: number) => void;
  toggleTrigger: (trigger: TriggerKey) => void;
  toggleEmergencyMode: () => void;
  setHighRiskField: (
    field: 'pulledTowardWeakness' | 'patternNotes',
    value: string
  ) => void;
  resetHighRisk: () => void;
  toggleWifeChecklist: (item: WifeChecklistKey) => void;
  setWifeField: (
    field:
      | 'appreciationNote'
      | 'supportNote'
      | 'relationshipNotes'
      | 'futurePlanning',
    value: string
  ) => void;
  resetWifeConnection: () => void;
  toggleFitnessCheck: (item: FitnessCheckKey) => void;
  toggleWorkout: (item: WorkoutKey) => void;
  setFitnessField: (
    field:
      | 'trainingPlan'
      | 'dietPlanner'
      | 'progressLog'
      | 'weeklyReview'
      | 'currentGoals',
    value: string
  ) => void;
  resetFitness: () => void;
  toggleImmigrationChecklist: (item: ImmigrationChecklistKey) => void;
  setImmigrationField: (
    field:
      | 'nextActionStep'
      | 'progressNotes'
      | 'documentsChecklist'
      | 'evidenceChecklist'
      | 'currentBlockers'
      | 'importantDeadlines',
    value: string
  ) => void;
  resetImmigration: () => void;
  setFamilyVisionField: (field: keyof FamilyVisionState, value: string) => void;
  resetFamilyVision: () => void;
  setSettingsField: (field: keyof SettingsState, value: string) => void;
  resetSettings: () => void;
};

const STORAGE_KEY = 'amanah-v2-state';

const defaultDraft: JournalDraft = {
  main: '',
  feeling: '',
  offTrack: '',
  grateful: '',
  needAllah: '',
};

const defaultSalahState: SalahState = {
  Fajr: false,
  Dhuhr: false,
  Asr: false,
  Maghrib: false,
  Isha: false,
};

const defaultHabitsState: HabitsState = {
  Quran: false,
  Dhikr: false,
  'Tahajjud prep': false,
  'Lower gaze / no private scrolling': false,
  'Focused work block': false,
  'Daily du’a': false,
  'Returned quickly after slip': false,
  'Sleep on time': false,
};

const defaultHighRiskRecord: HighRiskRecord = {
  urgeLevel: null,
  triggers: {
    Loneliness: false,
    'Late-night scrolling': false,
    Boredom: false,
    Stress: false,
    Tiredness: false,
    Isolation: false,
  },
  emergencyMode: false,
  pulledTowardWeakness: '',
  patternNotes: '',
};

const defaultWifeChecklist: WifeChecklistState = {
  'Daily call': false,
  'Make du’a for wife': false,
  'Support her emotionally': false,
  'Be loving and reassuring': false,
  'Ask how she is really doing': false,
};

const defaultFitnessChecks: FitnessCheckState = {
  'Diet followed properly': false,
  'Water intake on track': false,
  'Sleep target respected': false,
  'Recovery / rest handled properly': false,
};

const defaultWorkoutState: WorkoutState = {
  'Swimming & Steam': false,
  Gym: false,
  'Gym and Sauna & Steam': false,
};

const defaultImmigrationState: ImmigrationState = {
  checklist: {
    '30k job or income sorted': false,
    'Saving £1000+ every month if applicable': false,
    'Accommodation sorted': false,
    'Driving passed': false,
  },
  nextActionStep: '',
  progressNotes: '',
  documentsChecklist: '',
  evidenceChecklist: '',
  currentBlockers: '',
  importantDeadlines: '',
};

const defaultFamilyVisionState: FamilyVisionState = {
  husbandIdentity: '',
  homeVision: '',
  familyValues: '',
  barakahInHome: '',
  futureChildrenHopes: '',
  financialStabilityVision: '',
  shortTermGoals: '',
  longTermDream: '',
  missionStatement: '',
};

const defaultSettingsState: SettingsState = {
  profileName: '',
  coreGoals: '',
  quranGoal: '',
  wifeGoal: '',
  triggerDefaults: '',
  appPreferences: '',
  onboardingAnswers: '',
};

function createEmptyDailyProgress(): DailyProgressRecord {
  return {
    prayers: { ...defaultSalahState },
    habits: { ...defaultHabitsState },
  };
}

function createEmptyWifeConnection(): WifeConnectionRecord {
  return {
    checklist: { ...defaultWifeChecklist },
    appreciationNote: '',
    supportNote: '',
    relationshipNotes: '',
    futurePlanning: '',
  };
}

function createEmptyFitness(): FitnessRecord {
  return {
    dailyChecks: { ...defaultFitnessChecks },
    workouts: { ...defaultWorkoutState },
    trainingPlan: '',
    dietPlanner: '',
    progressLog: '',
    weeklyReview: '',
    currentGoals: '',
  };
}

function createEmptyHighRisk(): HighRiskRecord {
  return {
    ...defaultHighRiskRecord,
    triggers: { ...defaultHighRiskRecord.triggers },
  };
}

function getTodayKey(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function mapJournalRow(row: Record<string, unknown>): JournalEntry {
  return {
    id: String(row.id),
    createdAt: String(row.created_at ?? ''),
    createdDateKey: String(row.date_key ?? ''),
    main: String(row.main ?? ''),
    feeling: String(row.feeling ?? ''),
    offTrack: String(row.off_track ?? ''),
    grateful: String(row.grateful ?? ''),
    needAllah: String(row.need_allah ?? ''),
  };
}

function mapSalahHabitsRow(row: Record<string, unknown>): DailyProgressRecord {
  return {
    prayers: {
      Fajr: Boolean(row.fajr),
      Dhuhr: Boolean(row.dhuhr),
      Asr: Boolean(row.asr),
      Maghrib: Boolean(row.maghrib),
      Isha: Boolean(row.isha),
    },
    habits: {
      Quran: Boolean(row.quran),
      Dhikr: Boolean(row.dhikr),
      'Tahajjud prep': Boolean(row.tahajjud_prep),
      'Lower gaze / no private scrolling': Boolean(
        row.lower_gaze_no_private_scrolling
      ),
      'Focused work block': Boolean(row.focused_work_block),
      "Daily du’a": Boolean(row.daily_dua),
      'Returned quickly after slip': Boolean(row.returned_quickly_after_slip),
      'Sleep on time': Boolean(row.sleep_on_time),
    },
  };
}

function mapHighRiskRow(row: Record<string, unknown>): HighRiskRecord {
  return {
    urgeLevel:
      row.urge_level === null || row.urge_level === undefined
        ? null
        : Number(row.urge_level),
    triggers: {
      Loneliness: Boolean(row.loneliness),
      'Late-night scrolling': Boolean(row.late_night_scrolling),
      Boredom: Boolean(row.boredom),
      Stress: Boolean(row.stress),
      Tiredness: Boolean(row.tiredness),
      Isolation: Boolean(row.isolation),
    },
    emergencyMode: Boolean(row.emergency_mode),
    pulledTowardWeakness: String(row.pulled_toward_weakness ?? ''),
    patternNotes: String(row.pattern_notes ?? ''),
  };
}

function mapWifeConnectionRow(row: Record<string, unknown>): WifeConnectionRecord {
  return {
    checklist: {
      'Daily call': Boolean(row.daily_call),
      'Make du’a for wife': Boolean(row.make_dua_for_wife),
      'Support her emotionally': Boolean(row.support_her_emotionally),
      'Be loving and reassuring': Boolean(row.be_loving_and_reassuring),
      'Ask how she is really doing': Boolean(row.ask_how_she_is_really_doing),
    },
    appreciationNote: String(row.appreciation_note ?? ''),
    supportNote: String(row.support_note ?? ''),
    relationshipNotes: String(row.relationship_notes ?? ''),
    futurePlanning: String(row.future_planning ?? ''),
  };
}

function mapFitnessRow(row: Record<string, unknown>): FitnessRecord {
  return {
    dailyChecks: {
      'Diet followed properly': Boolean(row.diet_followed_properly),
      'Water intake on track': Boolean(row.water_intake_on_track),
      'Sleep target respected': Boolean(row.sleep_target_respected),
      'Recovery / rest handled properly': Boolean(
        row.recovery_rest_handled_properly
      ),
    },
    workouts: {
      'Swimming & Steam': Boolean(row.workout_a),
      Gym: Boolean(row.workout_b),
      'Gym and Sauna & Steam': Boolean(row.workout_c),
    },
    trainingPlan: String(row.training_plan ?? ''),
    dietPlanner: String(row.diet_planner ?? ''),
    progressLog: String(row.progress_log ?? ''),
    weeklyReview: String(row.weekly_review ?? ''),
    currentGoals: String(row.current_goals ?? ''),
  };
}

function mapImmigrationRow(row: Record<string, unknown>): ImmigrationState {
  return {
    checklist: {
      '30k job or income sorted': Boolean(row.income_30k_sorted),
      'Saving £1000+ every month if applicable': Boolean(
        row.saving_1000_plus_per_month
      ),
      'Accommodation sorted': Boolean(row.accommodation_sorted),
      'Driving passed': Boolean(row.driving_passed),
    },
    nextActionStep: String(row.next_action_step ?? ''),
    progressNotes: String(row.progress_notes ?? ''),
    documentsChecklist: String(row.documents_checklist ?? ''),
    evidenceChecklist: String(row.evidence_checklist ?? ''),
    currentBlockers: String(row.current_blockers ?? ''),
    importantDeadlines: String(row.important_deadlines ?? ''),
  };
}

function mapFamilyVisionRow(row: Record<string, unknown>): FamilyVisionState {
  return {
    husbandIdentity: String(row.husband_identity ?? ''),
    homeVision: String(row.home_vision ?? ''),
    familyValues: String(row.family_values ?? ''),
    barakahInHome: String(row.barakah_in_home ?? ''),
    futureChildrenHopes: String(row.future_children_hopes ?? ''),
    financialStabilityVision: String(row.financial_stability_vision ?? ''),
    shortTermGoals: String(row.short_term_goals ?? ''),
    longTermDream: String(row.long_term_dream ?? ''),
    missionStatement: String(row.mission_statement ?? ''),
  };
}

function mapSettingsRow(row: Record<string, unknown>): SettingsState {
  return {
    profileName: String(row.profile_name ?? ''),
    coreGoals: String(row.core_goals ?? ''),
    quranGoal: String(row.quran_goal ?? ''),
    wifeGoal: String(row.wife_goal ?? ''),
    triggerDefaults: String(row.trigger_defaults ?? ''),
    appPreferences: String(row.app_preferences ?? ''),
    onboardingAnswers: String(row.onboarding_answers ?? ''),
  };
}

const AmanahContext = createContext<AmanahContextType | null>(null);

export function AmanahProvider({ children }: { children: ReactNode }) {
  const [journalDraft, setJournalDraft] = useState<JournalDraft>(defaultDraft);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [dailyProgress, setDailyProgress] = useState<DailyProgressMap>({});
  const [highRiskMap, setHighRiskMap] = useState<HighRiskMap>({});
  const [wifeConnectionMap, setWifeConnectionMap] = useState<WifeConnectionMap>({});
  const [fitnessMap, setFitnessMap] = useState<FitnessMap>({});
  const [immigrationState, setImmigrationState] = useState<ImmigrationState>(defaultImmigrationState);
  const [familyVisionState, setFamilyVisionState] = useState<FamilyVisionState>(defaultFamilyVisionState);
  const [settingsState, setSettingsState] = useState<SettingsState>(defaultSettingsState);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasHydratedSalahHabits, setHasHydratedSalahHabits] = useState(false);
  const [hasHydratedHighRisk, setHasHydratedHighRisk] = useState(false);
  const [hasHydratedWifeConnection, setHasHydratedWifeConnection] = useState(false);
  const [hasHydratedFitness, setHasHydratedFitness] = useState(false);
  const [hasHydratedImmigration, setHasHydratedImmigration] = useState(false);
  const [hasHydratedFamilyVision, setHasHydratedFamilyVision] = useState(false);
  const [hasHydratedSettings, setHasHydratedSettings] = useState(false);
  const lastSyncedSalahHabitsRef = useRef<string>('');
  const lastSyncedHighRiskRef = useRef<string>('');
  const lastSyncedWifeConnectionRef = useRef<string>('');
  const lastSyncedFitnessRef = useRef<string>('');
  const lastSyncedImmigrationRef = useRef<string>('');
  const lastSyncedFamilyVisionRef = useRef<string>('');
  const lastSyncedSettingsRef = useRef<string>('');

  const todayKey = getTodayKey();

  useEffect(() => {
    async function loadJournalFromSupabase() {
      try {
        const response = await fetch('/api/journal', { cache: 'no-store' });
        if (!response.ok) throw new Error('Failed to load journal entries');
        const json = (await response.json()) as { entries?: Record<string, unknown>[] };
        setJournalEntries((json.entries ?? []).map(mapJournalRow));
      } catch (error) {
        console.error('Failed to load journal from Supabase:', error);
      }
    }

    async function loadSalahHabitsFromSupabase() {
      try {
        const response = await fetch(
          `/api/salah-habits?date_key=${todayKey}`,
          { cache: 'no-store' }
        );

        if (!response.ok) throw new Error('Failed to load salah habits');

        const json = (await response.json()) as {
          record?: Record<string, unknown> | null;
        };

        if (json.record) {
          setDailyProgress((prev) => ({
            ...prev,
            [todayKey]: mapSalahHabitsRow(json.record as Record<string, unknown>),
          }));
        }
      } catch (error) {
        console.error('Failed to load salah habits from Supabase:', error);
      } finally {
        setHasHydratedSalahHabits(true);
      }
    }

    async function loadHighRiskFromSupabase() {
      try {
        const response = await fetch(
          `/api/high-risk?date_key=${todayKey}`,
          { cache: 'no-store' }
        );

        if (!response.ok) throw new Error('Failed to load high risk');

        const json = (await response.json()) as {
          record?: Record<string, unknown> | null;
        };

        if (json.record) {
          setHighRiskMap((prev) => ({
            ...prev,
            [todayKey]: mapHighRiskRow(json.record as Record<string, unknown>),
          }));
        }
      } catch (error) {
        console.error('Failed to load high risk from Supabase:', error);
      } finally {
        setHasHydratedHighRisk(true);
      }
    }

    async function loadWifeConnectionFromSupabase() {
      try {
        const response = await fetch(
          `/api/wife-connection?date_key=${todayKey}`,
          { cache: 'no-store' }
        );

        if (!response.ok) throw new Error('Failed to load wife connection');

        const json = (await response.json()) as {
          record?: Record<string, unknown> | null;
        };

        if (json.record) {
          setWifeConnectionMap((prev) => ({
            ...prev,
            [todayKey]: mapWifeConnectionRow(json.record as Record<string, unknown>),
          }));
        }
      } catch (error) {
        console.error('Failed to load wife connection from Supabase:', error);
      } finally {
        setHasHydratedWifeConnection(true);
      }
    }

    async function loadFitnessFromSupabase() {
      try {
        const response = await fetch(
          `/api/fitness-health?date_key=${todayKey}`,
          { cache: 'no-store' }
        );

        if (!response.ok) throw new Error('Failed to load fitness');

        const json = (await response.json()) as {
          record?: Record<string, unknown> | null;
        };

        if (json.record) {
          setFitnessMap((prev) => ({
            ...prev,
            [todayKey]: mapFitnessRow(json.record as Record<string, unknown>),
          }));
        }
      } catch (error) {
        console.error('Failed to load fitness from Supabase:', error);
      } finally {
        setHasHydratedFitness(true);
      }
    }

    async function loadImmigrationFromSupabase() {
      try {
        const response = await fetch('/api/immigration-progress', {
          cache: 'no-store',
        });

        if (!response.ok) throw new Error('Failed to load immigration');

        const json = (await response.json()) as {
          record?: Record<string, unknown> | null;
        };

        if (json.record) {
          setImmigrationState(mapImmigrationRow(json.record as Record<string, unknown>));
        }
      } catch (error) {
        console.error('Failed to load immigration from Supabase:', error);
      } finally {
        setHasHydratedImmigration(true);
      }
    }

    async function loadFamilyVisionFromSupabase() {
      try {
        const response = await fetch('/api/family-vision', {
          cache: 'no-store',
        });

        if (!response.ok) throw new Error('Failed to load family vision');

        const json = (await response.json()) as {
          record?: Record<string, unknown> | null;
        };

        if (json.record) {
          setFamilyVisionState(mapFamilyVisionRow(json.record as Record<string, unknown>));
        }
      } catch (error) {
        console.error('Failed to load family vision from Supabase:', error);
      } finally {
        setHasHydratedFamilyVision(true);
      }
    }

    async function loadSettingsFromSupabase() {
      try {
        const response = await fetch('/api/settings', {
          cache: 'no-store',
        });

        if (!response.ok) throw new Error('Failed to load settings');

        const json = (await response.json()) as {
          record?: Record<string, unknown> | null;
        };

        if (json.record) {
          setSettingsState(mapSettingsRow(json.record as Record<string, unknown>));
        }
      } catch (error) {
        console.error('Failed to load settings from Supabase:', error);
      } finally {
        setHasHydratedSettings(true);
      }
    }

    loadJournalFromSupabase();

    try {
      const raw = localStorage.getItem(STORAGE_KEY);

      if (raw) {
        const parsed = JSON.parse(raw) as {
          journalDraft?: JournalDraft;
          dailyProgress?: DailyProgressMap;
          highRiskMap?: HighRiskMap;
          highRiskState?: HighRiskRecord;
          wifeConnectionMap?: WifeConnectionMap;
          fitnessMap?: FitnessMap;
          immigrationState?: ImmigrationState;
          familyVisionState?: FamilyVisionState;
          settingsState?: SettingsState;
        };

        if (parsed.journalDraft) setJournalDraft({ ...defaultDraft, ...parsed.journalDraft });
        if (parsed.dailyProgress) setDailyProgress(parsed.dailyProgress);

        if (parsed.highRiskMap) {
          setHighRiskMap(parsed.highRiskMap);
        } else if (parsed.highRiskState) {
          setHighRiskMap({
            [getTodayKey()]: {
              ...createEmptyHighRisk(),
              ...parsed.highRiskState,
              triggers: {
                ...createEmptyHighRisk().triggers,
                ...(parsed.highRiskState.triggers ?? {}),
              },
            },
          });
        }

        if (parsed.wifeConnectionMap) setWifeConnectionMap(parsed.wifeConnectionMap);
        if (parsed.fitnessMap) setFitnessMap(parsed.fitnessMap);

        if (parsed.immigrationState) {
          setImmigrationState({
            ...defaultImmigrationState,
            ...parsed.immigrationState,
            checklist: {
              ...defaultImmigrationState.checklist,
              ...(parsed.immigrationState.checklist ?? {}),
            },
          });
        }

        if (parsed.familyVisionState) {
          setFamilyVisionState({
            ...defaultFamilyVisionState,
            ...parsed.familyVisionState,
          });
        }

        if (parsed.settingsState) {
          setSettingsState({
            ...defaultSettingsState,
            ...parsed.settingsState,
          });
        }
      }
    } catch (error) {
      console.error('Failed to load local Amanah state:', error);
    } finally {
      setHasLoaded(true);
      loadSalahHabitsFromSupabase();
      loadHighRiskFromSupabase();
      loadWifeConnectionFromSupabase();
      loadFitnessFromSupabase();
      loadImmigrationFromSupabase();
      loadFamilyVisionFromSupabase();
      loadSettingsFromSupabase();
    }
  }, [todayKey]);

  useEffect(() => {
    if (!hasLoaded) return;

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          journalDraft,
          dailyProgress,
          highRiskMap,
          wifeConnectionMap,
          fitnessMap,
          immigrationState,
          familyVisionState,
          settingsState,
        })
      );
    } catch (error) {
      console.error('Failed to save local Amanah state:', error);
    }
  }, [
    journalDraft,
    dailyProgress,
    highRiskMap,
    wifeConnectionMap,
    fitnessMap,
    immigrationState,
    familyVisionState,
    settingsState,
    hasLoaded,
  ]);

  const todayProgress = dailyProgress[todayKey] ?? createEmptyDailyProgress();
  const todayWifeConnection = wifeConnectionMap[todayKey] ?? createEmptyWifeConnection();
  const todayFitness = fitnessMap[todayKey] ?? createEmptyFitness();
  const todayHighRisk = highRiskMap[todayKey] ?? createEmptyHighRisk();

  useEffect(() => {
    if (!hasHydratedSalahHabits) return;

    const payload = {
      date_key: todayKey,
      fajr: todayProgress.prayers.Fajr,
      dhuhr: todayProgress.prayers.Dhuhr,
      asr: todayProgress.prayers.Asr,
      maghrib: todayProgress.prayers.Maghrib,
      isha: todayProgress.prayers.Isha,
      quran: todayProgress.habits.Quran,
      dhikr: todayProgress.habits.Dhikr,
      tahajjud_prep: todayProgress.habits['Tahajjud prep'],
      lower_gaze_no_private_scrolling:
        todayProgress.habits['Lower gaze / no private scrolling'],
      focused_work_block: todayProgress.habits['Focused work block'],
      daily_dua: todayProgress.habits["Daily du’a"],
      returned_quickly_after_slip:
        todayProgress.habits['Returned quickly after slip'],
      sleep_on_time: todayProgress.habits['Sleep on time'],
    };

    const serialized = JSON.stringify(payload);

    if (lastSyncedSalahHabitsRef.current === serialized) return;
    lastSyncedSalahHabitsRef.current = serialized;

    fetch('/api/salah-habits', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: serialized,
    }).catch((error) => {
      console.error('Failed to sync salah habits to Supabase:', error);
    });
  }, [todayKey, todayProgress, hasHydratedSalahHabits]);

  useEffect(() => {
    if (!hasHydratedHighRisk) return;

    const payload = {
      date_key: todayKey,
      urge_level: todayHighRisk.urgeLevel,
      loneliness: todayHighRisk.triggers.Loneliness,
      late_night_scrolling: todayHighRisk.triggers['Late-night scrolling'],
      boredom: todayHighRisk.triggers.Boredom,
      stress: todayHighRisk.triggers.Stress,
      tiredness: todayHighRisk.triggers.Tiredness,
      isolation: todayHighRisk.triggers.Isolation,
      emergency_mode: todayHighRisk.emergencyMode,
      pulled_toward_weakness: todayHighRisk.pulledTowardWeakness,
      pattern_notes: todayHighRisk.patternNotes,
    };

    const serialized = JSON.stringify(payload);

    if (lastSyncedHighRiskRef.current === serialized) return;
    lastSyncedHighRiskRef.current = serialized;

    fetch('/api/high-risk', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: serialized,
    }).catch((error) => {
      console.error('Failed to sync high risk to Supabase:', error);
    });
  }, [todayKey, todayHighRisk, hasHydratedHighRisk]);

  useEffect(() => {
    if (!hasHydratedWifeConnection) return;

    const payload = {
      date_key: todayKey,
      daily_call: todayWifeConnection.checklist['Daily call'],
      make_dua_for_wife: todayWifeConnection.checklist['Make du’a for wife'],
      support_her_emotionally:
        todayWifeConnection.checklist['Support her emotionally'],
      be_loving_and_reassuring:
        todayWifeConnection.checklist['Be loving and reassuring'],
      ask_how_she_is_really_doing:
        todayWifeConnection.checklist['Ask how she is really doing'],
      appreciation_note: todayWifeConnection.appreciationNote,
      support_note: todayWifeConnection.supportNote,
      relationship_notes: todayWifeConnection.relationshipNotes,
      future_planning: todayWifeConnection.futurePlanning,
    };

    const serialized = JSON.stringify(payload);

    if (lastSyncedWifeConnectionRef.current === serialized) return;
    lastSyncedWifeConnectionRef.current = serialized;

    fetch('/api/wife-connection', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: serialized,
    }).catch((error) => {
      console.error('Failed to sync wife connection to Supabase:', error);
    });
  }, [todayKey, todayWifeConnection, hasHydratedWifeConnection]);

  useEffect(() => {
    if (!hasHydratedFitness) return;

    const payload = {
      date_key: todayKey,
      diet_followed_properly: todayFitness.dailyChecks['Diet followed properly'],
      water_intake_on_track: todayFitness.dailyChecks['Water intake on track'],
      sleep_target_respected: todayFitness.dailyChecks['Sleep target respected'],
      recovery_rest_handled_properly:
        todayFitness.dailyChecks['Recovery / rest handled properly'],
      workout_a: todayFitness.workouts['Swimming & Steam'],
      workout_b: todayFitness.workouts['Gym'],
      workout_c: todayFitness.workouts['Gym and Sauna & Steam'],
      training_plan: todayFitness.trainingPlan,
      diet_planner: todayFitness.dietPlanner,
      progress_log: todayFitness.progressLog,
      weekly_review: todayFitness.weeklyReview,
      current_goals: todayFitness.currentGoals,
    };

    const serialized = JSON.stringify(payload);

    if (lastSyncedFitnessRef.current === serialized) return;
    lastSyncedFitnessRef.current = serialized;

    fetch('/api/fitness-health', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: serialized,
    }).catch((error) => {
      console.error('Failed to sync fitness to Supabase:', error);
    });
  }, [todayKey, todayFitness, hasHydratedFitness]);

  useEffect(() => {
    if (!hasHydratedImmigration) return;

    const payload = {
      income_30k_sorted:
        immigrationState.checklist['30k job or income sorted'],
      saving_1000_plus_per_month:
        immigrationState.checklist['Saving £1000+ every month if applicable'],
      accommodation_sorted:
        immigrationState.checklist['Accommodation sorted'],
      driving_passed: immigrationState.checklist['Driving passed'],
      next_action_step: immigrationState.nextActionStep,
      progress_notes: immigrationState.progressNotes,
      documents_checklist: immigrationState.documentsChecklist,
      evidence_checklist: immigrationState.evidenceChecklist,
      current_blockers: immigrationState.currentBlockers,
      important_deadlines: immigrationState.importantDeadlines,
    };

    const serialized = JSON.stringify(payload);

    if (lastSyncedImmigrationRef.current === serialized) return;
    lastSyncedImmigrationRef.current = serialized;

    fetch('/api/immigration-progress', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: serialized,
    }).catch((error) => {
      console.error('Failed to sync immigration to Supabase:', error);
    });
  }, [immigrationState, hasHydratedImmigration]);

  useEffect(() => {
    if (!hasHydratedFamilyVision) return;

    const payload = {
      husband_identity: familyVisionState.husbandIdentity,
      home_vision: familyVisionState.homeVision,
      family_values: familyVisionState.familyValues,
      barakah_in_home: familyVisionState.barakahInHome,
      future_children_hopes: familyVisionState.futureChildrenHopes,
      financial_stability_vision: familyVisionState.financialStabilityVision,
      short_term_goals: familyVisionState.shortTermGoals,
      long_term_dream: familyVisionState.longTermDream,
      mission_statement: familyVisionState.missionStatement,
    };

    const serialized = JSON.stringify(payload);

    if (lastSyncedFamilyVisionRef.current === serialized) return;
    lastSyncedFamilyVisionRef.current = serialized;

    fetch('/api/family-vision', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: serialized,
    }).catch((error) => {
      console.error('Failed to sync family vision to Supabase:', error);
    });
  }, [familyVisionState, hasHydratedFamilyVision]);

  useEffect(() => {
    if (!hasHydratedSettings) return;

    const payload = {
      profile_name: settingsState.profileName,
      core_goals: settingsState.coreGoals,
      quran_goal: settingsState.quranGoal,
      wife_goal: settingsState.wifeGoal,
      trigger_defaults: settingsState.triggerDefaults,
      app_preferences: settingsState.appPreferences,
      onboarding_answers: settingsState.onboardingAnswers,
    };

    const serialized = JSON.stringify(payload);

    if (lastSyncedSettingsRef.current === serialized) return;
    lastSyncedSettingsRef.current = serialized;

    fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: serialized,
    }).catch((error) => {
      console.error('Failed to sync settings to Supabase:', error);
    });
  }, [settingsState, hasHydratedSettings]);

  const value = useMemo<AmanahContextType>(
    () => ({
      journalDraft,
      journalEntries,
      todayKey,
      dailyProgress,
      salahState: todayProgress.prayers,
      habitsState: todayProgress.habits,
      highRiskMap,
      highRiskState: todayHighRisk,
      wifeConnectionMap,
      wifeConnectionState: todayWifeConnection,
      fitnessMap,
      fitnessState: todayFitness,
      immigrationState,
      familyVisionState,
      settingsState,

      setJournalField: (field, value) => {
        setJournalDraft((prev) => ({ ...prev, [field]: value }));
      },

      clearJournalDraft: () => setJournalDraft(defaultDraft),

      saveJournalEntry: async () => {
        const hasContent = Object.values(journalDraft).some(
          (value) => value.trim().length > 0
        );
        if (!hasContent) return false;

        try {
          const response = await fetch('/api/journal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              date_key: todayKey,
              main: journalDraft.main.trim(),
              feeling: journalDraft.feeling.trim(),
              off_track: journalDraft.offTrack.trim(),
              grateful: journalDraft.grateful.trim(),
              need_allah: journalDraft.needAllah.trim(),
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to save journal entry');
          }

          const json = (await response.json()) as { entry?: Record<string, unknown> };

          if (json.entry) {
            setJournalEntries((prev) => [
              mapJournalRow(json.entry as Record<string, unknown>),
              ...prev,
            ]);
          }

          setJournalDraft(defaultDraft);
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      },

      deleteJournalEntry: async (id) => {
        try {
          const response = await fetch(`/api/journal/${id}`, {
            method: 'DELETE',
          });

          if (!response.ok) {
            throw new Error('Failed to delete journal entry');
          }

          setJournalEntries((prev) => prev.filter((entry) => entry.id !== id));
        } catch (error) {
          console.error(error);
        }
      },

      togglePrayer: (prayer) => {
        setDailyProgress((prev) => {
          const current = prev[todayKey] ?? createEmptyDailyProgress();
          return {
            ...prev,
            [todayKey]: {
              ...current,
              prayers: { ...current.prayers, [prayer]: !current.prayers[prayer] },
            },
          };
        });
      },

      toggleHabit: (habit) => {
        setDailyProgress((prev) => {
          const current = prev[todayKey] ?? createEmptyDailyProgress();
          return {
            ...prev,
            [todayKey]: {
              ...current,
              habits: { ...current.habits, [habit]: !current.habits[habit] },
            },
          };
        });
      },

      resetSalahAndHabits: () => {
        setDailyProgress((prev) => ({
          ...prev,
          [todayKey]: createEmptyDailyProgress(),
        }));
      },

      setUrgeLevel: (level) => {
        setHighRiskMap((prev) => {
          const current = prev[todayKey] ?? createEmptyHighRisk();
          return {
            ...prev,
            [todayKey]: { ...current, urgeLevel: level },
          };
        });
      },

      toggleTrigger: (trigger) => {
        setHighRiskMap((prev) => {
          const current = prev[todayKey] ?? createEmptyHighRisk();
          return {
            ...prev,
            [todayKey]: {
              ...current,
              triggers: { ...current.triggers, [trigger]: !current.triggers[trigger] },
            },
          };
        });
      },

      toggleEmergencyMode: () => {
        setHighRiskMap((prev) => {
          const current = prev[todayKey] ?? createEmptyHighRisk();
          return {
            ...prev,
            [todayKey]: { ...current, emergencyMode: !current.emergencyMode },
          };
        });
      },

      setHighRiskField: (field, value) => {
        setHighRiskMap((prev) => {
          const current = prev[todayKey] ?? createEmptyHighRisk();
          return {
            ...prev,
            [todayKey]: { ...current, [field]: value },
          };
        });
      },

      resetHighRisk: () => {
        setHighRiskMap((prev) => ({
          ...prev,
          [todayKey]: createEmptyHighRisk(),
        }));
      },

      toggleWifeChecklist: (item) => {
        setWifeConnectionMap((prev) => {
          const current = prev[todayKey] ?? createEmptyWifeConnection();
          return {
            ...prev,
            [todayKey]: {
              ...current,
              checklist: { ...current.checklist, [item]: !current.checklist[item] },
            },
          };
        });
      },

      setWifeField: (field, value) => {
        setWifeConnectionMap((prev) => {
          const current = prev[todayKey] ?? createEmptyWifeConnection();
          return {
            ...prev,
            [todayKey]: { ...current, [field]: value },
          };
        });
      },

      resetWifeConnection: () => {
        setWifeConnectionMap((prev) => ({
          ...prev,
          [todayKey]: createEmptyWifeConnection(),
        }));
      },

      toggleFitnessCheck: (item) => {
        setFitnessMap((prev) => {
          const current = prev[todayKey] ?? createEmptyFitness();
          return {
            ...prev,
            [todayKey]: {
              ...current,
              dailyChecks: { ...current.dailyChecks, [item]: !current.dailyChecks[item] },
            },
          };
        });
      },

      toggleWorkout: (item) => {
        setFitnessMap((prev) => {
          const current = prev[todayKey] ?? createEmptyFitness();
          return {
            ...prev,
            [todayKey]: {
              ...current,
              workouts: { ...current.workouts, [item]: !current.workouts[item] },
            },
          };
        });
      },

      setFitnessField: (field, value) => {
        setFitnessMap((prev) => {
          const current = prev[todayKey] ?? createEmptyFitness();
          return {
            ...prev,
            [todayKey]: { ...current, [field]: value },
          };
        });
      },

      resetFitness: () => {
        setFitnessMap((prev) => ({
          ...prev,
          [todayKey]: createEmptyFitness(),
        }));
      },

      toggleImmigrationChecklist: (item) => {
        setImmigrationState((prev) => ({
          ...prev,
          checklist: { ...prev.checklist, [item]: !prev.checklist[item] },
        }));
      },

      setImmigrationField: (field, value) => {
        setImmigrationState((prev) => ({ ...prev, [field]: value }));
      },

      resetImmigration: () => setImmigrationState(defaultImmigrationState),

      setFamilyVisionField: (field, value) => {
        setFamilyVisionState((prev) => ({ ...prev, [field]: value }));
      },

      resetFamilyVision: () => setFamilyVisionState(defaultFamilyVisionState),

      setSettingsField: (field, value) => {
        setSettingsState((prev) => ({ ...prev, [field]: value }));
      },

      resetSettings: () => setSettingsState(defaultSettingsState),
    }),
    [
      journalDraft,
      journalEntries,
      todayKey,
      dailyProgress,
      todayProgress,
      highRiskMap,
      todayHighRisk,
      wifeConnectionMap,
      todayWifeConnection,
      fitnessMap,
      todayFitness,
      immigrationState,
      familyVisionState,
      settingsState,
    ]
  );

  return <AmanahContext.Provider value={value}>{children}</AmanahContext.Provider>;
}

export function useAmanah() {
  const context = useContext(AmanahContext);
  if (!context) {
    throw new Error('useAmanah must be used inside AmanahProvider');
  }
  return context;
}
