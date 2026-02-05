
import React from 'react';
import { Solicitud } from '../types';
import { User, Calendar, Hash, Building2, CheckCircle2 } from 'lucide-react';

interface RequestCardProps {
  solicitud: Solicitud;
  isSelected: boolean;
  onSelect: (id: number) => void;
  index: number;
}

const RequestCard: React.FC<RequestCardProps> = ({ solicitud, isSelected, onSelect, index }) => {
  const staggerClass = `stagger-${(index % 4) + 1}`;
  
  return (
    <div
      onClick={() => onSelect(solicitud.solicitud)}
      className={`relative cursor-pointer transition-all duration-500 rounded-2xl p-6 border-2 animate-fade-in-up ${staggerClass} opacity-0 ${
        isSelected
          ? 'bg-[#1A1A1A] border-[#fac532] shadow-[0_0_20px_rgba(250,197,50,0.15)] scale-[1.02]'
          : 'bg-[#0D0D0D] border-gray-800 hover:border-gray-600 hover:translate-y-[-4px]'
      }`}
    >
      {isSelected && (
        <div className="absolute top-4 right-4 text-[#fac532] animate-bounce">
          <CheckCircle2 size={26} fill="rgba(250,197,50,0.1)" />
        </div>
      )}
      
      <div className="flex items-center gap-3 mb-5">
        <div className={`p-2.5 rounded-xl transition-colors duration-500 ${isSelected ? 'bg-[#fac532] text-black' : 'bg-gray-800 text-gray-400'}`}>
          <Hash size={20} />
        </div>
        <span className="font-extrabold text-xl tracking-tight">Solicitud #{solicitud.solicitud}</span>
      </div>

      <div className="space-y-4 text-sm">
        <div className="flex items-center gap-3 text-gray-300">
          <Building2 size={18} className="text-[#fac532]" />
          <p><span className="font-semibold text-gray-500 mr-1">Subsidiaria:</span> {solicitud.subsidiaria}</p>
        </div>
        <div className="flex items-center gap-3 text-gray-300">
          <User size={18} className="text-[#fac532]" />
          <p><span className="font-semibold text-gray-500 mr-1">Solicita:</span> {solicitud.solicita}</p>
        </div>
        <div className="flex items-center gap-3 text-gray-300">
          <Calendar size={18} className="text-[#fac532]" />
          <p><span className="font-semibold text-gray-500 mr-1">Fecha:</span> {solicitud.fecha}</p>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
