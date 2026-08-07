import React, { useState } from 'react';
import { UserProfile, TestResult } from '../types';

interface ProfileViewProps {
  user: UserProfile;
  onUpdateProfile: (data: Partial<UserProfile>) => void;
  onViewTestDetails: (result: TestResult) => void;
  onOpenSettings: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  onUpdateProfile,
  onViewTestDetails,
  onOpenSettings,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(user.fullName);
  const [education, setEducation] = useState(user.education);
  const [ageRange, setAgeRange] = useState(user.ageRange);
  const [showCertificate, setShowCertificate] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      fullName,
      education,
      ageRange,
    });
    setIsEditing(false);
  };

  return (
    <main className="pt-24 px-md pb-32 max-w-[800px] mx-auto space-y-lg min-h-screen animate-fade-in">
      {/* Profile Banner */}
      <div className="bg-surface-container-lowest p-lg rounded-2xl border border-outline-variant shadow-sm flex flex-col md:flex-row items-center gap-lg">
        <div className="relative shrink-0">
          <img 
            src={user.avatarUrl} 
            alt={user.fullName}
            className="w-24 h-24 rounded-full object-cover border-4 border-primary-container shadow-md"
            referrerPolicy="no-referrer"
          />
          <span className="absolute bottom-0 right-0 bg-secondary text-white p-1 rounded-full text-xs shadow-sm" title="Terverifikasi">
            <span className="material-symbols-outlined text-base">verified</span>
          </span>
        </div>

        <div className="flex-1 text-center md:text-left space-y-1">
          <h2 className="font-headline-lg text-headline-lg font-bold text-primary">{user.fullName}</h2>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-sm text-on-surface-variant">
            <span className="bg-surface-container px-2.5 py-1 rounded-full font-medium">
              Usia: {user.ageRange} Tahun
            </span>
            <span className="bg-surface-container px-2.5 py-1 rounded-full font-medium">
              Pendidikan: {user.education}
            </span>
          </div>
          <p className="text-xs text-outline pt-1">
            Anggota CognitiveLabs sejak 2024 • {user.completedTestsCount} Sesi Ujian Selesai
          </p>
        </div>

        <div className="flex flex-col gap-2 w-full md:w-auto">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-md py-sm rounded-xl border border-primary text-primary font-label-lg hover:bg-primary/5 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">edit</span>
            {isEditing ? 'Batal' : 'Edit Profil'}
          </button>

          <button
            onClick={() => setShowCertificate(true)}
            className="px-md py-sm rounded-xl bg-primary text-white font-label-lg hover:bg-primary-container transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
          >
            <span className="material-symbols-outlined text-sm">workspace_premium</span>
            Sertifikat IQ
          </button>
        </div>
      </div>

      {/* Edit Form Drawer */}
      {isEditing && (
        <form onSubmit={handleSave} className="bg-surface-container-low p-lg rounded-2xl border border-outline-variant space-y-md animate-fade-in">
          <h3 className="font-title-lg text-primary font-bold">Edit Informasi Profil</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Nama Lengkap</label>
              <input 
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-outline-variant bg-white text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Rentang Usia</label>
              <select 
                value={ageRange}
                onChange={e => setAgeRange(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-outline-variant bg-white text-sm"
              >
                <option value="13-17">13-17 Tahun</option>
                <option value="18-24">18-24 Tahun</option>
                <option value="25-34">25-34 Tahun</option>
                <option value="35+">35+ Tahun</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1">Pendidikan</label>
              <select 
                value={education}
                onChange={e => setEducation(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-outline-variant bg-white text-sm"
              >
                <option value="SD">SD</option>
                <option value="SMP">SMP</option>
                <option value="SMA">SMA</option>
                <option value="Sarjana">Sarjana (S1)</option>
                <option value="Pascasarjana">Pascasarjana (S2/S3)</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button 
              type="button" 
              onClick={() => setIsEditing(false)}
              className="px-md py-sm rounded-lg border border-outline-variant text-sm font-bold cursor-pointer"
            >
              Batal
            </button>
            <button 
              type="submit"
              className="px-md py-sm rounded-lg bg-primary text-white text-sm font-bold cursor-pointer hover:bg-primary-container"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      )}

      {/* IQ Metrics & Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant text-center">
          <span className="text-xs text-on-surface-variant font-bold uppercase block mb-1">Skor Tertinggi</span>
          <span className="font-headline-lg text-primary font-black text-2xl">{user.iqScore}</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant text-center">
          <span className="text-xs text-on-surface-variant font-bold uppercase block mb-1">Kualifikasi</span>
          <span className="font-title-lg text-secondary font-bold text-base line-clamp-1">{user.level}</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant text-center">
          <span className="text-xs text-on-surface-variant font-bold uppercase block mb-1">Total Ujian</span>
          <span className="font-headline-lg text-on-surface font-black text-2xl">{user.completedTestsCount}</span>
        </div>
        <div className="bg-surface-container-lowest p-md rounded-xl border border-outline-variant text-center">
          <span className="text-xs text-on-surface-variant font-bold uppercase block mb-1">Tantangan Harian</span>
          <span className="font-title-lg text-tertiary-container font-bold text-base">85% Selesai</span>
        </div>
      </div>

      {/* Test History List */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden shadow-sm">
        <div className="p-md bg-surface-container-low border-b border-outline-variant flex justify-between items-center">
          <h3 className="font-title-lg font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">history</span>
            Riwayat Penilaian IQ
          </h3>
          <span className="text-xs text-on-surface-variant">{user.history.length} Catatan</span>
        </div>

        {user.history.length === 0 ? (
          <div className="p-xl text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-4xl mb-2 opacity-50">quiz</span>
            <p>Belum ada riwayat tes. Mulai tes cepat atau ujian lengkap sekarang!</p>
          </div>
        ) : (
          <div className="divide-y divide-outline-variant">
            {user.history.map((hist) => (
              <div key={hist.id} className="p-md flex items-center justify-between hover:bg-surface-container-low transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-label-lg font-bold text-on-surface capitalize">
                      {hist.testMode === 'quick' ? 'Tes Cepat IQ' : hist.testMode === 'full' ? 'Ujian IQ Lengkap' : `Latihan ${hist.category}`}
                    </span>
                    <span className="bg-primary-fixed text-on-primary-fixed text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
                      {hist.levelTitle}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant pt-1">
                    Tanggal: {hist.date} • Akurasi: {hist.accuracyPercentage}% ({hist.correctCount}/{hist.totalQuestions} Benar)
                  </p>
                </div>

                <div className="flex items-center gap-md">
                  <div className="text-right">
                    <span className="block font-headline-lg text-primary text-xl font-bold">{hist.score}</span>
                    <span className="text-[10px] text-outline">Skor IQ</span>
                  </div>
                  <button
                    onClick={() => onViewTestDetails(hist)}
                    className="p-2 rounded-lg hover:bg-surface-container text-primary cursor-pointer"
                    title="Lihat Detail & Pembahasan"
                  >
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Official Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-md">
          <div className="bg-white text-slate-900 rounded-2xl max-w-2xl w-full p-lg border-8 border-primary shadow-2xl relative animate-fade-in text-center space-y-md">
            <button
              onClick={() => setShowCertificate(false)}
              className="absolute top-3 right-3 text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            <div className="border-2 border-amber-400 p-lg rounded-xl bg-amber-50/20">
              <span className="material-symbols-outlined text-5xl text-primary mb-2">workspace_premium</span>
              <h2 className="text-xs font-bold uppercase tracking-widest text-primary">Sertifikat Resmi Penilaian Kognitif</h2>
              <h1 className="text-2xl font-black text-slate-900 my-2 font-serif">COGNITIVELABS DIGITAL IQ CERTIFICATE</h1>
              
              <p className="text-sm text-slate-600 my-4">Dengan ini menyatakan bahwa:</p>
              <h3 className="text-2xl font-bold text-primary underline decoration-amber-400 decoration-2">{user.fullName}</h3>
              
              <p className="text-sm text-slate-600 max-w-md mx-auto my-4">
                Telah berhasil menyelesaikan Ujian Standar Kognitif Tingkat Lanjut dengan pencapaian kualifikasi skor IQ resmi:
              </p>

              <div className="inline-block bg-primary text-white px-8 py-3 rounded-xl shadow-lg my-2">
                <span className="block text-3xl font-extrabold">{user.iqScore} IQ</span>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">{user.level}</span>
              </div>

              <div className="flex justify-between items-end text-xs text-slate-500 mt-8 pt-4 border-t border-slate-200">
                <div>
                  <p className="font-bold text-slate-700">CognitiveLabs Testing Board</p>
                  <p>Kode Verifikasi: CL-IQ-{Math.floor(100000 + Math.random() * 900000)}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-700">Tanggal Terbit</p>
                  <p>{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
