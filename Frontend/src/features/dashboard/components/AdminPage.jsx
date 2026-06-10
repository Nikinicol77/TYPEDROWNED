import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { PageShell } from '../../../components/layout/PageShell.jsx';
import { useAuth } from '../../auth/hooks/useAuth.jsx';
import { dashboardService } from '../services/dashboardService.js';

export function AdminPage() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('loading');
  const isAdmin = user?.rol === 'admin' || user?.username?.toLowerCase() === 'admin';

  const loadData = () => {
    setStatus('loading');
    dashboardService.getAdminSummary()
      .then((response) => {
        setData(response);
        setStatus(response.ok ? 'ready' : 'error');
      })
      .catch(() => setStatus('error'));
  };

  useEffect(() => {
    if (isAdmin) loadData();
  }, [isAdmin]);

  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/menu" replace />;

  const deleteUser = async (usuarioId) => {
    const ok = window.confirm('¿Eliminar este usuario y sus partidas?');
    if (!ok) return;
    await dashboardService.deleteUser(usuarioId);
    loadData();
  };

  return (
    <PageShell>
      <section className="neon-panel wide dashboard-panel">
        <h1 className="logo-title small-title">ADMIN</h1>
        <p className="subtitle">Panel de control del juego</p>

        {status === 'loading' && <p className="description">Cargando panel...</p>}
        {status === 'error' && <p className="msg-box error">No se pudo cargar el panel.</p>}

        {status === 'ready' && (
          <>
            <div className="stats-grid">
              <article className="stat-card"><span>Usuarios</span><strong>{data.resumen.usuarios}</strong></article>
              <article className="stat-card"><span>Partidas</span><strong>{data.resumen.partidas}</strong></article>
              <article className="stat-card"><span>Ganadas</span><strong>{data.resumen.partidas_ganadas}</strong></article>
              <article className="stat-card"><span>Mejor WPM</span><strong>{data.resumen.mejor_wpm_general}</strong></article>
            </div>

            <h2 className="section-title">Usuarios registrados</h2>
            <div className="table-wrap">
              <table className="data-table compact">
                <thead>
                  <tr><th>Jugador</th><th>Subniveles</th><th>WPM</th><th>Estrellas</th><th>Acción</th></tr>
                </thead>
                <tbody>
                  {data.usuarios.map((item) => (
                    <tr key={item.id}>
                      <td>{item.username || item.nombre}</td>
                      <td>{item.subniveles_completados || 0}</td>
                      <td>{item.mejor_wpm || 0}</td>
                      <td>{item.estrellas || 0}</td>
                      <td><button className="mini-danger" onClick={() => deleteUser(item.id)} type="button">Eliminar</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="section-title">Partidas recientes</h2>
            <div className="table-wrap">
              <table className="data-table compact">
                <thead>
                  <tr><th>Jugador</th><th>Nivel</th><th>Sub</th><th>WPM</th><th>Precisión</th></tr>
                </thead>
                <tbody>
                  {data.partidas.map((item) => (
                    <tr key={item.id}>
                      <td>{item.username || item.nombre}</td>
                      <td>{item.nivel}</td>
                      <td>{item.subnivel}</td>
                      <td>{item.wpm}</td>
                      <td>{item.precision_porcentaje}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        <div className="button-row">
          <Link className="btn-ghost" to="/menu">Volver</Link>
          <button className="btn-secondary" type="button" onClick={loadData}>Actualizar</button>
        </div>
      </section>
    </PageShell>
  );
}
