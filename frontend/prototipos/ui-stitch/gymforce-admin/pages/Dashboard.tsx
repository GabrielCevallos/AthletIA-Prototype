import React from 'react';
import { Users, DollarSign, Activity, TrendingUp, UserPlus, FilePlus, Edit, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Lun', ingresos: 4000 },
  { name: 'Mar', ingresos: 3000 },
  { name: 'Mie', ingresos: 2000 },
  { name: 'Jue', ingresos: 2780 },
  { name: 'Vie', ingresos: 1890 },
  { name: 'Sab', ingresos: 2390 },
  { name: 'Dom', ingresos: 3490 },
];

const StatCard = ({ title, value, change, isPositive, icon: Icon, color }: any) => (
  <div className="flex flex-col gap-2 rounded-xl p-6 border border-[#326744] bg-[#112217] relative overflow-hidden group hover:border-[#13ec5b]/50 transition-all">
    <div className={`absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
        <Icon size={100} />
    </div>
    <div className="flex justify-between items-start z-10">
        <div>
            <p className="text-gray-400 text-sm font-medium leading-normal mb-1">{title}</p>
            <p className="text-white tracking-tight text-3xl font-bold leading-tight">{value}</p>
        </div>
        <div className={`p-2 rounded-lg ${color} bg-opacity-20 text-white`}>
            <Icon size={24} />
        </div>
    </div>
    <p className={`${isPositive ? 'text-[#13ec5b]' : 'text-[#fa5538]'} text-sm font-medium leading-normal flex items-center gap-1 z-10`}>
      {isPositive ? <TrendingUp size={16} /> : <TrendingUp size={16} className="rotate-180" />}
      {change}
    </p>
  </div>
);

const QuickAction = ({ icon: Icon, label, to }: { icon: any, label: string, to: string }) => (
    <Link to={to} aria-label={label} className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-[#112217] border border-[#326744] hover:border-[#13ec5b] transition-all hover:-translate-y-1 group focus-visible:outline-[3px] focus-visible:outline-[#13ec5b] focus-visible:outline-offset-2">
        <Icon size={32} className="text-[#13ec5b] group-hover:scale-110 transition-transform" aria-hidden />
        <p className="text-white text-base font-medium">{label}</p>
    </Link>
);

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <header className="flex flex-col gap-2">
        <h1 className="text-white text-3xl sm:text-4xl font-black leading-tight tracking-[-0.033em]">Panel de Administración</h1>
        <p className="text-[#a9d8b9] text-base sm:text-lg leading-relaxed">Bienvenido, aquí tienes un resumen de la actividad de tu gimnasio.</p>
      </header>

      {/* Stats Grid */}
      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">Estadísticas Principales</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard title="Miembros Activos" value="452" change="+5% vs mes anterior" isPositive={true} icon={Users} color="bg-blue-500" />
        <StatCard title="Ingresos Mensuales" value="$12,850" change="+2.1% vs mes anterior" isPositive={true} icon={DollarSign} color="bg-green-500" />
        <StatCard title="Check-ins Hoy" value="123" change="-3% vs ayer" isPositive={false} icon={Activity} color="bg-orange-500" />
        <StatCard title="Ocupación Actual" value="65%" change="+10% vs ayer" isPositive={true} icon={Activity} color="bg-purple-500" />
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Actions & Charts */}
        <div className="lg:col-span-2 flex flex-col gap-6 md:gap-8">
            <section aria-labelledby="quick-actions-heading">
              <h2 id="quick-actions-heading" className="text-white text-xl md:text-2xl font-bold mb-4 md:mb-6">Accesos Directos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                <QuickAction icon={UserPlus} label="Añadir Miembro" to="/members" />
                <QuickAction icon={FilePlus} label="Crear Rutina" to="/routines" />
                <QuickAction icon={Edit} label="Gestionar Ejercicios" to="/exercises" />
              </div>
            </section>

            <section aria-labelledby="revenue-chart-heading">
              <div className="flex flex-col gap-4 rounded-xl p-4 md:p-6 bg-[#112217] border border-[#326744]">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
                    <h2 id="revenue-chart-heading" className="text-white text-lg md:text-xl font-bold">Ingresos del Mes</h2>
                    <select className="bg-[#23482f] text-white text-sm rounded-lg px-2 py-1 border-none outline-none">
                        <option>Últimos 7 días</option>
                        <option>Este mes</option>
                    </select>
                </div>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#13ec5b" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#13ec5b" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#23482f" vertical={false} />
                            <XAxis dataKey="name" stroke="#a9d8b9" tickLine={false} axisLine={false} />
                            <YAxis stroke="#a9d8b9" tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#112217', borderColor: '#326744', color: '#fff' }} 
                                itemStyle={{ color: '#13ec5b' }}
                            />
                            <Area type="monotone" dataKey="ingresos" stroke="#13ec5b" strokeWidth={3} fillOpacity={1} fill="url(#colorIngresos)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
              </div>
            </section>
        </div>

        {/* Right Column: Notifications & Classes */}
        <aside className="lg:col-span-1 flex flex-col gap-6 md:gap-8">
             {/* Notifications */}
            <section aria-labelledby="notifications-heading">
              <div className="flex flex-col gap-4 rounded-xl p-4 md:p-6 bg-[#112217] border border-[#326744]">
                <h2 id="notifications-heading" className="text-white text-lg md:text-xl font-bold mb-2">Notificaciones</h2>
                
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#23482f]/30 transition-colors">
                    <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center shrink-0 text-yellow-500">
                        <Activity size={20} />
                    </div>
                    <div>
                        <p className="text-white text-sm font-medium">5 membresías por renovar.</p>
                        <p className="text-xs text-[#a9d8b9]">Hace 2 horas</p>
                    </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#23482f]/30 transition-colors">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center shrink-0 text-blue-500">
                        <Users size={20} />
                    </div>
                    <div>
                        <p className="text-white text-sm font-medium">Clase de 'Spinning' casi llena.</p>
                        <p className="text-xs text-[#a9d8b9]">Hace 5 horas</p>
                    </div>
                </div>
                
                <button onClick={() => alert('Función de notificaciones en desarrollo')} className="w-full mt-2 py-2 text-sm md:text-base text-[#13ec5b] font-medium hover:bg-[#13ec5b]/10 rounded-lg transition-colors focus-visible:outline-[3px] focus-visible:outline-[#13ec5b] focus-visible:outline-offset-2">
                    Ver todas
                </button>
              </div>
            </section>

            {/* Classes Today */}
            <section aria-labelledby="classes-heading">
              <div className="flex flex-col gap-4 rounded-xl p-4 md:p-6 bg-[#112217] border border-[#326744]">
                <h2 id="classes-heading" className="text-white text-lg md:text-xl font-bold mb-2">Clases de Hoy</h2>
                
                {[
                    { name: "Yoga Flow", time: "09:00 AM", instructor: "https://i.pravatar.cc/150?img=1" },
                    { name: "Spinning", time: "06:00 PM", instructor: "https://i.pravatar.cc/150?img=5" },
                    { name: "HIIT", time: "07:30 PM", instructor: "https://i.pravatar.cc/150?img=8" },
                ].map((cls, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-[#23482f]/50 rounded-lg border border-transparent hover:border-[#13ec5b]/30 transition-all">
                        <div>
                            <p className="text-white font-medium">{cls.name}</p>
                            <p className="text-sm text-[#a9d8b9]">{cls.time}</p>
                        </div>
                        <img src={cls.instructor} alt="Instructor" className="w-8 h-8 rounded-full border border-[#13ec5b]" />
                    </div>
                ))}

                <button onClick={() => alert('Función de horario de clases en desarrollo')} className="flex items-center justify-center gap-2 w-full mt-2 py-2 text-sm md:text-base text-white font-medium hover:text-[#13ec5b] transition-colors focus-visible:outline-[3px] focus-visible:outline-[#13ec5b] focus-visible:outline-offset-2">
                    Ver horario completo <ArrowRight size={16} />
                </button>
              </div>
            </section>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
