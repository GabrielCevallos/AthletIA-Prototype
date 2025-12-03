import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, MoreVertical, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

const DEFAULT_EXERCISES = [
  { id: 1, name: 'Press de Banca', muscle: 'Pecho', equipment: 'Barra', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYGZNXa4LuDhTx1bscK4ZBNFpdzQ7g8vTjtjZceD2Ul_F64R-AlDuaNjc74zb76gRLj-KopyoCesqgApr9rqGZBR4rRdpKfQ_O_1rQzn0NJIZkiOweiV80PKIHTNsCatCdtKoGkUe-ZSmkVMWQlm5llQffy8f2ZRQvgMoX2oWD7U5boeVlrbeWd6Fp8bWSWSn1nDnHJBqEs-SncrQUW-S6pChqIdO_uyL9oqokLlQK8eX1Eh1Ymqi2Cs8XmsIitHcA1IdujZSRNMjb' },
  { id: 2, name: 'Sentadilla', muscle: 'Piernas', equipment: 'Barra', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUjwXRe0fwAZ8zICVtdjJNIj3bTkYuvVBewSUAH9Wb-BTRcfOA0Yy00rf0tdxRW1JmDX5P48NivvTeMI3JsKdFEZtqwQoTZu9IOAQ1vgjRt5KbE59JwmpYZYA04iQhrzY2EqdtMaJ6NWO0Xseg3vfi3jYZY2-gxhur6d2XCUDpneeGxvWi4o52a1DV6_yhPjxYovvQv-bH3uHFoyMB0RiEnIavkh-x2LSt4mg3rP9PFl4wozPbAF-bVI6OO_qEq0iFf_ClsG3cldsi' },
  { id: 3, name: 'Peso Muerto', muscle: 'Espalda', equipment: 'Barra', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyQUfducB4EeuiivhpILxGTCJeJgcX_dymfhnABUAwnFwkN4FGLTN5Q0ER7KPa4xelclVjjGGbXGSJPh-5GksPMsPcIaABeqZ4ulgCT45eB0YW-3CLPdtUHy57NTn5EkyQSVJEkurG0zui_VgMvZOz2t45Jfo8wnblU11bfFOc0fdTb59fvRVLCG8pcjmM2DVZ_2QnSMxp7RF2BVLNOrmBg7e7MH0WxE87k7XwGwbha0Z9B9rgSpAdKqm8T_z0CmEEScY26AcZvbCk' },
  { id: 4, name: 'Dominadas', muscle: 'Espalda', equipment: 'Peso corporal', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6WPDs96rwBSB5FCAsx9Q6HkNPMfAFCzSHxcsXCZ-uhrtz5NQ8M9N22Ne5dOVpD6E5L00ho2Rh_gQPIR8F9toHDrBUAFhjraZSpUWonK2kDX4_zlWagqrly1hnfwpunrjro5HmB9J1zGGFY9ZCmrC3vtA-D0td522SOnlVPzt_OOvayaWvwnoMNQ4DY-fygQceh5hDPOw6WBKqn8JjxAWJFm5ApFtYVJSJ1WoUTBF8yiPqtmx9HOcV8I1aF8W2WNbfSH587b9-Lrae' },
  { id: 5, name: 'Curl con Barra', muscle: 'Bíceps', equipment: 'Barra', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFyWkqy_KDhIAiVe60FEmbsRjveXMO0WM_zdx5sUQ7zq7VtYMtfhDd5iMS1-gUjo43Ncw0cIDEfRbnn4kal5hvJFBvm6OJWtM2qysrqXPxdYqKxshX8tZQpsSG5WaWhP_SVwFJMff842Wof3nYCBWNYdcaxL_w4K8No2yjwnblW7yHon50awnHp1h4nLFT9zRSQK-zXRAjBLRtYM-52JKHqUarh8Dklj9nJpcPv40_Q4mFiRloyFi10FEuyColfuuG0sWR6l_h3fsN' },
];

const Exercises: React.FC = () => {
  const [exercises, setExercises] = useState<any[]>([]);

  useEffect(() => {
    // Cargar ejercicios desde localStorage
    const stored = localStorage.getItem('exercises');
    const customExercises = stored ? JSON.parse(stored) : [];
    // Combinar ejercicios por defecto con los personalizados
    setExercises([...DEFAULT_EXERCISES, ...customExercises]);
  }, []);
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-black leading-tight">Biblioteca de Ejercicios</h1>
          <p className="text-[#a9d8b9] text-sm sm:text-base leading-relaxed">Busca, visualiza y gestiona la base de datos.</p>
        </div>
        <Link to="/exercises/new" aria-label="Añadir nuevo ejercicio" className="flex items-center justify-center gap-2 bg-[#13ec5b] text-[#112217] px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-bold hover:bg-opacity-90 transition focus-visible:outline-[3px] focus-visible:outline-[#23482f] focus-visible:outline-offset-2">
          <Plus size={20} />
          <span>Añadir Ejercicio</span>
        </Link>
      </header>

      {/* Search & Filters */}
      <section aria-label="Búsqueda y filtros">
        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
          <div className="flex-1 relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#92c9a4]">
              <Search size={24} />
            </div>
            <input
              type="text"
              placeholder="Buscar ejercicio por nombre..."
              aria-label="Buscar ejercicio por nombre"
              className="w-full h-12 pl-12 pr-4 rounded-xl bg-[#23482f] border-none text-white placeholder-[#a9d8b9] focus:ring-2 focus:ring-[#13ec5b]"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            <button className="flex items-center gap-2 px-4 h-12 rounded-xl bg-[#23482f] text-white whitespace-nowrap focus-visible:outline-[3px] focus-visible:outline-[#13ec5b] focus-visible:outline-offset-2" aria-label="Filtrar por grupo muscular">
              Grupo Muscular <Filter size={16} />
            </button>
            <button className="flex items-center gap-2 px-4 h-12 rounded-xl bg-[#23482f] text-white whitespace-nowrap focus-visible:outline-[3px] focus-visible:outline-[#13ec5b] focus-visible:outline-offset-2" aria-label="Filtrar por equipo">
              Equipo <Filter size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section aria-labelledby="exercises-grid-heading">
        <h2 id="exercises-grid-heading" className="sr-only">Lista de ejercicios</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {exercises.map((ex) => (
            <div key={ex.id} className="bg-[#112217] rounded-xl overflow-hidden border border-[#326744] hover:border-[#13ec5b] group transition-all">
              <div className="relative aspect-video">
                <img src={ex.image} alt={ex.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                <button className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70" aria-label="Más opciones para ejercicio">
                  <MoreVertical size={20} />
                </button>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-white font-bold text-lg">{ex.name}</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#13ec5b]/20 text-[#13ec5b]">{ex.muscle}</span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#23482f] text-white/90">{ex.equipment}</span>
                </div>
                <Link 
                  to={`/exercises/${ex.id}`}
                  aria-label={`Ver detalles del ejercicio ${ex.name}`} 
                  className="mt-4 block w-full text-center py-2 rounded-lg border border-[#326744] text-white hover:bg-[#23482f] transition-colors text-sm font-medium focus-visible:outline-[3px] focus-visible:outline-[#13ec5b] focus-visible:outline-offset-2"
                >
                  Ver Detalles
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Exercises;
