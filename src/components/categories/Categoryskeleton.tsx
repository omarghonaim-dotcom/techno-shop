export default function CategorySkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-card bg-neutral-white ring-1 ring-neutral-200">
      <div className="aspect-square w-full animate-pulse bg-neutral-100" />
      <div className="flex items-center justify-between gap-2 p-4">
        <div className="h-4 w-2/3 animate-pulse rounded bg-neutral-100" />
        <div className="h-6 w-6 shrink-0 animate-pulse rounded-full bg-neutral-100" />
      </div>
    </div>
  );
}