import { Link } from 'react-router-dom';
import { PageShell } from '../../../components/layout/PageShell.jsx';

const principles = [
  {
    icon: '🌱',
    title: 'Transformar el carácter',
    text: 'El aprendizaje empieza con pequeñas decisiones: hablar con respeto, actuar con integridad y perseverar con fe.',
  },
  {
    icon: '💡',
    title: 'Innovar con propósito',
    text: 'La tecnología cobra sentido cuando ayuda a resolver necesidades reales con ética, excelencia y responsabilidad.',
  },
  {
    icon: '🤝',
    title: 'Servir con esperanza',
    text: 'Cada talento puede convertirse en una herramienta para cuidar, acompañar y bendecir a otras personas.',
  },
];

const values = ['Integridad', 'Servicio', 'Esperanza', 'Excelencia', 'Respeto', 'Cuidado', 'Fe', 'Responsabilidad'];

export function IdentityPage() {
  return (
    <PageShell>
      <section className="neon-panel wide dashboard-panel identity-panel">
        <h1 className="logo-title small-title">IDENTIDAD UNAC</h1>
        <p className="subtitle">Escribe. Aprende. Sirve.</p>
        <p className="description">
          Type Quest UNAC integra la mecanografía con una ruta formativa inspirada en valores cristianos adventistas.
          El jugador no solo mejora velocidad y precisión: también avanza por una historia de carácter, propósito y servicio.
        </p>

        <div className="identity-hero">
          <strong>Historia del juego</strong>
          <p>
            El jugador inicia un camino de formación integral. En cada nivel debe escribir textos que fortalecen
            valores, pensamiento crítico y compromiso con la comunidad. Al superar los retos, recibe insignias
            que representan su crecimiento personal y académico.
          </p>
        </div>

        <div className="identity-grid">
          {principles.map((item) => (
            <article className="identity-card" key={item.title}>
              <span className="identity-icon">{item.icon}</span>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <h2 className="section-title">Valores integrados</h2>
        <div className="badge-row">
          {values.map((value) => <span className="value-badge" key={value}>{value}</span>)}
        </div>

        <div className="identity-hero soft">
          <strong>Nota para la exposición</strong>
          <p>
            Los subniveles especiales 10 y 20 están preparados para coros adventistas. Puedes cambiar el audio
            y la letra sin afectar el progreso, el ranking ni la conexión con MySQL.
          </p>
        </div>

        <div className="button-row">
          <Link className="btn-primary" to="/menu">Ir al menú</Link>
          <Link className="btn-secondary" to="/ranking">Ver ranking</Link>
          <Link className="btn-ghost" to="/">Inicio</Link>
        </div>
      </section>
    </PageShell>
  );
}
