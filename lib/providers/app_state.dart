import 'package:flutter/material.dart';
import '../models/test_models.dart';
import '../data/questions_data.dart';
import '../data/leaderboard_data.dart';

class AppState extends ChangeNotifier {
  UserProfile _user = UserProfile(
    fullName: 'Budi Santoso',
    ageRange: '25-34',
    education: 'Sarjana',
    iqScore: 115,
    level: 'Junior Logic',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBt2tqDZgN4wgdVHCa7P9KS9uMlGFmEOVRElo6RGaPHVX5J4T1CRp90RYk5PX33PSOOAoCx0KT1tBmtUHEHhcHohwvn56YBMWg3UYqI2Ztsvwh_Sea2EiZdVsk3X56PpHw-MLuvTD6D0_PkIM64D9yaTpyQzgCLDp9YZ-UJHEqPazlVUfxfWTUySpnennvBU8CQ6raW31_oQOpvzIJgrcOKGAoEVyLlD6Lw9dODUJIt5FuApP_ieh8-',
    completedTestsCount: 12,
    completedDailyChallenge: false,
    dailyChallengeProgress: 85,
    history: [],
  );

  ViewState _viewState = ViewState.onboarding; 
  TestMode _activeTestMode = TestMode.quick;
  CategoryType? _activeCategory;
  List<Question> _activeQuestions = [];
  TestResult? _latestResult;
  List<LeaderboardItem> _leaderboard = initialLeaderboard;

  UserProfile get user => _user;
  ViewState get viewState => _viewState;
  TestResult? get latestResult => _latestResult;
  List<Question> get activeQuestions => _activeQuestions;
  List<LeaderboardItem> get leaderboard => _leaderboard;

  void setViewState(ViewState state) {
    _viewState = state;
    notifyListeners();
  }

  void updateProfile(String name, String age, String edu) {
    _user = _user.copyWith(
      fullName: name,
      ageRange: age,
      education: edu,
    );
    notifyListeners();
  }

  void startTest(TestMode mode, {CategoryType? category}) {
    _activeTestMode = mode;
    _activeCategory = category;

    // Filter questions by user's age range
    final filteredQuestions = allQuestions.where((q) => q.ageRanges.contains(_user.ageRange)).toList();

    // Logic to pick questions based on mode
    if (mode == TestMode.quick) {
      _activeQuestions = (filteredQuestions..shuffle()).take(15).toList();
      // If not enough questions for specific age, fallback to all questions
      if (_activeQuestions.length < 5) {
        _activeQuestions = allQuestions.take(15).toList();
      }
    } else if (mode == TestMode.full) {
      _activeQuestions = List.generate(40, (index) {
        final q = filteredQuestions[index % filteredQuestions.length];
        return q;
      });
    } else if (mode == TestMode.category && category != null) {
      _activeQuestions = filteredQuestions.where((q) => q.category == category).take(10).toList();
      if (_activeQuestions.isEmpty) {
        _activeQuestions = allQuestions.where((q) => q.category == category).take(10).toList();
      }
    } else {
      _activeQuestions = filteredQuestions.take(10).toList();
    }
    
    _viewState = ViewState.activeTest;
    notifyListeners();
  }

  void finishTest(TestResult result) {
    _latestResult = result;
    
    // Update user profile logic
    int newScore = result.score > _user.iqScore ? result.score : _user.iqScore;
    String newLevel = _user.level;
    if (newScore >= 130) newLevel = 'Grand Master Logic';
    else if (newScore >= 120) newLevel = 'Genius Level';
    else if (newScore >= 110) newLevel = 'Junior Logic';

    _user = _user.copyWith(
      iqScore: newScore,
      level: newLevel,
      completedTestsCount: _user.completedTestsCount + 1,
      history: [result, ..._user.history],
      dailyChallengeProgress: result.testMode == TestMode.daily ? 100 : (_user.dailyChallengeProgress + 10).clamp(0, 100),
    );

    // Update leaderboard if is current user
    _leaderboard = _leaderboard.map((item) {
      if (item.isCurrentUser) {
        return LeaderboardItem(
          rank: item.rank,
          name: item.name,
          avatarUrl: item.avatarUrl,
          score: newScore > item.score ? newScore : item.score,
          level: newLevel,
          testsCount: item.testsCount + 1,
          isCurrentUser: true,
        );
      }
      return item;
    }).toList();
    _leaderboard.sort((a, b) => b.score.compareTo(a.score));
    // Re-rank
    for (int i = 0; i < _leaderboard.length; i++) {
      final item = _leaderboard[i];
      _leaderboard[i] = LeaderboardItem(
        rank: i + 1,
        name: item.name,
        avatarUrl: item.avatarUrl,
        score: item.score,
        level: item.level,
        testsCount: item.testsCount,
        isCurrentUser: item.isCurrentUser,
      );
    }

    _viewState = ViewState.testResults;
    notifyListeners();
  }
}
