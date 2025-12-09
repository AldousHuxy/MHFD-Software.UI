import { useState } from 'react';
import { FileBrowser } from './FileBrowser';
import { useTheme } from '@/context/ThemeContext';

type SidebarProps = {
  isOpen: boolean;
};

export const Sidebar = ({ isOpen }: SidebarProps) => {
  const { isDarkTheme } = useTheme();
  const [selectedFile, setSelectedFile] = useState<string | string[] | null>(null);
  const [parentDir, setParentDir] = useState<string>('24-08-0233R Lemon Gulch Reach 1');
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileSelect = (filePath: string | string[], newParentDir?: string) => {
    setSelectedFile(filePath);
    if (newParentDir) {
      setParentDir(newParentDir);
    }
  };

  const handleRun = () => {
    setIsRunning(true);
    setProgress(0);
    console.log('running...');
    
    // Animate progress bar over 2 seconds
    const duration = 2000;
    const intervalTime = 20; // Update every 20ms for smooth animation
    const steps = duration / intervalTime;
    let currentStep = 0;
    
    const progressInterval = setInterval(() => {
      currentStep++;
      setProgress((currentStep / steps) * 100);
      
      if (currentStep >= steps) {
        clearInterval(progressInterval);
        setIsRunning(false);
        setProgress(0);
      }
    }, intervalTime);
  };

  return (
    <>
      {/* Sidebar panel */}
      <div
        className={`absolute top-0 right-0 h-full w-80 z-30 shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } ${
          isDarkTheme 
            ? 'bg-gray-800 border-l border-gray-700' 
            : 'bg-white border-l border-gray-200'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-gray-700">
            <h2 className={`text-lg font-bold ${
              isDarkTheme ? 'text-white' : 'text-gray-800'
            }`}>
              LOMC Explorer
            </h2>
            <p className={`text-xs mt-1 ${
              isDarkTheme ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {parentDir}
            </p>
          </div>

          {/* File Browser */}
          <div className="flex-1 overflow-y-auto p-4">
            <FileBrowser onFileSelect={handleFileSelect} />
          </div>

          {/* Selected File Info */}
          {selectedFile && Array.isArray(selectedFile) && selectedFile.length > 0 && (
            <div className={`p-4 border-t ${
              isDarkTheme ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <p className={`text-xs font-medium ${
                  isDarkTheme ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Selected Files
                </p>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  isDarkTheme ? 'bg-mhfd-blue/20 text-mhfd-blue' : 'bg-mhfd-blue/10 text-mhfd-blue'
                }`}>
                  {selectedFile.length}
                </span>
              </div>
              <div className={`max-h-32 overflow-y-auto space-y-1 ${
                isDarkTheme ? 'scrollbar-thin scrollbar-thumb-gray-600' : 'scrollbar-thin scrollbar-thumb-gray-300'
              }`}>
                {selectedFile.slice(0, 5).map((file, idx) => (
                  <p key={idx} className={`text-xs truncate ${
                    isDarkTheme ? 'text-gray-400' : 'text-gray-700'
                  }`}>
                    {file.split('/').pop()}
                  </p>
                ))}
                {selectedFile.length > 5 && (
                  <p className={`text-xs italic ${
                    isDarkTheme ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    +{selectedFile.length - 5} more...
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Progress Bar */}
          {isRunning && (
            <div className={`mt-3 h-1.5 rounded-full overflow-hidden ${
              isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'
            }`}>
              <div
                className="h-full bg-medium-green transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
          
          {/* Run Button */}
          <div className={`p-4 border-t ${
            isDarkTheme ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="cursor-pointer w-full flex items-center justify-center gap-2 px-4 py-3 bg-medium-green text-white font-medium rounded-xl hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRunning ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Running...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  <span>Check Completeness</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

    </>
  );
};
