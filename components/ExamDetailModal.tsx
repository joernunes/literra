import React, { useState } from 'react';
import { X, Calendar, Book, FileText, Download, Lightbulb, GraduationCap, ChevronRight, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Exam } from '../types';
import { createStudyPlan } from '../services/geminiService';

interface ExamDetailModalProps {
  exam: Exam;
  onClose: () => void;
}

const ExamDetailModal: React.FC<ExamDetailModalProps> = ({ exam, onClose }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'ai-plan'>('info');
  const [studyPlan, setStudyPlan] = useState<string | null>(null);
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [focusArea, setFocusArea] = useState('');

  const handleGeneratePlan = async () => {
    if (!focusArea.trim()) return;
    setLoadingPlan(true);
    try {
      const plan = await createStudyPlan(exam.subject, exam.grade, focusArea);
      setStudyPlan(plan);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingPlan(false);
    }
  };

  // Fallback PDF for demo purposes if no downloadUrl is present
  const pdfUrl = exam.downloadUrl || "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{exam.title}</h2>
            <p className="text-sm text-gray-500 flex items-center mt-1">
              {exam.subject} <ChevronRight className="w-3 h-3 mx-1" /> {exam.grade}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            
            {/* Tabs */}
            <div className="flex space-x-4 mb-6 border-b border-gray-100">
              <button
                onClick={() => setActiveTab('info')}
                className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'info' 
                    ? 'border-stp-green text-stp-green' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Prova & Documento
              </button>
              <button
                onClick={() => setActiveTab('ai-plan')}
                className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors flex items-center ${
                  activeTab === 'ai-plan' 
                    ? 'border-stp-yellow text-amber-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Lightbulb className="w-4 h-4 mr-1.5" />
                Plano de Estudo (IA)
              </button>
            </div>

            {activeTab === 'info' ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                   {/* Left Column: Metadata */}
                   <div className="space-y-4">
                     <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                       <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Detalhes</h3>
                       <ul className="space-y-3">
                          <li className="flex items-center text-sm text-gray-600">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            <span className="font-medium mr-2">Ano:</span> {exam.year}
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <FileText className="w-4 h-4 mr-2 text-gray-400" />
                            <span className="font-medium mr-2">Tipo:</span> {exam.type}
                          </li>
                          <li className="flex items-center text-sm text-gray-600">
                            <GraduationCap className="w-4 h-4 mr-2 text-gray-400" />
                            <span className="font-medium mr-2">Classe:</span> {exam.grade}
                          </li>
                       </ul>
                     </div>
                     
                     <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <h3 className="text-sm font-semibold text-blue-900 mb-2">Descrição</h3>
                        <p className="text-sm text-blue-800 leading-relaxed">
                          {exam.description || "Sem descrição disponível."}
                        </p>
                        <div className="mt-4 pt-4 border-t border-blue-200">
                          <a 
                            href={pdfUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Baixar PDF
                          </a>
                        </div>
                     </div>
                   </div>

                   {/* Right Column: PDF Viewer */}
                   <div className="lg:col-span-2">
                     <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-100 h-[600px] flex flex-col">
                        <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex justify-between items-center">
                          <span className="text-xs font-medium text-gray-500">Visualização do Documento</span>
                          <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center">
                            Abrir noutra janela <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        </div>
                        <iframe 
                          src={pdfUrl}
                          className="w-full flex-1"
                          title="Visualizador de PDF"
                        />
                     </div>
                   </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {!studyPlan ? (
                  <div className="bg-amber-50 rounded-xl p-8 border border-amber-100 max-w-2xl mx-auto text-center">
                    <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lightbulb className="w-8 h-8 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-bold text-amber-900 mb-2">Plano de Estudo Personalizado</h3>
                    <p className="text-amber-800 mb-6">
                      A nossa IA pode criar um roteiro de estudo focado nas tuas dificuldades específicas para este exame.
                    </p>
                    
                    <div className="text-left bg-white p-4 rounded-xl border border-amber-200 shadow-sm">
                      <label className="block text-sm font-medium text-amber-900 mb-2">Onde tens mais dificuldade?</label>
                      <input 
                        type="text" 
                        value={focusArea}
                        onChange={(e) => setFocusArea(e.target.value)}
                        placeholder="Ex: Geometria no espaço, Verbos irregulares, Bioquímica..."
                        className="w-full border-gray-200 bg-gray-50 rounded-lg p-3 focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all"
                      />
                      <button 
                        onClick={handleGeneratePlan}
                        disabled={loadingPlan || !focusArea.trim()}
                        className="w-full mt-3 bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-md shadow-amber-500/20"
                      >
                        {loadingPlan ? (
                          <>
                             <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                             A Gerar Plano...
                          </>
                        ) : (
                          <>
                            <Lightbulb className="w-4 h-4 mr-2" />
                            Gerar Dicas de Estudo
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="animate-in fade-in duration-500">
                    <div className="flex justify-between items-center mb-4">
                       <div className="flex items-center">
                         <div className="bg-green-100 p-2 rounded-full mr-3">
                            <Lightbulb className="w-5 h-5 text-green-700" />
                         </div>
                         <h3 className="text-lg font-bold text-gray-800">Teu Roteiro de Estudo</h3>
                       </div>
                       <button 
                        onClick={() => setStudyPlan(null)}
                        className="text-sm text-gray-500 hover:text-gray-800 underline"
                       >
                         Gerar novo
                       </button>
                    </div>
                    
                    <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                       <ReactMarkdown className="prose prose-sm md:prose-base max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-stp-green">
                         {studyPlan}
                       </ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200 bg-gray-100 rounded-lg transition-colors"
          >
            Fechar Janela
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamDetailModal;