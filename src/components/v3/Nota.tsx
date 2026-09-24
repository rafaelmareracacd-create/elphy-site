export default function Nota({ children, className = "", codigo }: { children: React.ReactNode; className?: string; codigo?: string }) {
  return <div className={`v3-nota ${className}`} aria-live="polite" aria-atomic="true">{children}{codigo && <div className="v3-nota-codigo"><div className="v3-barras" aria-hidden="true" /><span>{codigo}</span></div>}</div>;
}
