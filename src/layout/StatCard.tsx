import type { Icon } from '@phosphor-icons/react'

export type StatColor = 'violet' | 'emerald' | 'blue' | 'amber' | 'rose'

// Mapa de classes literais — Tailwind precisa "ver" a string completa no
// código-fonte para gerar o CSS correspondente; por isso não construímos
// a classe dinamicamente (ex: `bg-${color}-50`), e sim escolhemos entre
// entradas já escritas por extenso aqui.
const colorMap: Record<StatColor, { bg: string; icon: string }> = {
  violet: { bg: 'bg-violet-50', icon: 'text-violet-600' },
  emerald: { bg: 'bg-emerald-50', icon: 'text-emerald-600' },
  blue: { bg: 'bg-blue-50', icon: 'text-blue-600' },
  amber: { bg: 'bg-amber-50', icon: 'text-amber-600' },
  rose: { bg: 'bg-rose-50', icon: 'text-rose-600' },
}

interface StatCardProps {
  icon: Icon
  label: string
  value: string | number
  color?: StatColor
  onClick?: () => void
}

/**
 * Card de estatística reutilizável, no estilo "fintech": ícone colorido
 * em círculo suave à direita, número em destaque à esquerda. A cor é
 * escolhida via prop "color", mantendo o mesmo componente para qualquer
 * tela (dashboard do admin, resumo de organização, home do cliente).
 * Quando "onClick" é informado, o card vira um botão clicável (usado no
 * card de Transações, por exemplo, para abrir a tabela detalhada).
 */
export function StatCard({ icon: Icon, label, value, color = 'violet', onClick }: StatCardProps) {
  const c = colorMap[color]
  const Comp = onClick ? 'button' : 'div'

  return (
    <Comp
      onClick={onClick}
      className={`w-full text-left bg-card border border-border rounded-xl p-5 flex items-center justify-between ${
        onClick ? 'hover:border-foreground/20 transition-colors cursor-pointer' : ''
      }`}
    >
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-semibold text-foreground mt-1">{value}</p>
      </div>
      <div className={`h-11 w-11 rounded-full flex items-center justify-center ${c.bg} ${c.icon}`}>
        <Icon size={20} weight="bold" />
      </div>
    </Comp>
  )
}