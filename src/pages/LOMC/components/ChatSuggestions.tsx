import type { Pill } from "@/types/pill";

type ChatSuggestionsProps = {
    pills: Pill[];
    isDarkTheme: boolean;
};

export const ChatSuggestions = ({ pills, isDarkTheme }: ChatSuggestionsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {pills.map(pill => (
        <div
          key={pill.id}
          className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors ${
            isDarkTheme 
              ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
              : pill.color === 'grey' 
                ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                : 'bg-blue-200 text-blue-800 hover:bg-blue-300'
          }`}
        >
          {pill.label}
        </div>
      ))}
    </div>
  );
}