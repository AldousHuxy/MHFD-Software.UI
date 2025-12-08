import type { ReactNode } from 'react';

export const When = ({ condition, children }: { condition: boolean; children: ReactNode }) => {
    if (!condition) return null;

    return (
        <>
            {children}
        </>
    );
}