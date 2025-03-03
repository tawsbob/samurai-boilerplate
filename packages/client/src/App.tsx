import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  if (!isAuthenticated) {
    // Keep the language prefix when redirecting
    const [_, lang ] = location.pathname.split('/');
    return <Navigate to={`/${lang}/login`} />;
  }

  return <>{children}</>;
}

function LanguageRedirect() {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    // If we're at the root, redirect to the preferred language
    if (location.pathname === '/') {
      const lang = i18n.language.split('-')[0];
      const supportedLang = ['en', 'pt', 'es'].includes(lang) ? lang : 'en';
      i18n.changeLanguage(supportedLang);
    }
    
  }, [location.pathname, i18n]);

  if (location.pathname === '/') {
    const lang = i18n.language.split('-')[0];
    const supportedLang = ['en', 'pt', 'es'].includes(lang) ? lang : 'en';
    return <Navigate to={`/${supportedLang}`} replace />;
  }

  return null;
}

function AppRoutes() {

  return (
    <Routes>
      <Route path="/" element={<LanguageRedirect />} />
      
      {/* English routes */}
      <Route path="/:lang/login" element={<Login />} />
      <Route path="/:lang/register" element={<Register />} />
      <Route
        path="/:lang"
        element={
          <ProtectedRoute>
            <div>Protected Home Page</div>
          </ProtectedRoute>
        }
      />

      {/* Catch all route - redirect to preferred language */}
      <Route path="*" element={<LanguageRedirect />} />
    </Routes>
  );
}

export function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}
