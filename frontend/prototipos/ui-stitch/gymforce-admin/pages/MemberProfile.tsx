import React, { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, Edit, CreditCard } from 'lucide-react';

const MemberProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('details');

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6 md:gap-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex gap-2 text-xs sm:text-sm">
        <span className="text-[#a9d8b9]">Inicio</span> / <span className="text-[#a9d8b9]">Miembros</span> / <span className="text-white font-medium">Ana García</span>
      </nav>

      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
           <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-cover bg-center border-4 border-[#23482f]" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDMd671-bNclx4zm1zbkPbIDNTocExTR3itPFFUWPiHwE4W_GswUZmBu5B1u8tsl_6iUiB-o5PTBnWitJKnsPWNq_qP826VrzW7UzwoT8TW3qpgt9zhLLcYk84fM7_a2J1ePBysQ2NaMZHX7aFwSYFspt-bFz5De8qs56YbVLEDhr1l7_TiMLBMq8A-hcUZy-Pr5dfYiJ0QMTY-FUaW5mYqxu6nzIhkWi3x81-XWVd3HlmB1hPnPe7XS4nuxK-uz76CTcgLP9Fb84gW")'}}></div>
           <div>
             <div className="flex flex-wrap items-center gap-2 sm:gap-3">
               <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Ana García</h1>
               <span className="bg-[#13ec5b]/20 text-[#13ec5b] px-2.5 sm:px-3 py-0.5 rounded-full text-xs sm:text-sm font-medium">Activo</span>
             </div>
             <p className="text-[#a9d8b9] text-xs sm:text-sm md:text-base mt-1">ID: 789123 • Miembro desde 2022</p>
           </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => alert('Función de edición de perfil en desarrollo')} className="flex items-center gap-2 bg-[#23482f] text-white px-4 py-2 rounded-xl font-bold hover:bg-[#326744] focus-visible:outline-[3px] focus-visible:outline-[#13ec5b] focus-visible:outline-offset-2">
            <Edit size={16} /> Editar Perfil
          </button>
          <button onClick={() => alert('Función de renovación de membresía en desarrollo')} className="flex items-center gap-2 bg-[#13ec5b] text-[#112217] px-4 py-2 rounded-xl font-bold hover:bg-opacity-90 focus-visible:outline-[3px] focus-visible:outline-[#23482f] focus-visible:outline-offset-2">
            <CreditCard size={16} /> Renovar
          </button>
        </div>
      </header>

      {/* Tabs */}
      <nav className="border-b border-[#326744]" role="tablist" aria-label="Secciones del perfil">
        <div className="flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto">
        {['Detalles Personales', 'Membresía', 'Rutinas', 'Asistencia'].map((tab) => {
            const key = tab.split(' ')[0].toLowerCase();
            return (
                <button 
                  key={key}
                  role="tab"
                  aria-selected={activeTab === key}
                  aria-controls={`${key}-panel`}
                  onClick={() => setActiveTab(key)}
                  className={`pb-3 md:pb-4 px-2 font-bold text-xs sm:text-sm whitespace-nowrap transition-colors border-b-2 ${activeTab === key ? 'border-[#13ec5b] text-white' : 'border-transparent text-[#a9d8b9] hover:text-white'}`}
                >
                    {tab}
                </button>
            )
        })}
        </div>
      </nav>

      {/* Tab Content */}
      <section id="detalles-panel" role="tabpanel" aria-labelledby="tab-detalles" className="bg-[#112217] rounded-xl p-4 sm:p-6 md:p-8 border border-[#326744]">
        <h2 className="text-lg sm:text-xl font-bold text-white mb-4 md:mb-6">Información de Contacto</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            <div className="flex flex-col gap-1.5">
                <span className="text-[#a9d8b9] text-xs sm:text-sm flex items-center gap-2"><Mail size={14} aria-hidden /> Correo</span>
                <p className="text-white font-medium text-sm sm:text-base">ana.garcia@email.com</p>
            </div>
            <div className="flex flex-col gap-1.5">
                <span className="text-[#a9d8b9] text-xs sm:text-sm flex items-center gap-2"><Phone size={14} aria-hidden /> Teléfono</span>
                <p className="text-white font-medium text-sm sm:text-base">+34 612 345 678</p>
            </div>
            <div className="flex flex-col gap-1.5">
                <span className="text-[#a9d8b9] text-xs sm:text-sm flex items-center gap-2"><Calendar size={14} aria-hidden /> Nacimiento</span>
                <p className="text-white font-medium text-sm sm:text-base">22 Mayo, 1995</p>
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
                <span className="text-[#a9d8b9] text-xs sm:text-sm flex items-center gap-2"><MapPin size={14} aria-hidden /> Dirección</span>
                <p className="text-white font-medium text-sm sm:text-base">Calle Falsa 123, 28080 Madrid, España</p>
            </div>
        </div>
      </section>
    </div>
  );
};

export default MemberProfile;
