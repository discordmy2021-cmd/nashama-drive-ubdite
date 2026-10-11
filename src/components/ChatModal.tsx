import React, { useState } from 'react';
import { X, Send, ShieldCheck, CheckCheck } from 'lucide-react';
import { Driver } from '../types';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  driver: Driver;
}

interface Message {
  id: string;
  sender: 'user' | 'driver';
  text: string;
  time: string;
}

export const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose, driver }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'driver',
      text: 'مرحباً بك! أنا في طريقي إليك الآن، سأصل خلال 4 دقائق بإذن الله.',
      time: '18:32'
    }
  ]);
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const quickReplies = [
    'أنا بالانتظار عند المدخل الرئيسي',
    'هل اقتربت يا كابتن؟',
    'سأكون جاهزاً خلال دقيقة',
    'سيارتي لونها أبيض قرب الإشارة'
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Captain auto-reply
    setTimeout(() => {
      const replies = [
        'تمام يا غالي، شفتك ووصلت تقريباً!',
        'حياك الله، أنا أمام المبنى مباشرة مشغّل الفلاشر.',
        'أهلاً بك، لا تقلق خذ وقتك التام.',
        'أنا بالسيارة السوناتا السوداء، بانتظارك.'
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'driver',
          text: randomReply,
          time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0e0e14] border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden font-['Cairo'] text-right flex flex-col h-[520px]">
        
        {/* Header */}
        <div className="p-3.5 border-b border-zinc-800 flex items-center justify-between bg-[#14141d]">
          <button
            onClick={onClose}
            className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end">
                <span className="font-bold text-sm text-white">{driver.name}</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <span className="text-[10px] text-emerald-400">متصل الآن • يقود في الطريق</span>
            </div>
            <img
              src={driver.avatar}
              alt={driver.name}
              className="w-9 h-9 rounded-full object-cover border border-red-600"
            />
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0a0a0e]">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-start' : 'items-end'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                    isUser
                      ? 'bg-[#E50914] text-white rounded-br-xs'
                      : 'bg-[#1b1b24] text-zinc-100 rounded-bl-xs border border-zinc-800'
                  }`}
                >
                  <p>{msg.text}</p>
                  <div className={`flex items-center gap-1 mt-1 text-[9px] ${isUser ? 'text-red-200 justify-start' : 'text-zinc-400 justify-end'}`}>
                    <span>{msg.time}</span>
                    {isUser && <CheckCheck className="w-3 h-3 text-red-200" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick reply chips */}
        <div className="px-3 py-1.5 bg-[#12121a] border-t border-zinc-800/80 overflow-x-auto flex gap-1.5 scrollbar-none">
          {quickReplies.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(q)}
              className="flex-shrink-0 text-[10px] bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white px-2.5 py-1 rounded-full border border-zinc-700/50 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Message Input Box */}
        <div className="p-3 bg-[#14141d] border-t border-zinc-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="اكتب رسالة للكابتن محمود..."
              className="flex-1 bg-[#1c1c28] border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50914]"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="bg-[#E50914] hover:bg-[#c90812] text-white p-2 rounded-xl transition-colors disabled:opacity-40 cursor-pointer"
            >
              <Send className="w-4 h-4 transform rotate-180" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
