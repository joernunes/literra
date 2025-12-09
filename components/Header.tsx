import React from 'react';
import { BookOpen, Search, Menu, X, BrainCircuit, LogOut, Info } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  currentView: string;
  setView: (view: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  user: User | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView, isMobileMenuOpen, setIsMobileMenuOpen, user, onLogout }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => setView('home')}>
            <BookOpen className="h-8 w-8 text-stp-green mr-2" />
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">Exame<span className="text-stp-green">STP</span></h1>
              <p className="text-[10px] text-gray-500 font-medium -mt-1 tracking-wide">REPÓSITORIO EDUCATIVO</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6 items-center">
            <nav className="flex space-x-6 mr-4">
              <button 
                onClick={() => setView('home')}
                className={`${currentView === 'home' ? 'text-stp-green font-semibold' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
              >
                Início
              </button>
              <button 
                onClick={() => setView('browse')}
                className={`${currentView === 'browse' ? 'text-stp-green font-semibold' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
              >
                Exames
              </button>
              <button 
                onClick={() => setView('tutor')}
                className={`${currentView === 'tutor' ? 'text-stp-green font-semibold' : 'text-gray-600 hover:text-gray-900'} flex items-center transition-colors`}
              >
                <BrainCircuit className="w-4 h-4 mr-1.5" />
                Tutor IA
              </button>
              <button 
                onClick={() => setView('about')}
                className={`${currentView === 'about' ? 'text-stp-green font-semibold' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
              >
                Sobre
              </button>
            </nav>
            
            <div className="h-6 w-px bg-gray-200"></div>

            {user ? (
              <div className="flex items-center space-x-4">
                 <button 
                  onClick={() => setView('upload')}
                  className="text-gray-600 hover:text-stp-green font-medium text-sm"
                >
                  Contribuir
                </button>
                <div className="flex items-center space-x-2 pl-2">
                  <div className="text-right hidden lg:block">
                    <p className="text-sm font-semibold text-gray-900 leading-none">{user.name}</p>
                    <p className="text-xs text-gray-500">Estudante</p>
                  </div>
                  <div className="h-9 w-9 rounded-full bg-stp-green/10 flex items-center justify-center border border-stp-green/20 overflow-hidden">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-stp-green font-bold text-sm">{user.name.charAt(0)}</span>
                    )}
                  </div>
                  <button 
                    onClick={onLogout}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    title="Sair"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setView('login')}
                  className="text-gray-600 hover:text-gray-900 font-medium text-sm px-3 py-2"
                >
                  Entrar
                </button>
                <button 
                  onClick={() => setView('signup')}
                  className="bg-stp-green text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium shadow-sm shadow-green-700/20"
                >
                  Criar conta
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {user && (
               <div className="h-8 w-8 rounded-full bg-stp-green/10 flex items-center justify-center border border-stp-green/20 overflow-hidden">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-stp-green font-bold text-xs">{user.name.charAt(0)}</span>
                  )}
               </div>
            )}
             <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-500 hover:text-gray-700">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-2 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2 px-4 pb-4 pt-2">
            {user && (
              <div className="mb-4 pb-4 border-b border-gray-100 flex items-center space-x-3">
                 <div className="h-10 w-10 rounded-full bg-stp-green/10 flex items-center justify-center overflow-hidden">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-stp-green font-bold">{user.name.charAt(0)}</span>
                    )}
                 </div>
                 <div>
                   <p className="font-semibold text-gray-900">{user.name}</p>
                   <p className="text-xs text-gray-500">{user.email}</p>
                 </div>
              </div>
            )}

             <button 
              onClick={() => { setView('home'); setIsMobileMenuOpen(false); }}
              className={`text-left py-2 ${currentView === 'home' ? 'text-stp-green font-semibold' : 'text-gray-600'}`}
            >
              Início
            </button>
            <button 
              onClick={() => { setView('browse'); setIsMobileMenuOpen(false); }}
              className={`text-left py-2 ${currentView === 'browse' ? 'text-stp-green font-semibold' : 'text-gray-600'}`}
            >
              Exames e Provas
            </button>
             <button 
              onClick={() => { setView('tutor'); setIsMobileMenuOpen(false); }}
              className={`text-left py-2 ${currentView === 'tutor' ? 'text-stp-green font-semibold' : 'text-gray-600'} flex items-center`}
            >
              <BrainCircuit className="w-4 h-4 mr-2" />
              Tutor Inteligente
            </button>
            <button 
              onClick={() => { setView('about'); setIsMobileMenuOpen(false); }}
              className={`text-left py-2 ${currentView === 'about' ? 'text-stp-green font-semibold' : 'text-gray-600'} flex items-center`}
            >
              <Info className="w-4 h-4 mr-2" />
              Sobre o Projeto
            </button>
            
            {user ? (
              <>
                <button 
                  onClick={() => { setView('upload'); setIsMobileMenuOpen(false); }}
                  className="text-left py-2 text-stp-green font-semibold"
                >
                  Contribuir com Prova
                </button>
                <button 
                  onClick={() => { onLogout(); setIsMobileMenuOpen(false); }}
                  className="text-left py-2 text-red-600 flex items-center mt-2 border-t border-gray-100 pt-4"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair da conta
                </button>
              </>
            ) : (
              <div className="pt-4 mt-2 border-t border-gray-100 flex flex-col space-y-2">
                <button 
                  onClick={() => { setView('login'); setIsMobileMenuOpen(false); }}
                  className="w-full text-center py-2 text-gray-600 border border-gray-200 rounded-lg"
                >
                  Entrar
                </button>
                <button 
                  onClick={() => { setView('signup'); setIsMobileMenuOpen(false); }}
                  className="w-full text-center py-2 bg-stp-green text-white rounded-lg font-medium shadow-sm"
                >
                  Criar conta
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;