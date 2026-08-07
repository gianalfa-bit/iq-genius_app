import React from 'react';
import { UserProfile } from '../types';

interface HeaderProps {
  user: UserProfile;
  onOpenSettings: () => void;
  onNavigateHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onOpenSettings, onNavigateHome }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface shadow-sm w-full">
      <div className="flex justify-between items-center px-md py-sm w-full max-w-[800px] mx-auto">
        <button 
          onClick={onNavigateHome}
          className="flex items-center gap-md text-left group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container shrink-0">
            <img 
              className="w-full h-full object-cover" 
              src={user.avatarUrl} 
              alt={user.fullName}
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-label-md text-label-md text-on-surface-variant">Halo, {user.fullName.split(' ')[0]}!</span>
            <span className="font-title-lg text-title-lg font-bold text-primary group-hover:text-primary-container transition-colors">
              CognitiveLabs
            </span>
          </div>
        </button>

        <button 
          onClick={onOpenSettings}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low text-primary transition-colors active:scale-95 duration-100"
          title="Pengaturan"
          aria-label="Pengaturan"
        >
          <span className="material-symbols-outlined">settings</span>
        </button>
      </div>
    </header>
  );
};
