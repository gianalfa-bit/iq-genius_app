import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'models/test_models.dart';
import 'providers/app_state.dart';
import 'screens/home_screen.dart';
import 'screens/active_test_screen.dart';
import 'screens/result_screen.dart';
import 'screens/onboarding_screen.dart';
import 'screens/leaderboard_screen.dart';
import 'screens/profile_screen.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => AppState(),
      child: const IQGeniusApp(),
    ),
  );
}

class IQGeniusApp extends StatelessWidget {
  const IQGeniusApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'IQ Genius',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: const ColorScheme(
          brightness: Brightness.light,
          primary: Color(0xFF24389C),
          onPrimary: Colors.white,
          primaryContainer: Color(0xFF3F51B5),
          onPrimaryContainer: Color(0xFFCACFFF),
          secondary: Color(0xFF006A60),
          onSecondary: Colors.white,
          secondaryContainer: Color(0xFF85F6E5),
          onSecondaryContainer: Color(0xFF007166),
          tertiary: Color(0xFF574000),
          onTertiary: Colors.white,
          tertiaryContainer: Color(0xFF745600),
          onTertiaryContainer: Color(0xFFFFCC55),
          error: Color(0xFFBA1A1A),
          onError: Colors.white,
          background: Color(0xFFF9F9F9),
          onBackground: Color(0xFF1A1C1C),
          surface: Color(0xFFF9F9F9),
          onSurface: Color(0xFF1A1C1C),
          surfaceVariant: Color(0xFFE2E2E2),
          onSurfaceVariant: Color(0xFF454652),
          outline: Color(0xFF757684),
        ),
        textTheme: const TextTheme(
          displayLarge: TextStyle(
            fontSize: 57,
            height: 64 / 57,
            letterSpacing: -0.02,
            fontWeight: FontWeight.bold,
            fontFamily: 'Inter',
          ),
          headlineLarge: TextStyle(
            fontSize: 32,
            height: 40 / 32,
            fontWeight: FontWeight.w600,
            fontFamily: 'Inter',
          ),
          titleLarge: TextStyle(
            fontSize: 22,
            height: 28 / 22,
            fontWeight: FontWeight.w500,
            fontFamily: 'Inter',
          ),
          bodyLarge: TextStyle(
            fontSize: 16,
            height: 24 / 16,
            fontWeight: FontWeight.normal,
            fontFamily: 'Inter',
          ),
          labelLarge: TextStyle(
            fontSize: 14,
            height: 20 / 14,
            letterSpacing: 0.1,
            fontWeight: FontWeight.w600,
            fontFamily: 'Inter',
          ),
          labelMedium: TextStyle(
            fontSize: 12,
            height: 16 / 12,
            fontWeight: FontWeight.w600,
            fontFamily: 'Inter',
          ),
        ),
      ),
      home: const MainViewRouter(),
    );
  }
}

class MainViewRouter extends StatelessWidget {
  const MainViewRouter({super.key});

  @override
  Widget build(BuildContext context) {
    final appState = Provider.of<AppState>(context);

    switch (appState.viewState) {
      case ViewState.onboarding:
        return const OnboardingScreen();
      case ViewState.home:
        return const HomeScreen();
      case ViewState.activeTest:
        return const ActiveTestScreen();
      case ViewState.testResults:
        return const ResultScreen();
      case ViewState.leaderboard:
        return const LeaderboardScreen();
      case ViewState.profile:
        return const ProfileScreen();
      default:
        return const HomeScreen();
    }
  }
}
