export type CategoryType = 'spasial' | 'logika' | 'verbal' | 'numerik';

export type TestMode = 'quick' | 'full' | 'category' | 'daily';

export interface QuestionOption {
  id: 'A' | 'B' | 'C' | 'D';
  label: string;
  image?: string;
  svgContent?: string;
}

export interface Question {
  id: number;
  category: CategoryType;
  title: string;
  imageUrl?: string;
  svgContent?: string;
  options: QuestionOption[];
  correctOption: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export interface TestAnswer {
  questionId: number;
  selectedOption: 'A' | 'B' | 'C' | 'D' | null; // null if skipped
  isCorrect: boolean;
  timeSpentSeconds: number;
}

export interface TestResult {
  id: string;
  date: string;
  testMode: TestMode;
  category?: CategoryType;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  score: number;
  levelTitle: string;
  accuracyPercentage: number;
  timeTakenSeconds: number;
  answers: TestAnswer[];
  questions: Question[];
}

export interface UserProfile {
  fullName: string;
  ageRange: string;
  education: string;
  iqScore: number;
  level: string;
  avatarUrl: string;
  completedTestsCount: number;
  completedDailyChallenge: boolean;
  dailyChallengeProgress: number; // percentage, e.g. 85
  history: TestResult[];
}

export interface LeaderboardItem {
  rank: number;
  name: string;
  avatarUrl: string;
  score: number;
  level: string;
  testsCount: number;
  isCurrentUser?: boolean;
}

export type ViewState = 
  | 'onboarding'
  | 'home'
  | 'active_test'
  | 'test_results'
  | 'pembahasan'
  | 'leaderboard'
  | 'profile';
