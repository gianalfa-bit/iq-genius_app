import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { TestResult, UserProfile } from '../types';

interface TestResultsProps {
  user: UserProfile;
  result: TestResult;
  onOpenPembahasan: () => void;
  onReturnHome: () => void;
}

export const TestResults: React.FC<TestResultsProps> = ({
  user,
  result,
  onOpenPembahasan,
  onReturnHome,
}) => {
  useEffect(() => {
    // Fire festive confetti upon viewing test results!
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#24389c', '#006a60', '#ffdf9e', '#ba1a1a'],
      });
    } catch {
      // Fallback ignore if confetti canvas unavailable
    }
  }, []);

  // Calculate score percentage for conic gradient ring
  const scorePct = Math.min(Math.max(Math.round(((result.score - 70) / 70) * 100), 15), 100);

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col overflow-x-hidden">
      {/* Top AppBar */}
      <header className="w-full top-0 bg-surface shadow-sm flex justify-between items-center px-md py-sm max-w-[800px] mx-auto z-50">
        <div className="flex items-center gap-sm">
          <div className="w-10 h-10 rounded-full bg-primary-fixed-dim flex items-center justify-center overflow-hidden">
            <img 
              className="w-full h-full object-cover" 
              src={user.avatarUrl} 
              alt={user.fullName}
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="font-headline-lg text-headline-lg font-bold text-primary">CognitiveLabs</span>
        </div>

        <button 
          onClick={onReturnHome}
          className="material-symbols-outlined text-primary hover:bg-surface-container-low transition-colors p-base rounded-lg active:scale-95 duration-100 cursor-pointer"
          title="Beranda"
        >
          home
        </button>
      </header>

      {/* Content Canvas */}
      <main className="flex-grow w-full max-w-[800px] mx-auto px-md pt-lg pb-xl relative">
        {/* Celebration Header */}
        <section className="text-center mb-xl animate-fade-in">
          <h1 className="font-headline-lg text-headline-lg font-extrabold text-primary mb-sm">
            Hasil Tes Kamu!
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md mx-auto">
            Selamat! Kamu baru saja menyelesaikan penilaian kognitif tingkat lanjut dengan performa luar biasa.
          </p>
        </section>

        {/* Score Display Area (The Focal Point) */}
        <section className="relative flex justify-center mb-xl">
          {/* Background Decorative Shader */}
          <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-20 pointer-events-none">
            <div className="w-72 h-72 bg-secondary-container blur-3xl rounded-full animate-pulse"></div>
          </div>

          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Circular Graphic */}
            <div 
              className="absolute inset-0 score-ring rounded-full shadow-lg"
              style={{ '--score-pct': `${scorePct}%` } as React.CSSProperties}
            ></div>

            <div className="z-10 text-center">
              <span className="block font-display-lg text-display-lg text-primary leading-none font-bold">
                {result.score}
              </span>
              <span className="inline-block mt-xs px-md py-xs bg-secondary-container text-on-secondary-container rounded-full font-label-lg text-label-lg uppercase tracking-wider font-bold shadow-xs">
                {result.levelTitle}
              </span>
            </div>

            {/* Floating Decorative Particles */}
            <div className="absolute -top-4 -right-2 text-tertiary-fixed-dim animate-bounce" style={{ animationDuration: '2s' }}>
              <span className="material-symbols-outlined text-4xl fill-1">stars</span>
            </div>
          </div>
        </section>

        {/* Mid Section: Breakdown Cards (Bento Grid Style) */}
        <section className="grid grid-cols-3 gap-md mb-xl">
          {/* Benar Card */}
          <div className="bg-surface-container-lowest border-t-4 border-secondary p-md rounded-xl shadow-sm flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-secondary text-3xl mb-sm fill-1">check_circle</span>
            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-tight">Benar</span>
            <span className="font-headline-lg text-headline-lg text-on-surface font-bold">{result.correctCount}</span>
          </div>

          {/* Salah Card */}
          <div className="bg-surface-container-lowest border-t-4 border-error p-md rounded-xl shadow-sm flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-error text-3xl mb-sm fill-1">cancel</span>
            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-tight">Salah</span>
            <span className="font-headline-lg text-headline-lg text-on-surface font-bold">{result.wrongCount}</span>
          </div>

          {/* Dilewati Card */}
          <div className="bg-surface-container-lowest border-t-4 border-outline p-md rounded-xl shadow-sm flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-outline text-3xl mb-sm fill-1">skip_next</span>
            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-tight">Dilewati</span>
            <span className="font-headline-lg text-headline-lg text-on-surface font-bold">{result.skippedCount}</span>
          </div>
        </section>

        {/* Insights Summary */}
        <section className="bg-primary-container/10 p-lg rounded-xl mb-xl border border-primary-container/20">
          <div className="flex items-start gap-md">
            <span className="material-symbols-outlined text-primary text-2xl mt-base shrink-0">psychology</span>
            <div>
              <h3 className="font-title-lg text-title-lg text-primary font-bold mb-xs">Analisis Kognitif</h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Skor Anda menunjukkan kemampuan penalaran abstrak yang sangat kuat di atas rata-rata populasi (Top {100 - Math.min(Math.round(result.accuracyPercentage * 0.9), 98)}%). Anda sangat mahir dalam mengenali pola kompleks dan memecahkan masalah logika dalam waktu singkat.
              </p>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="flex flex-col gap-sm">
          <button 
            onClick={onOpenPembahasan}
            className="w-full py-md bg-primary text-on-primary rounded-xl font-title-lg text-title-lg font-bold shadow-lg hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-sm cursor-pointer"
          >
            <span className="material-symbols-outlined">menu_book</span>
            Lihat Pembahasan
          </button>

          <button 
            onClick={onReturnHome}
            className="w-full py-md text-primary font-label-lg text-label-lg uppercase tracking-widest border border-primary/20 rounded-xl hover:bg-surface-container-low transition-colors active:scale-[0.98] cursor-pointer"
          >
            Kembali ke Beranda
          </button>
        </section>
      </main>

      {/* Footer Identity */}
      <footer className="mt-auto py-lg text-center opacity-50">
        <p className="font-label-md text-label-md">CognitiveLabs Intelligence Systems © 2024</p>
      </footer>
    </div>
  );
};
