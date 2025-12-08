import { useThemeContext } from "@/context/ThemeContext";

const Settings = () => {
  const { isDarkTheme } = useThemeContext();

    return (
    <main className="h-[calc(100vh-8rem)] sm:h-[calc(100vh-9rem)] md:h-[calc(100vh-10rem)] lg:h-[calc(100vh-12rem)] xl:h-[calc(100vh-14rem)] flex flex-col p-2 sm:p-3 md:p-4 lg:p-4 xl:p-5">
      <div className={`rounded-xl shadow-lg border p-3 sm:p-4 md:p-5 lg:p-5 xl:p-6 transition-colors ${
        isDarkTheme 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-100'
      }`}>
        <h2 className={`text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-3 lg:mb-4 ${
          isDarkTheme ? 'text-white' : 'text-gray-800'
        }`}>
          Settings
        </h2>
        
        <div className="space-y-3 sm:space-y-3 md:space-y-4 lg:space-y-4">
          <div>
            <h3 className={`text-sm sm:text-base md:text-lg font-semibold mb-1.5 sm:mb-2 md:mb-2 ${
              isDarkTheme ? 'text-gray-200' : 'text-gray-700'
            }`}>
              General
            </h3>
            <div className="space-y-2 sm:space-y-2 md:space-y-2.5 lg:space-y-3">
              <div className={`p-2 sm:p-2.5 md:p-3 lg:p-3 rounded-lg ${
                isDarkTheme ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <label className={`block text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 ${
                  isDarkTheme ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className={`w-full px-2 sm:px-3 md:px-3 lg:px-4 py-1.5 sm:py-2 md:py-2 lg:py-2 text-xs sm:text-sm rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-mhfd-blue transition-all ${
                    isDarkTheme 
                      ? 'bg-gray-600 text-gray-100 placeholder-gray-400' 
                      : 'bg-white text-gray-800 placeholder-gray-400'
                  }`}
                />
              </div>
              
              <div className={`p-2 sm:p-2.5 md:p-3 lg:p-3 rounded-lg ${
                isDarkTheme ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <label className={`block text-xs sm:text-sm font-medium mb-1 sm:mb-1.5 ${
                  isDarkTheme ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`w-full px-2 sm:px-3 md:px-3 lg:px-4 py-1.5 sm:py-2 md:py-2 lg:py-2 text-xs sm:text-sm rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-mhfd-blue transition-all ${
                    isDarkTheme 
                      ? 'bg-gray-600 text-gray-100 placeholder-gray-400' 
                      : 'bg-white text-gray-800 placeholder-gray-400'
                  }`}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className={`text-sm sm:text-base md:text-lg font-semibold mb-1.5 sm:mb-2 md:mb-2 ${
              isDarkTheme ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Preferences
            </h3>
            <div className="space-y-2 sm:space-y-2 md:space-y-2.5 lg:space-y-3">
              <div className={`p-2 sm:p-2.5 md:p-3 lg:p-3 rounded-lg flex items-center justify-between ${
                isDarkTheme ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <span className={`text-xs sm:text-sm font-medium ${
                  isDarkTheme ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Enable notifications
                </span>
                <input type="checkbox" className="w-4 h-4 sm:w-5 sm:h-5 text-mhfd-blue rounded focus:ring-mhfd-blue" />
              </div>
              
              <div className={`p-2 sm:p-2.5 md:p-3 lg:p-3 rounded-lg flex items-center justify-between ${
                isDarkTheme ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <span className={`text-xs sm:text-sm font-medium ${
                  isDarkTheme ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Auto-save messages
                </span>
                <input type="checkbox" className="w-4 h-4 sm:w-5 sm:h-5 text-mhfd-blue rounded focus:ring-mhfd-blue" defaultChecked />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5 md:gap-3 lg:gap-3 pt-2 sm:pt-3 md:pt-3 lg:pt-4">
            <button className="px-3 sm:px-4 md:px-5 lg:px-6 py-1.5 sm:py-2 md:py-2 lg:py-2.5 text-xs sm:text-sm bg-mhfd-blue text-white font-medium rounded-lg hover:bg-opacity-90 transition-all">
              Save Changes
            </button>
            <button className={`px-3 sm:px-4 md:px-5 lg:px-6 py-1.5 sm:py-2 md:py-2 lg:py-2.5 text-xs sm:text-sm font-medium rounded-lg border-2 transition-all ${
              isDarkTheme 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Settings;