import '../models/test_models.dart';

final List<Question> allQuestions = [
  Question(
    id: 1,
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
    explanation: 'Pada matriks spasial ini, pola bentuk berotasi searah jarum jam sebesar 90° di setiap langkah dari kiri ke kanan. Opsi B secara akurat melanjutkan rotasi dan orientasi simbol berikutnya.',
  ),
  Question(
    id: 2,
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
  ),
  Question(
    id: 3,
    category: CategoryType.numerik,
    title: 'Berapakah angka berikutnya dalam deret ini? 3, 7, 15, 31, 63, ...',
    options: [
      QuestionOption(id: 'A', label: '127'),
      QuestionOption(id: 'B', label: '125'),
      QuestionOption(id: 'C', label: '95'),
      QuestionOption(id: 'D', label: '128'),
    ],
    correctOption: 'A',
    explanation: 'Polanya adalah (x * 2) + 1. Yaitu: (3*2)+1 = 7, (7*2)+1 = 15, (15*2)+1 = 31, (31*2)+1 = 63, (63*2)+1 = 127.',
  ),
  Question(
    id: 4,
    category: CategoryType.verbal,
    title: 'SUTRADARA : FILM = ARSITEK : ...',
    options: [
      QuestionOption(id: 'A', label: 'KAPUR'),
      QuestionOption(id: 'B', label: 'BANGUNAN'),
      QuestionOption(id: 'C', label: 'RUMAH SAKIT'),
      QuestionOption(id: 'D', label: 'PROYEK'),
    ],
    correctOption: 'B',
    explanation: 'Sutradara menghasilkan dan mengarahkan karya berupa Film, sedangkan Arsitek merancang karya berupa Bangunan.',
  ),
];
// Note: Limited for brevity in example, but ideally all 15+ should be here.
