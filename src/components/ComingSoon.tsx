// src/components/ComingSoon.tsx
export function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <h2 className="text-lg font-semibold text-neutral-900 mb-1">{title}</h2>
      <p className="text-sm text-neutral-500">Esta seção ainda está em construção.</p>
    </div>
  )
}