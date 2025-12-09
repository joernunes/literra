import { Exam, GradeLevel, Subject } from './types';

export const GRADES: GradeLevel[] = [
  '7ª Classe', '8ª Classe', '9ª Classe', '10ª Classe', '11ª Classe', '12ª Classe'
];

export const SUBJECTS: Subject[] = [
  'Matemática', 'Língua Portuguesa', 'Física', 'Química', 'Biologia', 'História', 'Geografia', 'Inglês', 'Francês'
];

export const MOCK_EXAMS: Exam[] = [
  {
    id: '1',
    title: 'Exame Nacional de Matemática 12ª Classe - 1ª Fase',
    subject: 'Matemática',
    grade: '12ª Classe',
    year: 2023,
    type: 'Exame Nacional',
    description: 'Prova oficial da 1ª fase do exame nacional de acesso ao ensino superior.',
  },
  {
    id: '2',
    title: 'Exame Nacional de Português 12ª Classe - 2ª Fase',
    subject: 'Língua Portuguesa',
    grade: '12ª Classe',
    year: 2023,
    type: 'Exame Nacional',
    description: 'Prova de recurso focada em interpretação de texto e gramática avançada.',
  },
  {
    id: '3',
    title: 'Prova Trimestral de Física',
    subject: 'Física',
    grade: '10ª Classe',
    year: 2024,
    type: 'Prova de Frequência',
    description: 'Avaliação do 2º trimestre cobrindo mecânica clássica e cinemática.',
  },
  {
    id: '4',
    title: 'Exame de Biologia e Geologia',
    subject: 'Biologia',
    grade: '11ª Classe',
    year: 2022,
    type: 'Exame Nacional',
    description: 'Foco em genética e biologia celular.',
  },
  {
    id: '5',
    title: 'Teste de História de São Tomé e Príncipe',
    subject: 'História',
    grade: '9ª Classe',
    year: 2023,
    type: 'Prova de Frequência',
    description: 'História colonial e processo de independência.',
  },
  {
    id: '6',
    title: 'Exame de Matemática 9ª Classe',
    subject: 'Matemática',
    grade: '9ª Classe',
    year: 2022,
    type: 'Exame Nacional',
    description: 'Exame final de ciclo básico. Álgebra e Geometria plana.',
  },
  {
    id: '7',
    title: 'Prova de Química Orgânica',
    subject: 'Química',
    grade: '12ª Classe',
    year: 2021,
    type: 'Prova de Frequência',
    description: 'Reações de compostos de carbono e nomenclatura.',
  },
  {
    id: '8',
    title: 'Exame Nacional de Geografia',
    subject: 'Geografia',
    grade: '12ª Classe',
    year: 2023,
    type: 'Exame Nacional',
    description: 'Geografia económica e demografia de STP.',
  }
];
