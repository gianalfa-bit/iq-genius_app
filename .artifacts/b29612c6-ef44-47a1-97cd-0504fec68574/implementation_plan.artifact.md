# Migrasi IQ Genius ke Flutter

Rencana ini merinci langkah-langkah untuk mengonversi aplikasi "IQ Genius" dari React + TypeScript ke Flutter (Dart), dengan mempertahankan logika bisnis dan struktur data yang sama.

## Proposed Changes

### [Models & Data Layer]
Mentranslasikan model data dari TypeScript ke Dart.

#### [NEW] [models/test_models.dart](file:///D:/iq-genius111111/lib/models/test_models.dart)
Berisi class `Question`, `QuestionOption`, `TestResult`, `TestAnswer`, dan `UserProfile`.

#### [NEW] [data/questions_data.dart](file:///D:/iq-genius111111/lib/data/questions_data.dart)
Berisi variabel `allQuestions` yang merupakan daftar objek `Question` yang sama dengan versi React.

### [State Management]
Menggunakan `ChangeNotifier` untuk mengelola status aplikasi (user profile, navigasi, dan hasil tes).

#### [NEW] [providers/app_state.dart](file:///D:/iq-genius111111/lib/providers/app_state.dart)
Mengelola `UserProfile`, `ViewState`, dan `TestResult` terbaru.

### [UI Components (Screens)]
Membuat layar-layar utama yang sesuai dengan komponen React.

#### [NEW] [screens/home_screen.dart](file:///D:/iq-genius111111/lib/screens/home_screen.dart)
Ekuivalen dengan `HomeDashboard.tsx`.

#### [NEW] [screens/active_test_screen.dart](file:///D:/iq-genius111111/lib/screens/active_test_screen.dart)
Ekuivalen dengan `ActiveTest.tsx`. Menangani timer dan logika pemilihan jawaban.

#### [NEW] [screens/result_screen.dart](file:///D:/iq-genius111111/lib/screens/result_screen.dart)
Ekuivalen dengan `TestResults.tsx`. Menampilkan skor dan ringkasan tes.

#### [NEW] [main.dart](file:///D:/iq-genius111111/lib/main.dart)
Titik masuk aplikasi Flutter, mengatur tema (Material 3), dan routing dasar.

## Verification Plan

### Manual Verification
- Memastikan transisi antar layar (Home -> Test -> Result) berjalan lancar.
- Memverifikasi timer di layar tes berjalan dengan benar.
- Memastikan skor akhir dihitung dengan rumus yang sama.
