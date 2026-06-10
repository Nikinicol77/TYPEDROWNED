import { StarsBackground } from '../ui/StarsBackground.jsx';

export function PageShell({ children }) {
  return (
    <main className="page-shell">
      <StarsBackground />
      {children}
    </main>
  );
}
