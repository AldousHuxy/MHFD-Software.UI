import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/pages/LOMC/components/Sidebar';
import { Navbar } from '@/pages/LOMC/Navbar';
import { ThemeProvider, useThemeContext } from '@/context/ThemeContext';
import { AgentProvider } from '@/context/AgentContext';

const LOMCLayout = () => {
    const { isDarkTheme } = useThemeContext();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
        <AgentProvider>
            <div className={`flex flex-col overflow-hidden transition-colors duration-300 ${isDarkTheme ? 'bg-gray-900' : 'bg-slate-50'}`}>
                <Navbar open={isSidebarOpen} setOpen={setIsSidebarOpen} />
                <div className="flex-1 overflow-hidden relative">
                    <div className={`h-full transition-all duration-300 ${isSidebarOpen ? 'lg:mr-80' : 'mr-0'}`}>
                    <Outlet />
                    </div>
                    <Sidebar isOpen={isSidebarOpen} />
                </div>
            </div>
        </AgentProvider>
    </ThemeProvider>
  );
}

export default LOMCLayout;
