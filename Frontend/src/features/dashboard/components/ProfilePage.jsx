import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { PageShell } from '../../../components/layout/PageShell.jsx';
import { useAuth } from '../../auth/hooks/useAuth.jsx';
import { dashboardService } from '../services/dashboardService.js';

const levelNames = {
  1: 'Transformar el carácter',
  2: 'Innovar con propósito',
  3: 'Servir con esperanza',
};

function getLevelBadge(level, completed) {
  if (completed >= 20) {
    return level === 1 ? '🏅 Integridad completa' : level === 2 ? '🏅 Innovación completa' : '🏅 Servicio completo';
  }
  if (completed >= 10) {
    return level === 1 ? '✨ Carácter en crecimiento' : level === 2 ? '✨ Propósito en acción' : '✨ Esperanza activa';
  }
  if (completed > 0) return '🌟 En formación';
  return '🔒 Sin avance';
}

export function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (!user?.id) return;

    let active = true;
    dashboardService.getProfile(user.id)
      .then((response) => {
        if (!active) return;
        setProfile(response);
        setStatus(response.ok ? 'ready' : 'error');
      })
      .catch(() => {
        if (active) setStatus('error');
      });

    return () => { active = false; };
  }, [user?.id]);

  if (!user) return <Navigate to="/login" replace />;

  const progreso = profile?.progreso || [];
  const partidas = profile?.partidas || [];
  const totalCompleted = progreso.reduce((sum, item) => sum + Number(item?.ultimo_subnivel || 0), 0);

  return (
    <PageShell>
      <section className="neon-panel wide dashboard-panel">
        <h1 className="logo-title small-title">MI PERFIL</h1>
        <p className="subtitle">Progreso, estadísticas e insignias de valores</p>

        {status === 'loading' && <p className="description">Cargando perfil...</p>}
        {status === 'error' && <p className="msg-box error">No se pudo cargar tu perfil.</p>}

        {status === 'ready' && (
          <>
            <div className="stats-grid">
              <article className="stat-card"><span>Jugador</span><strong>{user.username}</strong></article>
              <article className="stat-card"><span>Correo</span><strong>{profile.usuario.correo || 'Sin correo'}</strong></article>
              <article className="stat-card"><span>Estrellas</span><strong>{profile.usuario.estrellas || 0}</strong></article>
              <article className="stat-card"><span>Ruta formativa</span><strong>{totalCompleted >= 40 ? 'Servicio y esperanza' : totalCompleted >= 20 ? 'Innovación con propósito' : 'Transformación del carácter'}</strong></article>
            </div>

            <h2 className="section-title">Recompensas con valores</h2>
            <div className="stats-grid three">
              {[1, 2, 3].map((level) => {
                const item = progreso.find((p) => Number(p.nivel) === level);
                const completed = Number(item?.ultimo_subnivel || 0);
                return (
                  <article className="stat-card" key={level}>
                    <span>Nivel {level} · {levelNames[level]}</span>
                    <strong>Subnivel {completed}/20</strong>
                    <small>{getLevelBadge(level, completed)}</small>
                    <small>Mejor WPM: {item?.mejor_wpm || 0} · Precisión: {item?.mejor_precision || 0}%</small>
                  </article>
                );
              })}
            </div>

            <h2 className="section-title">Últimas partidas</h2>
            <div className="table-wrap">
              <table className="data-table compact">
                <thead>
                  <tr><th>Nivel</th><th>Subnivel</th><th>WPM</th><th>Precisión</th><th>Resultado</th><th>Valor</th></tr>
                </thead>
                <tbody>
                  {partidas.map((match) => (
                    <tr key={match.id}>
                      <td>{match.nivel}</td>
                      <td>{match.subnivel}</td>
                      <td>{match.wpm}</td>
                      <td>{match.precision_porcentaje}%</td>
                      <td>{match.completado ? 'Ganó' : 'Intento'}</td>
                      <td>{match.nivel === 1 ? 'Integridad' : match.nivel === 2 ? 'Propósito' : 'Esperanza'}</td>
                    </tr>
                  ))}
                  {partidas.length === 0 && <tr><td colSpan="6">Aún no hay partidas registradas.</td></tr>}
                </tbody>
              </table>
            </div>
          </>
        )}

        <div className="button-row">
          <Link className="btn-ghost" to="/menu">Volver al menú</Link>
          <Link className="btn-secondary" to="/ranking">Ver ranking</Link>
          <Link className="btn-secondary" to="/identidad-unac">Identidad UNAC</Link>
        </div>
      </section>
    </PageShell>
  );
}
