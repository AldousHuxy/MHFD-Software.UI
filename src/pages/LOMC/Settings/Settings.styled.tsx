import type { HTMLAttributes } from 'react';

type TitleStyledProps = {
    isDarkTheme: boolean;
    className?: string;
} & HTMLAttributes<HTMLHeadingElement>;

export const TitleStyled = ({
    isDarkTheme,
    className,
    ...rest }: TitleStyledProps) => {
    return (
        <h2
            className={`text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-5 md:mb-6 ${
                isDarkTheme ? 'text-white' : 'text-gray-800'
            } ${className ?? ''}`}
            {...rest}
        />
    );
}

type SubtitleStyledProps = {
    isDarkTheme: boolean;
    className?: string;
} & HTMLAttributes<HTMLHeadingElement>;

export const SubtitleStyled = ({
    isDarkTheme,
    className,
    ...rest }: SubtitleStyledProps) => {
    return (
        <h3
            className={`text-sm sm:text-base md:text-lg font-semibold mb-1.5 sm:mb-2 md:mb-2 ${
              isDarkTheme ? 'text-gray-200' : 'text-gray-700'
            } ${className ?? ''}`}
            {...rest}
        />
    );
}

type InputGroupStyledProps = {
    isDarkTheme: boolean;
    className?: string;
} & HTMLAttributes<HTMLDivElement>;

export const InputGroupStyled = ({
    isDarkTheme,
    className,
    ...rest }: InputGroupStyledProps) => {
    return (
        <div
            className={`p-2 sm:p-2.5 md:p-3 lg:p-3 rounded-lg ${
                isDarkTheme ? 'bg-gray-700' : 'bg-gray-50'
            } ${className ?? ''}`}
            {...rest}
        />
    );
}

type SpanGroupStyledProps = {
    isDarkTheme: boolean;
    className?: string;
} & HTMLAttributes<HTMLSpanElement>;

export const SpanGroupStyled = ({
    isDarkTheme,
    className,
    ...rest }: SpanGroupStyledProps) => {
    return (
        <span
            className={`p-2 sm:p-2.5 md:p-3 lg:p-3 rounded-lg flex items-center justify-between ${
            isDarkTheme ? 'bg-gray-700' : 'bg-gray-50'
            } ${className ?? ''}`}
            {...rest}
        />
    );
}

type SpanStyledProps = {
    isDarkTheme: boolean;
    className?: string;
} & HTMLAttributes<HTMLSpanElement>;

export const SpanStyled = ({
    isDarkTheme,
    className,
    ...rest }: SpanStyledProps) => {
    return (
        <span
            className={`text-xs sm:text-sm font-medium ${
                isDarkTheme ? 'text-gray-300' : 'text-gray-600'
            } ${className ?? ''}`}
            {...rest}
        />
    );
}

type LabelStyledProps = {
    isDarkTheme: boolean;
    className?: string;
} & HTMLAttributes<HTMLLabelElement>;

export const LabelStyled = ({
    isDarkTheme,
    className,
    ...rest }: LabelStyledProps) => {
    return (
        <label
            className={`block text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 ${
                isDarkTheme ? 'text-gray-300' : 'text-gray-600'
            } ${className ?? ''}`}
            {...rest}
        />
    );
}

type InputStyledProps = {
    type?: string;
    isDarkTheme: boolean;
    className?: string;
    defaultChecked?: boolean;
    placeholder?: string;
} & HTMLAttributes<HTMLInputElement>;

export const InputStyled = ({
    type = "text",
    isDarkTheme,
    className,
    placeholder,
    ...rest }: InputStyledProps) => {
    if (type === 'checkbox') {
        return (
            <input
                type="checkbox"
                placeholder={placeholder}
                className={`w-4 h-4 sm:w-5 sm:h-5 text-mhfd-blue rounded focus:ring-mhfd-blue ${
                    className ?? ''
                }`}
                {...rest}
            />
        );
    }

    return (
        <input
            type={type}
            className={`w-full px-2 sm:px-3 md:px-3 lg:px-4 py-1.5 sm:py-2 md:py-2 lg:py-2 text-xs sm:text-sm rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-mhfd-blue transition-all ${
                isDarkTheme
                    ? 'bg-gray-600 text-gray-100 placeholder-gray-400'
                    : 'bg-white text-gray-800 placeholder-gray-400'
            } ${className ?? ''}`}
            {...rest}
        />
    );
}

type ButtonStyledProps = {
    type?: "button" | "submit" | "reset";
    isDarkTheme: boolean;
    className?: string;
} & HTMLAttributes<HTMLButtonElement>;

export const ButtonStyled = ({
    type = "button",
    isDarkTheme,
    className,
    ...rest }: ButtonStyledProps) => {
    if (type === 'submit') {
        return (
            <button
                type="submit"
                className={`cursor-pointer px-3 sm:px-4 md:px-5 lg:px-6 py-1.5 sm:py-2 md:py-2 lg:py-2.5 text-xs sm:text-sm bg-mhfd-blue text-white hover:bg-medium-green font-medium rounded-lg hover:bg-opacity-90 transition-all ${className ?? ''}`}
                {...rest}
            />
        );
    }

    return (
        <button
            className={`cursor-pointer px-3 sm:px-4 md:px-5 lg:px-6 py-1.5 sm:py-2 md:py-2 lg:py-2.5 text-xs sm:text-sm font-medium rounded-lg border-2 transition-all ${
                isDarkTheme
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-500'
            } ${className ?? ''}`}
            {...rest}
        />
    );
}