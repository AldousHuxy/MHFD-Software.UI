import { useTheme } from "@/context/ThemeContext";
import type { Pill } from "@/types/pill";

type SuggestionPillsProps = {
    pill: Pill;
    handlePillClick: (input: string) => void;
};

export const SuggestionPill = ({ pill, handlePillClick }: SuggestionPillsProps) => {
    const { isDarkTheme } = useTheme();

    return (
        <button
            key={pill.id}
            type="button"
            onClick={() => handlePillClick(pill.text)}
            className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
              isDarkTheme 
                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                : pill.color === 'grey' 
                  ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                  : 'bg-blue-200 text-blue-800 hover:bg-blue-300'
            }`}
          >
            {pill.label}
          </button>
    )
};