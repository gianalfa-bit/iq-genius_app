import React from 'react';

interface SettingsModalProps {
  onClose: () => void;
  onResetData: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, onResetData }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-md">
      <div className="bg-surface rounded-2xl max-w-md w-full p-lg shadow-2xl border border-outline-variant animate-fade-in space-y-md">
        <div className="flex justify-between items-center border-b border-outline-variant pb-md">
          <h3 className="font-title-lg text-title-lg font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined">settings</span>
            Pengaturan Aplikasi
          </h3>
          <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface cursor-pointer">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="space-y-md">
          <div className="flex justify-between items-center p-sm bg-surface-container-low rounded-xl">
            <div>
              <h4 className="font-label-lg text-on-surface font-bold">Suara & Efek Haptik</h4>
              <p className="text-xs text-on-surface-variant">Efek suara tombol dan timer</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary cursor-pointer" />
          </div>

          <div className="flex justify-between items-center p-sm bg-surface-container-low rounded-xl">
            <div>
              <h4 className="font-label-lg text-on-surface font-bold">Notifikasi Tantangan Harian</h4>
              <p className="text-xs text-on-surface-variant">Pengingat latihan kecerdasan harian</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary cursor-pointer" />
          </div>

          <div className="flex justify-between items-center p-sm bg-surface-container-low rounded-xl">
            <div>
              <h4 className="font-label-lg text-on-surface font-bold">Tampilan Terang / Gelap</h4>
              <p className="text-xs text-on-surface-variant">Mode Otomatis / Sesuai Sistem</p>
            </div>
            <span className="text-xs font-bold text-primary bg-primary-fixed px-2 py-1 rounded">Terang</span>
          </div>

          <div className="pt-md border-t border-outline-variant">
            <button
              onClick={() => {
                if (confirm('Apakah Anda yakin ingin mereset data riwayat tes?')) {
                  onResetData();
                  onClose();
                }
              }}
              className="w-full py-md rounded-xl border border-error/40 text-error font-label-lg hover:bg-error/10 transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">restart_alt</span>
              Reset Ulang Riwayat Tes
            </button>
          </div>
        </div>

        <div className="text-center pt-sm text-xs text-outline">
          CognitiveLabs System v2.4.0 • Build 2026
        </div>
      </div>
    </div>
  );
};
