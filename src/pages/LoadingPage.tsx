import React, { useState } from 'react'
import {
  RiSearchLine,
  RiSettings3Line,
  RiRocketLine,
  RiCheckLine,
  RiAppleLine,
  RiGoogleLine,
  RiMicrosoftLine,
  RiAmazonLine,
  RiNetflixLine,
  RiBarChartLine,
  RiMoneyDollarCircleLine,
  RiArrowUpLine,
  RiTimeLine,
  RiGroupLine,
  RiDownloadLine,
  RiSearch2Line,
  RiPhoneLine,
  RiCloseLine,
  RiToolsLine,
  RiLoader4Line,
  RiImageLine,
  RiSpeedUpLine,
  RiSmartphoneLine
} from '@remixicon/react'
import FixPreviewPage from './FixPreviewPage'
import AiDeployPage from './AiDeployPage'
import AgentLiveView from './AgentLiveView'
import ProgressBar from '../components/ProgressBar'

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
  onStartScan?: (scanFn: () => void) => void
}

const scanningSteps = [
  { progress: 10, message: "Connecting to your store..." },
  { progress: 25, message: "Analyzing page load speeds..." },
  { progress: 40, message: "Checking SEO optimization..." },
  { progress: 55, message: "Reviewing conversion funnels..." },
  { progress: 70, message: "Scanning for accessibility issues..." },
  { progress: 85, message: "Calculating revenue impact..." },
  { progress: 100, message: "Generating diagnostic report..." }
]

export default function LoadingPage({
  storeUrl,
  setStoreUrl,
  onStartScan
}: LoadingPageProps) {
  const [showFixPreview, setShowFixPreview] = useState(false)
  const [showAiDeploy, setShowAiDeploy] = useState(false)
  const [showAgentLiveView, setShowAgentLiveView] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [scanComplete, setScanComplete] = useState(false)
  const [isFixingImages, setIsFixingImages] = useState(false)
  const [isFixingSpeed, setIsFixingSpeed] = useState(false)
  const [isFixingMobile, setIsFixingMobile] = useState(false)

  const handleStartScan = React.useCallback(() => {
    // Start scanning locally instead of navigating
    if (storeUrl.trim()) {
      setIsScanning(true)
      setCurrentStep(0)
      setProgress(0)
    }
  }, [storeUrl])

  // Handle scanning progression
  React.useEffect(() => {
    if (!isScanning) return

    const interval = setInterval(() => {
      setCurrentStep(prev => {
        const nextStep = prev + 1
        if (nextStep >= scanningSteps.length) {
          clearInterval(interval)
          // Show health report after scanning completes
          setTimeout(() => {
            setIsScanning(false)
            setScanComplete(true)
          }, 1000)
          return prev
        }
        return nextStep
      })
    }, 4000) // 4 seconds per step

    return () => clearInterval(interval)
  }, [isScanning])

  // Update progress when step changes
  React.useEffect(() => {
    if (currentStep < scanningSteps.length) {
      setProgress(scanningSteps[currentStep].progress)
    }
  }, [currentStep])

  // Register the handleStartScan function with parent component
  React.useEffect(() => {
    if (onStartScan) {
      onStartScan(handleStartScan)
    }
  }, [onStartScan, handleStartScan])

  if (showAgentLiveView) {
    // Show Agent Live View during deployment
    return <AgentLiveView 
      onComplete={() => {
        setShowAgentLiveView(false)
        // Return to Store Health Report after completion
      }}
      onViewStore={() => {
        // Open store in new tab
        window.open('https://yourstore.myshopify.com', '_blank')
      }}
    />
  }

  if (showAiDeploy) {
    // Show AI Deploy content
    return <AiDeployPage onFixAnother={() => {
      setShowAiDeploy(false)
      setScanComplete(true) // Return to health report
    }} />
  }

  if (showFixPreview) {
    // Show Fix Preview content
    return <FixPreviewPage 
      onBack={() => setShowFixPreview(false)}
      onDeployStart={() => {
        setShowFixPreview(false)
        setShowAiDeploy(true)
        // Trigger deployment messages in AI chat
        if (window.triggerDeploymentFlow) {
          window.triggerDeploymentFlow()
        }
      }}
    />
  }

  // Show store health report after scanning completes
  if (scanComplete) {
      return (
      <div className="w-full flex justify-center rounded-lg" style={{ background: '#F4FBF2' }}>
          <div className="p-6" style={{ width: '1440px', maxWidth: '1440px', minWidth: '1440px' }}>
            <div
            className="w-full rounded-lg backdrop-blur-lg p-8"
       
            >
          {/* Store Health Report Content */}
          <div className="w-full max-w-none">
            {/* Header Section */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center"
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
                {/* Box 1 - Health Score */}
                  <div className="p-6 rounded-lg border border-gray-200 bg-white shadow-sm">
                  {/* Header Section */}
                  <div className="text-center mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Store Health Score</h3>
                    <p className="text-sm text-gray-600">Overall store health based on 14 performance factors</p>
                  </div>

                  {/* Main Score Display */}
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200 mx-auto">
                      <span className="text-2xl font-bold text-gray-900">78</span>
                    </div>
                    <div className="mt-3">
                      <div className="text-sm font-medium text-gray-900">Good Performance</div>
                      <div className="text-xs text-gray-500 mt-1">Room for improvement</div>
                    </div>
                  </div>

                  {/* Performance Factors */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-gray-700">Performance</span>
                      <span className="text-sm font-medium text-gray-900">75%</span>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-gray-700">SEO</span>
                      <span className="text-sm font-medium text-gray-900">82%</span>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-gray-700">Security</span>
                      <span className="text-sm font-medium text-gray-900">88%</span>
                    </div>
                  </div>

                  {/* Summary Stats */}
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-gray-900">14</div>
                        <div className="text-xs text-gray-500">Factors Analyzed</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-900">+22</div>
                        <div className="text-xs text-gray-500">Points to Improve</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Box 2 - Top Priority Issues */}
                  <div className="p-6 rounded-lg border border-gray-200 bg-white shadow-sm">
                  <div className="space-y-6">
                    {/* Issue 1 - Image Quality */}
                      <div>
                        <div className="flex items-start gap-3 mb-4">
                          <RiImageLine size={20} style={{ color: DARK_PALETTE.primary }} />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Blurry Product Images</h3>
                            <p className="text-sm text-gray-600">23 product images are low resolution and need enhancement</p>
                          </div>
                        </div>
                      
                      <hr className="border-gray-200 mb-4" />
                      
                      <div className="flex items-center justify-between mb-4">
                        <button 
                          className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-red-400 transition-colors"
                          title="Dismiss issue"
                        >
                          <RiCloseLine size={16} className="text-gray-500" />
                        </button>
                        
                        <button 
                          onClick={() => {
                            setIsFixingImages(true)
                            setTimeout(() => {
                              setIsFixingImages(false)
                              setShowFixPreview(true)
                            }, 2000)
                          }}
                          className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-green-400 transition-colors"
                          title="Fix this issue"
                        >
                          {isFixingImages ? (
                            <RiLoader4Line size={16} className="text-gray-500 animate-spin" />
                          ) : (
                            <RiToolsLine size={16} className="text-gray-500" />
                          )}
                        </button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Task Progress</span>
                          <span 
                            className="text-green-700 cursor-pointer hover:text-green-800 font-medium"
                            onClick={() => {
                              setIsFixingImages(true)
                              setTimeout(() => {
                                setIsFixingImages(false)
                                setShowFixPreview(true)
                              }, 2000)
                            }}
                          >
                            Click to Fix
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className={`h-2 bg-gray-400 rounded-full transition-all duration-300 ${isFixingImages ? 'w-1/3' : 'w-0'}`}></div>
                        </div>
                      </div>
                    </div>

                    {/* Issue 2 - Page Speed */}
                      <div>
                        <div className="flex items-start gap-3 mb-4">
                          <RiSpeedUpLine size={20} style={{ color: DARK_PALETTE.primary }} />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Slow Page Loading</h3>
                            <p className="text-sm text-gray-600">Homepage loads in 4.2s, needs optimization</p>
                          </div>
                        </div>
                      
                      <hr className="border-gray-200 mb-4" />
                      
                      <div className="flex items-center justify-between mb-4">
                        <button 
                          className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-red-400 transition-colors"
                          title="Dismiss issue"
                        >
                          <RiCloseLine size={16} className="text-gray-500" />
                        </button>
                        
                        <button 
                          onClick={() => {
                            setIsFixingSpeed(true)
                            setTimeout(() => {
                              setIsFixingSpeed(false)
                            }, 2000)
                          }}
                          className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-green-400 transition-colors"
                          title="Fix this issue"
                        >
                          {isFixingSpeed ? (
                            <RiLoader4Line size={16} className="text-gray-500 animate-spin" />
                          ) : (
                            <RiToolsLine size={16} className="text-gray-500" />
                          )}
                        </button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Task Progress</span>
                          <span 
                            className="text-green-700 cursor-pointer hover:text-green-800 font-medium"
                            onClick={() => {
                              setIsFixingSpeed(true)
                              setTimeout(() => {
                                setIsFixingSpeed(false)
                              }, 2000)
                            }}
                          >
                            Click to Fix
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className={`h-2 bg-gray-400 rounded-full transition-all duration-300 ${isFixingSpeed ? 'w-1/3' : 'w-0'}`}></div>
                        </div>
                      </div>
                    </div>

                    {/* Issue 3 - Mobile UX */}
                      <div>
                        <div className="flex items-start gap-3 mb-4">
                          <RiSmartphoneLine size={20} style={{ color: DARK_PALETTE.primary }} />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Mobile Layout Issues</h3>
                            <p className="text-sm text-gray-600">Product grid breaks on small screens</p>
                          </div>
                        </div>
                      
                      <hr className="border-gray-200 mb-4" />
                      
                      <div className="flex items-center justify-between mb-4">
                        <button 
                          className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-red-400 transition-colors"
                          title="Dismiss issue"
                        >
                          <RiCloseLine size={16} className="text-gray-500" />
                        </button>
                        
                        <button 
                          onClick={() => {
                            setIsFixingMobile(true)
                            setTimeout(() => {
                              setIsFixingMobile(false)
                            }, 2000)
                          }}
                          className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-green-400 transition-colors"
                          title="Fix this issue"
                        >
                          {isFixingMobile ? (
                            <RiLoader4Line size={16} className="text-gray-500 animate-spin" />
                          ) : (
                            <RiToolsLine size={16} className="text-gray-500" />
                          )}
                        </button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Task Progress</span>
                          <span 
                            className="text-green-700 cursor-pointer hover:text-green-800 font-medium"
                            onClick={() => {
                              setIsFixingMobile(true)
                              setTimeout(() => {
                                setIsFixingMobile(false)
                              }, 2000)
                            }}
                          >
                            Click to Fix
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className={`h-2 bg-gray-400 rounded-full transition-all duration-300 ${isFixingMobile ? 'w-1/3' : 'w-0'}`}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - 30% (2/5 columns) */}
              <div className="col-span-2 space-y-6">
                {/* Box 1 - Potential Impact */}
                  <div className="p-6 rounded-lg border border-gray-200 bg-white shadow-sm">
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center bg-gray-100">
                      <RiBarChartLine size={24} className="text-gray-700" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Potential Impact</h3>
                    <p className="text-sm text-gray-600">Estimated improvements</p>
                  </div>
                  <div className="space-y-6">
                    {/* Potential Revenue Increase */}
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <RiMoneyDollarCircleLine size={20} className="text-gray-700" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-900">$10,500</div>
                        <div className="text-sm font-medium text-gray-600">Potential Revenue Increase</div>
                        <div className="text-xs text-gray-500">per month</div>
                      </div>
                    </div>

                    {/* Conversion Rate Lift */}
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <RiArrowUpLine size={20} className="text-gray-700" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-900">+20%</div>
                        <div className="text-sm font-medium text-gray-600">Conversion Rate Lift</div>
                        <div className="text-xs text-gray-500">estimated</div>
                      </div>
                    </div>

                    {/* Time to Fix */}
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <RiTimeLine size={20} className="text-gray-700" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-900">5 min</div>
                        <div className="text-sm font-medium text-gray-600">Time to Fix</div>
                        <div className="text-xs text-gray-500">per issue</div>
                      </div>
                    </div>

                    {/* Users Affected */}
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <RiGroupLine size={20} className="text-gray-700" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-900">2,847</div>
                        <div className="text-sm font-medium text-gray-600">Users Affected</div>
                        <div className="text-xs text-gray-500">per week</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Box 2 - Quick Actions */}
                  <div className="p-6 rounded-lg border border-gray-200 bg-white shadow-sm">
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center bg-gray-100">
                      <RiRocketLine size={24} className="text-gray-700" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Quick Actions</h3>
                    <p className="text-sm text-gray-600">Next steps</p>
                  </div>
                  <div className="space-y-3">
                    <button className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center group-hover:bg-gray-50 transition-colors">
                          <RiDownloadLine size={16} className="text-gray-700" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">Download Report</span>
                      </div>
                    </button>
                    <button className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center group-hover:bg-gray-50 transition-colors">
                          <RiSearch2Line size={16} className="text-gray-700" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">Scan Another Store</span>
                      </div>
                    </button>
                    <button className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center group-hover:bg-gray-50 transition-colors">
                          <RiPhoneLine size={16} className="text-gray-700" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">Schedule Call</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
            </div>
          </div>
        </div>
      )
    }
    
  // Show scanning progress if scanning
  if (isScanning) {
    return (
      <div className="w-full flex justify-center" style={{ background: '#F4FBF2' }}>
        <div className="p-8" style={{ width: '1440px', maxWidth: '1440px', minWidth: '1440px' }}>
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-lg">
              <ProgressBar 
                progress={progress} 
                label="Scanning your store..."
                className="w-full"
              />
        </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex justify-center rounded-lg" style={{ background: '#F4FBF2' }}>
      <div className="p-6" style={{ width: '1440px', maxWidth: '1440px', minWidth: '1440px' }}>
        <div className="w-full p-6">
      {/* Landing Page Header */}
      <div className="text-left mb-16 max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
          Fix Your Shopify Store Issues in Minutes, Not Months
        </h1>
        <p className="text-2xl text-gray-600 leading-relaxed max-w-3xl font-light">
          Our AI scans your store, identifies performance issues, and deploys fixes automatically. 
          Trusted by 500+ Shopify Plus brands to increase conversions.
        </p>
      </div>

      {/* Modern CTA Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="text-left mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            Get Your Free Store Health Report
          </h2>
          <p className="text-xl text-gray-600 mb-4 leading-relaxed max-w-3xl">
            Enter your Shopify store URL to start your diagnostic scan. We'll analyze your store's public pages to identify optimization opportunities.
          </p>
        </div>
        
            <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
          <div className="mb-6">
            <textarea
              value={storeUrl}
              onChange={(e) => setStoreUrl(e.target.value)}
              placeholder="https://yourstore.myshopify.com"
              rows={4}
              className="w-full px-4 py-4 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all resize-none font-mono"
              style={{
                lineHeight: '1.6',
                fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace'
              }}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <RiCheckLine size={16} className="text-gray-400" />
                <span>No signup required</span>
              </div>
              <div className="flex items-center gap-2">
                <RiCheckLine size={16} className="text-gray-400" />
                <span>Results in 30 seconds</span>
              </div>
              <div className="flex items-center gap-2">
                <RiCheckLine size={16} className="text-gray-400" />
                <span>Completely free</span>
              </div>
            </div>
            
            <button
              onClick={handleStartScan}
              disabled={!storeUrl.trim()}
              className="px-8 py-3 rounded-lg text-white font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
              style={{ 
                backgroundColor: DARK_PALETTE.primary,
                minWidth: '120px'
              }}
            >
              Analyze
            </button>
          </div>
        </div>
      </div>

      {/* Trusted By Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="flex items-center gap-6">
          <p className="text-sm text-gray-500">Trusted by leading technology companies</p>
          <div className="flex items-center gap-4 opacity-60">
            <div className="flex items-center justify-center w-8 h-8 rounded bg-white">
              <RiAppleLine size={16} className="text-gray-600" />
            </div>
            <div className="flex items-center justify-center w-8 h-8 rounded bg-white">
              <RiGoogleLine size={16} className="text-gray-600" />
            </div>
            <div className="flex items-center justify-center w-8 h-8 rounded bg-white">
              <RiMicrosoftLine size={16} className="text-gray-600" />
            </div>
            <div className="flex items-center justify-center w-8 h-8 rounded bg-white">
              <RiAmazonLine size={16} className="text-gray-600" />
            </div>
            <div className="flex items-center justify-center w-8 h-8 rounded bg-white">
              <RiNetflixLine size={16} className="text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mb-16 max-w-4xl mx-auto">
        <div className="text-left mb-12">
          <h3 className="text-4xl font-bold text-gray-900 mb-4 leading-tight tracking-tight">How It Works</h3>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl font-light">Get actionable fixes for your store in three simple steps</p>
        </div>
        
        <div className="grid grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="text-center">
            <div
                  className="w-16 h-16 mx-auto mb-4 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'white', color: DARK_PALETTE.secondary }}
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
                  className="w-16 h-16 mx-auto mb-4 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'white', color: DARK_PALETTE.secondary }}
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
                  className="w-16 h-16 mx-auto mb-4 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'white', color: DARK_PALETTE.secondary }}
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
      </div>
    </div>
  )
}