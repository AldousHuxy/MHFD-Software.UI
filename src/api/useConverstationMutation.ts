import type { ConversationRequest, ConversationResponse } from "@/types/conversation";
import { useMutation } from "@tanstack/react-query";
import { server } from "./axios";
import type { AxiosResponse } from "axios";
import { useMessages } from "@/stores/useMessages";

export const useConversationMutation = (onSuccess?: () => void) => {
    const { addMessage } = useMessages();
    const {
        mutateAsync,
        isPending
    } = useMutation({
        mutationKey: ['converse'],
        mutationFn: async (conversation: ConversationRequest) => (await server.post<ConversationRequest, AxiosResponse<ConversationResponse, Error>, unknown>('/openai/conversation', conversation)).data,
        onSuccess: () => {
            if (onSuccess) onSuccess();
        }
    });

    const converse = async (conversation: ConversationRequest) => {
        const { role, text } = await mutateAsync(conversation);

        addMessage({ role, content: text });
    }

    return {
        converse,
        isPending
    }
};