import 'package:flutter/material.dart';
import '../models/test_models.dart';
import '../main.dart'; // For ViewState
import '../data/questions_data.dart';

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

  ViewState _viewState = ViewState.home;
  TestMode _activeTestMode = TestMode.quick;
  CategoryType? _activeCategory;
  List<Question> _activeQuestions = [];
  TestResult? _latestResult;

  UserProfile get user => _user;
  ViewState get viewState => _viewState;
  TestResult? get latestResult => _latestResult;
  List<Question> get activeQuestions => _activeQuestions;

  void setViewState(ViewState state) {
    _viewState = state;
    notifyListeners();
  }

  void startTest(TestMode mode, {CategoryType? category}) {
    _activeTestMode = mode;
    _activeCategory = category;
    // Logic to pick questions based on mode
    _activeQuestions = allQuestions.take(15).toList(); 
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

    _user = _user.copyWith(
      iqScore: newScore,
      level: newLevel,
      completedTestsCount: _user.completedTestsCount + 1,
      history: [result, ..._user.history],
    );

    _viewState = ViewState.testResults;
    notifyListeners();
  }
}
