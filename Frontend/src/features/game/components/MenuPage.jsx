import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PageShell } from '../../../components/layout/PageShell.jsx';
import { useAuth } from '../../auth/hooks/useAuth.jsx';
import { progressService } from '../services/progressService.js';

const levels = [
  {
    id: 1,
    to: '/nivel/1',
    title: '🌱 Nivel 1 — Transformar el carácter',
    subtitle: 'Tipo cuento · casi sin signos de puntuación · objetivo 30 WPM',
    requirement: 'Disponible desde el inicio',
    value: 'Insignia Integridad',
  },
  {
    id: 2,
    to: '/nivel/2',
    title: '💡 Nivel 2 — Innovar con propósito',
    subtitle: 'Texto técnico · más vocabulario y puntuación · objetivo 50 WPM',
    requirement: 'Completa el subnivel 10 del Nivel 1',
    value: 'Insignia Propósito',
  },
  {
    id: 3,
    to: '/nivel/3',
    title: '🤝 Nivel 3 — Servir con esperanza',
    subtitle: 'Tipo tesis · palabras complejas y mucha puntuación · objetivo 70 WPM',
    requirement: 'Completa el subnivel 10 del Nivel 2',
    value: 'Insignia Esperanza',
  },
];

function getBadge(level, completed) {
  if (completed >= 20) return level.id === 1 ? '🏅 Integridad completa' : level.id === 2 ? '🏅 Innovación completa' : '🏅 Servicio completo';
  if (completed >= 10) return level.id === 1 ? '✨ Carácter en crecimiento' : level.id === 2 ? '✨ Propósito en acción' : '✨ Esperanza activa';
  if (completed > 0) return '🌟 En formación';
  return level.value;
}

export function MenuPage() {
  const { user, logout } = useAuth();
  const [progress, setProgress] = useState({ desbloqueados: { 1: true, 2: false, 3: false }, completados: {} });

  useEffect(() => {
    let active = true;

    if (!user?.id) {
      setProgress({ desbloqueados: { 1: true, 2: false, 3: false }, completados: {} });
      return undefined;
    }

    progressService.getProgress(user.id)
      .then((response) => {
        if (!active || !response.ok) return;
        setProgress(response);
      })
      .catch(() => null);

    return () => { active = false; };
  }, [user?.id]);

  const isAdmin = user?.rol === 'admin' || user?.username?.toLowerCase() === 'admin';

  return (
    <PageShell>
      <section className="neon-panel wide" aria-labelledby="menu-title">
        <h1 id="menu-title" className="logo-title">TYPE QUEST UNAC</h1>
        <p className="subtitle">Una aventura de escritura, valores y propósito</p>
        <p className="description">Jugador: <span>{user?.username || 'Invitado'}</span></p>

        <div className="story-box">
          <strong>Historia</strong>
          <p>
            Avanza por tres etapas de formación integral. Primero transformas el carácter, luego innovas con propósito
            y finalmente sirves con esperanza. Cada frase fortalece tu mecanografía y también tus valores.
          </p>
        </div>

        <div className="level-grid">
          {levels.map((level) => {
            const unlocked = Boolean(progress.desbloqueados?.[level.id]) || (!user && level.id === 1);
            const completed = progress.completados?.[level.id] || 0;
            const badge = getBadge(level, completed);

            if (!unlocked) {
              return (
                <article key={level.id} className="level-card locked-card" title={level.requirement}>
                  <strong>{level.title} 🔒</strong>
                  <small>{level.subtitle}</small>
                  <em>{level.requirement}</em>
                  <span className="reward-pill">{level.value}</span>
                </article>
              );
            }

            return (
              <Link key={level.to} className="level-card" to={level.to}>
                <strong>{level.title}</strong>
                <small>{level.subtitle}</small>
                <em>Avance: subnivel {completed}/20</em>
                <span className="reward-pill">{badge}</span>
              </Link>
            );
          })}
        </div>

        <div className="button-row">
          <Link className="btn-ghost" to="/">Inicio</Link>
          <Link className="btn-secondary" to="/identidad-unac">Identidad UNAC</Link>
          <Link className="btn-secondary" to="/ranking">Ranking</Link>
          {user && <Link className="btn-secondary" to="/perfil">Mi perfil</Link>}
          {isAdmin && <Link className="btn-primary" to="/admin">Admin</Link>}
          {user ? <button className="btn-danger" type="button" onClick={logout}>Cerrar sesión</button> : <Link className="btn-secondary" to="/login">Iniciar sesión</Link>}
        </div>
      </section>
    </PageShell>
  );
}
