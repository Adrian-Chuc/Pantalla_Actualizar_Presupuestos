
import React from 'react';
import { ViewMode } from '../types';
import { ClipboardList, Layers } from 'lucide-react';

interface ModeToggleProps {
  mode: ViewMode;
  setMode: (mode: ViewMode) => void;
}

const ModeToggle: React.FC<ModeToggleProps> = ({ mode, setMode }) => {
  return (
    <div className="flex justify-center p-6 animate-fade-in-up stagger-1 opacity-0">
      <div className="bg-[#1A1A1A] p-1.5 rounded-2xl flex w-full max-w-md border border-gray-800 shadow-xl">
        <button
          onClick={() => setMode(ViewMode.SOLICITUDES)}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl transition-all duration-500 font-bold ${
            mode === ViewMode.SOLICITUDES
              ? 'bg-[#fac532] text-black shadow-[0_4px_15px_rgba(250,197,50,0.3)] scale-[1.02]'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <ClipboardList size={20} />
          Solicitudes
        </button>
        <button
          onClick={() => setMode(ViewMode.GENERAL)}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl transition-all duration-500 font-bold ${
            mode === ViewMode.GENERAL
              ? 'bg-[#fac532] text-black shadow-[0_4px_15px_rgba(250,197,50,0.3)] scale-[1.02]'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Layers size={20} />
          General
        </button>
      </div>
    </div>
  );
};

export default ModeToggle;
