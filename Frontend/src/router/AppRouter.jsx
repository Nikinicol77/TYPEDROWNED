import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../features/auth/hooks/useAuth.jsx';
import { HomePage } from '../features/home/components/HomePage.jsx';
import { IdentityPage } from '../features/home/components/IdentityPage.jsx';
import { LoginPage } from '../features/auth/components/LoginPage.jsx';
import { RegisterPage } from '../features/auth/components/RegisterPage.jsx';
import { ForgotPasswordPage } from '../features/auth/components/ForgotPasswordPage.jsx';
import { MenuPage } from '../features/game/components/MenuPage.jsx';
import { LevelPage } from '../features/game/components/LevelPage.jsx';
import { RankingPage } from '../features/dashboard/components/RankingPage.jsx';
import { ProfilePage } from '../features/dashboard/components/ProfilePage.jsx';
import { AdminPage } from '../features/dashboard/components/AdminPage.jsx';

export function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/recuperar" element={<ForgotPasswordPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/identidad-unac" element={<IdentityPage />} />
          <Route path="/nivel/:levelId" element={<LevelPage />} />
          <Route path="/ranking" element={<RankingPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
