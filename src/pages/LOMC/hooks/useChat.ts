import { useAgent } from "@/context/AgentContext";
import { useConversationMutation } from "@/api/useConverstationMutation";
import { useMessages } from "@/stores/useMessages";
import type { Message } from "@/types/conversation";

export const useChat = (onMessageSent?: () => void) => {
    const { msgs, addMessage } = useMessages();
    const { selectedAgent } = useAgent();
    const { isPending, converse } = useConversationMutation(onMessageSent);

    const handleSendMessage = async (message: Message) => {
        addMessage(message);
        
        const currentMessages = useMessages.getState().msgs;
        
        await converse({
            model: selectedAgent.model,
            messages: currentMessages,
            store: true
        });
    };

    return {
        messages: msgs,
        isPending,
        handleSendMessage
    };
};