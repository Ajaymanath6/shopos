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
    // Show Store Health Report content when scan is complete
    if (scanProgress >= 100) {
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
          {/* Store Health Report Content */}
          <div className="max-w-6xl mx-auto">
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
                {/* Box 1 - Performance Optimization */}
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

                {/* Box 2 - SEO Improvements */}
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

                {/* Box 3 - Security & Performance */}
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
                {/* Box 1 - Health Score */}
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

                {/* Box 2 - Quick Wins */}
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
        </div>
      )
    }
    
    // Show scanning progress UI
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


