import { useTheme } from '@/context/ThemeContext';
import type { Message } from '@/types/conversation';
import ReactMarkdown from 'react-markdown';

type ChatMessageBoxProps = {} & Message;

export const ChatMessage = ({ role, content }: ChatMessageBoxProps) => {
    const { isDarkTheme } = useTheme();
    
    if (role === 'user') {
        return (
            <div className="self-end max-w-[80%] bg-mhfd-blue text-white px-4 py-3 rounded-2xl rounded-br-none shadow-sm">
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
        );
    }

    return (
        <div className={`self-start max-w-[80%] px-4 py-3 rounded-2xl rounded-bl-none shadow-sm transition-colors prose prose-sm ${
            isDarkTheme 
                ? 'bg-gray-700 text-gray-100 prose-invert' 
                : 'bg-gray-100 text-gray-800'
        }`}>
            <ReactMarkdown
                components={{
                    code: ({ className, children, ...props }) => {
                        const isInline = !className;
                        return isInline ? (
                            <code className={`px-1 py-0.5 rounded ${isDarkTheme ? 'bg-gray-600' : 'bg-gray-200'}`} {...props}>
                                {children}
                            </code>
                        ) : (
                            <code className={`block p-2 rounded ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-100'}`} {...props}>
                                {children}
                            </code>
                        );
                    }
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}