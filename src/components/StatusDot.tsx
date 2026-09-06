// src/components/StatusDot.tsx
export function StatusDot({ active }: { active: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-2 w-2 rounded-full ${active ? 'bg-emerald-500' : 'bg-neutral-400'}`} />
      <span className="text-xs text-muted-foreground">{active ? 'Ativo' : 'Inativo'}</span>
    </span>
  )
}