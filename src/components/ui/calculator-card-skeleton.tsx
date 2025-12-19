import { Skeleton } from "@/components/ui/skeleton";

export const CategoryCardSkeleton = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
      <Skeleton className="h-14 w-14 rounded-xl mb-4" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
};

export const CalculatorCardSkeleton = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
      <Skeleton className="h-10 w-10 rounded-lg mb-4" />
      <Skeleton className="h-5 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-1/2 mb-4" />
      <Skeleton className="h-9 w-32 rounded-md" />
    </div>
  );
};

export const FeaturedCardSkeleton = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-soft h-full">
      <Skeleton className="h-12 w-12 rounded-lg mb-4" />
      <Skeleton className="h-5 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      <Skeleton className="h-9 w-32 rounded-md" />
    </div>
  );
};

export const CategoryCardSkeletonGrid = ({ count = 7 }: { count?: number }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <CategoryCardSkeleton key={i} />
      ))}
    </div>
  );
};

export const CalculatorCardSkeletonGrid = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {Array.from({ length: count }).map((_, i) => (
        <CalculatorCardSkeleton key={i} />
      ))}
    </div>
  );
};
