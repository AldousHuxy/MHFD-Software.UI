import mhfdLogo from '/mhfd-logo.png';
import { useNavigate } from 'react-router-dom';
import PATHS from '@/routes';
import floodwareLogo from '/floodware-logo_light.png';

export const Header = () => {
  const navigate = useNavigate();


  return (
    <header className="cursor-pointer bg-mhfd-dark-blue text-white p-3 sm:p-4 flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-5 sm:gap-8">
          <a href="https://www.mhfd.org" target="_blank" rel="noopener noreferrer">
            <img src={mhfdLogo} alt="MHFD Logo" className="h-8 sm:h-10 md:h-12 shrink-0" />
          </a>
          <img src={floodwareLogo} alt="FloodWare Logo" className="h-2 sm:h-4 md:h-6 shrink-0" onClick={() => navigate(PATHS.HOME)} />
        </div>
    </header>
  )
}