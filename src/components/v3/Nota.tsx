export default function Nota({ children, className = "", codigo, vivo = false }: { children: React.ReactNode; className?: string; codigo?: string; vivo?: boolean }) {
  return <div className={`v3-nota ${className}`} {...(vivo ? { "aria-live": "polite" as const, "aria-atomic": true } : {})}>{children}{codigo && <div className="v3-nota-codigo"><div className="v3-barras" aria-hidden="true" /><span>{codigo}</span></div>}</div>;
}
