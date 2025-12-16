import { useTheme } from "@/context/ThemeContext";
import { ButtonStyled, InputGroupStyled, InputStyled, LabelStyled, SpanGroupStyled, SpanStyled, SubtitleStyled, TitleStyled } from "./Settings.styled";

const Settings = () => {
  const { isDarkTheme } = useTheme();

    return (
    <main className={`h-[calc(100vh-8rem)] sm:h-[calc(100vh-9rem)] md:h-[calc(100vh-10rem)] lg:h-[calc(100vh-12rem)] xl:h-[calc(100vh-14rem)] flex flex-col p-2 sm:p-3 md:p-4 lg:p-4 xl:p-5
      ${isDarkTheme
        ? 'bg-gray-900 text-white'
        : 'bg-white text-gray-900'}`}>
      <div className={`rounded-xl shadow-lg border p-3 sm:p-4 md:p-5 lg:p-5 xl:p-6 transition-colors ${
        isDarkTheme 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-100'
      }`}>
        <TitleStyled isDarkTheme={isDarkTheme}>Settings</TitleStyled>
        
        <div className="space-y-3 sm:space-y-3 md:space-y-4 lg:space-y-4">
          <SubtitleStyled isDarkTheme={isDarkTheme}>
            General
          </SubtitleStyled>
          <div className="space-y-2 sm:space-y-2 md:space-y-2.5 lg:space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 md:gap-3 lg:gap-3">
              <InputGroupStyled isDarkTheme={isDarkTheme}>
                <LabelStyled isDarkTheme={isDarkTheme}>First Name</LabelStyled>
                <InputStyled isDarkTheme={isDarkTheme} placeholder="First Name..." />
              </InputGroupStyled>
              <InputGroupStyled isDarkTheme={isDarkTheme}>
                <LabelStyled isDarkTheme={isDarkTheme}>Last Name</LabelStyled>
                <InputStyled isDarkTheme={isDarkTheme} placeholder="Last Name..." />
              </InputGroupStyled>
            </div>
            
            <InputGroupStyled isDarkTheme={isDarkTheme}>
              <LabelStyled isDarkTheme={isDarkTheme}>Email Address</LabelStyled>
              <InputStyled isDarkTheme={isDarkTheme} type="email" />
            </InputGroupStyled>
          </div>

          <div className="space-y-2 sm:space-y-2 md:space-y-2.5 lg:space-y-3">
            <SubtitleStyled isDarkTheme={isDarkTheme}>Preferences</SubtitleStyled>
            <div className="space-y-2 sm:space-y-2 md:space-y-2.5 lg:space-y-3">
              <SpanGroupStyled isDarkTheme={isDarkTheme}>
                <SpanStyled isDarkTheme={isDarkTheme}>Enable notifications</SpanStyled>
                <InputStyled type="checkbox" isDarkTheme={isDarkTheme} />
              </SpanGroupStyled>
              
              <SpanGroupStyled isDarkTheme={isDarkTheme}>
                <SpanStyled isDarkTheme={isDarkTheme}>Auto-save messages</SpanStyled>
                <InputStyled type="checkbox" isDarkTheme={isDarkTheme} />
              </SpanGroupStyled>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5 md:gap-3 lg:gap-3 pt-2 sm:pt-3 md:pt-3 lg:pt-4">
            <ButtonStyled isDarkTheme={isDarkTheme} type="submit">Save Changes</ButtonStyled>
            <ButtonStyled isDarkTheme={isDarkTheme}>Cancel</ButtonStyled>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Settings;