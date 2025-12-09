import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { startTutorChat } from '../services/geminiService';
import { Chat, GenerateContentResponse } from "@google/genai";

const AITutor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Olá! Sou o teu Tutor Inteligente. Posso ajudar-te a resolver exercícios de exames passados, explicar conceitos difíceis ou criar planos de estudo. O que queres aprender hoje?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chat session on mount
    const chat = startTutorChat();
    setChatSession(chat);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chatSession) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseStream = await chatSession.sendMessageStream({ message: userMsg.text });
      
      let fullResponseText = '';
      const responseMsgId = (Date.now() + 1).toString();
      
      // Initial placeholder for streaming
      setMessages(prev => [...prev, {
        id: responseMsgId,
        role: 'model',
        text: '',
        timestamp: new Date()
      }]);

      for await (const chunk of responseStream) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          fullResponseText += c.text;
          setMessages(prev => 
            prev.map(msg => 
              msg.id === responseMsgId 
                ? { ...msg, text: fullResponseText }
                : msg
            )
          );
        }
      }

    } catch (error) {
      console.error("Error sending message to Gemini:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: 'Desculpa, tive um problema de conexão. Verifica a tua chave API ou tenta novamente mais tarde.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!chatSession) {
    return (
      <div className="h-[600px] flex items-center justify-center flex-col text-center p-8 bg-white rounded-xl shadow-sm border border-red-100">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900">Configuração Necessária</h3>
        <p className="text-gray-500 max-w-md mt-2">
          Para usar o Tutor IA, é necessário configurar a chave API do Gemini no ambiente (process.env.API_KEY).
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] min-h-[500px] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Chat Header */}
      <div className="bg-stp-green/10 border-b border-stp-green/20 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-white p-2 rounded-full shadow-sm mr-3">
             <Sparkles className="w-5 h-5 text-stp-green" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">Tutor Inteligente STP</h2>
            <p className="text-xs text-gray-600">Baseado no modelo Gemini 2.5</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ml-2 mr-2 ${msg.role === 'user' ? 'bg-gray-200 ml-2' : 'bg-stp-green text-white mr-2'}`}>
                {msg.role === 'user' ? <User className="w-5 h-5 text-gray-600" /> : <Bot className="w-5 h-5" />}
              </div>
              <div 
                className={`p-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user' 
                    ? 'bg-white text-gray-900 shadow-sm border border-gray-100 rounded-tr-none' 
                    : 'bg-stp-green text-white shadow-md rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start w-full">
             <div className="flex flex-row items-center ml-12">
                <Loader2 className="w-5 h-5 text-stp-green animate-spin mr-2" />
                <span className="text-xs text-gray-500">A pensar...</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Faz uma pergunta sobre os exames..."
            disabled={isLoading}
            className="w-full pl-4 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-stp-green focus:border-transparent outline-none transition-all placeholder-gray-400 text-gray-700"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 bg-stp-green text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[10px] text-gray-400 mt-2 text-center">
          O Tutor pode cometer erros. Verifica sempre as informações importantes.
        </p>
      </div>
    </div>
  );
};

export default AITutor;
