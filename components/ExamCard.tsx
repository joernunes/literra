import React from 'react';
import { FileText, Download, Calendar, GraduationCap, Heart } from 'lucide-react';
import { Exam } from '../types';

interface ExamCardProps {
  exam: Exam;
  onSelect: (exam: Exam) => void;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent, id: string) => void;
}

const ExamCard: React.FC<ExamCardProps> = ({ exam, onSelect, isFavorite, onToggleFavorite }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col h-full group relative">
      
      {/* Favorite Button - Absolute Position */}
      <button 
        onClick={(e) => onToggleFavorite(e, exam.id)}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white border border-gray-100 shadow-sm transition-all group-hover:opacity-100 md:opacity-0 opacity-100"
        title={isFavorite ? "Remover dos favoritos" : "Guardar exame"}
      >
        <Heart 
          className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`} 
        />
      </button>

      <div className="p-5 flex-1 cursor-pointer" onClick={() => onSelect(exam)}>
        <div className="flex items-start justify-between mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-stp-green border border-green-100">
            {exam.subject}
          </span>
          <span className="text-xs text-gray-500 font-mono bg-gray-50 px-2 py-1 rounded">
            {exam.year}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight group-hover:text-stp-green transition-colors pr-8">
          {exam.title}
        </h3>
        
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {exam.description}
        </p>

        <div className="flex items-center space-x-4 text-xs text-gray-400 mb-4">
          <div className="flex items-center">
            <GraduationCap className="w-3 h-3 mr-1" />
            {exam.grade}
          </div>
          <div className="flex items-center">
            <FileText className="w-3 h-3 mr-1" />
            {exam.type}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-between items-center">
        <button 
          onClick={() => onSelect(exam)}
          className="text-sm font-medium text-gray-700 hover:text-stp-green transition-colors"
        >
          Ver Detalhes
        </button>
        <button 
          onClick={() => window.open(exam.downloadUrl, '_blank')}
          className="text-gray-400 hover:text-stp-green transition-colors flex items-center text-xs"
        >
          <Download className="w-4 h-4 mr-1" />
          Baixar
        </button>
      </div>
    </div>
  );
};

export default ExamCard;