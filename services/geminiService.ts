import { GoogleGenAI, Chat } from "@google/genai";
import { Subject, GradeLevel } from '../types';

let genAI: GoogleGenAI | null = null;

const getGenAI = () => {
  if (!genAI) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API_KEY is missing from environment variables.");
      return null;
    }
    genAI = new GoogleGenAI({ apiKey });
  }
  return genAI;
};

export const createStudyPlan = async (subject: Subject, grade: GradeLevel, focusArea: string): Promise<string> => {
  const ai = getGenAI();
  if (!ai) return "Erro: Chave de API não configurada.";

  const prompt = `
    Aja como um professor experiente do sistema de ensino de São Tomé e Príncipe (baseado no currículo português).
    Crie um plano de estudos resumido para um aluno da ${grade} na disciplina de ${subject}.
    O foco específico do aluno é: "${focusArea}".
    
    O plano deve incluir:
    1. Principais tópicos a revisar.
    2. Uma sugestão de exercício prático ou pergunta de reflexão.
    3. Dica de gestão de tempo para o exame.
    
    Responda em Markdown limpo e formatado.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Não foi possível gerar o plano de estudos.";
  } catch (error) {
    console.error("Error generating study plan:", error);
    return "Desculpe, ocorreu um erro ao gerar o plano de estudos. Tente novamente mais tarde.";
  }
};

export const startTutorChat = (): Chat | null => {
  const ai = getGenAI();
  if (!ai) return null;

  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: "Você é um tutor inteligente e amigável para estudantes de São Tomé e Príncipe. Ajude-os a entender matérias escolares, resolver exercícios de exames passados e preparar-se para exames nacionais. Seja encorajador e claro. Use português de Portugal (padrão em STP).",
    },
  });
};
