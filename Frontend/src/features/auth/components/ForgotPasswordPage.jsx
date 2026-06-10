import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageShell } from '../../../components/layout/PageShell.jsx';
import { useAuth } from '../hooks/useAuth.jsx';

export function ForgotPasswordPage() {
  const { recoverPassword } = useAuth();
  const [form, setForm] = useState({ username: '', newPassword: '' });
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await recoverPassword(form);
    setMessage(response.message || 'Proceso terminado.');
    setType(response.ok ? 'success' : 'error');
    setLoading(false);
  };

  return (
    <PageShell>
      <section className="neon-panel">
        <h1 className="logo-title small-title">RECUPERAR</h1>
        <p className="subtitle">Actualiza tu contraseña</p>

        <form onSubmit={handleSubmit}>
          <label className="field-group">
            <span className="field-label">Usuario o correo</span>
            <input className="field-input" name="username" value={form.username} onChange={handleChange} />
          </label>

          <label className="field-group">
            <span className="field-label">Nueva contraseña</span>
            <input className="field-input" name="newPassword" type="password" value={form.newPassword} onChange={handleChange} />
          </label>

          <p className={`msg-box ${type}`}>{message}</p>
          <button className="btn-primary" type="submit" disabled={loading}>{loading ? 'Guardando...' : 'Cambiar contraseña'}</button>
        </form>

        <div className="auth-links">
          <Link className="btn-ghost" to="/login">Volver al login</Link>
        </div>
      </section>
    </PageShell>
  );
}
