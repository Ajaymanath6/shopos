import { RiArrowUpLine, RiImageLine, RiCheckLine, RiArrowLeftLine, RiSettings3Line } from '@remixicon/react'

// Dark Gray Monochromatic Palette
const DARK_PALETTE = {
  primary: '#1F2937',    // Dark gray
  secondary: '#374151',  // Medium gray
  tertiary: '#4B5563',   // Light gray
  accent: '#6B7280',     // Lighter gray
  light: '#9CA3AF'       // Very light gray
}

interface FixPreviewPageProps {
  onBack?: () => void
  onDeployStart?: () => void
}

export default function FixPreviewPage({ onBack, onDeployStart }: FixPreviewPageProps) {
  return (
    <div className="w-full bg-white">
      <div className="w-full p-6">
        {/* Header */}
        <div className="text-center mb-8">
          {/* Back Button */}
          {onBack && (
                      <div className="flex justify-start mb-8">
            <button
              onClick={onBack}
              className="flex items-center gap-3 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 hover:text-gray-900 transition-colors"
            >
              <RiArrowLeftLine size={20} />
              <span className="font-medium">Back to Report</span>
            </button>
          </div>
          )}

          <div className="flex items-center justify-center gap-6 mb-8">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-xl"
              style={{
                backgroundColor: DARK_PALETTE.primary,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)'
              }}
            >
              <RiImageLine size={40} className="text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
            Optimize Blurry Product Images
          </h1>

          <p className="text-lg text-gray-700 leading-relaxed">
            AI has enhanced 23 product images using advanced upscaling and sharpening technology
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Side - Hero Metrics */}
          <div className="lg:col-span-8 space-y-6">
            {/* Impact Summary */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gray-800 flex items-center justify-center">
                  <RiImageLine size={28} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Fixing 23 Blurry Product Images</h2>
                  <p className="text-gray-600">Major performance and user experience improvements</p>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <RiArrowUpLine size={24} className="text-gray-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">81%</div>
                  <div className="text-sm font-medium text-gray-900 mb-1">File Size Reduction</div>
                  <div className="text-xs text-gray-600">8.2 MB → 1.5 MB</div>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <RiArrowUpLine size={24} className="text-gray-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">-1.9s</div>
                  <div className="text-sm font-medium text-gray-900 mb-1">Page Load Speed</div>
                  <div className="text-xs text-gray-600">Faster loading times</div>
                </div>
              </div>

              {/* Conversion Impact */}
              <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                    <RiArrowUpLine size={16} className="text-white" />
                  </div>
                  <span className="text-lg font-semibold text-gray-900">Potential impact: +12% conversion rate</span>
                </div>
              </div>
            </div>

            {/* Image Preview Grid */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Image Enhancement Preview</h3>

              {/* Toggle */}
              <div className="flex items-center justify-center gap-6 mb-8">
                <span className="text-lg font-medium text-gray-700">View:</span>
                <div className="flex bg-gray-100 rounded-lg border border-gray-300 p-1">
                  <button className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                    Before Enhancement
                  </button>
                  <button className="px-6 py-3 text-sm font-medium text-white bg-gray-800 rounded-md transition-colors">
                    After Enhancement
                  </button>
                </div>
              </div>

              {/* Image Grid */}
              <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 12 }, (_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-all duration-200 border border-gray-200 hover:border-gray-300 hover:shadow-md"
                  >
                    <div className="text-center">
                      <RiImageLine size={32} className="text-gray-400 mx-auto mb-2" />
                      <span className="text-xs text-gray-500 font-medium">Image {i + 1}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600">
                  <span>+ 11 more images optimized</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Actions & Details */}
          <div className="lg:col-span-4 space-y-6">
            {/* What Will Change */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                  <RiCheckLine size={16} className="text-gray-600" />
                </div>
                What Will Change
              </h3>

              <div className="space-y-4">
                {[
                  'Advanced AI upscaling algorithm applied',
                  'Image sharpening and noise reduction',
                  'Optimized file compression (WebP format)',
                  'Maintained aspect ratios and quality'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <RiCheckLine size={12} className="text-white" />
                    </div>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Details */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                  <RiSettings3Line size={16} className="text-gray-600" />
                </div>
                Technical Details
              </h3>

              <div className="space-y-4">
                {[
                  { label: 'Algorithm Used', value: 'Super-Resolution AI' },
                  { label: 'Processing Time', value: '~2 minutes' },
                  { label: 'Format', value: 'WebP (optimized)' },
                  { label: 'Backup', value: 'Auto-created' }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-600 font-medium">{item.label}:</span>
                    <span className="text-gray-900 font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deploy Actions */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Deploy?</h3>
              <p className="text-gray-600 mb-8">Deploy all 23 image optimizations instantly</p>

              <div className="space-y-4">
                <button
                  onClick={() => onDeployStart && onDeployStart()}
                  className="w-full py-4 px-8 bg-gray-800 hover:bg-gray-900 text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                >
                  <span>🚀</span>
                  <span>Approve & Deploy 23 Fixes</span>
                </button>

                <button
                  className="w-full py-3 px-6 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold rounded-xl transition-all duration-200 hover:shadow-md"
                >
                  Preview Individual Images
                </button>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700 font-medium">
                  ✅ Changes are reversible • Estimated deployment: 30 seconds
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
