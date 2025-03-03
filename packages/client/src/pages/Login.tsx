import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginForm } from '@/components/LoginForm';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { PageWrapper } from '@/pages/PageWrapper';

export function Login() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation('auth');

  useEffect(() => {
    if (isAuthenticated) {
      // Keep the language prefix when redirecting
      const lang = location.pathname.split('/')[1];
      navigate(`/${lang}`);
    }
  }, [isAuthenticated, navigate, location.pathname]);

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="absolute top-4 right-4">
          <LanguageSwitcher />
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t('login.title')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('login.noAccount')}{' '}
            <a href={`${location.pathname.replace('/login', '/register')}`} className="font-medium text-indigo-600 hover:text-indigo-500">
              {t('login.createAccount')}
            </a>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <LoginForm />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
} 