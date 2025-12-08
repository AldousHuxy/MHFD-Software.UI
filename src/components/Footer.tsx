export const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-mhfd-dark-blue text-white p-3 sm:p-4 flex items-center justify-center">
            <p className="text-xs sm:text-sm">&copy; {year} Mile High Flood District.</p>
        </footer>
    )
}