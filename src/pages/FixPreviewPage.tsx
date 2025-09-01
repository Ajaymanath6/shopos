import Card from '../components/Card'
import { RiArrowUpLine, RiImageLine, RiCheckLine, RiArrowLeftLine } from '@remixicon/react'

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
}

export default function FixPreviewPage({ onBack }: FixPreviewPageProps) {
  return (
    <div
      className="w-full p-8 rounded-3xl backdrop-blur-lg"
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
        {/* Back Button */}
        {onBack && (
          <div className="flex justify-start mb-6">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <RiArrowLeftLine size={16} />
              Back to Report
            </button>
          </div>
        )}

        <div className="flex items-center justify-center gap-4 mb-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: DARK_PALETTE.primary }}
          >
            <RiImageLine size={32} className="text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Optimize Blurry Product Images
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          AI has enhanced 23 product images using advanced upscaling and sharpening
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-5 gap-6">
        {/* Left Column - 70% (3/5 columns) */}
        <div className="col-span-3 space-y-6">
          {/* Summary Box */}
          <Card className="max-w-4xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#10B981' }}>
                <RiImageLine size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Fixing 23 Blurry Product Images</h3>
                <p className="text-gray-600">This single fix will have a major impact on your page performance and user experience.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-polaris">
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">Total File Size Reduction</p>
                <p className="text-2xl font-bold text-green-600 mb-1">8.2 MB → 1.5 MB</p>
                <p className="text-sm text-gray-600">An 81% improvement!</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">Estimated Page Load Speed Gain</p>
                <p className="text-2xl font-bold text-green-600 mb-1">-1.9 seconds</p>
                <p className="text-sm text-gray-600">Faster loading times</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-700">
                <RiArrowUpLine size={16} />
                <span className="font-medium">Potential impact: +12% conversion rate</span>
              </div>
            </div>
          </Card>

          {/* Image Gallery Preview */}
          <Card title="Image Enhancement Preview" className="max-w-4xl">
            <div className="space-y-4">
              <p className="text-gray-600">
                Preview of AI-enhanced product images. Click on any image to see the detailed before/after comparison.
              </p>

              {/* Toggle Switch */}
              <div className="flex items-center justify-center gap-4 p-4 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Show:</span>
                <div className="flex bg-white rounded-lg border border-gray-300 p-1">
                  <button className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md">
                    Before
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                    After
                  </button>
                </div>
              </div>

              {/* Image Grid */}
              <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: 9 }, (_, i) => (
                  <div key={i} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors">
                    <div className="text-center">
                      <RiImageLine size={24} className="text-gray-500 mx-auto mb-2" />
                      <span className="text-xs text-gray-500">Image {i + 1}</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-sm text-gray-500 text-center">
                + 14 more images optimized
              </p>
            </div>
          </Card>
        </div>

        {/* Right Column - 30% (2/5 columns) */}
        <div className="col-span-2 space-y-6">
          {/* What Will Change */}
          <Card className="max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What Will Change</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <RiCheckLine size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">Advanced AI upscaling algorithm applied</p>
              </div>
              <div className="flex items-start gap-3">
                <RiCheckLine size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">Image sharpening and noise reduction</p>
              </div>
              <div className="flex items-start gap-3">
                <RiCheckLine size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">Optimized file compression (WebP format)</p>
              </div>
              <div className="flex items-start gap-3">
                <RiCheckLine size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">Maintained aspect ratios and quality</p>
              </div>
            </div>
          </Card>

          {/* Technical Details */}
          <Card className="max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Algorithm Used:</span>
                <span className="font-medium">Super-Resolution AI</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Processing Time:</span>
                <span className="font-medium">~2 minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Format:</span>
                <span className="font-medium">WebP (optimized)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Backup:</span>
                <span className="font-medium">Auto-created</span>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ready to Deploy?</h3>
            <div className="space-y-3">
              <button className="w-full px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg transition-colors">
                🚀 Approve & Deploy 23 Fixes
              </button>
              <button className="w-full px-6 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors">
                Preview Individual Images
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center mt-3">
              Changes are reversible • Estimated deployment: 30 seconds
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
