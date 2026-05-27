export function Tag({ children }: { children: string }) {
  return (
    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-muted">
      {children}
    </span>
  );
}
