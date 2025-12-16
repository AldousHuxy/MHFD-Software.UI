import type { Message } from '@/types/conversation';
import type { Pill } from '@/types/pill';
import { useChatForm } from '../hooks/useChatForm';
import { SuggestionPill } from './SuggestionPill';
import { useTheme } from '@/context/ThemeContext';
import type { MutableRefObject } from 'react';

const pills = [
  { id: 0, label: 'Test', text: 'Who am I?', color: 'grey' },
  { id: 2, label: 'Summarize', text: 'Summarize the entire proposal and check for key points, included parties, and any notable details', color: 'grey' },
  { id: 1, label: 'Tie-Ins', text: 'Analyze the upstream and downstream tie-ins with existing infrastructure', color: 'grey' },
  { id: 3, label: 'Requirements', text: 'Check for visibility of license number, signature number, seal, and other regulatory markings', color: 'grey' },
  { id: 4, label: 'Issues', text: 'Identify any noticeable issues or concerns within the proposal', color: 'grey' },
  { id: 5, label: 'Satisfaction', text: 'Determine the current satisfaction rating for this proposal based on recent reviews', color: 'grey' },
  { id: 7, label: 'Compliance', text: 'Verify compliance with the latest FEMA guidelines and local regulations', color: 'grey' },
  { id: 8, label: 'Environmental Impact', text: 'Assess any environmental impact statements or considerations included in the proposal', color: 'grey' },
  { id: 9, label: 'Cost Analysis', text: 'Provide a brief cost analysis based on the figures presented in the proposal', color: 'grey' },
  { id: 10, label: 'Timeline', text: 'Outline the proposed timeline and any critical milestones mentioned', color: 'grey' },
  { id: 11, label: 'Parties', text: 'Identify all parties involved in the proposal and their roles', color: 'grey' },
] satisfies Pill[];

type ChatMessageProps = {
  onSendMessage: (message: Message) => Promise<void>;
  isPending?: boolean;
  onResetRef?: MutableRefObject<(() => void) | null>;
};

export const ChatForm = ({ onSendMessage, isPending, onResetRef }: ChatMessageProps) => {
  const {
    selectedAgent,
    selectedFile,
    fileInputRef,
    onSubmit,
    register,
    removeFile,
    handleSubmit,
    handlePillClick,
    handleFileChange,
    handleAttachmentClick,
    resetForm
  } = useChatForm({ onSendMessage, isPending });
  const { isDarkTheme } = useTheme();

  if (onResetRef) {
    onResetRef.current = resetForm;
  }

  return (
    <div className={`rounded-2xl shadow-lg border transition-all ${
      isDarkTheme 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-100'
    }`}>
      <div className="flex gap-2 overflow-x-auto p-4 pb-3 scrollbar-thin">
        {pills.map(pill => <SuggestionPill key={pill.id} pill={pill} handlePillClick={handlePillClick} />)}
      </div>

      <div className={`h-px mx-4 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`} />

      {selectedFile && (
        <div className={`flex items-center justify-between gap-3 mx-4 mt-3 px-4 py-2 rounded-xl transition-all ${
          isDarkTheme 
            ? 'bg-gray-700 border border-gray-600' 
            : 'bg-gray-50 border border-gray-200'
        }`}>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <svg className="w-5 h-5 text-mhfd-blue shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className={`text-sm truncate ${isDarkTheme ? 'text-gray-200' : 'text-gray-700'}`}>
              {selectedFile.name}
            </span>
            <span className={`text-xs ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
              ({(selectedFile.size / 1024).toFixed(1)} KB)
            </span>
          </div>
          <button
            type="button"
            onClick={removeFile}
            className={`p-1 rounded-lg transition-colors ${
              isDarkTheme 
                ? 'hover:bg-gray-600 text-gray-400 hover:text-red-400' 
                : 'hover:bg-gray-200 text-gray-500 hover:text-red-500'
            }`}
            aria-label="Remove file"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-3 p-4">
          <input 
            type="text"
            disabled={isPending}
            className={`flex-1 px-4 py-3 border-0 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-mhfd-blue transition-all ${
              isDarkTheme 
                ? 'bg-gray-700 text-gray-100 focus:bg-gray-600' 
                : 'bg-gray-50 text-gray-800 focus:bg-white'
            } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
            placeholder={`Type your message to ${selectedAgent.shortName}...`}
            {...register('messages.0.content')}
          />
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept="*/*"
          />
          <button
            type="button"
            onClick={handleAttachmentClick}
            className={`cursor-pointer p-3 rounded-xl transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-mhfd-blue ${
              selectedFile
                ? 'text-mhfd-blue'
                : isDarkTheme 
                  ? 'text-gray-300 hover:text-mhfd-blue hover:bg-gray-700' 
                  : 'text-gray-500 hover:text-mhfd-blue hover:bg-gray-100'
            }`}
            aria-label="Attach file"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
          <button
            type="submit"
            disabled={isPending}
            className={`px-3 py-1 md:px-6 md:py-3 border-2 border-mhfd-blue text-mhfd-blue font-medium rounded-xl hover:bg-mhfd-blue hover:text-white transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-mhfd-blue focus:ring-offset-2 ${
              isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            {isPending ? 'Sending...' : 'Send'}
          </button>
      </form>
    </div>
  );
}