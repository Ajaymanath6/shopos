

// Dark Gray Monochromatic Palette
const DARK_PALETTE = {
  primary: '#1F2937',    // Dark gray
  secondary: '#374151',  // Medium gray
  tertiary: '#4B5563',   // Light gray
  accent: '#6B7280',     // Lighter gray
  light: '#9CA3AF'       // Very light gray
}

export default function StoreHealthReport() {
  return (
    <div
      className="w-full h-full rounded-3xl backdrop-blur-lg overflow-y-auto"
      style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.9)
        `
      }}
    >
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: DARK_PALETTE.primary }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Store Health Report
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We found several optimization opportunities to boost your store performance
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-5 gap-6">
        {/* Left Column - 70% (3/5 columns) */}
        <div className="col-span-3 space-y-6">
          {/* Box 1 */}
          <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#10B981' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Performance Optimization</h3>
                <p className="text-gray-600">Critical speed improvements identified</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Page Load Speed</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full">
                    <div className="w-16 h-2 bg-yellow-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-600">68%</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Image Optimization</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full">
                    <div className="w-20 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-600">83%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Box 2 */}
          <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#F59E0B' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">SEO Improvements</h3>
                <p className="text-gray-600">Search visibility enhancements</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Meta Tags Missing</span>
                  <span className="text-sm text-red-600 font-medium">12 pages</span>
                </div>
                <p className="text-xs text-gray-600">Add proper meta descriptions and title tags to improve search rankings</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Image Alt Tags</span>
                  <span className="text-sm text-orange-600 font-medium">8 missing</span>
                </div>
                <p className="text-xs text-gray-600">Add descriptive alt text to improve accessibility and SEO</p>
              </div>
            </div>
          </div>

          {/* Box 3 */}
          <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#EF4444' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Security & Performance</h3>
                <p className="text-gray-600">Technical issues that need attention</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-red-700">Outdated SSL Certificate</span>
                  <span className="text-sm text-red-600 font-medium">High Risk</span>
                </div>
                <p className="text-xs text-red-600">Update SSL certificate to maintain secure connections</p>
              </div>
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-orange-700">Large JavaScript Files</span>
                  <span className="text-sm text-orange-600 font-medium">3 files</span>
                </div>
                <p className="text-xs text-orange-600">Minify and compress JavaScript for better performance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - 30% (2/5 columns) */}
        <div className="col-span-2 space-y-6">
          {/* Box 1 */}
          <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="text-center mb-4">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: DARK_PALETTE.primary }}>
                <span className="text-2xl font-bold text-white">78</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Health Score</h3>
              <p className="text-sm text-gray-600">Overall store performance</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Performance</span>
                <span className="font-medium text-gray-900">75%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">SEO</span>
                <span className="font-medium text-gray-900">82%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Security</span>
                <span className="font-medium text-gray-900">88%</span>
              </div>
            </div>
          </div>

          {/* Box 2 */}
          <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="text-center mb-4">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: '#10B981' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Quick Wins</h3>
              <p className="text-sm text-gray-600">Easy improvements</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Enable browser caching</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Compress images</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Add meta descriptions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Fix broken links</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
