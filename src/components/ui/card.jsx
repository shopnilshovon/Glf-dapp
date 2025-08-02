export function Card({ children, className }) {
  return (
    <div className={`bg-white dark:bg-zinc-900 p-4 rounded-xl shadow ${className || ''}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className }) {
  return (
    <div className={`mb-2 ${className || ''}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }) {
  return (
    <h2 className={`text-lg font-bold ${className || ''}`}>
      {children}
    </h2>
  );
}

export function CardDescription({ children, className }) {
  return (
    <p className={`text-sm text-muted-foreground ${className || ''}`}>
      {children}
    </p>
  );
}

export function CardContent({ children, className }) {
  return (
    <div className={className || ''}>
      {children}
    </div>
  );
}