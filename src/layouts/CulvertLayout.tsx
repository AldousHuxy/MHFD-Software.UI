import { DesignInfoProvider } from '@/context/DesignInfoContext';
import Navbar from '@/pages/Culvert/components/Navbar';
import { Toolbox } from '@/pages/Culvert/components/Toolbox';
import { Outlet } from 'react-router-dom';

const CulvertLayout = () => {
  return (
        <DesignInfoProvider>
            <Navbar />
            <Outlet />
            <Toolbox />
        </DesignInfoProvider>
    )
}

export default CulvertLayout;