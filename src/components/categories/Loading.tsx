import CategorySkeleton from "./Categoryskeleton";

export default function CategoriesLoading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 border-b border-neutral-200 pb-6">
        <div className="h-4 w-1 rounded-full bg-primary-100" />
        <div className="mt-3 h-7 w-56 animate-pulse rounded bg-neutral-100" />
        <div className="mt-2 h-4 w-72 animate-pulse rounded bg-neutral-100" />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <CategorySkeleton key={i} />
        ))}
      </div>
    </main>
  );
}