import React from 'react';
import { CategoryType, TestMode, UserProfile } from '../types';

interface HomeDashboardProps {
  user: UserProfile;
  onStartTest: (mode: TestMode, category?: CategoryType) => void;
  onViewCategoryModal?: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({ user, onStartTest }) => {
  return (
    <main className="pt-24 px-md pb-32 max-w-[800px] mx-auto space-y-lg min-h-screen">
      {/* Identity Summary Card (Custom Hero) */}
      <div className="relative overflow-hidden bg-primary-container rounded-xl p-lg text-on-primary-container shadow-lg">
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary opacity-20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-8 -bottom-8 w-40 h-40 bg-secondary opacity-10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
          <div>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg font-bold text-white mb-xs">
              Ringkasan IQ
            </h1>
            <p className="font-body-md text-body-md text-on-primary-container opacity-90">
              Terus berlatih untuk meningkatkan skor!
            </p>
          </div>

          <div className="flex gap-md items-center">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-sm border border-white/20 text-center min-w-[80px]">
              <span className="block font-label-md text-label-md text-white/80">Skor IQ</span>
              <span className="block font-headline-lg-mobile text-headline-lg-mobile font-extrabold text-white">
                {user.iqScore}
              </span>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-lg p-sm border border-white/20 text-center min-w-[80px]">
              <span className="block font-label-md text-label-md text-white/80">Level</span>
              <span className="block font-title-lg text-title-lg font-bold text-secondary-fixed">
                {user.level}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick & Full Test Section (Bento Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        {/* Large Hero Card: Quick Test */}
        <button 
          onClick={() => onStartTest('quick')}
          className="group relative flex flex-col items-start text-left bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant hover:shadow-md hover:border-primary transition-all active:scale-95 duration-200 cursor-pointer w-full"
        >
          <div className="w-12 h-12 bg-secondary-container rounded-lg flex items-center justify-center mb-md group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-on-secondary-container fill-1">bolt</span>
          </div>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary mb-xs">
            Mulai Tes Cepat
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-lg">
            Evaluasi kecerdasan harian hanya dalam 5-10 menit.
          </p>
          <div className="flex items-center gap-sm mt-auto">
            <span className="bg-surface-container-high px-sm py-xs rounded-full font-label-md text-label-md text-on-surface">
              15 Pertanyaan
            </span>
            <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </div>
        </button>

        {/* Secondary Card: Full Test */}
        <button 
          onClick={() => onStartTest('full')}
          className="group relative flex flex-col items-start text-left bg-primary p-lg rounded-xl shadow-lg border border-primary-container hover:shadow-xl transition-all active:scale-95 duration-200 cursor-pointer w-full"
        >
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-md group-hover:rotate-12 transition-transform">
            <span className="material-symbols-outlined text-white fill-1">workspace_premium</span>
          </div>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-white mb-xs">
            Ujian IQ Lengkap
          </h2>
          <p className="font-body-md text-body-md text-on-primary-container mb-lg">
            Tes komprehensif dengan sertifikat resmi Digital IQ.
          </p>
          <div className="flex items-center gap-sm mt-auto">
            <span className="bg-white/20 px-sm py-xs rounded-full font-label-md text-label-md text-white">
              40 Pertanyaan
            </span>
            <span className="material-symbols-outlined text-white group-hover:translate-x-1 transition-transform">
              card_membership
            </span>
          </div>
        </button>
      </div>

      {/* Exercise Categories Section */}
      <section className="space-y-md">
        <div className="flex justify-between items-center">
          <h3 className="font-title-lg text-title-lg font-bold text-on-surface">Kategori Latihan</h3>
          <button 
            onClick={() => onStartTest('category', 'spasial')} 
            className="text-primary font-label-lg text-label-lg hover:underline transition-all cursor-pointer"
          >
            Lihat Semua
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-sm">
          {/* Spasial */}
          <button 
            onClick={() => onStartTest('category', 'spasial')}
            className="bg-surface-container rounded-xl p-md flex flex-col items-center gap-sm border border-transparent hover:border-primary hover:bg-surface-container-low transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-secondary">category</span>
            </div>
            <span className="font-label-lg text-label-lg font-bold text-on-surface">Spasial</span>
          </button>

          {/* Logika */}
          <button 
            onClick={() => onStartTest('category', 'logika')}
            className="bg-surface-container rounded-xl p-md flex flex-col items-center gap-sm border border-transparent hover:border-primary hover:bg-surface-container-low transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-tertiary">psychology</span>
            </div>
            <span className="font-label-lg text-label-lg font-bold text-on-surface">Logika</span>
          </button>

          {/* Verbal */}
          <button 
            onClick={() => onStartTest('category', 'verbal')}
            className="bg-surface-container rounded-xl p-md flex flex-col items-center gap-sm border border-transparent hover:border-primary hover:bg-surface-container-low transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-primary">translate</span>
            </div>
            <span className="font-label-lg text-label-lg font-bold text-on-surface">Verbal</span>
          </button>

          {/* Numerik */}
          <button 
            onClick={() => onStartTest('category', 'numerik')}
            className="bg-surface-container rounded-xl p-md flex flex-col items-center gap-sm border border-transparent hover:border-primary hover:bg-surface-container-low transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-error">calculate</span>
            </div>
            <span className="font-label-lg text-label-lg font-bold text-on-surface">Numerik</span>
          </button>
        </div>
      </section>

      {/* Stats / Daily Challenge Card */}
      <div 
        onClick={() => onStartTest('daily')}
        className="bg-white rounded-xl p-lg shadow-sm border border-outline-variant flex flex-col sm:flex-row items-center gap-lg hover:border-primary transition-all cursor-pointer group"
      >
        <div className="shrink-0 w-24 h-24">
          <div className="relative w-full h-full rounded-full border-[8px] border-surface-container flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-[8px] border-t-secondary border-r-secondary border-b-secondary border-l-transparent -rotate-45"></div>
            <span className="font-title-lg text-title-lg font-extrabold text-primary">
              {user.dailyChallengeProgress}%
            </span>
          </div>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-xs">
            <h4 className="font-label-lg text-label-lg font-bold text-primary uppercase tracking-wider">
              Tantangan Harian
            </h4>
            <span className="bg-secondary-container text-on-secondary-container text-xs px-2 py-0.5 rounded-full font-bold">
              Bonus XP
            </span>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Selesaikan tantangan harian untuk bonus poin logika!
          </p>
          <div className="mt-md h-2 w-full bg-surface-container rounded-full overflow-hidden">
            <div 
              className="h-full bg-secondary rounded-full transition-all duration-500" 
              style={{ width: `${user.dailyChallengeProgress}%` }}
            ></div>
          </div>
        </div>

        <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform shrink-0 hidden sm:block">
          chevron_right
        </span>
      </div>
    </main>
  );
};
