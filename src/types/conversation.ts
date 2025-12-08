import { z } from 'zod';

export const roleSchema = z.enum(['user', 'assistant', 'system']);

export const messageSchema = z.object({
    role: roleSchema,
    content: z.string()
});

export const conversationRequestSchema = z.object({
    model: z.string(),
    messages: z.array(messageSchema),
    store: z.boolean()
});

export const conversationResponseSchema = z.object({
    text: z.string(),
    role: roleSchema
});



export type Role = z.infer<typeof roleSchema>;
export type Message = z.infer<typeof messageSchema>;
export type ConversationRequest = z.infer<typeof conversationRequestSchema>;
export type ConversationResponse = z.infer<typeof conversationResponseSchema>;