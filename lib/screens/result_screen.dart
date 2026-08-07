import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_state.dart';
import '../models/test_models.dart';
import '../components/review_modal.dart';

class ResultScreen extends StatelessWidget {
  const ResultScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final appState = Provider.of<AppState>(context);
    final result = appState.latestResult;

    if (result == null) return const Scaffold(body: Center(child: Text('No Result')));

    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.background,
      body: SafeArea(
        child: Column(
          children: [
            // Header
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: Row(
                children: [
                  CircleAvatar(
                    radius: 20,
                    backgroundImage: NetworkImage(appState.user.avatarUrl),
                  ),
                  const SizedBox(width: 12),
                  const Text(
                    'CognitiveLabs',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF24389C),
                    ),
                  ),
                  const Spacer(),
                  IconButton(
                    icon: const Icon(Icons.home_outlined, color: Color(0xFF24389C)),
                    onPressed: () => appState.setViewState(ViewState.home),
                  ),
                ],
              ),
            ),
            const Divider(height: 1),

            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(24),
                child: Column(
                  children: [
                    // Celebration Header
                    const Text(
                      'Hasil Tes Kamu!',
                      style: TextStyle(
                        fontSize: 28,
                        fontWeight: FontWeight.w900,
                        color: Color(0xFF24389C),
                      ),
                    ),
                    const SizedBox(height: 8),
                    const Text(
                      'Selamat! Kamu baru saja menyelesaikan penilaian kognitif tingkat lanjut dengan performa luar biasa.',
                      textAlign: TextAlign.center,
                      style: TextStyle(color: Colors.grey, fontSize: 14),
                    ),
                    const SizedBox(height: 40),
                    
                    // Score Display Focal Point
                    Stack(
                      alignment: Alignment.center,
                      children: [
                        // Background Shader
                        Container(
                          width: 240,
                          height: 240,
                          decoration: BoxDecoration(
                            color: Theme.of(context).colorScheme.secondaryContainer.withOpacity(0.2),
                            shape: BoxShape.circle,
                          ),
                        ),
                        // Circular Ring
                        SizedBox(
                          width: 200,
                          height: 200,
                          child: CircularProgressIndicator(
                            value: result.accuracyPercentage / 100,
                            strokeWidth: 16,
                            backgroundColor: Theme.of(context).colorScheme.surfaceVariant,
                            color: Theme.of(context).colorScheme.primary,
                            strokeCap: StrokeCap.round,
                          ),
                        ),
                        // Score Content
                        Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text(
                              '${result.score}',
                              style: const TextStyle(
                                fontSize: 64,
                                fontWeight: FontWeight.bold,
                                color: Color(0xFF24389C),
                                height: 1.1,
                              ),
                            ),
                            const SizedBox(height: 4),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                              decoration: BoxDecoration(
                                color: Theme.of(context).colorScheme.secondaryContainer,
                                borderRadius: BorderRadius.circular(20),
                              ),
                              child: Text(
                                result.levelTitle,
                                style: TextStyle(
                                  color: Theme.of(context).colorScheme.onSecondaryContainer,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 12,
                                  letterSpacing: 1.2,
                                ),
                              ),
                            ),
                          ],
                        ),
                        // Stars decoration
                        const Positioned(
                          top: 10,
                          right: 10,
                          child: Icon(Icons.stars, color: Color(0xFFFABD00), size: 32),
                        ),
                      ],
                    ),

                    const SizedBox(height: 48),

                    // Stats Bento Grid
                    Row(
                      children: [
                        Expanded(child: _buildResultCard(context, 'Benar', '${result.correctCount}', Icons.check_circle, Colors.teal)),
                        const SizedBox(width: 12),
                        Expanded(child: _buildResultCard(context, 'Salah', '${result.wrongCount}', Icons.cancel, Colors.red)),
                        const SizedBox(width: 12),
                        Expanded(child: _buildResultCard(context, 'Dilewati', '${result.skippedCount}', Icons.skip_next, Colors.grey)),
                      ],
                    ),

                    const SizedBox(height: 32),

                    // Cognitive Analysis Section
                    Container(
                      padding: const EdgeInsets.all(20),
                      decoration: BoxDecoration(
                        color: Theme.of(context).colorScheme.primaryContainer.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(color: Theme.of(context).colorScheme.primaryContainer.withOpacity(0.2)),
                      ),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Icon(Icons.psychology, color: Theme.of(context).colorScheme.primary, size: 28),
                          const SizedBox(width: 16),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  'Analisis Kognitif',
                                  style: TextStyle(
                                    fontSize: 18,
                                    fontWeight: FontWeight.bold,
                                    color: Theme.of(context).colorScheme.primary,
                                  ),
                                ),
                                const SizedBox(height: 8),
                                Text(
                                  'Skor Anda menunjukkan kemampuan penalaran abstrak yang sangat kuat di atas rata-rata populasi. Anda sangat mahir dalam mengenali pola kompleks dan memecahkan masalah logika dalam waktu singkat.',
                                  style: TextStyle(color: Colors.grey.shade700, fontSize: 13, height: 1.5),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),

                    const SizedBox(height: 40),

                    // Action Buttons
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton.icon(
                        onPressed: () {
                          showDialog(
                            context: context,
                            builder: (context) => ReviewModal(result: result),
                          );
                        },
                        icon: const Icon(Icons.menu_book),
                        label: const Text('Lihat Pembahasan'),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Theme.of(context).colorScheme.primary,
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(vertical: 20),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                          textStyle: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                          elevation: 4,
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                    SizedBox(
                      width: double.infinity,
                      child: OutlinedButton(
                        onPressed: () => appState.setViewState(ViewState.home),
                        style: OutlinedButton.styleFrom(
                          padding: const EdgeInsets.symmetric(vertical: 20),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                          side: BorderSide(color: Theme.of(context).colorScheme.primary.withOpacity(0.2)),
                        ),
                        child: Text(
                          'KEMBALI KE BERANDA',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                            letterSpacing: 2,
                            color: Theme.of(context).colorScheme.primary,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 40),
                    const Text(
                      'CognitiveLabs Intelligence Systems © 2024',
                      style: TextStyle(color: Colors.grey, fontSize: 10),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildResultCard(BuildContext context, String label, String value, IconData icon, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border(top: BorderSide(color: color, width: 4)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        children: [
          Icon(icon, color: color, size: 28),
          const SizedBox(height: 8),
          Text(
            label.toUpperCase(),
            style: const TextStyle(fontSize: 10, color: Colors.grey, fontWeight: FontWeight.bold),
          ),
          Text(
            value,
            style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w900, color: Colors.black87),
          ),
        ],
      ),
    );
  }
}
