import 'package:flutter/material.dart';
import '../models/test_models.dart';

class ReviewModal extends StatefulWidget {
  final TestResult result;
  const ReviewModal({super.key, required this.result});

  @override
  State<ReviewModal> createState() => _ReviewModalState();
}

class _ReviewModalState extends State<ReviewModal> {
  int _activeIdx = 0;

  @override
  Widget build(BuildContext context) {
    final questions = widget.result.questions;
    final answers = widget.result.answers;
    final currentQ = questions[_activeIdx];
    final userAns = answers[_activeIdx];

    return Dialog(
      insetPadding: const EdgeInsets.all(16),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
      child: Container(
        constraints: const BoxConstraints(maxWidth: 750, maxHeight: 800),
        child: Column(
          children: [
            // Header
            Container(
              padding: const EdgeInsets.all(24),
              decoration: const BoxDecoration(
                color: Color(0xFF24389C),
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(24),
                  topRight: Radius.circular(24),
                ),
              ),
              child: Row(
                children: [
                  const Icon(Icons.menu_book, color: Colors.white, size: 28),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Pembahasan Soal #${_activeIdx + 1}',
                          style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white),
                        ),
                        Text(
                          'Ketepatan: ${widget.result.accuracyPercentage.toInt()}% • ${widget.result.correctCount} Benar, ${widget.result.wrongCount} Salah',
                          style: const TextStyle(fontSize: 12, color: Colors.white70),
                        ),
                      ],
                    ),
                  ),
                  IconButton(
                    onPressed: () => Navigator.pop(context),
                    icon: const Icon(Icons.close, color: Colors.white),
                  ),
                ],
              ),
            ),

            // Pills Nav
            Container(
              height: 70,
              padding: const EdgeInsets.symmetric(vertical: 12),
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 24),
                itemCount: questions.length,
                itemBuilder: (context, index) {
                  final ans = answers[index];
                  bool isCorrect = ans.isCorrect;
                  bool isSelected = index == _activeIdx;

                  Color bg = Theme.of(context).colorScheme.surfaceVariant;
                  Color text = Colors.grey.shade600;

                  if (isCorrect) {
                    bg = Theme.of(context).colorScheme.secondaryContainer;
                    text = Theme.of(context).colorScheme.onSecondaryContainer;
                  } else if (ans.selectedOption != null) {
                    bg = Theme.of(context).colorScheme.errorContainer;
                    text = Theme.of(context).colorScheme.onErrorContainer;
                  }

                  return Padding(
                    padding: const EdgeInsets.only(right: 8.0),
                    child: InkWell(
                      onTap: () => setState(() => _activeIdx = index),
                      child: Container(
                        width: 44,
                        decoration: BoxDecoration(
                          color: bg,
                          borderRadius: BorderRadius.circular(12),
                          border: isSelected ? Border.all(color: const Color(0xFF24389C), width: 2) : null,
                        ),
                        child: Center(
                          child: Text(
                            '${index + 1}',
                            style: TextStyle(
                              fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                              color: text,
                            ),
                          ),
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
            const Divider(height: 1),

            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(24),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Status Badge
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        _buildBadge(context, 'KATEGORI: ${currentQ.category.name.toUpperCase()}'),
                        if (userAns.selectedOption == null)
                          _buildStatusBadge(context, 'DILEWATI', Icons.skip_next, Colors.grey)
                        else if (userAns.isCorrect)
                          _buildStatusBadge(context, 'JAWABAN BENAR', Icons.check_circle, Colors.teal)
                        else
                          _buildStatusBadge(context, 'JAWABAN SALAH', Icons.cancel, Colors.red),
                      ],
                    ),
                    const SizedBox(height: 20),
                    Text(
                      currentQ.title,
                      style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
                    ),
                    if (currentQ.imageUrl != null) ...[
                      const SizedBox(height: 20),
                      ClipRRect(
                        borderRadius: BorderRadius.circular(16),
                        child: Container(
                          color: Theme.of(context).colorScheme.surfaceVariant.withOpacity(0.3),
                          padding: const EdgeInsets.all(16),
                          child: Image.network(
                            currentQ.imageUrl!,
                            width: double.infinity,
                            height: 180,
                            fit: BoxFit.contain,
                          ),
                        ),
                      ),
                    ],
                    const SizedBox(height: 24),

                    // Options Grid Comparison
                    LayoutBuilder(
                      builder: (context, constraints) {
                        return GridView.count(
                          shrinkWrap: true,
                          physics: const NeverScrollableScrollPhysics(),
                          crossAxisCount: constraints.maxWidth > 400 ? 2 : 1,
                          mainAxisSpacing: 12,
                          crossAxisSpacing: 12,
                          childAspectRatio: 2.5,
                          children: currentQ.options.map((opt) {
                            bool isCorrectOpt = currentQ.correctOption == opt.id;
                            bool isUserChoice = userAns.selectedOption == opt.id;

                            Color borderColor = Theme.of(context).colorScheme.outlineVariant;
                            Color bg = Colors.white;

                            if (isCorrectOpt) {
                              borderColor = Colors.teal;
                              bg = Colors.teal.withOpacity(0.05);
                            } else if (isUserChoice && !isCorrectOpt) {
                              borderColor = Colors.red;
                              bg = Colors.red.withOpacity(0.05);
                            }

                            return Container(
                              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                              decoration: BoxDecoration(
                                color: bg,
                                border: Border.all(color: borderColor, width: isCorrectOpt || isUserChoice ? 2 : 1),
                                borderRadius: BorderRadius.circular(16),
                              ),
                              child: Row(
                                children: [
                                  CircleAvatar(
                                    radius: 16,
                                    backgroundColor: isCorrectOpt ? Colors.teal : isUserChoice ? Colors.red : Theme.of(context).colorScheme.surfaceVariant,
                                    child: Text(
                                      opt.id,
                                      style: TextStyle(
                                        color: isCorrectOpt || isUserChoice ? Colors.white : Colors.black87,
                                        fontSize: 14,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ),
                                  const SizedBox(width: 12),
                                  Expanded(
                                    child: opt.image != null
                                        ? Image.network(opt.image!, height: 40, fit: BoxFit.contain)
                                        : Text(opt.label, style: const TextStyle(fontSize: 14)),
                                  ),
                                  if (isCorrectOpt) _buildLabelTag('Kunci', Colors.teal),
                                  if (isUserChoice && !isCorrectOpt) _buildLabelTag('Pilihanmu', Colors.red),
                                ],
                              ),
                            );
                          }).toList(),
                        );
                      },
                    ),

                    const SizedBox(height: 24),

                    // Explanation Box
                    Container(
                      padding: const EdgeInsets.all(20),
                      decoration: BoxDecoration(
                        color: Colors.teal.withOpacity(0.05),
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(color: Colors.teal.withOpacity(0.2)),
                      ),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Icon(Icons.lightbulb, color: Colors.teal, size: 28),
                          const SizedBox(width: 16),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text(
                                  'Penjelasan Logika:',
                                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.teal),
                                ),
                                const SizedBox(height: 8),
                                Text(
                                  currentQ.explanation,
                                  style: const TextStyle(fontSize: 14, height: 1.5, color: Colors.black87),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // Footer
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                border: Border(top: BorderSide(color: Theme.of(context).colorScheme.outlineVariant)),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  OutlinedButton(
                    onPressed: _activeIdx > 0 ? () => setState(() => _activeIdx--) : null,
                    style: OutlinedButton.styleFrom(
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                    child: const Text('Sebelumnya'),
                  ),
                  Text(
                    '${_activeIdx + 1} / ${questions.length}',
                    style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.grey),
                  ),
                  ElevatedButton(
                    onPressed: _activeIdx < questions.length - 1 ? () => setState(() => _activeIdx++) : null,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF24389C),
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                    child: const Text('Berikutnya'),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBadge(BuildContext context, String text) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.primaryContainer.withOpacity(0.2),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(
        text,
        style: TextStyle(
          fontSize: 10,
          fontWeight: FontWeight.bold,
          color: Theme.of(context).colorScheme.primary,
          letterSpacing: 1.2,
        ),
      ),
    );
  }

  Widget _buildStatusBadge(BuildContext context, String text, IconData icon, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 14, color: color),
          const SizedBox(width: 4),
          Text(
            text,
            style: TextStyle(color: color, fontSize: 12, fontWeight: FontWeight.bold),
          ),
        ],
      ),
    );
  }

  Widget _buildLabelTag(String text, Color color) {
    return Container(
      margin: const EdgeInsets.only(left: 8),
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Text(
        text.toUpperCase(),
        style: const TextStyle(color: Colors.white, fontSize: 8, fontWeight: FontWeight.bold),
      ),
    );
  }
}
