import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  
  const changeLanguage = (language: string) => {
    // Get the current path without the language prefix
    const pathWithoutLang = location.pathname.replace(/^\/(en|pt|es)/, '');
    
    // Navigate to the new path with the selected language
    navigate(`/${language}${pathWithoutLang}`);
  };
  
  return (
    <div className="flex items-center space-x-2">
      {['en', 'pt', 'es'].map((lang) => (
        <button
          key={lang}
          onClick={() => changeLanguage(lang)}
          className={`px-2 py-1 text-sm rounded ${
            i18n.language === lang
              ? 'bg-indigo-600 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {t(`languages.${lang}`)}
        </button>
      ))}
    </div>
  );
} 