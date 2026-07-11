// src/components/cart/CartSkeleton.tsx
export default function CartSkeleton() {
  return (
    <div className="animate-pulse" dir="rtl">
      {/* Steps Skeleton */}
      <div className="bg-white border-b border-gray-200 py-4 mb-6">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-gray-200" />
                  <div className="w-20 h-3 bg-gray-200 rounded" />
                </div>
                {i < 4 && <div className="flex-1 h-0.5 mx-2 bg-gray-200" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        <div className="h-8 bg-gray-200 rounded w-32 mb-6 mr-auto" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Summary Skeleton */}
          <div className="lg:col-span-1 lg:order-2">
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="h-5 bg-gray-200 rounded w-40 mb-4" />
              <div className="space-y-3 mb-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-24" />
                    <div className="h-4 bg-gray-200 rounded w-20" />
                  </div>
                ))}
              </div>
              <div className="h-12 bg-gray-200 rounded-xl w-full" />
            </div>
          </div>

          {/* Items Skeleton */}
          <div className="lg:col-span-2 lg:order-1 space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 p-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-32 h-28 bg-gray-200 rounded-xl flex-shrink-0" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                    <div className="grid grid-cols-2 gap-2">
                      {[1, 2, 3, 4].map((j) => (
                        <div key={j} className="h-3 bg-gray-200 rounded" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-50">
                  <div className="w-28 h-8 bg-gray-200 rounded-xl" />
                  <div className="w-24 h-8 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}