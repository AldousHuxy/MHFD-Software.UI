import { ChatDisplay } from '@/pages/LOMC/components/ChatDisplay';
import { ChatForm } from '@/pages/LOMC/components/ChatForm';
import { useChat } from './hooks/useChat';
import { useRef } from 'react';

const Home = () => {
  const resetFormRef = useRef<(() => void) | null>(null);
  const { messages, isPending, handleSendMessage } = useChat(() => {
    resetFormRef.current?.();
  });

  return (
    <main className="h-full flex flex-col p-4 sm:p-6 gap-3 sm:gap-4">
        <div className="flex-1 min-h-0">
          <ChatDisplay messages={messages} isPending={isPending} />
        </div>
        <div className="shrink-0">
          <ChatForm 
            onSendMessage={handleSendMessage} 
            isPending={isPending}
            onResetRef={resetFormRef}
          />
        </div>
    </main>
  );
}

export default Home;