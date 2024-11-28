export default function Loading() {
  return (
    <div className="container px-6 py-8">
      <div className="animate-pulse">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <div className="aspect-square bg-gray-200 rounded-lg" />
            <div className="space-y-6">
              <div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/4" />
              </div>
              
              <div>
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-2" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="h-4 bg-gray-200 rounded w-4/5" />
                </div>
              </div>

              <div>
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-2" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>

              <div>
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-2" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-4/5" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              </div>

              <div className="h-10 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

