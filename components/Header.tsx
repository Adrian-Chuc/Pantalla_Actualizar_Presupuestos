
import React from 'react';
import { Star } from 'lucide-react';
import { COLORS } from '../constants';

const Header: React.FC = () => {
  return (
    <header className="flex flex-col items-center justify-center py-10 px-4 border-b border-gray-800 animate-fade-in-up">
      <div className="bg-[#fac532] p-3 rounded-full mb-4 shadow-[0_0_25px_rgba(250,197,50,0.4)] transition-transform hover:rotate-12 duration-300">
        <Star size={40} color="black" fill="black" />
      </div>
      <h1 className="text-3xl md:text-4xl font-black text-center tracking-tighter uppercase">
        Pantalla de <span className="text-[#fac532]">ajuste de presupuestos</span>
      </h1>
      <p className="text-gray-400 mt-2 text-sm md:text-base font-medium">
        Estructura Jerárquica: Departamentos • Ubicaciones • Cuentas
      </p>
    </header>
  );
};

export default Header;
