import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageShell } from '../../../components/layout/PageShell.jsx';
import { useAuth } from '../hooks/useAuth.jsx';

export function LoginPage() {
  const navigate = useNavigate();
  const { login, continueAsGuest } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setFeedback({ type: '', message: 'Validando usuario...' });

    const response = await login(form);

    setFeedback({ type: response.ok ? 'success' : 'error', message: response.message });
    if (response.ok) navigate('/menu');
  };

  const handleGuest = () => {
    continueAsGuest();
    navigate('/menu');
  };

  return (
    <PageShell>
      <section className="neon-panel" aria-labelledby="login-title">
        <h1 id="login-title" className="logo-title">TYPE QUEST</h1>
        <p className="subtitle">— Iniciar Sesión —</p>

        <form onSubmit={handleLogin} noValidate>
          <div className={`msg-box ${feedback.type}`}>{feedback.message}</div>

          <div className="field-group">
            <label className="field-label" htmlFor="username">Usuario</label>
            <input
              className="field-input"
              id="username"
              name="username"
              value={form.username}
              onChange={updateField}
              placeholder="tu_nombre"
              autoComplete="username"
            />
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="password">Contraseña</label>
            <input
              className="field-input"
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={updateField}
              placeholder="••••••"
              autoComplete="current-password"
            />
          </div>

          <div className="button-row">
            <button className="btn-secondary" type="submit">▶ Iniciar Sesión</button>
            <button className="btn-ghost" type="button" onClick={handleGuest}>Invitado</button>
          </div>
        </form>

        <p className="description">¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link></p>
        <p className="description"><Link to="/recuperar">¿Olvidaste tu contraseña?</Link></p>
      </section>
    </PageShell>
  );
}
