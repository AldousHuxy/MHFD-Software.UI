import { create } from 'zustand';
import type { Message } from '@/types/conversation';

type Store = {
  msgs: Message[]
  addMessage: (msg: Message) => void
  clearMessages: () => void
}

const initialMessages: Message[] = [];

export const useMessages = create<Store>()((set) => ({
    msgs: initialMessages,
    addMessage: (msg: Message) => set((state) => ({ msgs: [...state.msgs, msg] })),
    clearMessages: () => set({ msgs: [] })
}))