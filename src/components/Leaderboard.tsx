import React, { useState } from 'react';
import { LeaderboardItem } from '../types';

interface LeaderboardProps {
  items: LeaderboardItem[];
}

export const LeaderboardView: React.FC<LeaderboardProps> = ({ items }) => {
  const [filter, setFilter] = useState<'mingguan' | 'bulanan' | 'semua'>('mingguan');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="pt-24 px-md pb-32 max-w-[800px] mx-auto space-y-lg min-h-screen animate-fade-in">
      {/* Title Header */}
      <div className="bg-primary p-lg rounded-2xl text-on-primary shadow-lg relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 text-white pointer-events-none transform translate-x-4 translate-y-4">
          <span className="material-symbols-outlined text-[160px]">trophy</span>
        </div>
        <div className="relative z-10">
          <span className="bg-white/20 text-white text-xs px-md py-xs rounded-full font-bold uppercase tracking-wider mb-2 inline-block">
            Peringkat Nasional IQ
          </span>
          <h1 className="font-headline-lg text-headline-lg font-bold mb-2">Papan Peringkat</h1>
          <p className="font-body-md text-on-primary-container max-w-md">
            Kompetisi kognitif tertinggi antar para pemikir terbaik di CognitiveLabs.
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-md">
        <div className="bg-surface-container p-1 rounded-xl flex gap-1 w-full sm:w-auto">
          {(['mingguan', 'bulanan', 'semua'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 sm:flex-initial px-md py-xs rounded-lg font-label-md capitalize transition-all cursor-pointer ${
                filter === f
                  ? 'bg-white text-primary font-bold shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">
            search
          </span>
          <input
            type="text"
            placeholder="Cari nama pemikir..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-3 gap-xs sm:gap-md items-end pt-md">
        {/* Rank 2 */}
        {filteredItems[1] && (
          <div className="bg-surface-container-lowest p-sm sm:p-md rounded-xl border border-outline-variant flex flex-col items-center text-center shadow-xs">
            <div className="relative mb-2">
              <img 
                src={filteredItems[1].avatarUrl} 
                alt={filteredItems[1].name}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-slate-300"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-400 text-white text-xs font-extrabold w-5 h-5 rounded-full flex items-center justify-center">
                2
              </span>
            </div>
            <h4 className="font-label-lg text-xs sm:text-sm font-bold text-on-surface line-clamp-1">{filteredItems[1].name}</h4>
            <span className="font-headline-lg text-primary text-base sm:text-lg font-black">{filteredItems[1].score}</span>
            <span className="text-[10px] sm:text-xs text-on-surface-variant">{filteredItems[1].level}</span>
          </div>
        )}

        {/* Rank 1 */}
        {filteredItems[0] && (
          <div className="bg-primary-container/10 p-sm sm:p-md rounded-xl border-2 border-tertiary-fixed-dim flex flex-col items-center text-center shadow-md relative -translate-y-2">
            <span className="material-symbols-outlined text-tertiary-fixed-dim text-2xl -mt-4 mb-1 animate-bounce">
              crown
            </span>
            <div className="relative mb-2">
              <img 
                src={filteredItems[0].avatarUrl} 
                alt={filteredItems[0].name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-tertiary-fixed-dim"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-tertiary-fixed-dim text-on-tertiary-fixed text-xs font-extrabold w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
                1
              </span>
            </div>
            <h4 className="font-label-lg text-sm sm:text-base font-bold text-primary line-clamp-1">{filteredItems[0].name}</h4>
            <span className="font-headline-lg text-primary text-xl sm:text-2xl font-black">{filteredItems[0].score}</span>
            <span className="text-xs font-semibold text-secondary">{filteredItems[0].level}</span>
          </div>
        )}

        {/* Rank 3 */}
        {filteredItems[2] && (
          <div className="bg-surface-container-lowest p-sm sm:p-md rounded-xl border border-outline-variant flex flex-col items-center text-center shadow-xs">
            <div className="relative mb-2">
              <img 
                src={filteredItems[2].avatarUrl} 
                alt={filteredItems[2].name}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-amber-600"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-700 text-white text-xs font-extrabold w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </div>
            <h4 className="font-label-lg text-xs sm:text-sm font-bold text-on-surface line-clamp-1">{filteredItems[2].name}</h4>
            <span className="font-headline-lg text-primary text-base sm:text-lg font-black">{filteredItems[2].score}</span>
            <span className="text-[10px] sm:text-xs text-on-surface-variant">{filteredItems[2].level}</span>
          </div>
        )}
      </div>

      {/* Leaderboard Table List */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden shadow-sm">
        <div className="p-md border-b border-outline-variant bg-surface-container-low font-label-md text-on-surface-variant grid grid-cols-12 text-xs font-bold uppercase tracking-wider">
          <span className="col-span-2 text-center">Posisi</span>
          <span className="col-span-6">Pengguna</span>
          <span className="col-span-2 text-center">Ujian</span>
          <span className="col-span-2 text-right">Skor IQ</span>
        </div>

        <div className="divide-y divide-outline-variant/50">
          {filteredItems.map((item) => (
            <div 
              key={item.rank}
              className={`p-md grid grid-cols-12 items-center transition-colors ${
                item.isCurrentUser 
                  ? 'bg-secondary-container/30 border-l-4 border-secondary font-bold' 
                  : 'hover:bg-surface-container-low'
              }`}
            >
              {/* Rank */}
              <div className="col-span-2 flex justify-center">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  item.rank === 1 ? 'bg-tertiary-fixed text-on-tertiary-fixed' :
                  item.rank === 2 ? 'bg-slate-200 text-slate-800' :
                  item.rank === 3 ? 'bg-amber-100 text-amber-900' : 'text-on-surface-variant'
                }`}>
                  #{item.rank}
                </span>
              </div>

              {/* User info */}
              <div className="col-span-6 flex items-center gap-md">
                <img 
                  src={item.avatarUrl} 
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col">
                  <span className="font-label-lg text-on-surface text-sm flex items-center gap-1">
                    {item.name}
                    {item.isCurrentUser && (
                      <span className="bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                        Kamu
                      </span>
                    )}
                  </span>
                  <span className="text-xs text-on-surface-variant">{item.level}</span>
                </div>
              </div>

              {/* Tests Count */}
              <div className="col-span-2 text-center text-sm text-on-surface-variant">
                {item.testsCount}x
              </div>

              {/* IQ Score */}
              <div className="col-span-2 text-right">
                <span className="font-headline-lg text-primary text-base font-extrabold">
                  {item.score}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
