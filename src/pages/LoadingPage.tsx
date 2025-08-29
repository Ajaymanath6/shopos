import React from 'react'
import { RiSearchLine, RiSettings3Line, RiRocketLine, RiCheckLine, RiAppleLine, RiGoogleLine, RiMicrosoftLine, RiAmazonLine, RiNetflixLine } from '@remixicon/react'

// Dark Gray Monochromatic Palette
const DARK_PALETTE = {
  primary: '#1F2937',    // Dark gray
  secondary: '#374151',  // Medium gray  
  tertiary: '#4B5563',   // Light gray
  accent: '#6B7280',     // Lighter gray
  light: '#9CA3AF'       // Very light gray
}





interface LoadingPageProps {
  storeUrl: string
  setStoreUrl: (url: string) => void
  scanProgress: number
  handleStoreSubmit: () => void
  onStartScan?: (scanFn: () => void) => void
}

export default function LoadingPage({
  storeUrl,
  setStoreUrl,
  scanProgress,
  handleStoreSubmit,
  onStartScan
}: LoadingPageProps) {
  const isScanning = scanProgress > 0



  const handleStartScan = React.useCallback(() => {
    // Start the scanning process
    handleStoreSubmit()
  }, [handleStoreSubmit])

  // Register the handleStartScan function with parent component
  React.useEffect(() => {
    if (onStartScan) {
      onStartScan(handleStartScan)
    }
  }, [onStartScan, handleStartScan])

  if (isScanning) {
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
        {/* Main Scanning Container */}
        <div className="max-w-2xl mx-auto">
          {/* Scanning Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: DARK_PALETTE.primary }}
              >
                <RiSearchLine size={32} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Scanning Your Store
            </h1>
            <p className="text-xl text-gray-600">
              Analyzing the site URLs and gathering optimization insights
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium" style={{ color: '#A5D6A7' }}>Analysis Progress</span>
              <span className="text-lg text-gray-700">{scanProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${scanProgress}%`,
                  background: `linear-gradient(90deg, ${DARK_PALETTE.primary} 0%, ${DARK_PALETTE.secondary} 100%)`
                }}
              />
            </div>
          </div>

          {/* Scanning Steps */}
          <div className="space-y-6 mb-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Generating Fix Recommendations
              </h2>
              <p className="text-gray-600">
                We're identifying specific improvements for your store
              </p>
            </div>

            {/* Step 1 */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-200">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: scanProgress >= 25 ? '#10B981' : '#E5E7EB' }}
              >
                {scanProgress >= 25 ? (
                  <RiCheckLine size={20} className="text-white" />
                ) : (
                  <div className="w-3 h-3 bg-gray-400 rounded-full" />
                )}
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold ${scanProgress >= 25 ? 'text-gray-900' : 'text-gray-500'}`}>
                  Page Structure Analysis
                </h3>
                <p className={`text-sm ${scanProgress >= 25 ? 'text-gray-600' : 'text-gray-400'}`}>
                  Examining site navigation and content organization
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-200">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: scanProgress >= 50 ? '#10B981' : '#E5E7EB' }}
              >
                {scanProgress >= 50 ? (
                  <RiCheckLine size={20} className="text-white" />
                ) : (
                  <div className="w-3 h-3 bg-gray-400 rounded-full" />
                )}
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold ${scanProgress >= 50 ? 'text-gray-900' : 'text-gray-500'}`}>
                  Performance Optimization
                </h3>
                <p className={`text-sm ${scanProgress >= 50 ? 'text-gray-600' : 'text-gray-400'}`}>
                  Checking load speeds and technical performance
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-200">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: scanProgress >= 75 ? '#10B981' : '#E5E7EB' }}
              >
                {scanProgress >= 75 ? (
                  <RiCheckLine size={20} className="text-white" />
                ) : (
                  <div className="w-3 h-3 bg-gray-400 rounded-full" />
                )}
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold ${scanProgress >= 75 ? 'text-gray-900' : 'text-gray-500'}`}>
                  Conversion Analysis
                </h3>
                <p className={`text-sm ${scanProgress >= 75 ? 'text-gray-600' : 'text-gray-400'}`}>
                  Reviewing user experience and sales funnels
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-200">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: scanProgress >= 100 ? '#10B981' : '#E5E7EB' }}
              >
                {scanProgress >= 100 ? (
                  <RiCheckLine size={20} className="text-white" />
                ) : (
                  <div className="w-3 h-3 bg-gray-400 rounded-full" />
                )}
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold ${scanProgress >= 100 ? 'text-gray-900' : 'text-gray-500'}`}>
                  Final Report Generation
                </h3>
                <p className={`text-sm ${scanProgress >= 100 ? 'text-gray-600' : 'text-gray-400'}`}>
                  Compiling personalized recommendations and fixes
                </p>
              </div>
            </div>
          </div>

          {/* Status Message */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-gray-600"></div>
              <span className="text-sm font-medium text-gray-700">
                {scanProgress < 25 ? 'Initializing analysis...' :
                 scanProgress < 50 ? 'Analyzing page structure...' :
                 scanProgress < 75 ? 'Checking performance...' :
                 scanProgress < 100 ? 'Reviewing conversions...' :
                 'Finalizing recommendations...'}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
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
      {/* Landing Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          Fix Your Shopify Store Issues<br />
          in Minutes, Not Months
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
          Our AI scans your store, identifies performance issues, and deploys fixes automatically. 
          Trusted by 500+ Shopify Plus brands to increase conversions.
        </p>
      </div>

      {/* Main CTA Box */}
      <div className="max-w-2xl mx-auto mb-12 p-8 bg-white rounded-2xl border-2 border-gray-200 shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Get Your Free Store Health Report
          </h2>
          <p className="text-gray-600 mb-2">
            Enter your Shopify store URL to start your diagnostic scan
          </p>
          <p className="text-sm text-gray-500 mb-6">
            We'll analyze your store's public pages to identify optimization opportunities
          </p>
          
          <div className="flex gap-4 mb-4">
            <input
              type="url"
              value={storeUrl}
              onChange={(e) => setStoreUrl(e.target.value)}
              placeholder="https://yourstore.myshopify.com"
              className="flex-1 px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-0 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
              style={{ '--tw-ring-color': '#A5D6A7' } as React.CSSProperties}
            />
            <button
              onClick={handleStartScan}
              disabled={!storeUrl.trim()}
              className="px-8 py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
              style={{ backgroundColor: DARK_PALETTE.primary }}
            >
              Start Free Scan
            </button>
          </div>
          
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <RiCheckLine size={16} className="text-green-500" />
              <span>No signup required</span>
            </div>
            <div className="flex items-center gap-1">
              <RiCheckLine size={16} className="text-green-500" />
              <span>Results in 30 seconds</span>
            </div>
            <div className="flex items-center gap-1">
              <RiCheckLine size={16} className="text-green-500" />
              <span>Completely free</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted By Section */}
      <div className="text-center mb-12">
        <p className="text-sm text-gray-500 mb-6">Trusted by leading technology companies</p>
        <div className="flex items-center justify-center gap-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100">
            <RiAppleLine size={24} className="text-gray-700" />
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100">
            <RiGoogleLine size={24} className="text-gray-700" />
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100">
            <RiMicrosoftLine size={24} className="text-gray-700" />
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100">
            <RiAmazonLine size={24} className="text-gray-700" />
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100">
            <RiNetflixLine size={24} className="text-gray-700" />
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">How It Works</h3>
        <p className="text-gray-600 text-center mb-8">Get actionable fixes for your store in three simple steps</p>
        
        <div className="grid grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="text-center">
            <div
              className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: '#F3F4F6', color: DARK_PALETTE.secondary }}
            >
              <RiSearchLine size={32} />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">1. AI Scan</h4>
            <p className="text-sm text-gray-600">
              Our AI analyzes your store's performance across 14 key factors in under 30 seconds
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div
              className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: '#F3F4F6', color: DARK_PALETTE.secondary }}
            >
              <RiSettings3Line size={32} />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">2. Smart Fixes</h4>
            <p className="text-sm text-gray-600">
              Get prioritized, actionable fixes with live previews and impact estimates
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div
              className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: '#F3F4F6', color: DARK_PALETTE.secondary }}
            >
              <RiRocketLine size={32} />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-2">3. Deploy & Grow</h4>
            <p className="text-sm text-gray-600">
              Approve fixes and deploy them instantly to your live store with one click
            </p>
          </div>
        </div>
      </div>


    </div>
  )
}


