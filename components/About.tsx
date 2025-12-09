import React from 'react';
import { BookOpen, Users, Globe, Heart, Mail, Github, Target, Lightbulb } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-stp-green overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/50 to-stp-green/90 z-10" />
        <div className="absolute inset-0 bg-[url('https://picsum.photos/id/20/1200/600')] bg-cover bg-center mix-blend-overlay opacity-30" />
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            Democratizar a Educação em <br/>
            <span className="text-stp-yellow inline-block mt-2">São Tomé e Príncipe</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-green-50">
            Somos uma plataforma comunitária dedicada a facilitar o acesso a recursos educativos e promover o sucesso escolar de todos os santomenses.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">A Nossa Missão</h2>
            <div className="w-24 h-1.5 bg-stp-yellow mx-auto mt-4 rounded-full"></div>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              O ExameSTP nasceu da necessidade de centralizar materiais de estudo que muitas vezes se perdem ou são de difícil acesso. Acreditamos que a tecnologia pode ser a ponte para uma educação mais igualitária.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow duration-300">
              <div className="bg-green-100 p-4 rounded-full mb-6 text-stp-green">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Acesso Universal</h3>
              <p className="text-gray-600">
                Garantir que qualquer estudante, de Pantufo ao Príncipe, tenha acesso às mesmas provas e exames para se preparar.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow duration-300">
              <div className="bg-yellow-100 p-4 rounded-full mb-6 text-yellow-600">
                <Lightbulb className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Inovação</h3>
              <p className="text-gray-600">
                Introduzir ferramentas modernas, como a Inteligência Artificial, para personalizar o estudo e tirar dúvidas em tempo real.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-100 p-4 rounded-full mb-6 text-blue-600">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Comunidade</h3>
              <p className="text-gray-600">
                Construir uma rede onde professores e alunos colaboram, partilhando conhecimento e recursos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats/Facts */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-stp-green mb-2">500+</div>
            <div className="text-gray-400 font-medium">Provas Arquivadas</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-stp-yellow mb-2">12º</div>
            <div className="text-gray-400 font-medium">Ano Escolar Máx.</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-stp-red mb-2">100%</div>
            <div className="text-gray-400 font-medium">Gratuito</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-500 mb-2">24/7</div>
            <div className="text-gray-400 font-medium">Acesso ao Tutor</div>
          </div>
        </div>
      </div>

      {/* Team/Contact */}
      <div className="py-16 max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-r from-stp-green to-green-700 rounded-3xl p-8 md:p-12 text-white text-center shadow-xl">
          <Heart className="w-12 h-12 mx-auto mb-6 text-red-400 fill-red-400 animate-pulse" />
          <h2 className="text-3xl font-bold mb-4">Junta-te a Nós</h2>
          <p className="text-lg text-green-50 mb-8">
            Este é um projeto open-source e colaborativo. Se és professor, programador ou estudante e queres ajudar a melhorar a educação em STP, entra em contacto.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="mailto:contato@examestp.st" className="inline-flex items-center justify-center bg-white text-stp-green px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
              <Mail className="w-5 h-5 mr-2" />
              Contactar Equipa
            </a>
            <a href="#" className="inline-flex items-center justify-center bg-green-800/50 text-white border border-green-400/30 px-6 py-3 rounded-xl font-bold hover:bg-green-800 transition-colors">
              <Github className="w-5 h-5 mr-2" />
              Ver Código Fonte
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;