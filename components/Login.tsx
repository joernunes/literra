import React, { useState } from 'react';
import { Mail, Lock, Loader2, ArrowLeft, CheckCircle } from 'lucide-react';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
  onCancel: () => void;
  onSignupClick: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onCancel, onSignupClick }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Mock successful login
      const mockUser: User = {
        id: '1',
        name: 'Estudante STP',
        email: email,
        role: 'student',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
      };
      onLogin(mockUser);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Image/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-stp-green relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 to-stp-green/90 z-10" />
        <img 
          src="https://picsum.photos/id/452/1200/1600" 
          alt="Estudantes a estudar" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        <div className="relative z-20 flex flex-col justify-between h-full p-12 text-white">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">Exame<span className="text-stp-yellow">STP</span></h1>
            <p className="text-green-100 text-lg max-w-md">
              A tua porta de entrada para o sucesso académico. Acede a exames, provas e recebe ajuda do nosso Tutor IA.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                <CheckCircle className="w-6 h-6 text-stp-yellow" />
              </div>
              <div>
                <p className="font-semibold">Arquivo Completo</p>
                <p className="text-sm text-green-100">Milhares de provas desde 2010</p>
              </div>
            </div>
             <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                <CheckCircle className="w-6 h-6 text-stp-yellow" />
              </div>
              <div>
                <p className="font-semibold">Inteligência Artificial</p>
                <p className="text-sm text-green-100">Planos de estudo personalizados</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-green-200">© 2024 ExameSTP. Feito com ❤️ para São Tomé.</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <button 
            onClick={onCancel}
            className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Voltar ao início
          </button>

          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Bem-vindo de volta!</h2>
            <p className="text-gray-500 mt-2">Introduz os teus dados para continuar.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-stp-green focus:border-stp-green transition-colors outline-none"
                  placeholder="exemplo@escola.st"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Palavra-passe</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-stp-green focus:border-stp-green transition-colors outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg flex items-center">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-600">
                <input type="checkbox" className="mr-2 rounded text-stp-green focus:ring-stp-green" />
                Lembrar-me
              </label>
              <a href="#" className="text-stp-green hover:underline font-medium">
                Esqueci a palavra-passe
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center bg-stp-green hover:bg-green-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-green-900/10 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                  A entrar...
                </>
              ) : (
                'Entrar na conta'
              )}
            </button>

            <p className="text-center text-sm text-gray-600 mt-6">
              Não tens conta?{' '}
              <button 
                type="button"
                onClick={onSignupClick}
                className="text-stp-green font-semibold hover:underline bg-transparent border-none cursor-pointer"
              >
                Criar conta gratuita
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;