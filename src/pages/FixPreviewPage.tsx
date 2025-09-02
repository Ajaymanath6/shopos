import { useState } from 'react'
import { RiImageLine, RiArrowLeftLine, RiCloseLine, RiToolsLine, RiLoader4Line } from '@remixicon/react'

interface FixPreviewPageProps {
  onBack?: () => void
  onDeployStart?: () => void
}

export default function FixPreviewPage({ onBack, onDeployStart }: FixPreviewPageProps) {
  const [isDeploying, setIsDeploying] = useState(false)
  return (
    <div className="w-full flex justify-center" style={{ background: '#F7FFF7' }}>
      <div className="p-6" style={{ width: '1440px', maxWidth: '1440px', minWidth: '1440px' }}>
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
                      <RiToolsLine size={16} className="text-gray-500" />
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
