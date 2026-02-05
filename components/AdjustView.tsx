
import React, { useState, useEffect } from 'react';
import { RequestData, DepartmentEntry, ProblemCombination, AccountEntry } from '../types';
import { MOCK_REQUEST_DATA, MOCK_BUDGET_HIERARCHY, COLORS } from '../constants';
import { ArrowLeft, Target, TrendingDown, Info, ArrowRightLeft, ShieldCheck, ChevronDown, ChevronRight, AlertCircle, Flag, Save, CheckCircle } from 'lucide-react';

interface AdjustViewProps {
  solicitudId?: number | null;
  presupuestoId: string;
  onBack: () => void;
}

const AdjustView: React.FC<AdjustViewProps> = ({ solicitudId, presupuestoId, onBack }) => {
  const [requestData, setRequestData] = useState<RequestData | null>(null);
  const [budgetData, setBudgetData] = useState<DepartmentEntry[]>([]);
  const [expandedDepts, setExpandedDepts] = useState<Set<string>>(new Set(['1']));
  
  const [transferSource, setTransferSource] = useState<{deptId: string, locId: string, accId: string} | null>(null);
  const [transferAmount, setTransferAmount] = useState<number>(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [hasUpdated, setHasUpdated] = useState(false);

  useEffect(() => {
    if (solicitudId) setRequestData(MOCK_REQUEST_DATA);
    setBudgetData(MOCK_BUDGET_HIERARCHY);
  }, [solicitudId, presupuestoId]);

  const toggleDept = (id: string) => {
    const newSet = new Set(expandedDepts);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setExpandedDepts(newSet);
  };

  const handleTransfer = (targetAccId: string, targetLocId: string, targetDeptId: string) => {
    if (!transferSource || transferAmount <= 0) return;
    
    if (transferSource.deptId !== targetDeptId) {
      alert(`⚠️ Restricción: Solo se permiten transferencias dentro del mismo departamento.`);
      return;
    }

    if (transferSource.accId === targetAccId && transferSource.locId === targetLocId) return;

    let insufficientFunds = false;

    setBudgetData(prev => prev.map(dept => {
      if (dept.departmentId !== targetDeptId) return dept;
      return {
        ...dept,
        locations: dept.locations.map(loc => {
          return {
            ...loc,
            accounts: loc.accounts.map(acc => {
              if (loc.locationId === transferSource.locId && acc.accountId === transferSource.accId) {
                if (acc.remainingAmount < transferAmount) {
                    insufficientFunds = true;
                    return acc;
                }
                return { ...acc, remainingAmount: acc.remainingAmount - transferAmount };
              }
              if (loc.locationId === targetLocId && acc.accountId === targetAccId) {
                return { ...acc, remainingAmount: acc.remainingAmount + transferAmount };
              }
              return acc;
            })
          };
        })
      };
    }));

    if (insufficientFunds) {
        alert("Fondos insuficientes en la cuenta de origen.");
    } else {
        setTransferSource(null);
        setTransferAmount(0);
    }
  };

  const handleUpdateBudgets = () => {
    setIsUpdating(true);
    
    // Recopilación de datos ajustados (Simulación)
    const finalData = budgetData.flatMap(dept => 
      dept.locations.flatMap(loc => 
        loc.accounts.map(acc => ({
          deptId: dept.departmentId,
          locId: loc.locationId,
          accId: acc.accountId,
          newAmount: acc.remainingAmount
        }))
      )
    );

    console.log("Datos recopilados para actualización:", finalData);

    setTimeout(() => {
      setIsUpdating(false);
      setHasUpdated(true);
      setTimeout(() => setHasUpdated(false), 3000);
      alert("Presupuestos actualizados con éxito en el sistema.");
    }, 2000);
  };

  // Función para obtener el balance real actual de una combinación específica
  const getCurrentBalance = (deptId: string, locId: string, accId: string) => {
    const dept = budgetData.find(d => d.departmentId === deptId);
    const loc = dept?.locations.find(l => l.locationId === locId);
    const acc = loc?.accounts.find(a => a.accountId === accId);
    return acc?.remainingAmount || 0;
  };

  const isGoalMet = (prob: ProblemCombination) => {
    return getCurrentBalance(prob.departmentId, prob.locationId, prob.accountId) >= prob.montoSolicitadoMXN;
  };

  // Ayuda a identificar si una cuenta en la jerarquía es parte de las metas
  const isAccountGoal = (deptId: string, locId: string, accId: string) => {
    return requestData?.combinacionesProblema.some(p => 
        p.departmentId === deptId && p.locationId === locId && p.accountId === accId
    );
  };

  return (
    <div className="animate-fade-in-up pb-64">
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-[#fac532] transition-colors font-bold uppercase text-sm tracking-widest"
        >
          <ArrowLeft size={18} /> Volver a selección
        </button>
        <div className="bg-[#fac532]/10 px-4 py-2 rounded-full border border-[#fac532]/20">
          <span className="text-[#fac532] font-black text-xs tracking-tighter uppercase">ID Presupuesto: {presupuestoId}</span>
        </div>
      </div>

      {requestData && (
        <section className="mb-10">
          <div className="bg-[#0D0D0D] border border-gray-800 rounded-3xl p-8 shadow-2xl overflow-hidden relative">
             <div className="absolute top-0 right-0 p-4">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase ${
                    requestData.requestType === 'MIXED_ISSUES' ? 'bg-[#fac532] text-black' : 'bg-red-500 text-white'
                }`}>
                    {requestData.requestType}
                </span>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <div>
                    <h3 className="text-gray-500 text-xs font-black uppercase tracking-widest mb-2">Solicitante</h3>
                    <p className="text-xl font-bold">{requestData.userName}</p>
                </div>
                <div>
                    <h3 className="text-gray-500 text-xs font-black uppercase tracking-widest mb-2">Transacción</h3>
                    <p className="text-xl font-bold">#{requestData.transactionId}</p>
                </div>
                <div>
                    <h3 className="text-gray-500 text-xs font-black uppercase tracking-widest mb-2">Fecha</h3>
                    <p className="text-xl font-bold">{new Date(requestData.fechaSolicitud).toLocaleDateString()}</p>
                </div>
             </div>

             <h2 className="flex items-center gap-3 text-lg font-black uppercase tracking-tight mb-6 text-[#fac532]">
                <Target size={24} /> Metas de Ajuste (Estado Actualizado)
             </h2>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {requestData.combinacionesProblema.map((prob, i) => {
                    const currentBalance = getCurrentBalance(prob.departmentId, prob.locationId, prob.accountId);
                    const met = currentBalance >= prob.montoSolicitadoMXN;
                    const diff = Math.max(0, prob.montoSolicitadoMXN - currentBalance);

                    return (
                        <div key={i} className={`p-5 rounded-2xl border-2 transition-all duration-500 ${
                            met ? 'bg-green-500/10 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.1)]' : 'bg-red-500/5 border-red-500/20'
                        }`}>
                            <div className="flex justify-between items-start mb-3">
                                <div className="max-w-[70%]">
                                    <h4 className="font-bold text-sm text-gray-200 line-clamp-1">{prob.accountName}</h4>
                                    <p className="text-[10px] text-gray-500 uppercase font-bold">{prob.locationName}</p>
                                </div>
                                {met ? (
                                    <div className="flex items-center gap-1 text-green-500 font-black text-[10px] uppercase bg-green-500/20 px-2 py-1 rounded-md">
                                        <ShieldCheck size={14} /> Meta Cumplida
                                    </div>
                                ) : (
                                    <div className="text-red-500 font-black text-[10px] uppercase animate-pulse flex items-center gap-1">
                                        <AlertCircle size={14} /> Pendiente
                                    </div>
                                )}
                            </div>
                            <div className="flex items-end justify-between">
                                <div className="space-y-1">
                                    <p className="text-[10px] text-gray-500 uppercase font-black">Monto Meta</p>
                                    <p className="text-xl font-black">${prob.montoSolicitadoMXN.toLocaleString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-gray-400 uppercase font-black">Actual / Faltante</p>
                                    <p className={`text-sm font-bold ${met ? 'text-green-400' : 'text-red-400'}`}>
                                        ${currentBalance.toLocaleString()} / <span className="font-black">-${diff.toLocaleString()}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
             </div>
          </div>
        </section>
      )}

      <section>
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
                <TrendingDown className="text-[#fac532]" size={30} /> 
                Presupuestos Reales
            </h2>
            {transferSource && (
                <div className="flex items-center gap-4 bg-[#fac532] text-black px-6 py-2 rounded-xl animate-bounce shadow-xl">
                    <ArrowRightLeft size={18} />
                    <span className="text-xs font-black uppercase">Seleccionando destino...</span>
                </div>
            )}
        </div>

        <div className="space-y-6">
            {budgetData.map(dept => (
                <div key={dept.departmentId} className="bg-[#1A1A1A] border border-gray-800 rounded-3xl overflow-hidden">
                    <button 
                        onClick={() => toggleDept(dept.departmentId)}
                        className={`w-full flex items-center justify-between p-6 transition-all ${
                           transferSource && transferSource.deptId !== dept.departmentId ? 'opacity-20 grayscale pointer-events-none' : 'hover:bg-white/5'
                        }`}
                    >
                        <div className="flex items-center gap-4">
                            {expandedDepts.has(dept.departmentId) ? <ChevronDown /> : <ChevronRight />}
                            <div className="text-left">
                                <span className="text-xl font-extrabold tracking-tighter uppercase block">{dept.departmentName}</span>
                            </div>
                        </div>
                    </button>

                    {expandedDepts.has(dept.departmentId) && (
                        <div className="p-6 pt-0 space-y-10 animate-fade-in-up">
                            {dept.locations.map(loc => (
                                <div key={loc.locationId} className="ml-4 pl-6 border-l-2 border-gray-800/50">
                                    <h4 className="text-sm font-black text-[#fac532]/60 uppercase tracking-[0.2em] mb-4">
                                        {loc.locationName}
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {loc.accounts.map(acc => {
                                            const isGoal = isAccountGoal(dept.departmentId, loc.locationId, acc.accountId);
                                            return (
                                                <div 
                                                    key={acc.accountId} 
                                                    className={`group p-5 rounded-2xl border-2 transition-all duration-300 relative ${
                                                        transferSource?.accId === acc.accountId && transferSource?.locId === loc.locationId
                                                            ? 'bg-[#fac532]/20 border-[#fac532] shadow-[0_0_20px_rgba(250,197,50,0.1)] scale-[0.98]' 
                                                            : isGoal ? 'bg-[#1a1a1a] border-gray-700' : 'bg-[#0D0D0D] border-gray-800 hover:border-gray-700'
                                                    }`}
                                                >
                                                    {isGoal && (
                                                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-black px-2 py-1 rounded flex items-center gap-1 shadow-lg">
                                                            <Flag size={10} /> OBJETIVO
                                                        </div>
                                                    )}

                                                    <div className="flex justify-between items-start mb-4">
                                                        <div className="max-w-[80%]">
                                                            <span className="text-xs font-bold text-gray-400 block mb-1 line-clamp-2">{acc.accountName}</span>
                                                        </div>
                                                        <button 
                                                            onClick={() => {
                                                                if (transferSource) {
                                                                    handleTransfer(acc.accountId, loc.locationId, dept.departmentId);
                                                                } else {
                                                                    setTransferSource({deptId: dept.departmentId, locId: loc.locationId, accId: acc.accountId});
                                                                }
                                                            }}
                                                            className={`p-2.5 rounded-xl transition-all ${
                                                                transferSource 
                                                                    ? 'bg-[#fac532] text-black hover:scale-110 shadow-lg' 
                                                                    : 'bg-gray-800 text-gray-400 group-hover:bg-[#fac532] group-hover:text-black'
                                                            }`}
                                                        >
                                                            <ArrowRightLeft size={16} />
                                                        </button>
                                                    </div>
                                                    
                                                    <div className="flex items-center justify-between gap-4">
                                                        <div className="flex-1">
                                                            <div className="flex justify-between text-[10px] uppercase font-black text-gray-500 mb-1">
                                                                <span>Balance Actual</span>
                                                                <span>{Math.round((acc.remainingAmount / acc.initialAmount) * 100)}%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden">
                                                                <div 
                                                                    className={`h-full transition-all duration-700 ${isGoal ? 'bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.5)]' : 'bg-[#fac532]'}`}
                                                                    style={{ width: `${Math.min(100, (acc.remainingAmount / acc.initialAmount) * 100)}%` }}
                                                                />
                                                            </div>
                                                            <p className="text-2xl font-black mt-3 tracking-tighter">${acc.remainingAmount.toLocaleString()}</p>
                                                        </div>
                                                    </div>

                                                    {transferSource?.accId === acc.accountId && transferSource?.locId === loc.locationId && (
                                                        <div className="mt-5 pt-4 border-t border-[#fac532]/20 animate-fade-in-up">
                                                            <label className="text-[10px] font-black text-[#fac532] uppercase block mb-2">Monto a retirar</label>
                                                            <div className="relative">
                                                                <input 
                                                                    type="number"
                                                                    autoFocus
                                                                    value={transferAmount}
                                                                    onChange={(e) => setTransferAmount(Number(e.target.value))}
                                                                    className="w-full bg-black/60 border-2 border-[#fac532]/30 rounded-xl py-3 px-4 text-lg font-black focus:outline-none focus:border-[#fac532]"
                                                                    placeholder="0.00"
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
      </section>

      {/* Botón de Actualizar Presupuestos */}
      <footer className="fixed bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/95 to-transparent backdrop-blur-md z-50">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleUpdateBudgets}
            disabled={isUpdating}
            className={`w-full py-5 px-10 rounded-2xl font-black text-xl uppercase tracking-widest flex items-center justify-center gap-4 transition-all duration-500 animate-fade-in-up ${
              isUpdating
                ? 'bg-gray-900 text-gray-700 cursor-not-allowed border border-gray-800'
                : 'bg-[#fac532] text-black hover:scale-[1.05] active:scale-95 shadow-[0_15px_40px_rgba(250,197,50,0.3)] hover:shadow-[0_20px_50px_rgba(250,197,50,0.4)]'
            }`}
          >
            {isUpdating ? (
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-[3px] border-black border-t-transparent rounded-full animate-spin"></div>
                <span className="animate-pulse">Actualizando...</span>
              </div>
            ) : hasUpdated ? (
              <>
                <CheckCircle size={26} strokeWidth={3} />
                ¡Actualizado!
              </>
            ) : (
              <>
                <Save size={26} strokeWidth={3} />
                Actualizar presupuestos
              </>
            )}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default AdjustView;
