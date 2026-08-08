import '../models/test_models.dart';

final List<Question> allQuestions = [
  // --- REMAJA (13-17) ---
  Question(
    id: 101,
    category: CategoryType.logika,
    title: 'Jika semua kucing adalah hewan peliharaan, dan Tom adalah seekor kucing, maka...',
    options: [
      QuestionOption(id: 'A', label: 'Tom bukan hewan peliharaan'),
      QuestionOption(id: 'B', label: 'Tom adalah hewan peliharaan'),
      QuestionOption(id: 'C', label: 'Semua hewan peliharaan adalah kucing'),
      QuestionOption(id: 'D', label: 'Tom mungkin seekor anjing'),
    ],
    correctOption: 'B',
    explanation: 'Syllogisme sederhana: Semua A adalah B. X adalah A. Maka X adalah B.',
    ageRanges: ['13-17'],
  ),
  Question(
    id: 102,
    category: CategoryType.numerik,
    title: 'Berapakah 20% dari 500?',
    options: [
      QuestionOption(id: 'A', label: '50'),
      QuestionOption(id: 'B', label: '100'),
      QuestionOption(id: 'C', label: '150'),
      QuestionOption(id: 'D', label: '200'),
    ],
    correctOption: 'B',
    explanation: '0.20 * 500 = 100.',
    ageRanges: ['13-17'],
  ),
  Question(
    id: 103,
    category: CategoryType.verbal,
    title: 'PERSAMAAN KATA (SINONIM): "EKSAVASI"',
    options: [
      QuestionOption(id: 'A', label: 'Pencoretan'),
      QuestionOption(id: 'B', label: 'Penggalian'),
      QuestionOption(id: 'C', label: 'Pemindahan'),
      QuestionOption(id: 'D', label: 'Penghancuran'),
    ],
    correctOption: 'B',
    explanation: 'Eksavasi berarti penggalian (biasanya dalam konteks arkeologi).',
    ageRanges: ['13-17', '18-24'],
  ),

  // --- DEWASA MUDA (18-24 & 25-34) ---
  Question(
    id: 201,
    category: CategoryType.spasial,
    title: 'Manakah gambar yang melengkapi pola di bawah ini?',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOXaxlG_oDSTTNTDVHluY0WHmgDYjw4KcZ2luKjyNUK147eujODXlG07oZLo1rUrhUKlIQegEDk2ZQwVES2rgLRmXGIZR1GpO0grsGoP-UeodeKilR7sAZxdUbuJP2jqHddrE1RoB8oPoYqs2l27Jhsp_OhysqjJErYIYKyVjvu_KBGHRYnhpvRDFfPQtnNOIYglNUSgZ08f8Ri7mL3bR9oUyZjAAncaOV-qh3NGlsyMT3LBamaeAF',
    options: [
      QuestionOption(id: 'A', label: 'Opsi A', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnlNzVr0oLtBqfokLdNLeYRrjOwfZ4YxSwEaeGN7gurEmR4sAKahmAZkURosEO-WeX8Nau7c34d_82T81kk651GAOQ1m746p9H5R4txyCcdz-T2JdRuyfR7CLmNjeaOFIHE0uYN_sU4VMHEQBOVyt9GqR_VceKRejpvpWJbR5_PtRHWrePj__G4pOc2XnG4G4jmMLVtWP2F-xZTATsAvBWaWoPVYI90QT3_ZuWRSH5Flb82wYPSpws'),
      QuestionOption(id: 'B', label: 'Opsi B', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgu4CcDy1dICYQQMGPvZh_mz4TuI6K59kpz7JNNeEE1uRovrPyVjfhYWyHRcb3SFIATQIR7m6rQkvm2AgFAcWrajAT6nf6SEikJniE8n0RRIM3NklQgxnBhFRQ80flCmiu7jQoACqsV_2IJbLwXWYeOU7MOONIKwkmDn44uHjRuN0tdJtFBbEnB7kKHOj_IAlGEsSzkeV-71S1lC0DasSNyhBlEs787HV2aP4IxpZPV-F8Xx5y2cqQ'),
      QuestionOption(id: 'C', label: 'Opsi C', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0xYymMz0wj2tBs0RxWZC2qwX2VJbJERRiNxfEWrLtbSX6epCtbRJE2uRWHZMW46K_NTNxoHjSyJDciH-uq5r6-jkkMzQtdjdAnrrnJb5nIETyExlmid4fMZbkvrILs7QEEheyUs7iZGuP8B-dswRb3Gs8sd6gGkLDntqbvwj-1bvcKawqLGVNGvAGf5J2Sy28Ce92Q_YKfYEL_Sk5hZqYzdKo8IY6oaSRsA_E78zK7i4M-ZsL7y8w'),
      QuestionOption(id: 'D', label: 'Opsi D', image: 'https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg'),
    ],
    correctOption: 'B',
    explanation: 'Pada matriks spasial ini, pola bentuk berotasi searah jarum jam sebesar 90° di setiap langkah.',
    ageRanges: ['18-24', '25-34'],
  ),
  Question(
    id: 202,
    category: CategoryType.logika,
    title: 'Jika semua peneliti adalah pemikir, dan sebagian pemikir adalah seniman, manakah kesimpulan yang PALING tepat?',
    options: [
      QuestionOption(id: 'A', label: 'Semua seniman adalah peneliti'),
      QuestionOption(id: 'B', label: 'Sebagian pemikir bukan peneliti'),
      QuestionOption(id: 'C', label: 'Sebagian peneliti mungkin adalah seniman'),
      QuestionOption(id: 'D', label: 'Tidak ada seniman yang merupakan peneliti'),
    ],
    correctOption: 'C',
    explanation: 'Karena semua peneliti termasuk dalam himpunan pemikir, dan sebagian pemikir beririsan dengan himpunan seniman, maka ada kemungkinan sebagian peneliti juga merupakan seniman.',
    ageRanges: ['18-24', '25-34', '35+'],
  ),
  Question(
    id: 203,
    category: CategoryType.numerik,
    title: 'Berapakah angka berikutnya dalam deret ini? 3, 7, 15, 31, 63, ...',
    options: [
      QuestionOption(id: 'A', label: '127'),
      QuestionOption(id: 'B', label: '125'),
      QuestionOption(id: 'C', label: '95'),
      QuestionOption(id: 'D', label: '128'),
    ],
    correctOption: 'A',
    explanation: 'Polanya adalah (x * 2) + 1.',
    ageRanges: ['18-24', '25-34'],
  ),

  // --- MATANG (35+) ---
  Question(
    id: 301,
    category: CategoryType.logika,
    title: 'Dalam sebuah debat, jika A maka B. Jika tidak B maka C. Ternyata tidak C. Apa kesimpulannya?',
    options: [
      QuestionOption(id: 'A', label: 'A adalah salah'),
      QuestionOption(id: 'B', label: 'B adalah benar'),
      QuestionOption(id: 'C', label: 'A adalah benar'),
      QuestionOption(id: 'D', label: 'Tidak dapat disimpulkan'),
    ],
    correctOption: 'B',
    explanation: 'Jika tidak C, maka B (karena jika tidak B maka C). Jika B, kita tidak bisa menyimpulkan A secara pasti, tapi B terbukti benar.',
    ageRanges: ['35+'],
  ),
  Question(
    id: 302,
    category: CategoryType.numerik,
    title: 'Sebuah investasi tumbuh 10% di tahun pertama dan turun 10% di tahun kedua. Dibandingkan modal awal, investasi sekarang...',
    options: [
      QuestionOption(id: 'A', label: 'Tetap sama'),
      QuestionOption(id: 'B', label: 'Turun 1%'),
      QuestionOption(id: 'C', label: 'Naik 1%'),
      QuestionOption(id: 'D', label: 'Turun 2%'),
    ],
    correctOption: 'B',
    explanation: '100 + 10% = 110. 110 - 10% = 99. Jadi turun 1% (100 -> 99).',
    ageRanges: ['25-34', '35+'],
  ),
  Question(
    id: 303,
    category: CategoryType.verbal,
    title: 'Manakah kata yang memiliki makna Paling Berlawanan (Antonym) dengan kata "PROMINEN"?',
    options: [
      QuestionOption(id: 'A', label: 'Ternama'),
      QuestionOption(id: 'B', label: 'Samar / Terbelakang'),
      QuestionOption(id: 'C', label: 'Unggul'),
      QuestionOption(id: 'D', label: 'Dominan'),
    ],
    correctOption: 'B',
    explanation: 'Prominen berarti terkemuka. Antonimnya adalah samar atau tidak dikenal.',
    ageRanges: ['25-34', '35+'],
  ),

  // --- UMUM (SEMUA USIA) ---
  Question(
    id: 401,
    category: CategoryType.verbal,
    title: 'SUTRADARA : FILM = ARSITEK : ...',
    options: [
      QuestionOption(id: 'A', label: 'KAPUR'),
      QuestionOption(id: 'B', label: 'BANGUNAN'),
      QuestionOption(id: 'C', label: 'RUMAH SAKIT'),
      QuestionOption(id: 'D', label: 'PROYEK'),
    ],
    correctOption: 'B',
    explanation: 'Sutradara menghasilkan Film, Arsitek merancang Bangunan.',
    ageRanges: ['13-17', '18-24', '25-34', '35+'],
  ),
  Question(
    id: 402,
    category: CategoryType.logika,
    title: 'Hari ini hari Selasa. 100 hari dari sekarang adalah hari...',
    options: [
      QuestionOption(id: 'A', label: 'Kamis'),
      QuestionOption(id: 'B', label: 'Jumat'),
      QuestionOption(id: 'C', label: 'Sabtu'),
      QuestionOption(id: 'D', label: 'Minggu'),
    ],
    correctOption: 'A',
    explanation: '100 dibagi 7 adalah 14 sisa 2. Dua hari setelah Selasa adalah Kamis.',
    ageRanges: ['13-17', '18-24', '25-34', '35+'],
  ),
];
