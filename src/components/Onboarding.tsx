import React, { useState } from 'react';
import { UserProfile } from '../types';

interface OnboardingProps {
  onComplete: (profileData: Partial<UserProfile>) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [fullName, setFullName] = useState('Budi Santoso');
  const [ageRange, setAgeRange] = useState('25-34');
  const [education, setEducation] = useState('Sarjana');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !ageRange || !education) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onComplete({
        fullName: fullName.trim(),
        ageRange,
        education,
      });
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="bg-surface text-on-surface font-body-md onboarding-gradient min-h-screen flex flex-col items-center justify-center p-md">
      <main className="w-full max-w-[800px] px-margin-mobile md:px-xl py-xl flex flex-col min-h-screen md:min-h-0 md:justify-center">
        {/* Header Section */}
        <div className="text-center mb-xl animate-fade-in">
          <div className="inline-flex items-center justify-center p-md bg-secondary-fixed text-on-secondary-fixed rounded-full mb-md shadow-sm">
            <span className="material-symbols-outlined text-[32px]">psychology</span>
          </div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-primary mb-sm">
            Ayo Kenalan Lebih Dekat
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[500px] mx-auto">
            Kami menyesuaikan soal tes berdasarkan profil usiamu.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg p-lg border border-outline-variant">
          <form className="space-y-lg" id="onboardingForm" onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="relative group">
              <label 
                className="block font-label-lg text-label-lg text-primary mb-xs transition-colors group-focus-within:text-secondary" 
                htmlFor="fullName"
              >
                Nama Lengkap
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline">
                  person
                </span>
                <input 
                  className="w-full h-[56px] pl-[48px] pr-md rounded-xl border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 bg-surface-container-lowest transition-all outline-none" 
                  id="fullName" 
                  name="fullName" 
                  placeholder="Contoh: Budi Santoso" 
                  required 
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>

            {/* Bento Grid Layout for Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              {/* Age Selection */}
              <div className="relative group">
                <label className="block font-label-lg text-label-lg text-primary mb-xs" htmlFor="ageRange">
                  Rentang Usia
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline">
                    calendar_today
                  </span>
                  <select 
                    className="w-full h-[56px] pl-[48px] pr-md rounded-xl border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 bg-surface-container-lowest transition-all appearance-none outline-none cursor-pointer" 
                    id="ageRange" 
                    name="ageRange" 
                    required
                    value={ageRange}
                    onChange={(e) => setAgeRange(e.target.value)}
                  >
                    <option value="" disabled>Pilih Usia</option>
                    <option value="13-17">13-17 Tahun</option>
                    <option value="18-24">18-24 Tahun</option>
                    <option value="25-34">25-34 Tahun</option>
                    <option value="35+">35+ Tahun</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-md top-1/2 -translate-y-1/2 text-outline pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Education Selection */}
              <div className="relative group">
                <label className="block font-label-lg text-label-lg text-primary mb-xs" htmlFor="education">
                  Tingkat Pendidikan
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline">
                    school
                  </span>
                  <select 
                    className="w-full h-[56px] pl-[48px] pr-md rounded-xl border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 bg-surface-container-lowest transition-all appearance-none outline-none cursor-pointer" 
                    id="education" 
                    name="education" 
                    required
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                  >
                    <option value="" disabled>Pilih Pendidikan</option>
                    <option value="SD">SD</option>
                    <option value="SMP">SMP</option>
                    <option value="SMA">SMA</option>
                    <option value="Sarjana">Sarjana (S1)</option>
                    <option value="Pascasarjana">Pascasarjana (S2/S3)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-md top-1/2 -translate-y-1/2 text-outline pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="p-md bg-secondary-container/30 rounded-lg flex gap-md items-start border border-secondary/20">
              <span className="material-symbols-outlined text-secondary shrink-0 mt-0.5">info</span>
              <p className="font-label-md text-label-md text-on-secondary-fixed-variant">
                Data ini digunakan untuk menyesuaikan tingkat kesulitan algoritma penilaian IQ Anda agar lebih akurat.
              </p>
            </div>
          </form>
        </div>

        {/* Action Section */}
        <div className="mt-xl text-center">
          <button 
            type="submit" 
            form="onboardingForm"
            disabled={isSubmitting}
            className="w-full md:w-auto md:min-w-[240px] mx-auto h-[56px] bg-primary text-on-primary rounded-full font-label-lg text-label-lg shadow-lg hover:bg-primary-container hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-sm group cursor-pointer disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined animate-spin">progress_activity</span>
                <span>Memproses...</span>
              </>
            ) : (
              <>
                <span>Lanjutkan</span>
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </>
            )}
          </button>
          <p className="text-center mt-md font-label-md text-label-md text-outline">
            Langkah 1 dari 3
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-md text-center">
        <p className="font-label-md text-label-md text-on-surface-variant">
          Dengan melanjutkan, Anda menyetujui <a href="#" className="underline hover:text-primary">Syarat & Ketentuan</a> kami.
        </p>
      </footer>
    </div>
  );
};
