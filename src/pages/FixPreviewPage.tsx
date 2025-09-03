import { useState } from 'react'
import { RiArrowLeftLine, RiCloseLine, RiRocketLine, RiLoader4Line } from '@remixicon/react'

interface FixPreviewPageProps {
  onBack?: () => void
  onDeployStart?: () => void
}

export default function FixPreviewPage({ onBack, onDeployStart }: FixPreviewPageProps) {
  const [isDeploying, setIsDeploying] = useState(false)
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('after')
  return (
    <div className="w-full flex justify-center rounded-xl" style={{ background: '#F7FFF7' }}>
      <div className="p-6" style={{ width: '1440px', maxWidth: '1440px', minWidth: '1440px' }}>
        {/* Back Button */}
        {onBack && (
          <div className="flex justify-start mb-8">
            <button
              onClick={onBack}
              className="flex items-center gap-3 px-6 py-3 bg-white hover:bg-gray-50 rounded-lg text-gray-700 hover:text-gray-900 transition-colors border border-gray-200 shadow-sm"
            >
              <RiArrowLeftLine size={20} />
              <span className="font-medium">Back to Report</span>
            </button>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Side - Image Preview */}
          <div className="lg:col-span-8">
            {/* Image Preview Grid */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Image Enhancement Preview</h3>

              {/* Toggle */}
              <div className="flex items-center justify-center gap-6 mb-8">
                <span className="text-lg font-medium text-gray-700">View:</span>
                <div className="flex bg-gray-100 rounded-lg border border-gray-300 p-1">
                  <button 
                    onClick={() => setActiveTab('before')}
                    className={`px-6 py-3 text-sm font-medium transition-colors ${
                      activeTab === 'before' 
                        ? 'text-white bg-gray-800 rounded-md' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Before Enhancement
                  </button>
                  <button 
                    onClick={() => setActiveTab('after')}
                    className={`px-6 py-3 text-sm font-medium transition-colors ${
                      activeTab === 'after' 
                        ? 'text-white bg-gray-800 rounded-md' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    After Enhancement
                  </button>
                </div>
              </div>

              {/* Image Grid */}
              <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 12 }, (_, i) => {
                  const imageId = (i % 6) + 1 // Cycle through 6 different images
                  const beforeUrl = `https://images.unsplash.com/photo-${[
                    '1505740420928-5e560c06d30e', // headphones
                    '1523275335684-37898b6baf30', // watch
                    '1542291026-7eec264c27ff',   // sneakers
                    '1560472354-b33ff0c44a43',   // camera
                    '1572635196243-4dd75fbdbd7f', // sunglasses
                    '1441986300917-64674bd600d8'  // laptop
                  ][imageId - 1]}?w=200&h=200&fit=crop&q=${activeTab === 'before' ? '20' : '90'}`
                  
                  const fallbackUrl = activeTab === 'before'
                    ? `https://via.placeholder.com/200x200/E5E7EB/9CA3AF?text=Before+${i + 1}`
                    : `https://via.placeholder.com/200x200/10B981/FFFFFF?text=After+${i + 1}`

                  return (
                    <div
                      key={i}
                      className="aspect-square rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-gray-300 relative"
                    >
                      <img
                        src={beforeUrl}
                        alt={`Product ${i + 1} - ${activeTab}`}
                        className="w-full h-full object-cover transition-all duration-300"
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          target.src = fallbackUrl;
                        }}
                      />
                      <div className="absolute bottom-1 right-1">
                        <span className={`px-1.5 py-0.5 text-xs font-medium rounded ${
                          activeTab === 'before' 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {activeTab === 'before' ? 'Low' : 'HD'}
                        </span>
                      </div>
                      <div className="absolute top-1 left-1">
                        <span className="text-xs text-white bg-black bg-opacity-50 px-1.5 py-0.5 rounded">
                          #{i + 1}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Debug indicator */}
              <div className="text-center mt-4 mb-2">
                <span className="text-xs text-gray-400">
                  Currently viewing: {activeTab === 'before' ? 'Before Enhancement (Low Quality)' : 'After Enhancement (Optimized)'}
                </span>
              </div>

              <div className="text-center mt-6">
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
                  activeTab === 'before' 
                    ? 'bg-red-50 text-red-700' 
                    : 'bg-green-50 text-green-700'
                }`}>
                  <span>+ 11 more images {activeTab === 'before' ? 'to be optimized' : 'optimized'}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Deploy Actions */}
          <div className="lg:col-span-4">
            {/* Deploy Actions */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Deploy Image Optimizations</h3>
                <p className="text-sm text-gray-600 mb-4">Deploy all 23 image optimizations instantly to your live store</p>
                
                <hr className="border-gray-200 mb-4" />
                
                <div className="flex items-center justify-between mb-4">
                  <button 
                    className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-red-400 transition-colors"
                    title="Cancel deployment"
                  >
                    <RiCloseLine size={16} className="text-gray-500" />
                  </button>
                  
                  <button 
                    onClick={() => {
                      setIsDeploying(true)
                      setTimeout(() => {
                        setIsDeploying(false)
                        if (onDeployStart) onDeployStart()
                      }, 2000)
                    }}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-green-400 transition-colors"
                    title="Deploy optimizations"
                  >
                    {isDeploying ? (
                      <RiLoader4Line size={16} className="text-gray-500 animate-spin" />
                    ) : (
                      <RiRocketLine size={16} className="text-gray-500" />
                    )}
                  </button>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Deployment Progress</span>
                    <span className="text-gray-500">{isDeploying ? 'Processing...' : 'Ready to Deploy'}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`h-2 bg-gray-400 rounded-full transition-all duration-300 ${isDeploying ? 'w-1/3' : 'w-0'}`}></div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-700 font-medium">
                    Changes are reversible • Estimated deployment: 30 seconds
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
