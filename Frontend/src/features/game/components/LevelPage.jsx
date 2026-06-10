import { Link, Navigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLegacyGame } from '../hooks/useLegacyGame.js';
import { GameTopBar } from './GameTopBar.jsx';

const validLevels = ['1', '2', '3'];

export function LevelPage() {
  const { levelId } = useParams();
  const [toast, setToast] = useState(null);

  if (!validLevels.includes(levelId)) {
    return <Navigate to="/menu" replace />;
  }

  const { status, message } = useLegacyGame(levelId);

  useEffect(() => {
    const handler = (event) => {
      setToast(event.detail);
      window.clearTimeout(window.__typeQuestToastTimer);
      window.__typeQuestToastTimer = window.setTimeout(() => setToast(null), 3800);
    };

    window.addEventListener('typequest:message', handler);
    return () => window.removeEventListener('typequest:message', handler);
  }, []);

  return (
    <main className="game-page">
      <GameTopBar />
      <div id="game-container" className="game-container" />

      {status === 'loading' && (
        <div className="game-loading-card">
          <strong>{message}</strong>
          <span>Por favor espera un momento.</span>
        </div>
      )}

      {status === 'locked' && (
        <div className="game-loading-card locked">
          <strong>Nivel bloqueado</strong>
          <span>{message}</span>
          <Link className="btn-secondary" to="/menu">Volver al menú</Link>
        </div>
      )}

      {status === 'error' && <p className="msg-box error floating-message">{message}</p>}

      {toast && (
        <div className={`game-toast ${toast.type || 'success'}`}>
          {toast.message}
        </div>
      )}
    </main>
  );
}
