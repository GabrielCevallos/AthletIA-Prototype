import React, { useState } from 'react';
import { Search, Plus, GripVertical, Trash2, Save, FileText } from 'lucide-react';

const LIBRARY = [
    { id: '1', name: 'Press de Banca', muscle: 'Pecho' },
    { id: '2', name: 'Sentadilla', muscle: 'Piernas' },
    { id: '3', name: 'Dominadas', muscle: 'Espalda' },
    { id: '4', name: 'Peso Muerto', muscle: 'Espalda' },
    { id: '5', name: 'Press Militar', muscle: 'Hombros' },
];

const RoutineCreator: React.FC = () => {
  const [routineExercises, setRoutineExercises] = useState<any[]>([]);
  const [routineName, setRoutineName] = useState('Rutina de Fuerza - Mes 1');
  
  const addToRoutine = (exercise: any) => {
    setRoutineExercises([...routineExercises, { ...exercise, uid: Date.now(), sets: 4, reps: '8-12' }]);
  };

  const removeFromRoutine = (uid: number) => {
    setRoutineExercises(routineExercises.filter(ex => ex.uid !== uid));
  };

  const handleSaveRoutine = () => {
    if (routineExercises.length === 0) {
      alert('Por favor añade al menos un ejercicio a la rutina.');
      return;
    }
    // TODO: Implement save routine logic
    alert(`Rutina "${routineName}" guardada con ${routineExercises.length} ejercicios.`);
  };

  const handleSaveTemplate = () => {
    if (routineExercises.length === 0) {
      alert('Por favor añade al menos un ejercicio para crear una plantilla.');
      return;
    }
    // TODO: Implement save template logic
    alert(`Plantilla "${routineName}" guardada.`);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] gap-4 md:gap-6">
       <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
         <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">Creador de Rutinas</h1>
            <p className="text-[#a9d8b9] text-sm sm:text-base leading-relaxed">Crea rutinas personalizadas.</p>
         </div>
         <div className="flex gap-2 sm:gap-3">
             <button onClick={handleSaveTemplate} className="px-3 sm:px-4 py-2 rounded-lg bg-[#23482f] text-[#13ec5b] font-bold text-xs sm:text-sm focus-visible:outline-[3px] focus-visible:outline-[#13ec5b] focus-visible:outline-offset-2">Guardar Plantilla</button>
             <button onClick={handleSaveRoutine} className="px-3 sm:px-4 py-2 rounded-lg bg-[#13ec5b] text-[#112217] font-bold text-xs sm:text-sm focus-visible:outline-[3px] focus-visible:outline-[#23482f] focus-visible:outline-offset-2">Guardar Rutina</button>
         </div>
       </header>

       <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 flex-1 min-h-0" aria-label="Constructor de rutina">
          {/* Library */}
          <aside className="bg-[#112217] rounded-xl border border-[#326744] flex flex-col overflow-hidden" aria-labelledby="library-heading">
             <div className="p-3 md:p-4 border-b border-[#326744]">
                <h2 id="library-heading" className="text-white text-base md:text-lg font-bold mb-3">Biblioteca</h2>
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-[#a9d8b9]" size={18} aria-hidden />
                    <input aria-label="Buscar en biblioteca" className="w-full bg-[#23482f] rounded-lg py-2 pl-10 pr-4 text-white placeholder-[#a9d8b9] text-sm focus:outline-none focus:ring-1 focus:ring-[#13ec5b]" placeholder="Buscar..." />
                </div>
             </div>
             <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-2">
                {LIBRARY.map(ex => (
                    <div key={ex.id} className="flex justify-between items-center p-3 bg-[#193322] rounded-lg group hover:bg-[#23482f] transition-colors">
                        <div>
                            <p className="text-white font-medium text-sm">{ex.name}</p>
                            <p className="text-[#92c9a4] text-xs">{ex.muscle}</p>
                        </div>
                        <button onClick={() => addToRoutine(ex)} aria-label={`Añadir ${ex.name} a la rutina`} className="p-1.5 rounded-full bg-[#13ec5b]/10 text-[#13ec5b] hover:bg-[#13ec5b] hover:text-[#112217] transition-colors focus-visible:outline-[3px] focus-visible:outline-[#13ec5b] focus-visible:outline-offset-2">
                            <Plus size={16} />
                        </button>
                    </div>
                ))}
             </div>
          </aside>

          {/* Builder */}
          <article className="lg:col-span-2 flex flex-col gap-3 md:gap-4" aria-labelledby="builder-heading">
             <h2 id="builder-heading" className="sr-only">Constructor de ejercicios</h2>
             <div className="flex flex-col gap-2">
                <label htmlFor="routine-name" className="text-[#a9d8b9] text-sm md:text-base font-bold">Nombre de la Rutina</label>
                <input 
                  id="routine-name"
                  value={routineName}
                  onChange={(e) => setRoutineName(e.target.value)}
                  className="w-full bg-[#112217] border border-[#326744] rounded-lg p-2.5 md:p-3 text-sm md:text-base text-white focus:border-[#13ec5b] focus:outline-none" 
                />
             </div>
             
             <div className="flex-1 bg-[#112217] rounded-xl border-2 border-dashed border-[#326744] p-4 flex flex-col gap-3 overflow-y-auto">
                {routineExercises.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-[#92c9a4] opacity-50">
                        <GripVertical size={48} />
                        <p className="mt-2">Añade ejercicios de la biblioteca</p>
                    </div>
                ) : (
                    routineExercises.map((ex, idx) => (
                        <div key={ex.uid} className="bg-[#193322] rounded-lg p-4 flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-2">
                            <GripVertical className="text-[#92c9a4] cursor-grab" />
                            <div className="flex-1 min-w-[150px]">
                                <p className="text-white font-bold">{ex.name}</p>
                            </div>
                            <div className="flex gap-4 items-center">
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] text-[#92c9a4] uppercase">Series</label>
                                    <input aria-label={`Series para ${ex.name}`} className="w-16 bg-[#23482f] rounded p-1 text-center text-white text-sm" defaultValue={ex.sets} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] text-[#92c9a4] uppercase">Reps</label>
                                    <input aria-label={`Repeticiones para ${ex.name}`} className="w-16 bg-[#23482f] rounded p-1 text-center text-white text-sm" defaultValue={ex.reps} />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] text-[#92c9a4] uppercase">Descanso</label>
                                    <input aria-label={`Descanso para ${ex.name}`} className="w-16 bg-[#23482f] rounded p-1 text-center text-white text-sm" placeholder="60s" />
                                </div>
                            </div>
                            <div className="flex gap-2 ml-auto">
                                <button className="p-2 hover:bg-[#23482f] rounded text-[#a9d8b9]" aria-label={`Notas para ${ex.name}`}><FileText size={18} /></button>
                                <button onClick={() => removeFromRoutine(ex.uid)} className="p-2 hover:bg-red-900/30 rounded text-red-400" aria-label={`Eliminar ${ex.name} de la rutina`}><Trash2 size={18} /></button>
                            </div>
                        </div>
                    ))
                )}
             </div>
          </article>
       </section>
    </div>
  );
};

export default RoutineCreator;
