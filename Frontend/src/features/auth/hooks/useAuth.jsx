import { createContext, useContext, useMemo, useState } from 'react';
import { authService } from '../services/authService.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getCurrentUser());

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    async login(credentials) {
      const response = await authService.login(credentials);
      if (response.ok) setUser(response.user);
      return response;
    },
    async register(credentials) {
      return authService.register(credentials);
    },
    async recoverPassword(payload) {
      return authService.recoverPassword(payload);
    },
    logout() {
      authService.logout();
      setUser(null);
    },
    continueAsGuest() {
      authService.startGuestSession();
      setUser(null);
    },
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
}
