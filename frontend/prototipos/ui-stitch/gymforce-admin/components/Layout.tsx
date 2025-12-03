import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Dumbbell, Calendar, Settings, LogOut, PlusCircle, Upload, Menu } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const isActive = (path: string) => location.pathname === path;

  const NavItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => (
    <Link
      to={to}
      aria-current={isActive(to) ? 'page' : undefined}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors focus-visible:outline-[3px] focus-visible:outline-primary focus-visible:outline-offset-2 ${
        isActive(to)
          ? 'bg-[#23482f] text-white'
          : 'text-gray-400 hover:bg-[#23482f]/50 hover:text-white'
      }`}
    >
      <Icon aria-hidden size={20} className={isActive(to) ? 'fill-current' : ''} />
      <p className="text-sm font-medium leading-normal">{label}</p>
    </Link>
  );

  return (
    <div className="flex min-h-screen w-full bg-background-light dark:bg-background-dark text-gray-900 dark:text-white">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside aria-label="Barra lateral de navegación" className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#112217] p-4 flex flex-col transition-transform duration-300 transform lg:relative lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col gap-8 h-full">
          <div className="flex items-center gap-3 px-2">
            <div 
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#23482f]" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBSnBdJrFVKt43vSZpi8rsBDaz5aD1iZAy2O2cmmLLVnjQj0HqxS78E7GEtKAEFbLVdJ671v_0hVFZ6hrPMBeaK2gyjkEEHcZLRYg9DdSnz7kcNmHw28TSvS7sNycbBJOUh0bcJlnTm_deRnBx5J7J6vSL_zt9lEXx4Nut_mqlx1aIB7-rZOkQUJaanmSLwx6bjHc75VG9b9A_-Dj5MrT3dE5paLa51QG-NDPn4tk0jsICs_-gz6DEYLUHSFVeHFlrfIpzQd018befJ")' }}
            ></div>
            <div className="flex flex-col">
              <h1 className="text-white text-base font-medium leading-normal">AthletIA</h1>
              <p className="text-[#92c9a4] text-sm font-normal leading-normal">Admin Panel</p>
            </div>
          </div>

          <nav className="flex flex-col gap-2" aria-label="Principal">
            <NavItem to="/" icon={LayoutDashboard} label="Dashboard" />
            <NavItem to="/members" icon={Users} label="Miembros" />
            <NavItem to="/exercises" icon={Dumbbell} label="Ejercicios" />
            <NavItem to="/routines" icon={Calendar} label="Rutinas" />
          </nav>

          <div className="mt-auto flex flex-col gap-2">
            <NavItem to="/settings" icon={Settings} label="Ajustes" />
            <button aria-label="Cerrar sesión" className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-[#112217] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors mt-2 focus-visible:outline-[3px] focus-visible:outline-[#23482f] focus-visible:outline-offset-2">
              <LogOut size={16} className="mr-2" />
              <span className="truncate">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden relative">
        <header className="lg:hidden flex items-center justify-between p-4 bg-[#112217] text-white" aria-label="Encabezado móvil">
             <div className="flex items-center gap-3">
               <span className="font-bold text-lg">AthletIA</span>
             </div>
             <button onClick={() => setMobileMenuOpen(true)} aria-expanded={mobileMenuOpen} aria-controls="sidebar" aria-label="Abrir menú">
               <Menu aria-hidden />
             </button>
        </header>
        
        <main id="main-content" className="flex-1 overflow-y-auto p-4 md:p-8" role="main">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
