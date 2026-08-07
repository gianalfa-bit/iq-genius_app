import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/app_state.dart';
import '../models/test_models.dart';
import 'dart:async';

class ActiveTestScreen extends StatefulWidget {
  const ActiveTestScreen({super.key});

  @override
  State<ActiveTestScreen> createState() => _ActiveTestScreenState();
}

class _ActiveTestScreenState extends State<ActiveTestScreen> {
  int _currentIndex = 0;
  final Map<int, String?> _answers = {};
  int _secondsRemaining = 600; // 10 minutes default
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _startTimer();
  }

  void _startTimer() {
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_secondsRemaining > 0) {
        setState(() => _secondsRemaining--);
      } else {
        _timer?.cancel();
        _finishTest();
      }
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  String _formatTime(int seconds) {
    int m = seconds ~/ 60;
    int s = seconds % 60;
    return '${m.toString().padLeft(2, '0')}:${s.toString().padLeft(2, '0')}';
  }

  void _finishTest() {
    final appState = Provider.of<AppState>(context, listen: false);
    final questions = appState.activeQuestions;
    
    int correct = 0;
    List<TestAnswer> answersList = [];

    for (var q in questions) {
      String? selected = _answers[q.id];
      bool isCorrect = selected == q.correctOption;
      if (isCorrect) correct++;
      
      answersList.add(TestAnswer(
        questionId: q.id,
        selectedOption: selected,
        isCorrect: isCorrect,
        timeSpentSeconds: 10, // Mock
      ));
    }

    final result = TestResult(
      id: 'test_${DateTime.now().millisecondsSinceEpoch}',
      date: DateTime.now(),
      testMode: TestMode.quick,
      totalQuestions: questions.length,
      correctCount: correct,
      wrongCount: questions.length - correct - _answers.values.where((e) => e == null).length,
      skippedCount: questions.length - _answers.length,
      score: (correct / questions.length * 100).toInt() + 50, // Simple IQ mock
      levelTitle: 'Junior Logic',
      accuracyPercentage: (correct / questions.length) * 100,
      timeTakenSeconds: 600 - _secondsRemaining,
      answers: answersList,
      questions: questions,
    );

    appState.finishTest(result);
  }

  @override
  Widget build(BuildContext context) {
    final appState = Provider.of<AppState>(context);
    final questions = appState.activeQuestions;
    final currentQuestion = questions[_currentIndex];

    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.close),
          onPressed: () => appState.setViewState(ViewState.home),
        ),
        title: Text('Soal ${_currentIndex + 1} / ${questions.length}'),
        actions: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            margin: const EdgeInsets.only(right: 16),
            decoration: BoxDecoration(
              color: Theme.of(context).colorScheme.primaryContainer,
              borderRadius: BorderRadius.circular(20),
            ),
            child: Row(
              children: [
                const Icon(Icons.timer_outlined, size: 18),
                const SizedBox(width: 4),
                Text(
                  _formatTime(_secondsRemaining),
                  style: const TextStyle(fontWeight: FontWeight.bold),
                ),
              ],
            ),
          ),
        ],
      ),
      body: Column(
        children: [
          LinearProgressIndicator(
            value: (_currentIndex + 1) / questions.length,
          ),
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    currentQuestion.title,
                    style: Theme.of(context).textTheme.titleLarge,
                  ),
                  const SizedBox(height: 20),
                  if (currentQuestion.imageUrl != null)
                    ClipRRect(
                      borderRadius: BorderRadius.circular(12),
                      child: Image.network(
                        currentQuestion.imageUrl!,
                        height: 200,
                        width: double.infinity,
                        fit: BoxFit.contain,
                      ),
                    ),
                  const SizedBox(height: 24),
                  ...currentQuestion.options.map((opt) => Padding(
                    padding: const EdgeInsets.only(bottom: 12.0),
                    child: InkWell(
                      onTap: () {
                        setState(() {
                          _answers[currentQuestion.id] = opt.id;
                        });
                      },
                      child: Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          color: _answers[currentQuestion.id] == opt.id
                              ? Theme.of(context).colorScheme.secondaryContainer
                              : Colors.white,
                          border: Border.all(
                            color: _answers[currentQuestion.id] == opt.id
                                ? Theme.of(context).colorScheme.secondary
                                : Colors.grey.shade300,
                            width: 2,
                          ),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Row(
                          children: [
                            CircleAvatar(
                              radius: 14,
                              backgroundColor: _answers[currentQuestion.id] == opt.id
                                  ? Theme.of(context).colorScheme.secondary
                                  : Colors.grey.shade200,
                              child: Text(
                                opt.id,
                                style: TextStyle(
                                  color: _answers[currentQuestion.id] == opt.id
                                      ? Colors.white
                                      : Colors.black,
                                  fontSize: 12,
                                ),
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(child: Text(opt.label)),
                          ],
                        ),
                      ),
                    ),
                  )),
                ],
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(20.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                OutlinedButton(
                  onPressed: _currentIndex > 0
                      ? () => setState(() => _currentIndex--)
                      : null,
                  child: const Text('Kembali'),
                ),
                ElevatedButton(
                  onPressed: () {
                    if (_currentIndex < questions.length - 1) {
                      setState(() => _currentIndex++);
                    } else {
                      _finishTest();
                    }
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Theme.of(context).colorScheme.primary,
                    foregroundColor: Colors.white,
                  ),
                  child: Text(_currentIndex < questions.length - 1 ? 'Lanjut' : 'Selesai'),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
