import React, { useState } from 'react';
import { TestResult } from '../types';

interface PembahasanModalProps {
  result: TestResult;
  onClose: () => void;
}

export const PembahasanModal: React.FC<PembahasanModalProps> = ({ result, onClose }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  const questions = result.questions;
  const answers = result.answers;
  const currentQ = questions[activeIdx] || questions[0];
  const userAns = answers[activeIdx];

  const selectedOpt = userAns?.selectedOption;
  const isCorrect = userAns?.isCorrect;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-md">
      <div className="bg-surface rounded-2xl max-w-[750px] w-full max-h-[90vh] flex flex-col shadow-2xl border border-outline-variant overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="bg-primary text-on-primary p-lg flex justify-between items-center">
          <div>
            <h2 className="font-title-lg text-title-lg font-bold flex items-center gap-2">
              <span className="material-symbols-outlined">menu_book</span>
              Pembahasan Soal #{activeIdx + 1}
            </h2>
            <p className="font-label-md text-label-md text-on-primary-container">
              Ketepatan: {result.accuracyPercentage}% • {result.correctCount} Benar, {result.wrongCount} Salah
            </p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center text-white cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-lg space-y-md custom-scrollbar">
          {/* Question Index Pills Navigation */}
          <div className="flex gap-xs overflow-x-auto pb-sm custom-scrollbar">
            {questions.map((q, idx) => {
              const ans = answers[idx];
              let btnClass = 'bg-surface-container text-on-surface-variant';
              if (ans?.isCorrect) {
                btnClass = 'bg-secondary-container text-on-secondary-container font-bold';
              } else if (ans?.selectedOption !== null && !ans?.isCorrect) {
                btnClass = 'bg-error-container text-on-error-container font-bold';
              }

              if (idx === activeIdx) {
                btnClass += ' ring-2 ring-primary ring-offset-2';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`w-10 h-10 shrink-0 rounded-lg flex items-center justify-center font-label-lg transition-all cursor-pointer ${btnClass}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Question Details */}
          <div className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant space-y-md">
            <div className="flex justify-between items-center">
              <span className="bg-primary-fixed text-on-primary-fixed text-xs px-md py-xs rounded-full font-bold uppercase tracking-wider">
                Kategori: {currentQ.category}
              </span>

              <div className="flex items-center gap-1">
                {selectedOpt === null ? (
                  <span className="text-outline font-bold text-sm bg-surface-container px-sm py-xs rounded-lg flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">skip_next</span> Dilewati
                  </span>
                ) : isCorrect ? (
                  <span className="text-secondary font-bold text-sm bg-secondary-container/40 px-sm py-xs rounded-lg flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">check_circle</span> Jawaban Benar
                  </span>
                ) : (
                  <span className="text-error font-bold text-sm bg-error-container/40 px-sm py-xs rounded-lg flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">cancel</span> Jawaban Salah
                  </span>
                )}
              </div>
            </div>

            <h3 className="font-body-lg text-body-lg font-medium text-on-surface">
              {currentQ.title}
            </h3>

            {currentQ.imageUrl && (
              <div className="aspect-video w-full bg-surface-container-low rounded-lg flex items-center justify-center border border-outline-variant overflow-hidden">
                <img 
                  className="w-full h-full object-contain p-md" 
                  src={currentQ.imageUrl} 
                  alt="Spatial Question"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            {/* Options Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-sm pt-sm">
              {currentQ.options.map(opt => {
                const isChosen = selectedOpt === opt.id;
                const isCorrectOpt = currentQ.correctOption === opt.id;

                let stateBorder = 'border-outline-variant bg-surface-container-lowest';
                if (isCorrectOpt) {
                  stateBorder = 'border-secondary bg-secondary-container/20 border-2';
                } else if (isChosen && !isCorrectOpt) {
                  stateBorder = 'border-error bg-error-container/20 border-2';
                }

                return (
                  <div 
                    key={opt.id} 
                    className={`p-md rounded-xl border flex items-center gap-md ${stateBorder}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                      isCorrectOpt ? 'bg-secondary text-white' : isChosen ? 'bg-error text-white' : 'bg-surface-container text-on-surface'
                    }`}>
                      {opt.id}
                    </div>

                    <div className="flex-1">
                      {opt.image ? (
                        <img src={opt.image} alt={opt.label} className="h-12 object-contain" referrerPolicy="no-referrer" />
                      ) : (
                        <span className="font-body-md text-on-surface">{opt.label}</span>
                      )}
                    </div>

                    {isCorrectOpt && (
                      <span className="text-secondary font-bold text-xs uppercase bg-secondary-container px-2 py-1 rounded">Kunci</span>
                    )}
                    {isChosen && !isCorrectOpt && (
                      <span className="text-error font-bold text-xs uppercase bg-error-container px-2 py-1 rounded">Pilihanmu</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Explanation Box */}
          <div className="bg-secondary-container/20 border border-secondary/30 p-lg rounded-xl flex gap-md items-start">
            <span className="material-symbols-outlined text-secondary text-2xl shrink-0 mt-0.5">lightbulb</span>
            <div>
              <h4 className="font-title-lg text-title-lg text-secondary font-bold mb-xs">Penjelasan Logika:</h4>
              <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-surface p-md border-t border-outline-variant flex justify-between items-center">
          <button 
            disabled={activeIdx === 0}
            onClick={() => setActiveIdx(prev => prev - 1)}
            className="px-md py-sm rounded-lg border border-outline-variant text-on-surface font-label-lg hover:bg-surface-container cursor-pointer disabled:opacity-40"
          >
            Sebelumnya
          </button>

          <span className="font-label-md text-on-surface-variant">
            {activeIdx + 1} / {questions.length}
          </span>

          <button 
            disabled={activeIdx === questions.length - 1}
            onClick={() => setActiveIdx(prev => prev + 1)}
            className="px-md py-sm rounded-lg bg-primary text-on-primary font-label-lg hover:bg-primary-container cursor-pointer disabled:opacity-40"
          >
            Berikutnya
          </button>
        </div>
      </div>
    </div>
  );
};
