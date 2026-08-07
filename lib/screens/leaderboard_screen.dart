import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_state.dart';
import '../components/iq_bottom_nav.dart';
import '../models/test_models.dart';

class LeaderboardScreen extends StatelessWidget {
  const LeaderboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final appState = Provider.of<AppState>(context);
    final items = appState.leaderboard;

    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.background,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Blue Trophy Banner
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  color: Theme.of(context).colorScheme.primary,
                  borderRadius: BorderRadius.circular(24),
                  boxShadow: [
                    BoxShadow(
                      color: Theme.of(context).colorScheme.primary.withOpacity(0.3),
                      blurRadius: 15,
                      offset: const Offset(0, 8),
                    ),
                  ],
                ),
                child: Stack(
                  children: [
                    Positioned(
                      right: -40,
                      bottom: -40,
                      child: Opacity(
                        opacity: 0.1,
                        child: Icon(Icons.emoji_events, size: 200, color: Colors.white),
                      ),
                    ),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                          decoration: BoxDecoration(
                            color: Colors.white.withOpacity(0.2),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: const Text(
                            'Peringkat Nasional IQ',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 10,
                              fontWeight: FontWeight.bold,
                              letterSpacing: 1,
                            ),
                          ),
                        ),
                        const SizedBox(height: 8),
                        const Text(
                          'Papan Peringkat',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 28,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 4),
                        const Text(
                          'Kompetisi kognitif tertinggi antar para pemikir terbaik.',
                          style: TextStyle(color: Colors.white70, fontSize: 13),
                        ),
                      ],
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 32),

              // Podium Section
              if (items.length >= 3)
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    _buildPodiumItem(context, items[1], 2),
                    _buildPodiumItem(context, items[0], 1),
                    _buildPodiumItem(context, items[2], 3),
                  ],
                ),

              const SizedBox(height: 32),

              // Leaderboard List
              Container(
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(24),
                  border: Border.all(color: Colors.grey.shade200),
                ),
                child: Column(
                  children: [
                    Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Row(
                        children: const [
                          Expanded(flex: 2, child: Text('Posisi', textAlign: TextAlign.center, style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.grey))),
                          Expanded(flex: 6, child: Text('Pengguna', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.grey))),
                          Expanded(flex: 2, child: Text('Ujian', textAlign: TextAlign.center, style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.grey))),
                          Expanded(flex: 2, child: Text('Skor IQ', textAlign: TextAlign.right, style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.grey))),
                        ],
                      ),
                    ),
                    const Divider(height: 1),
                    ListView.separated(
                      shrinkWrap: true,
                      physics: const NeverScrollableScrollPhysics(),
                      itemCount: items.length,
                      separatorBuilder: (context, index) => const Divider(height: 1),
                      itemBuilder: (context, index) {
                        final item = items[index];
                        return Container(
                          color: item.isCurrentUser ? Theme.of(context).colorScheme.secondaryContainer.withOpacity(0.3) : null,
                          padding: const EdgeInsets.all(16),
                          child: Row(
                            children: [
                              Expanded(
                                flex: 2,
                                child: Center(
                                  child: Container(
                                    width: 28,
                                    height: 28,
                                    decoration: BoxDecoration(
                                      color: _getRankBg(item.rank),
                                      shape: BoxShape.circle,
                                    ),
                                    child: Center(
                                      child: Text(
                                        '#${item.rank}',
                                        style: TextStyle(
                                          fontSize: 10,
                                          fontWeight: FontWeight.bold,
                                          color: _getRankTextColor(item.rank),
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                              Expanded(
                                flex: 6,
                                child: Row(
                                  children: [
                                    CircleAvatar(
                                      radius: 18,
                                      backgroundImage: NetworkImage(item.avatarUrl),
                                    ),
                                    const SizedBox(width: 12),
                                    Expanded(
                                      child: Column(
                                        crossAxisAlignment: CrossAxisAlignment.start,
                                        children: [
                                          Row(
                                            children: [
                                              Flexible(
                                                child: Text(
                                                  item.name,
                                                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                                                  overflow: TextOverflow.ellipsis,
                                                ),
                                              ),
                                              if (item.isCurrentUser)
                                                Container(
                                                  margin: const EdgeInsets.only(left: 4),
                                                  padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 2),
                                                  decoration: BoxDecoration(color: Theme.of(context).colorScheme.primary, borderRadius: BorderRadius.circular(4)),
                                                  child: const Text('Kamu', style: TextStyle(color: Colors.white, fontSize: 8, fontWeight: FontWeight.bold)),
                                                ),
                                            ],
                                          ),
                                          Text(item.level, style: const TextStyle(fontSize: 10, color: Colors.grey)),
                                        ],
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              Expanded(
                                flex: 2,
                                child: Text('${item.testsCount}x', textAlign: TextAlign.center, style: const TextStyle(fontSize: 12)),
                              ),
                              Expanded(
                                flex: 2,
                                child: Text('${item.score}', textAlign: TextAlign.right, style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900, color: Theme.of(context).colorScheme.primary)),
                              ),
                            ],
                          ),
                        );
                      },
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 80),
            ],
          ),
        ),
      ),
      bottomNavigationBar: IQBottomNav(
        currentIndex: 1,
        onTap: (index) {
          if (index == 0) appState.setViewState(ViewState.home);
          if (index == 2) appState.setViewState(ViewState.profile);
        },
      ),
    );
  }

  Widget _buildPodiumItem(BuildContext context, LeaderboardItem item, int rank) {
    bool isFirst = rank == 1;
    double avatarSize = isFirst ? 80 : 60;
    Color borderColor = rank == 1 ? const Color(0xFFFABD00) : rank == 2 ? Colors.grey.shade400 : const Color(0xFF745600);

    return Column(
      children: [
        if (isFirst)
          const Icon(Icons.workspace_premium, color: Color(0xFFFABD00), size: 24),
        const SizedBox(height: 4),
        Stack(
          alignment: Alignment.center,
          children: [
            Container(
              padding: EdgeInsets.all(isFirst ? 4 : 2),
              decoration: BoxDecoration(
                color: borderColor,
                shape: BoxShape.circle,
              ),
              child: CircleAvatar(
                radius: avatarSize / 2,
                backgroundImage: NetworkImage(item.avatarUrl),
              ),
            ),
            Positioned(
              bottom: -4,
              child: Container(
                width: 24,
                height: 24,
                decoration: BoxDecoration(
                  color: borderColor,
                  shape: BoxShape.circle,
                  border: Border.all(color: Colors.white, width: 2),
                ),
                child: Center(
                  child: Text(
                    '$rank',
                    style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),
                  ),
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 12),
        SizedBox(
          width: 100,
          child: Text(
            item.name,
            textAlign: TextAlign.center,
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: isFirst ? 14 : 12),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
        ),
        Text(
          '${item.score}',
          style: TextStyle(
            fontSize: isFirst ? 24 : 18,
            fontWeight: FontWeight.w900,
            color: Theme.of(context).colorScheme.primary,
          ),
        ),
        Text(
          item.level,
          style: TextStyle(fontSize: 10, color: isFirst ? Theme.of(context).colorScheme.secondary : Colors.grey),
        ),
      ],
    );
  }

  Color _getRankBg(int rank) {
    if (rank == 1) return const Color(0xFFFFDF9E);
    if (rank == 2) return Colors.grey.shade200;
    if (rank == 3) return Colors.amber.shade100;
    return Colors.transparent;
  }

  Color _getRankTextColor(int rank) {
    if (rank == 1) return const Color(0xFF261A00);
    if (rank == 2) return Colors.black87;
    if (rank == 3) return const Color(0xFF5B4300);
    return Colors.grey;
  }
}
