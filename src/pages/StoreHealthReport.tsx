

import { useState } from 'react'
import { RiBarChartBoxLine, RiSpeedUpLine, RiShieldCheckLine, RiSearchLine, RiArrowRightSLine } from '@remixicon/react'

export default function StoreHealthReport() {
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('before')

  const handleTabClick = (tab: 'before' | 'after') => {
    console.log('Tab clicked:', tab, 'Current tab:', activeTab)
    setActiveTab(tab)
  }

  return (
    <div className="w-full h-full overflow-y-auto px-8 py-6">
      {/* Header Section - Minimal */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
            <RiBarChartBoxLine size={32} className="text-gray-700" />
          </div>
        </div>
        <h1 className="text-3xl font-light text-gray-900 mb-3">
          Store Health Report
        </h1>
        <p className="text-lg text-gray-500 font-light">
          Optimization opportunities to boost performance
        </p>
      </div>

      {/* Before/After Enhancement Tabs */}
      <div className="mb-12">
        <div className="flex justify-center mb-8">
          <div className="bg-gray-50 rounded-full p-1 inline-flex">
            <button
              type="button"
              onClick={() => handleTabClick('before')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                activeTab === 'before' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Before Enhancement
            </button>
            <button
              type="button"
              onClick={() => handleTabClick('after')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                activeTab === 'after' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              After Enhancement
            </button>
          </div>
        </div>
        
        {/* Debug indicator */}
        <div className="text-center mb-4">
          <span className="text-xs text-gray-400">
            Current view: {activeTab === 'before' ? 'Before Enhancement (Low Quality)' : 'After Enhancement (Optimized)'}
          </span>
        </div>

        {/* Image Comparison */}
        <div className="grid grid-cols-3 gap-8 mb-12">
          {[
            {
              before: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop&q=20',
              after: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop&q=90',
              fallbackBefore: 'https://via.placeholder.com/300x200/E5E7EB/9CA3AF?text=Low+Quality+Headphones',
              fallbackAfter: 'https://via.placeholder.com/300x200/10B981/FFFFFF?text=HD+Headphones',
              name: 'Headphones'
            },
            {
              before: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop&q=20',
              after: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop&q=90',
              fallbackBefore: 'https://via.placeholder.com/300x200/E5E7EB/9CA3AF?text=Low+Quality+Watch',
              fallbackAfter: 'https://via.placeholder.com/300x200/10B981/FFFFFF?text=HD+Watch',
              name: 'Smart Watch'
            },
            {
              before: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop&q=20',
              after: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop&q=90',
              fallbackBefore: 'https://via.placeholder.com/300x200/E5E7EB/9CA3AF?text=Low+Quality+Sneakers',
              fallbackAfter: 'https://via.placeholder.com/300x200/10B981/FFFFFF?text=HD+Sneakers',
              name: 'Sneakers'
            }
          ].map((product, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-4">
                <img
                  src={activeTab === 'before' ? product.before : product.after}
                  alt={`${product.name} - ${activeTab}`}
                  className="w-full h-48 object-cover rounded-lg shadow-sm transition-all duration-500"
                  loading="eager"
                  onError={(e) => {
                    // Fallback to placeholder if Unsplash fails
                    const target = e.currentTarget as HTMLImageElement;
                    target.src = activeTab === 'before' ? product.fallbackBefore : product.fallbackAfter;
                  }}
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full transition-all duration-300 ${
                    activeTab === 'before' 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {activeTab === 'before' ? 'Low Quality' : 'Optimized'}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 font-light">
                {product.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Minimal Content Layout */}
      <div className="grid grid-cols-5 gap-12">
        {/* Left Column - 70% (3/5 columns) */}
        <div className="col-span-3 space-y-12">
          {/* Performance Section */}
          <div className="border-l-2 border-gray-100 pl-6">
            <div className="flex items-center gap-3 mb-6">
              <RiSpeedUpLine size={20} className="text-gray-400" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">Performance</h3>
                <p className="text-sm text-gray-500 font-light">Speed improvements identified</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-gray-700">Page Load Speed</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-1 bg-gray-100 rounded-full">
                    <div className="w-20 h-1 bg-gray-300 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-500 font-light w-8">68%</span>
                </div>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-gray-700">Image Optimization</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-1 bg-gray-100 rounded-full">
                    <div className="w-26 h-1 bg-gray-400 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-500 font-light w-8">83%</span>
                </div>
              </div>
            </div>
          </div>

          {/* SEO Section */}
          <div className="border-l-2 border-gray-100 pl-6">
            <div className="flex items-center gap-3 mb-6">
              <RiSearchLine size={20} className="text-gray-400" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">SEO</h3>
                <p className="text-sm text-gray-500 font-light">Search visibility enhancements</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm text-gray-700 mb-1">Meta Tags Missing</div>
                  <p className="text-xs text-gray-500 font-light">Add proper meta descriptions and title tags</p>
                </div>
                <span className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">12 pages</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm text-gray-700 mb-1">Image Alt Tags</div>
                  <p className="text-xs text-gray-500 font-light">Add descriptive alt text for accessibility</p>
                </div>
                <span className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">8 missing</span>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="border-l-2 border-gray-100 pl-6">
            <div className="flex items-center gap-3 mb-6">
              <RiShieldCheckLine size={20} className="text-gray-400" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">Security</h3>
                <p className="text-sm text-gray-500 font-light">Technical issues that need attention</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm text-gray-700 mb-1">SSL Certificate</div>
                  <p className="text-xs text-gray-500 font-light">Update to maintain secure connections</p>
                </div>
                <span className="text-sm text-red-600 bg-red-50 px-2 py-1 rounded">High Risk</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm text-gray-700 mb-1">JavaScript Files</div>
                  <p className="text-xs text-gray-500 font-light">Minify and compress for better performance</p>
                </div>
                <span className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">3 files</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - 30% (2/5 columns) */}
        <div className="col-span-2 space-y-12">
          {/* Health Score */}
          <div className="text-center">
            <div className="mb-6">
              <div className="text-4xl font-light text-gray-800 mb-2">78</div>
              <div className="text-sm text-gray-500 font-light">Health Score</div>
            </div>
            <div className="space-y-4 text-left">
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Performance</span>
                <span className="text-sm text-gray-800 font-light">75%</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">SEO</span>
                <span className="text-sm text-gray-800 font-light">82%</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Security</span>
                <span className="text-sm text-gray-800 font-light">88%</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Quick Actions</h3>
              <p className="text-sm text-gray-500 font-light">Easy improvements</p>
            </div>
            <div className="space-y-4">
              {[
                'Enable browser caching',
                'Compress images',
                'Add meta descriptions',
                'Fix broken links'
              ].map((action, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-700">{action}</span>
                  <RiArrowRightSLine size={16} className="text-gray-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


