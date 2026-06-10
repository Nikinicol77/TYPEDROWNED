import { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import { progressService } from '../services/progressService.js';
import { STORAGE_KEYS } from '../../../shared/utils/storageKeys.js';
import { storage } from '../../../shared/utils/localStorageHelper.js';

const SCRIPT_BY_LEVEL = Object.freeze({
  1: '/game/scripts/nivel1.js',
  2: '/game/scripts/nivel2.js',
  3: '/game/scripts/nivel3.js',
});

const STYLE_BY_LEVEL = Object.freeze({
  1: '/game/styles/nivel1.css',
  2: '/game/styles/nivel2.css',
  3: '/game/styles/nivel3.css',
});

const LEGACY_KEY_BY_LEVEL = Object.freeze({
  1: 'subsuelo_unlocked',
  2: 'n2_max',
  3: 'n3_max',
});

function notify(message, type = 'success') {
  window.dispatchEvent(new CustomEvent('typequest:message', { detail: { message, type } }));
}

function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('tq_current_user')) || null;
  } catch {
    return null;
  }
}

function getProgressKey(level, user) {
  const baseKey = LEGACY_KEY_BY_LEVEL[level] || `nivel_${level}_max`;
  const userKey = user?.id || user?.correo || 'guest';
  return `${baseKey}_${userKey}`;
}

function readLocalProgress(level, user) {
  const key = getProgressKey(level, user);
  const value = Number.parseInt(localStorage.getItem(key), 10);
  return Number.isFinite(value) && value > 0 ? value : 1;
}

function writeLocalProgress(level, user, subnivelMaximo) {
  const key = getProgressKey(level, user);
  const cleanValue = Math.min(Math.max(Number.parseInt(subnivelMaximo, 10) || 1, 1), 20);
  const currentValue = readLocalProgress(level, user);
  const finalValue = Math.max(currentValue, cleanValue);
  localStorage.setItem(key, String(finalValue));
  return finalValue;
}

async function hydrateProgressFromDatabase(level, user) {
  if (!user?.id) {
    return {
      ok: true,
      nivel_desbloqueado: level === 1,
      subnivel_maximo: readLocalProgress(level, user),
    };
  }

  try {
    const response = await progressService.getLevelProgress(user.id, level);

    if (response.ok) {
      writeLocalProgress(level, user, response.subnivel_maximo || 1);
      return response;
    }
  } catch (error) {
    console.warn('No se pudo consultar el progreso:', error);
  }

  return {
    ok: true,
    nivel_desbloqueado: level === 1,
    subnivel_maximo: readLocalProgress(level, user),
  };
}

function updateStoredUserStars(stars) {
  const currentUser = storage.get(STORAGE_KEYS.currentUser, null);
  if (!currentUser) return;
  storage.set(STORAGE_KEYS.currentUser, { ...currentUser, estrellas: stars });
}

function createProgressBridge(user) {
  window.TypeQuestProgress = {
    getUnlockedLevel(level) {
      return readLocalProgress(Number(level), user);
    },

    saveUnlockedLevel(level, subnivelMaximo) {
      const cleanLevel = Number(level);
      const cleanSublevel = writeLocalProgress(cleanLevel, user, subnivelMaximo);
      return cleanSublevel;
    },

    saveResult(result) {
      if (!user?.id) return;

      const cleanLevel = Number(result.nivel);
      const cleanSublevel = Number(result.subnivel);
      const nextUnlock = result.gano ? Math.min(cleanSublevel + 1, 20) : readLocalProgress(cleanLevel, user);
      writeLocalProgress(cleanLevel, user, nextUnlock);

      progressService
        .saveLevelProgress({
          usuarioId: user.id,
          nivel: cleanLevel,
          subnivelMaximo: nextUnlock,
          subnivel: cleanSublevel,
          wpm: result.wpm,
          precision: result.precision,
          tiempoUsado: result.tiempoUsado,
          gano: result.gano,
          completado: result.gano,
        })
        .then((response) => {
          if (!response.ok) {
            notify('⚠️ No se pudo guardar esta partida.', 'error');
            return;
          }

          if (Number.isFinite(Number(response.estrellas))) updateStoredUserStars(response.estrellas);
          notify(result.gano ? '🏆 Subnivel desbloqueado. Tu avance fue guardado con propósito.' : '📌 Intento registrado. Sigue practicando con esperanza.', result.gano ? 'success' : 'info');
        })
        .catch((error) => {
          console.warn('No se pudo guardar la estadística:', error);
          notify('⚠️ Error al guardar la partida.', 'error');
        });
    },
  };
}

function addStylesheet(href) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.dataset.legacyGame = 'true';
  document.head.appendChild(link);
  return link;
}

function addScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = `${src}?v=${Date.now()}`;
    script.async = true;
    script.dataset.legacyGame = 'true';
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

function cleanLegacyDom() {
  document.querySelectorAll('[data-legacy-game="true"]').forEach((element) => element.remove());
  document.querySelectorAll('.typing-overlay').forEach((element) => element.remove());
  document.querySelectorAll('input').forEach((input) => {
    if (input.closest('#root') === null) input.remove();
  });
  document.querySelectorAll('canvas').forEach((canvas) => canvas.remove());

  const container = document.getElementById('game-container');
  if (container) container.innerHTML = '';

  window.onload = null;
}

export function useLegacyGame(levelId) {
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('Cargando progreso desde MySQL...');
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    let stylesheet = null;
    const level = Number(levelId);

    if (hasLoadedRef.current) return undefined;

    hasLoadedRef.current = true;
    setStatus('loading');
    setMessage('Cargando progreso desde MySQL...');

    async function loadGame() {
      window.Phaser = Phaser;
      cleanLegacyDom();

      const user = getCurrentUser();
      const progress = await hydrateProgressFromDatabase(level, user);

      if (cancelled) return;

      if (!progress.nivel_desbloqueado) {
        setStatus('locked');
        setMessage('Este nivel aún está bloqueado. Avanza en la ruta de carácter, propósito y esperanza.');
        return;
      }

      createProgressBridge(user);
      setMessage('Preparando tu misión de aprendizaje...');

      stylesheet = addStylesheet(STYLE_BY_LEVEL[level]);

      addScript(SCRIPT_BY_LEVEL[level])
        .then(() => {
          if (typeof window.onload === 'function') {
            window.onload();
            window.onload = null;
          }

          if (!cancelled) setStatus('ready');
        })
        .catch((error) => {
          console.error('Error cargando el nivel:', error);
          if (!cancelled) {
            setStatus('error');
            setMessage('No se pudo cargar el nivel.');
          }
        });
    }

    loadGame();

    return () => {
      cancelled = true;
      hasLoadedRef.current = false;
      if (stylesheet) stylesheet.remove();
      cleanLegacyDom();
    };
  }, [levelId]);

  return { status, message };
}
