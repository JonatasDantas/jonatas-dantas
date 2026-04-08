export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-2 py-0.5 text-xs font-mono font-medium text-cyan border border-cyan/30 rounded-full bg-cyan/5">
      {children}
    </span>
  )
}
