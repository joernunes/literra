export type GradeLevel = '7ª Classe' | '8ª Classe' | '9ª Classe' | '10ª Classe' | '11ª Classe' | '12ª Classe';

export type Subject = 'Matemática' | 'Língua Portuguesa' | 'Física' | 'Química' | 'Biologia' | 'História' | 'Geografia' | 'Inglês' | 'Francês';

export type ExamType = 'Exame Nacional' | 'Prova de Frequência' | 'Teste Intermédio';

export interface Exam {
  id: string;
  title: string;
  subject: Subject;
  grade: GradeLevel;
  year: number;
  type: ExamType;
  downloadUrl?: string; // Simulated URL
  description?: string;
}

export interface FilterState {
  subject: Subject | 'Todas';
  grade: GradeLevel | 'Todas';
  year: number | 'Todos';
  searchQuery: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'student' | 'teacher' | 'admin';
}