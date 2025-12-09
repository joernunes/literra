import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import ExamCard from './components/ExamCard';
import ExamDetailModal from './components/ExamDetailModal';
import AITutor from './components/AITutor';
import Login from './components/Login';
import Signup from './components/Signup';
import About from './components/About';
import { MOCK_EXAMS, GRADES, SUBJECTS } from './constants';
import { Exam, FilterState, GradeLevel, Subject, User } from './types';
import { Search, Filter, UploadCloud, BookOpen, Heart, CheckCircle, Loader2, XCircle } from 'lucide-react';

function App() {
  const [currentView, setView] = useState('home');
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  
  // Favorites State
  const [savedExamIds, setSavedExamIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('savedExams');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [filters, setFilters] = useState<FilterState & { onlyFavorites: boolean }>({
    subject: 'Todas',
    grade: 'Todas',
    year: 'Todos',
    searchQuery: '',
    onlyFavorites: false,
  });

  // Upload State
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'success'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);

  // Persist favorites
  useEffect(() => {
    localStorage.setItem('savedExams', JSON.stringify(Array.from(savedExamIds)));
  }, [savedExamIds]);

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSavedExamIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filteredExams = useMemo(() => {
    return MOCK_EXAMS.filter(exam => {
      const matchesSubject = filters.subject === 'Todas' || exam.subject === filters.subject;
      const matchesGrade = filters.grade === 'Todas' || exam.grade === filters.grade;
      const matchesYear = filters.year === 'Todos' || exam.year === filters.year;
      const matchesSearch = exam.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) || 
                            exam.description?.toLowerCase().includes(filters.searchQuery.toLowerCase());
      const matchesFavorite = filters.onlyFavorites ? savedExamIds.has(exam.id) : true;
      
      return matchesSubject && matchesGrade && matchesYear && matchesSearch && matchesFavorite;
    });
  }, [filters, savedExamIds]);

  const uniqueYears = Array.from(new Set(MOCK_EXAMS.map(e => e.year))).sort((a, b) => b - a);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setView('home');
  };

  const handleLogout = () => {
    setUser(null);
    setView('home');
  };

  const handleUpload = () => {
    setUploadState('uploading');
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadState('success');
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const resetUpload = () => {
    setUploadState('idle');
    setUploadProgress(0);
  };

  // Home View Component
  const HomeView = () => (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-stp-green/90 to-green-800 text-white rounded-3xl overflow-hidden shadow-2xl mx-4 mt-6 lg:mx-0">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/1200/600')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        <div className="relative px-8 py-20 md:py-32 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Estuda para o Futuro de <br/>
            <span className="text-stp-yellow inline-block mt-2">São Tomé e Príncipe</span>
          </h1>
          <p className="text-lg md:text-xl text-green-50 mb-10 max-w-2xl mx-auto font-light">
            Acede a centenas de exames nacionais e provas de frequência. Prepara-te com a ajuda do nosso Tutor de Inteligência Artificial.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => setView('browse')}
              className="px-8 py-4 bg-white text-stp-green font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg transform hover:-translate-y-1"
            >
              Explorar Exames
            </button>
            <button 
              onClick={() => setView('tutor')}
              className="px-8 py-4 bg-green-900/40 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl hover:bg-green-900/60 transition-all"
            >
              Falar com Tutor IA
            </button>
          </div>
        </div>
      </div>

      {/* Stats/Features Grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
          <div className="bg-blue-100 p-4 rounded-full mb-6">
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Arquivo Completo</h3>
          <p className="text-gray-500">Exames desde a 7ª à 12ª classe, organizados por disciplina e ano letivo.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
           <div className="bg-stp-yellow/20 p-4 rounded-full mb-6">
            <Search className="w-8 h-8 text-yellow-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Busca Fácil</h3>
          <p className="text-gray-500">Encontra rapidamente a prova que precisas com os nossos filtros inteligentes.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
           <div className="bg-green-100 p-4 rounded-full mb-6">
            <UploadCloud className="w-8 h-8 text-stp-green" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Comunidade</h3>
          <p className="text-gray-500">Contribui enviando provas que tenhas para ajudar outros estudantes.</p>
        </div>
      </div>
    </div>
  );

  // Browse View
  const BrowseView = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-24">
            <div className="flex items-center mb-4 text-gray-800">
              <Filter className="w-5 h-5 mr-2" />
              <h2 className="font-bold">Filtros</h2>
            </div>
            
            <div className="space-y-4">
              
              {/* Favorites Toggle */}
              <button
                onClick={() => setFilters({...filters, onlyFavorites: !filters.onlyFavorites})}
                className={`w-full flex items-center justify-center space-x-2 p-2.5 rounded-lg border transition-all ${
                  filters.onlyFavorites 
                    ? 'bg-red-50 border-red-200 text-red-600 font-medium' 
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${filters.onlyFavorites ? 'fill-red-600' : ''}`} />
                <span>{filters.onlyFavorites ? 'A ver Favoritos' : 'Meus Favoritos'}</span>
              </button>
              
              <hr className="border-gray-100" />

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Classe</label>
                <select 
                  value={filters.grade}
                  onChange={(e) => setFilters({...filters, grade: e.target.value as any})}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-stp-green/20 focus:border-stp-green outline-none"
                >
                  <option value="Todas">Todas as Classes</option>
                  {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Disciplina</label>
                <select 
                  value={filters.subject}
                  onChange={(e) => setFilters({...filters, subject: e.target.value as any})}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-stp-green/20 focus:border-stp-green outline-none"
                >
                  <option value="Todas">Todas as Disciplinas</option>
                  {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Ano</label>
                <select 
                  value={filters.year}
                  onChange={(e) => setFilters({...filters, year: e.target.value === 'Todos' ? 'Todos' : Number(e.target.value)})}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-stp-green/20 focus:border-stp-green outline-none"
                >
                  <option value="Todos">Todos os Anos</option>
                  {uniqueYears.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>

              <button 
                onClick={() => setFilters({subject: 'Todas', grade: 'Todas', year: 'Todos', searchQuery: '', onlyFavorites: false})}
                className="w-full text-xs text-gray-400 hover:text-gray-600 underline text-center pt-2"
              >
                Limpar todos os filtros
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Pesquisar por nome da prova, conteúdo..."
                value={filters.searchQuery}
                onChange={(e) => setFilters({...filters, searchQuery: e.target.value})}
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-stp-green/20 focus:border-stp-green outline-none transition-all"
              />
            </div>
          </div>

          {filteredExams.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${filters.onlyFavorites ? 'bg-red-50' : 'bg-gray-100'}`}>
                {filters.onlyFavorites ? <Heart className="w-8 h-8 text-red-300" /> : <Search className="w-8 h-8 text-gray-400" />}
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                {filters.onlyFavorites ? 'Sem exames favoritos' : 'Nenhum exame encontrado'}
              </h3>
              <p className="text-gray-500">
                {filters.onlyFavorites 
                  ? 'Clica no ícone de coração nos exames para os guardares aqui.' 
                  : 'Tente ajustar os filtros ou a sua pesquisa.'}
              </p>
              {!filters.onlyFavorites && (
                <button 
                  onClick={() => setFilters({subject: 'Todas', grade: 'Todas', year: 'Todos', searchQuery: '', onlyFavorites: false})}
                  className="mt-4 text-stp-green font-medium hover:underline"
                >
                  Limpar filtros
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExams.map(exam => (
                <ExamCard 
                  key={exam.id} 
                  exam={exam} 
                  onSelect={setSelectedExam}
                  isFavorite={savedExamIds.has(exam.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Upload Simulation View
  const UploadView = () => (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-stp-green px-8 py-6 text-white">
          <h2 className="text-2xl font-bold flex items-center">
            <UploadCloud className="w-6 h-6 mr-3" />
            Contribuir com uma Prova
          </h2>
          <p className="text-green-100 mt-2 opacity-90">
            Ajuda a comunidade estudantil de STP digitalizando e enviando provas antigas.
          </p>
        </div>
        
        {uploadState === 'success' ? (
           <div className="p-12 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-300">
             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
               <CheckCircle className="w-10 h-10 text-stp-green" />
             </div>
             <h3 className="text-2xl font-bold text-gray-900 mb-2">Prova Enviada com Sucesso!</h3>
             <p className="text-gray-500 max-w-md mb-8">
               Obrigado pela tua contribuição. A nossa equipa irá rever o documento e publicá-lo em breve.
             </p>
             <button 
               onClick={resetUpload}
               className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-6 py-3 rounded-xl font-medium transition-colors"
             >
               Enviar outra prova
             </button>
           </div>
        ) : (
          <div className="p-8 space-y-6">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Prova / Título</label>
              <input 
                type="text" 
                placeholder="Ex: Exame Nacional de Matemática 12ª Classe - 2023" 
                className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-stp-green focus:border-stp-green outline-none" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Disciplina</label>
                <select className="w-full rounded-lg border-gray-300 border p-2.5 bg-white focus:ring-stp-green focus:border-stp-green outline-none">
                  {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Classe</label>
                <select className="w-full rounded-lg border-gray-300 border p-2.5 bg-white focus:ring-stp-green focus:border-stp-green outline-none">
                  {GRADES.map(g => <option key={g}>{g}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ano</label>
                <input type="number" placeholder="2024" className="w-full rounded-lg border-gray-300 border p-2.5 focus:ring-stp-green focus:border-stp-green outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <select className="w-full rounded-lg border-gray-300 border p-2.5 bg-white focus:ring-stp-green focus:border-stp-green outline-none">
                  <option>Exame Nacional</option>
                  <option>Prova de Frequência</option>
                </select>
              </div>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
              <UploadCloud className="w-12 h-12 text-gray-400 mx-auto mb-3 group-hover:text-stp-green transition-colors" />
              <p className="text-sm text-gray-600 font-medium">Clica para selecionar o ficheiro PDF ou Imagem</p>
              <p className="text-xs text-gray-400 mt-1">Máximo 10MB</p>
              <input type="file" className="hidden" />
            </div>

            {uploadState === 'uploading' && (
              <div className="space-y-2">
                 <div className="flex justify-between text-xs font-medium text-gray-500">
                   <span>A enviar ficheiro...</span>
                   <span>{uploadProgress}%</span>
                 </div>
                 <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-stp-green h-2.5 rounded-full transition-all duration-300 ease-out" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                 </div>
              </div>
            )}

            <div className="pt-4 flex justify-end">
              <button 
                onClick={handleUpload}
                disabled={uploadState === 'uploading'}
                className="bg-stp-green text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-green-900/10 hover:bg-green-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
              >
                {uploadState === 'uploading' ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5 mr-2" />
                    A enviar...
                  </>
                ) : (
                  'Enviar para Revisão'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // View Routing
  if (currentView === 'login') {
    return <Login onLogin={handleLogin} onCancel={() => setView('home')} onSignupClick={() => setView('signup')} />;
  }

  if (currentView === 'signup') {
    return <Signup onSignup={handleLogin} onCancel={() => setView('home')} onLoginClick={() => setView('login')} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
      <Header 
        currentView={currentView} 
        setView={setView} 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        user={user}
        onLogout={handleLogout}
      />

      <main>
        {currentView === 'home' && <HomeView />}
        {currentView === 'browse' && <BrowseView />}
        {currentView === 'about' && <About />}
        {currentView === 'tutor' && (
          <div className="max-w-5xl mx-auto px-4 py-8">
            <AITutor />
          </div>
        )}
        {currentView === 'upload' && <UploadView />}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 mb-4 font-medium">ExameSTP &copy; {new Date().getFullYear()}</p>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Uma iniciativa independente para apoiar a educação em São Tomé e Príncipe. 
            Não afiliado oficialmente ao Ministério da Educação.
          </p>
        </div>
      </footer>

      {selectedExam && (
        <ExamDetailModal 
          exam={selectedExam} 
          onClose={() => setSelectedExam(null)} 
        />
      )}
    </div>
  );
}

export default App;