import { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { ChatMessage } from './ChatMessage';
import type { Message } from '@/types/conversation';

type ChatDisplayProps = {
  messages: Message[];
  isPending?: boolean;
};

export const ChatDisplay = ({ messages, isPending }: ChatDisplayProps) => {
  const { isDarkTheme } = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isPending]);

  return (
    <div 
      ref={scrollRef}
      className={`flex flex-col gap-3 sm:gap-4 w-full p-4 sm:p-6 rounded-2xl shadow-lg border xl:h-[380px] 2xl:h-[860px] overflow-y-auto scrollbar-smooth transition-colors duration-300 ${
        isDarkTheme 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-100'
      }`}
    >
      <div className="flex flex-col gap-3 sm:gap-4 pb-4">
        {messages.length === 0 ? (
          <div className={`text-center py-8 ${
            isDarkTheme ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Let 's get started! Ask me anything or select a suggestion below.
          </div>
        ) : (
          messages.map((message, index) => (
            <ChatMessage
              key={index}
              role={message.role}
              content={message.content}
            />
          ))
        )}
        {isPending && (
          <div className={`self-start max-w-[80%] px-4 py-3 rounded-2xl rounded-bl-none shadow-sm transition-colors ${
            isDarkTheme 
              ? 'bg-gray-700 text-gray-100' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            <div className="flex gap-1">
              <span className="animate-bounce">.</span>
              <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}