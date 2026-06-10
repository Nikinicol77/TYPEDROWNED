import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth.jsx';

export function GameTopBar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="game-topbar">
      <span className="game-user">{user?.username || 'INVITADO'} {user?.estrellas ? `· ⭐ ${user.estrellas}` : ''}</span>
      <Link className="btn-ghost" to="/menu">Menú</Link>
      {user && <Link className="btn-secondary" to="/perfil">Perfil</Link>}
      {user ? (
        <button className="btn-danger" type="button" onClick={handleLogout}>Salir</button>
      ) : (
        <Link className="btn-secondary" to="/login">Login</Link>
      )}
    </header>
  );
}
