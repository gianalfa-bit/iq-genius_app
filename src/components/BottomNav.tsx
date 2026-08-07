import React from 'react';
import { ViewState } from '../types';

interface BottomNavProps {
  currentView: ViewState;
  onSelectTab: (view: 'home' | 'leaderboard' | 'profile') => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, onSelectTab }) => {
  const isHome = currentView === 'home';
  const isLeaderboard = currentView === 'leaderboard';
  const isProfile = currentView === 'profile';

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-surface border-t border-outline-variant shadow-lg flex justify-around items-center px-md pb-md pt-sm">
      {/* Home */}
      <button 
        onClick={() => onSelectTab('home')}
        className={`flex flex-col items-center justify-center transition-all active:scale-90 duration-200 ${
          isHome 
            ? 'bg-secondary-container text-on-secondary-container rounded-full px-lg py-xs' 
            : 'text-on-surface-variant hover:bg-surface-container-high rounded-xl px-sm py-xs'
        }`}
      >
        <span className={`material-symbols-outlined ${isHome ? 'fill-1' : ''}`}>home</span>
        <span className="font-label-md text-label-md">Home</span>
      </button>

      {/* Leaderboard */}
      <button 
        onClick={() => onSelectTab('leaderboard')}
        className={`flex flex-col items-center justify-center transition-all active:scale-90 duration-200 ${
          isLeaderboard 
            ? 'bg-secondary-container text-on-secondary-container rounded-full px-lg py-xs' 
            : 'text-on-surface-variant hover:bg-surface-container-high rounded-xl px-sm py-xs'
        }`}
      >
        <span className={`material-symbols-outlined ${isLeaderboard ? 'fill-1' : ''}`}>leaderboard</span>
        <span className="font-label-md text-label-md">Leaderboard</span>
      </button>

      {/* Profile */}
      <button 
        onClick={() => onSelectTab('profile')}
        className={`flex flex-col items-center justify-center transition-all active:scale-90 duration-200 ${
          isProfile 
            ? 'bg-secondary-container text-on-secondary-container rounded-full px-lg py-xs' 
            : 'text-on-surface-variant hover:bg-surface-container-high rounded-xl px-sm py-xs'
        }`}
      >
        <span className={`material-symbols-outlined ${isProfile ? 'fill-1' : ''}`}>person</span>
        <span className="font-label-md text-label-md">Profile</span>
      </button>
    </nav>
  );
};
