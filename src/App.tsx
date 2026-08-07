import { useState, useEffect } from 'react';
import { 
  UserProfile, 
  ViewState, 
  TestMode, 
  CategoryType, 
  TestResult, 
  Question,
  LeaderboardItem 
} from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Onboarding } from './components/Onboarding';
import { HomeDashboard } from './components/HomeDashboard';
import { ActiveTest } from './components/ActiveTest';
import { TestResults } from './components/TestResults';
import { PembahasanModal } from './components/PembahasanModal';
import { LeaderboardView } from './components/Leaderboard';
import { ProfileView } from './components/ProfileView';
import { SettingsModal } from './components/SettingsModal';
import { getQuestionsForTest } from './data/questions';
import { INITIAL_LEADERBOARD } from './data/leaderboard';

const DEFAULT_USER_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBt2tqDZgN4wgdVHCa7P9KS9uMlGFmEOVRElo6RGaPHVX5J4T1CRp90RYk5PX33PSOOAoCx0KT1tBmtUHEHhcHohwvn56YBMWg3UYqI2Ztsvwh_Sea2EiZdVsk3X56PpHw-MLuvTD6D0_PkIM64D9yaTpyQzgCLDp9YZ-UJHEqPazlVUfxfWTUySpnennvBU8CQ6raW31_oQOpvzIJgrcOKGAoEVyLlD6Lw9dODUJIt5FuApP_ieh8-';

const INITIAL_USER: UserProfile = {
  fullName: 'Budi Santoso',
  ageRange: '25-34',
  education: 'Sarjana',
  iqScore: 115,
  level: 'Junior Logic',
  avatarUrl: DEFAULT_USER_AVATAR,
  completedTestsCount: 12,
  completedDailyChallenge: false,
  dailyChallengeProgress: 85,
  history: [
    {
      id: 'test_sample_1',
      date: '5 Agt 2026',
      testMode: 'quick',
      totalQuestions: 15,
      correctCount: 12,
      wrongCount: 2,
      skippedCount: 1,
      score: 115,
      levelTitle: 'Junior Logic',
      accuracyPercentage: 80,
      timeTakenSeconds: 380,
      answers: [],
      questions: []
    }
  ]
};

export default function App() {
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('iq_genius_user');
    if (saved) {
      try { return JSON.parse(saved); } catch { return INITIAL_USER; }
    }
    return INITIAL_USER;
  });

  const [viewState, setViewState] = useState<ViewState>('home');
  const [activeTestMode, setActiveTestMode] = useState<TestMode>('quick');
  const [activeCategory, setActiveCategory] = useState<CategoryType | undefined>();
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [latestResult, setLatestResult] = useState<TestResult | null>(null);
  const [showPembahasan, setShowPembahasan] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardItem[]>(INITIAL_LEADERBOARD);

  // Scroll to top automatically whenever viewState changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [viewState]);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('iq_genius_user', JSON.stringify(user));
  }, [user]);

  // Handle Onboarding Completion
  const handleOnboardingComplete = (profileData: Partial<UserProfile>) => {
    setUser(prev => ({
      ...prev,
      ...profileData,
    }));
    setViewState('home');
  };

  // Start Test Procedure
  const handleStartTest = (mode: TestMode, category?: CategoryType) => {
    setActiveTestMode(mode);
    setActiveCategory(category);
    const questions = getQuestionsForTest(mode, category);
    setActiveQuestions(questions);
    setViewState('active_test');
  };

  // Finish Test Callback
  const handleFinishTest = (result: TestResult) => {
    setLatestResult(result);

    // Update user profile
    setUser(prev => {
      const newScore = Math.max(prev.iqScore, result.score);
      let newLevel = prev.level;
      if (newScore >= 130) newLevel = 'Grand Master Logic';
      else if (newScore >= 120) newLevel = 'Genius Level';
      else if (newScore >= 110) newLevel = 'Junior Logic';

      const updatedHistory = [result, ...prev.history];

      return {
        ...prev,
        iqScore: newScore,
        level: newLevel,
        completedTestsCount: prev.completedTestsCount + 1,
        dailyChallengeProgress: result.testMode === 'daily' ? 100 : Math.min(prev.dailyChallengeProgress + 10, 100),
        history: updatedHistory,
      };
    });

    // Update leaderboard
    setLeaderboardData(prev => {
      return prev.map(item => {
        if (item.isCurrentUser) {
          return {
            ...item,
            score: Math.max(item.score, result.score),
            level: result.levelTitle,
            testsCount: item.testsCount + 1
          };
        }
        return item;
      }).sort((a, b) => b.score - a.score).map((item, idx) => ({ ...item, rank: idx + 1 }));
    });

    setViewState('test_results');
  };

  // Bottom Nav Switcher
  const handleSelectTab = (tab: 'home' | 'leaderboard' | 'profile') => {
    setShowPembahasan(false);
    setViewState(tab);
  };

  const handleUpdateProfile = (data: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...data }));
  };

  const handleResetData = () => {
    setUser(INITIAL_USER);
    localStorage.removeItem('iq_genius_user');
  };

  return (
    <div className="bg-background text-on-background min-h-screen selection:bg-secondary-container selection:text-on-secondary-container">
      {/* Conditionally render Header for main shell screens */}
      {(viewState === 'home' || viewState === 'leaderboard' || viewState === 'profile') && (
        <Header 
          user={user} 
          onOpenSettings={() => setShowSettingsModal(true)} 
          onNavigateHome={() => setViewState('home')}
        />
      )}

      {/* Main View Router */}
      {viewState === 'onboarding' && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}

      {viewState === 'home' && (
        <HomeDashboard 
          user={user} 
          onStartTest={handleStartTest} 
        />
      )}

      {viewState === 'active_test' && (
        <ActiveTest 
          user={user}
          questions={activeQuestions}
          testMode={activeTestMode}
          onFinishTest={handleFinishTest}
          onCancelTest={() => setViewState('home')}
        />
      )}

      {viewState === 'test_results' && latestResult && (
        <TestResults 
          user={user}
          result={latestResult}
          onOpenPembahasan={() => setShowPembahasan(true)}
          onReturnHome={() => setViewState('home')}
        />
      )}

      {viewState === 'leaderboard' && (
        <LeaderboardView items={leaderboardData} />
      )}

      {viewState === 'profile' && (
        <ProfileView 
          user={user}
          onUpdateProfile={handleUpdateProfile}
          onViewTestDetails={(hist) => {
            setLatestResult(hist);
            setShowPembahasan(true);
          }}
          onOpenSettings={() => setShowSettingsModal(true)}
        />
      )}

      {/* Answer Review Modal Overlay */}
      {showPembahasan && latestResult && (
        <PembahasanModal 
          result={latestResult}
          onClose={() => setShowPembahasan(false)}
        />
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <SettingsModal 
          onClose={() => setShowSettingsModal(false)}
          onResetData={handleResetData}
        />
      )}

      {/* Bottom Navbar for Main Views */}
      {(viewState === 'home' || viewState === 'leaderboard' || viewState === 'profile') && (
        <BottomNav 
          currentView={viewState} 
          onSelectTab={handleSelectTab} 
        />
      )}
    </div>
  );
}
