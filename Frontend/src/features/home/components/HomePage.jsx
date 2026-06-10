import { Link } from 'react-router-dom';
import { PageShell } from '../../../components/layout/PageShell.jsx';
import { useAuth } from '../../auth/hooks/useAuth.jsx';

export function HomePage() {
  const { user } = useAuth();

  return (
    <PageShell>
      <section className="neon-panel" aria-labelledby="home-title">
        <h1 id="home-title" className="logo-title">TYPE QUEST UNAC</h1>
        <p className="subtitle">— Escribe. Aprende. Sirve. —</p>
        <p className="description">
          Entrena tu velocidad y precisión al escribir mientras avanzas por una historia inspirada en valores cristianos:
          <span> integridad, propósito, esperanza y servicio</span>.
        </p>

        <div className="home-path">
          <span>🌱 Transformar el carácter</span>
          <span>💡 Innovar con propósito</span>
          <span>🤝 Servir con esperanza</span>
        </div>

        <div className="button-row">
          <Link className="btn-primary" to="/menu">▶ Jugar ahora</Link>
          <Link className="btn-secondary" to="/identidad-unac">Identidad UNAC</Link>
          <Link className="btn-secondary" to="/ranking">🏆 Ranking</Link>
        </div>

        <div className="auth-links">
          {!user ? (
            <>
              <Link className="btn-secondary" to="/login">Iniciar sesión</Link>
              <Link className="btn-ghost" to="/registro">Crear cuenta</Link>
            </>
          ) : (
            <>
              <span className="description">Sesión activa: <span>{user.username}</span></span>
              <Link className="btn-ghost" to="/perfil">Mi perfil</Link>
            </>
          )}
        </div>
      </section>
    </PageShell>
  );
}
