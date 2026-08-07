enum CategoryType { spasial, logika, verbal, numerik }

enum TestMode { quick, full, category, daily }

enum ViewState { onboarding, home, activeTest, testResults, leaderboard, profile }

class QuestionOption {
  final String id; // 'A', 'B', 'C', 'D'
  final String label;
  final String? image;
  final String? svgContent;

  QuestionOption({
    required this.id,
    required this.label,
    this.image,
    this.svgContent,
  });
}

class Question {
  final int id;
  final CategoryType category;
  final String title;
  final String? imageUrl;
  final String? svgContent;
  final List<QuestionOption> options;
  final String correctOption; // 'A', 'B', 'C', 'D'
  final String explanation;

  Question({
    required this.id,
    required this.category,
    required this.title,
    this.imageUrl,
    this.svgContent,
    required this.options,
    required this.correctOption,
    required this.explanation,
  });
}

class TestAnswer {
  final int questionId;
  final String? selectedOption;
  final bool isCorrect;
  final int timeSpentSeconds;

  TestAnswer({
    required this.questionId,
    this.selectedOption,
    required this.isCorrect,
    required this.timeSpentSeconds,
  });
}

class TestResult {
  final String id;
  final DateTime date;
  final TestMode testMode;
  final CategoryType? category;
  final int totalQuestions;
  final int correctCount;
  final int wrongCount;
  final int skippedCount;
  final int score;
  final String levelTitle;
  final double accuracyPercentage;
  final int timeTakenSeconds;
  final List<TestAnswer> answers;
  final List<Question> questions;

  TestResult({
    required this.id,
    required this.date,
    required this.testMode,
    this.category,
    required this.totalQuestions,
    required this.correctCount,
    required this.wrongCount,
    required this.skippedCount,
    required this.score,
    required this.levelTitle,
    required this.accuracyPercentage,
    required this.timeTakenSeconds,
    required this.answers,
    required this.questions,
  });
}

class UserProfile {
  final String fullName;
  final String ageRange;
  final String education;
  final int iqScore;
  final String level;
  final String avatarUrl;
  final int completedTestsCount;
  final bool completedDailyChallenge;
  final int dailyChallengeProgress;
  final List<TestResult> history;

  UserProfile({
    required this.fullName,
    required this.ageRange,
    required this.education,
    required this.iqScore,
    required this.level,
    required this.avatarUrl,
    required this.completedTestsCount,
    required this.completedDailyChallenge,
    required this.dailyChallengeProgress,
    required this.history,
  });

  UserProfile copyWith({
    String? fullName,
    String? ageRange,
    String? education,
    int? iqScore,
    String? level,
    String? avatarUrl,
    int? completedTestsCount,
    bool? completedDailyChallenge,
    int? dailyChallengeProgress,
    List<TestResult>? history,
  }) {
    return UserProfile(
      fullName: fullName ?? this.fullName,
      ageRange: ageRange ?? this.ageRange,
      education: education ?? this.education,
      iqScore: iqScore ?? this.iqScore,
      level: level ?? this.level,
      avatarUrl: avatarUrl ?? this.avatarUrl,
      completedTestsCount: completedTestsCount ?? this.completedTestsCount,
      completedDailyChallenge: completedDailyChallenge ?? this.completedDailyChallenge,
      dailyChallengeProgress: dailyChallengeProgress ?? this.dailyChallengeProgress,
      history: history ?? this.history,
    );
  }
}

class LeaderboardItem {
  final int rank;
  final String name;
  final String avatarUrl;
  final int score;
  final String level;
  final int testsCount;
  final bool isCurrentUser;

  LeaderboardItem({
    required this.rank,
    required this.name,
    required this.avatarUrl,
    required this.score,
    required this.level,
    required this.testsCount,
    this.isCurrentUser = false,
  });
}
