import mhfdLogo from '/mhfd-logo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import PATHS from '@/routes';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { FaSearch } from "react-icons/fa";
import { When } from '@/hocs/When';

type SearchForm = {
  search: string
};

export const Header = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<SearchForm>();
  const { pathname } = useLocation();
  const onSubmit: SubmitHandler<SearchForm> = ({ search }) => console.log(search);

  const isActivePage = (path: string): boolean => pathname === path

  return (
    <header className="cursor-pointer bg-mhfd-dark-blue text-white p-3 sm:p-4 flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <img src={mhfdLogo} alt="MHFD Logo" className="h-8 sm:h-10 md:h-12 shrink-0" onClick={() => navigate(PATHS.HOME)} />
          <h1 className="text-xl sm:text-2xl font-bold">Floodware</h1>
        </div>
        <div className="flex items-center gap-4 sm:gap-6 w-full max-w-2xl justify-end">
          <When condition={!isActivePage(PATHS.CULVERT.HOME)}>
            <button className="cursor-pointer bg-bright-yellow rounded-xl px-4 py-2 text-black font-semibold" onClick={() => navigate(PATHS.CULVERT.HOME)}>
              <div className="text-sm sm:text-base font-semibold">Culvert Hydraulics</div>
            </button>
          </When>
          <When condition={!isActivePage(PATHS.LOMC.HOME)}>
            <button className="cursor-pointer bg-mhfd-purple rounded-xl px-4 py-2 text-black font-semibold" onClick={() => navigate(PATHS.LOMC.HOME)}>
              <div className="text-sm sm:text-base font-semibold">LOMC Chatbot</div>
            </button>
          </When>
          <form onSubmit={handleSubmit(onSubmit)} className="flex items-stretch gap-2 max-w-xs sm:max-w-sm">
              <input
                  type="text"
                  placeholder="Search..."
                  {...register('search')}
                  className="px-2 sm:px-3 py-1.5 sm:py-2 rounded text-black bg-white text-sm sm:text-base w-full min-w-0"
              />
              <button
                type="submit"
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-medium-green text-white font-bold rounded flex items-center justify-center shrink-0"
              >
                <FaSearch />
              </button>
          </form>
        </div>
    </header>
  )
}