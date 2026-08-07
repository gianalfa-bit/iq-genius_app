import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'models/test_models.dart';
import 'providers/app_state.dart';
import 'screens/home_screen.dart';
import 'screens/active_test_screen.dart';
import 'screens/result_screen.dart';

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
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF24389C),
          primary: const Color(0xFF24389C),
          onPrimary: Colors.white,
          secondary: const Color(0xFF006A60),
          onSecondary: Colors.white,
          background: const Color(0xFFF9F9F9),
          surface: const Color(0xFFF9F9F9),
          error: const Color(0xFFBA1A1A),
          tertiary: const Color(0xFF574000),
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
      case ViewState.home:
        return const HomeScreen();
      case ViewState.activeTest:
        return const ActiveTestScreen();
      case ViewState.testResults:
        return const ResultScreen();
      default:
        return const HomeScreen();
    }
  }
}

enum ViewState { home, activeTest, testResults }
