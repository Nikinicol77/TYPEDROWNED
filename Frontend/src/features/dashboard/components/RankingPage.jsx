import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageShell } from '../../../components/layout/PageShell.jsx';
import { dashboardService } from '../services/dashboardService.js';

function getMainBadge(player) {
  const sublevels = Number(player.subniveles_completados || 0);
  const levels = Number(player.niveles_con_avance || 0);

  if (sublevels >= 50) return '🤝 Líder de esperanza';
  if (sublevels >= 35) return '💡 Innovador con propósito';
  if (sublevels >= 20) return '🌱 Carácter transformado';
  if (levels >= 2) return '✨ Propósito en avance';
  if (sublevels > 0) return '🌟 En formación';
  return '📘 Nuevo aprendiz';
}

export function RankingPage() {
  const [ranking, setRanking] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let active = true;

    dashboardService.getRanking()
      .then((response) => {
        if (!active) return;
        setRanking(response.ranking || []);
        setStatus('ready');
      })
      .catch(() => {
        if (active) setStatus('error');
      });

    return () => { active = false; };
  }, []);

  return (
    <PageShell>
      <section className="neon-panel wide dashboard-panel">
        <h1 className="logo-title small-title">RANKING UNAC</h1>
        <p className="subtitle">Líderes de Type Quest: velocidad, precisión, valores y propósito</p>

        {status === 'loading' && <p className="description">Cargando ranking desde MySQL...</p>}
        {status === 'error' && <p className="msg-box error">No se pudo cargar el ranking.</p>}

        {status === 'ready' && (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Jugador</th>
                  <th>Subniveles</th>
                  <th>Niveles</th>
                  <th>⭐</th>
                  <th>Mejor WPM</th>
                  <th>Precisión</th>
                  <th>Insignia</th>
                </tr>
              </thead>
              <tbody>
                {ranking.map((player, index) => (
                  <tr key={player.id}>
                    <td>{index + 1}</td>
                    <td>{player.username || player.nombre}</td>
                    <td>{player.subniveles_completados || 0}</td>
                    <td>{player.niveles_con_avance || 0}/3</td>
                    <td>{player.estrellas || 0}</td>
                    <td>{player.mejor_wpm || 0}</td>
                    <td>{player.mejor_precision || 0}%</td>
                    <td><span className="value-badge compact-badge">{getMainBadge(player)}</span></td>
                  </tr>
                ))}
                {ranking.length === 0 && <tr><td colSpan="8">Aún no hay jugadores con progreso registrado.</td></tr>}
              </tbody>
            </table>
          </div>
        )}

        <div className="button-row">
          <Link className="btn-ghost" to="/menu">Volver al menú</Link>
          <Link className="btn-secondary" to="/identidad-unac">Identidad UNAC</Link>
        </div>
      </section>
    </PageShell>
  );
}
