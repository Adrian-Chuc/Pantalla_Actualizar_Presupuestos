
import React, { useState } from 'react';
import { ViewMode, AppScreen } from './types';
import { MOCK_SOLICITUDES, MOCK_PRESUPUESTOS } from './constants';
import Header from './components/Header';
import ModeToggle from './components/ModeToggle';
import RequestCard from './components/RequestCard';
import AdjustView from './components/AdjustView';
import { ChevronRight, Check, Settings2 } from 'lucide-react';

const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>(AppScreen.SELECTION);
  const [mode, setMode] = useState<ViewMode>(ViewMode.SOLICITUDES);
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);
  const [selectedBudgetId, setSelectedBudgetId] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAdjustBudget = () => {
    if ((mode === ViewMode.SOLICITUDES && selectedRequestId) || (mode === ViewMode.GENERAL && selectedBudgetId)) {
      setIsProcessing(true);
      // Simulación de navegación a pantalla de ajuste
      setTimeout(() => {
        setIsProcessing(false);
        setScreen(AppScreen.ADJUSTMENT);
      }, 800);
    }
  };

  const isButtonDisabled = 
    (mode === ViewMode.SOLICITUDES && !selectedRequestId) || 
    (mode === ViewMode.GENERAL && !selectedBudgetId) ||
    isProcessing;

  return (
    <div className="min-h-screen flex flex-col bg-black text-white pb-32 selection:bg-[#fac532] selection:text-black">
      {screen === AppScreen.SELECTION ? (
        <>
          <Header />
          <main className="flex-1 max-w-6xl mx-auto w-full px-6 mt-8">
            <ModeToggle mode={mode} setMode={setMode} />

            <div key={mode} className="mt-8 transition-all duration-500">
              {mode === ViewMode.SOLICITUDES ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {MOCK_SOLICITUDES.map((sol, idx) => (
                    <RequestCard
                      key={sol.solicitud}
                      solicitud={sol}
                      index={idx}
                      isSelected={selectedRequestId === sol.solicitud}
                      onSelect={setSelectedRequestId}
                    />
                  ))}
                </div>
              ) : (
                <div className="max-w-2xl mx-auto bg-[#0D0D0D] border border-gray-800 rounded-3xl p-10 shadow-2xl animate-fade-in-up stagger-2 opacity-0">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-[#fac532]/10 p-3 rounded-2xl">
                      <Settings2 className="text-[#fac532]" size={32} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black uppercase tracking-tight">Elegir Presupuesto</h2>
                      <p className="text-gray-500 text-sm">Ajuste manual de estructura jerárquica</p>
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="group">
                      <label className="block text-gray-400 text-xs font-black mb-3 uppercase tracking-[0.2em]">
                        Presupuesto Disponible
                      </label>
                      <div className="relative">
                        <select
                          value={selectedBudgetId}
                          onChange={(e) => setSelectedBudgetId(e.target.value)}
                          className="w-full bg-[#1A1A1A] border-2 border-gray-800 text-white py-5 px-6 rounded-2xl focus:outline-none focus:border-[#fac532] focus:ring-4 focus:ring-[#fac532]/10 transition-all appearance-none cursor-pointer text-lg font-bold pr-12 group-hover:border-gray-600"
                        >
                          <option value="" disabled>Seleccione un presupuesto...</option>
                          {MOCK_PRESUPUESTOS.map((pre) => (
                            <option key={pre.id} value={pre.id}>
                              {pre.nombre} — {pre.departamento}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                          <ChevronRight size={20} className="rotate-90" />
                        </div>
                      </div>
                    </div>

                    {selectedBudgetId && (
                      <div className="bg-[#fac532]/5 p-5 rounded-2xl border border-[#fac532]/20 flex items-center gap-4 animate-fade-in-up">
                        <div className="bg-[#fac532] p-1.5 rounded-full text-black">
                          <Check size={18} strokeWidth={4} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">Presupuesto seleccionado</p>
                          <p className="text-sm text-[#fac532] font-medium">
                            {MOCK_PRESUPUESTOS.find(p => p.id === selectedBudgetId)?.nombre}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </main>

          <footer className="fixed bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/95 to-transparent backdrop-blur-md z-50">
            <div className="max-w-md mx-auto">
              <button
                onClick={handleAdjustBudget}
                disabled={isButtonDisabled}
                className={`w-full py-5 px-10 rounded-2xl font-black text-xl uppercase tracking-widest flex items-center justify-center gap-4 transition-all duration-500 animate-fade-in-up stagger-4 opacity-0 ${
                  isButtonDisabled
                    ? 'bg-gray-900 text-gray-700 cursor-not-allowed border border-gray-800'
                    : 'bg-[#fac532] text-black hover:scale-[1.05] active:scale-95 shadow-[0_15px_40px_rgba(250,197,50,0.3)] hover:shadow-[0_20px_50px_rgba(250,197,50,0.4)]'
                }`}
              >
                {isProcessing ? (
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-[3px] border-black border-t-transparent rounded-full animate-spin"></div>
                    <span className="animate-pulse">Procesando...</span>
                  </div>
                ) : (
                  <>
                    Ajustar presupuestos
                    <ChevronRight size={26} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </footer>
        </>
      ) : (
        <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">
           <AdjustView 
              solicitudId={mode === ViewMode.SOLICITUDES ? selectedRequestId : null}
              presupuestoId={selectedBudgetId || '3'} 
              onBack={() => setScreen(AppScreen.SELECTION)}
           />
        </main>
      )}
    </div>
  );
};

export default App;
