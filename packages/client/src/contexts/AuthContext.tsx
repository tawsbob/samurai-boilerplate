import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, authService } from '@/services/auth';

interface AuthContextData {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AUTH_STORAGE_KEY = '@SamuraiApp:auth';

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedData) {
      const { user, token } = JSON.parse(storedData);
      setUser(user);
      setToken(token);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await authService.login({ email, password });
      setUser(data.user);
      setToken(data.token);

      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({
          user: data.user,
          token: data.token,
        })
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('An unexpected error occurred');
    }
  };

  const register = async (email: string, password: string, name?: string) => {
    try {
      const data = await authService.register({ email, password, name });
      setUser(data.user);
      setToken(data.token);

      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({
          user: data.user,
          token: data.token,
        })
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('An unexpected error occurred');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 