import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: 'rect' | 'circle' | 'text';
}

/**
 * Reusable Skeleton loader with roast-palette shimmer wave
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rect',
  ...props
}) => {
  const variantClass =
    variant === 'circle'
      ? 'rounded-full'
      : variant === 'text'
      ? 'rounded h-4 w-full'
      : 'rounded-xl';

  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden bg-[#1A120E] border border-[#261B15]/50 ${variantClass} ${className}`}
      {...props}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-[#2D1F17]/60 to-transparent" />
    </div>
  );
};

/**
 * Premium Product Card Skeleton matching Menu/Home ProductCard layout
 */
export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-[#140E0A] border border-[#2B1F18] rounded-xl overflow-hidden p-0 flex flex-col justify-between space-y-4">
      {/* Image container skeleton */}
      <Skeleton className="w-full aspect-[4/3] rounded-t-xl rounded-b-none" />

      {/* Card body skeleton */}
      <div className="p-5 pt-0 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Category & Badge */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-12" />
          </div>

          {/* Product Name */}
          <Skeleton className="h-5 w-4/5" />

          {/* Description (2 lines) */}
          <div className="space-y-1.5 pt-1">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </div>

        {/* Price and CTA skeleton */}
        <div className="pt-4 border-t border-[#231710] flex items-center justify-between">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-8 w-20 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

/**
 * Premium Store Card Skeleton matching StoresPage layout
 */
export const StoreCardSkeleton: React.FC = () => {
  return (
    <div className="bg-[#140E0A] border border-[#2B1F18] rounded-xl p-5 space-y-4">
      {/* Header: Name, City & Badge */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="h-5 w-3/4" />
      </div>

      {/* Address & Hours */}
      <div className="space-y-2 pt-1">
        <div className="flex items-start gap-2">
          <Skeleton className="h-4 w-4 shrink-0 rounded" />
          <Skeleton className="h-3.5 w-5/6" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 shrink-0 rounded" />
          <Skeleton className="h-3.5 w-1/2" />
        </div>
      </div>

      {/* Amenities Tags */}
      <div className="flex gap-2 pt-2 border-t border-[#231710]">
        <Skeleton className="h-5 w-16 rounded" />
        <Skeleton className="h-5 w-20 rounded" />
        <Skeleton className="h-5 w-14 rounded" />
      </div>

      {/* Action Buttons */}
      <div className="pt-3 border-t border-[#231710] flex items-center justify-between gap-3">
        <Skeleton className="h-8 w-24 rounded-lg" />
        <Skeleton className="h-8 w-28 rounded-lg" />
      </div>
    </div>
  );
};

export default Skeleton;
