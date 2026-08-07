import 'package:flutter/material.dart';

class IQBottomNav extends StatelessWidget {
  final int currentIndex;
  final Function(int) onTap;

  const IQBottomNav({
    super.key,
    required this.currentIndex,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return NavigationBar(
      selectedIndex: currentIndex,
      onDestinationSelected: onTap,
      backgroundColor: Colors.white,
      destinations: const [
        NavigationDestination(
          icon: Icon(Icons.home_outlined),
          selectedIcon: Icon(Icons.home, color: Color(0xFF24389C)),
          label: 'Home',
        ),
        NavigationDestination(
          icon: Icon(Icons.leaderboard_outlined),
          selectedIcon: Icon(Icons.leaderboard, color: Color(0xFF24389C)),
          label: 'Peringkat',
        ),
        NavigationDestination(
          icon: Icon(Icons.person_outline),
          selectedIcon: Icon(Icons.person, color: Color(0xFF24389C)),
          label: 'Profil',
        ),
      ],
    );
  }
}
