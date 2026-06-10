import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageShell } from '../../../components/layout/PageShell.jsx';
import { useAuth } from '../hooks/useAuth.jsx';

const getPasswordStrength = (password) => {
  let score = 0;
  if (password.length >= 4) score += 1;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password) || /[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return score;
};

export function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ username: '', password: '', confirmPassword: '' });
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const strength = useMemo(() => getPasswordStrength(form.password), [form.password]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.password !== form.confirmPassword) {
      setFeedback({ type: 'error', message: 'Las contraseñas no coinciden.' });
      return;
    }

    setFeedback({ type: '', message: 'Guardando usuario en MySQL...' });

    const response = await register(form);

    setFeedback({ type: response.ok ? 'success' : 'error', message: response.message });
    if (response.ok) setTimeout(() => navigate('/login'), 700);
  };

  return (
    <PageShell>
      <section className="neon-panel" aria-labelledby="register-title">
        <h1 id="register-title" className="logo-title">TYPE QUEST</h1>
        <p className="subtitle">— Nueva Cuenta —</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className={`msg-box ${feedback.type}`}>{feedback.message}</div>

          <div className="field-group">
            <label className="field-label" htmlFor="username">Nombre de usuario</label>
            <input
              className="field-input"
              id="username"
              name="username"
              value={form.username}
              onChange={updateField}
              placeholder="mínimo 3 caracteres"
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
              placeholder="mínimo 4 caracteres"
              autoComplete="new-password"
            />
            <p className="description">Fuerza: {'█'.repeat(strength)}{'░'.repeat(4 - strength)}</p>
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="confirmPassword">Confirmar contraseña</label>
            <input
              className="field-input"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={updateField}
              placeholder="repite la contraseña"
              autoComplete="new-password"
            />
          </div>

          <div className="button-row">
            <button className="btn-primary" type="submit">Crear cuenta</button>
            <Link className="btn-ghost" to="/login">Volver</Link>
          </div>
        </form>
      </section>
    </PageShell>
  );
}
