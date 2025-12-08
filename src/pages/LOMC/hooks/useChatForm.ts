import { useAgent } from "@/context/AgentContext";
import { useMessages } from "@/stores/useMessages";
import type { ConversationRequest, Message } from "@/types/conversation";
import { useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type ChatMessageProps = {
  onSendMessage: (message: Message) => Promise<void>;
  isPending?: boolean;
};

export const useChatForm = ({ onSendMessage, isPending }: ChatMessageProps) => {
  const { register, handleSubmit, setValue, reset } = useForm<ConversationRequest>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { selectedAgent } = useAgent();
  const { clearMessages } = useMessages();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleAttachmentClick = () => fileInputRef.current?.click();

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onSubmit: SubmitHandler<ConversationRequest> = async (data) => {
    if (!data?.messages || data.messages.length === 0 || isPending) return;
    const message = data.messages[0];
    if (!message.content.trim()) return;
    reset();
    try {
      await onSendMessage({ role: 'user', content: message.content });
    } catch (error) {
      console.error('Error in onSubmit:', error);
    }
  };

  const handlePillClick = (input: string) => setValue('messages.0.content', input, { shouldValidate: true, shouldDirty: true });

  return {
    selectedAgent,
    register,
    handleSubmit,
    setValue,
    fileInputRef,
    selectedFile,
    handlePillClick,
    handleFileChange,
    handleAttachmentClick,
    removeFile,
    onSubmit,
    clearMessages
  };
}