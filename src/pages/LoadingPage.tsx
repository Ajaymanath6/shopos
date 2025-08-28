import React from 'react'
import { RiCheckboxCircleLine, RiSearchLine, RiSettings3Line, RiRocketLine, RiCheckLine, RiAppleLine, RiGoogleLine, RiMicrosoftLine, RiAmazonLine, RiNetflixLine, RiPulseLine, RiBarChartLine, RiShieldCheckLine, RiFlashlightLine, RiLoader4Line } from '@remixicon/react'

// Dark Gray Monochromatic Palette
const DARK_PALETTE = {
  primary: '#1F2937',    // Dark gray
  secondary: '#374151',  // Medium gray  
  tertiary: '#4B5563',   // Light gray
  accent: '#6B7280',     // Lighter gray
  light: '#9CA3AF'       // Very light gray
}

interface ScanStep {
  progress: number
  message: string
}

interface ScanStepItem {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ size?: string | number }>
  color: string
  bgColor: string
}

interface LoadingPageProps {
  storeUrl: string
  setStoreUrl: (url: string) => void
  scanProgress: number
  currentStep: number
  scanningSteps: ScanStep[]
  handleStoreSubmit: () => void
  onStartScan?: (scanFn: () => void) => void
}

export default function LoadingPage({
  storeUrl,
  setStoreUrl,
  scanProgress,
  currentStep,
  scanningSteps,
  handleStoreSubmit,
  onStartScan
}: LoadingPageProps) {
  const isScanning = scanProgress > 0
  const [currentScanStep, setCurrentScanStep] = React.useState(0)
  const [scanResults, setScanResults] = React.useState<string[]>([])
  const [aiThoughts, setAiThoughts] = React.useState<string[]>([])

  const scanSteps = [
    {
      id: 'page-analysis',
      title: 'Page Analysis',
      description: 'Scanning store pages and content structure',
      icon: RiSearchLine,
      color: '#3B82F6',
      bgColor: '#EBF4FF'
    },
    {
      id: 'performance-check',
      title: 'Performance Check',
      description: 'Analyzing load times and speed optimization',
      icon: RiFlashlightLine,
      color: '#10B981',
      bgColor: '#ECFDF5'
    },
    {
      id: 'conversion-review',
      title: 'Conversion Review',
      description: 'Checking sales funnels and user experience',
      icon: RiBarChartLine,
      color: '#F59E0B',
      bgColor: '#FFFBEB'
    },
    {
      id: 'security-seo',
      title: 'Security & SEO',
      description: 'Reviewing security and search optimization',
      icon: RiShieldCheckLine,
      color: '#EF4444',
      bgColor: '#FEF2F2'
    }
  ]

  const handleStartScan = React.useCallback(() => {
    setCurrentScanStep(0)
    setScanResults([])
    setAiThoughts([])

    // Start the scanning process
    handleStoreSubmit()

    // Simulate AI thinking and results
    const thoughts = [
      "🤔 Analyzing store structure and navigation...",
      "📊 Calculating performance metrics...",
      "🎯 Identifying conversion opportunities...",
      "🔒 Checking security vulnerabilities...",
      "✨ Optimizing recommendations..."
    ]

    const results = [
      "Found 12 page load optimizations",
      "Discovered 3 conversion bottlenecks",
      "Identified 8 security improvements",
      "Generated 15 SEO recommendations"
    ]

    thoughts.forEach((thought, index) => {
      setTimeout(() => {
        setAiThoughts(prev => [...prev, thought])
        setCurrentScanStep(index % 4)
      }, index * 3000)
    })

    results.forEach((result, index) => {
      setTimeout(() => {
        setScanResults(prev => [...prev, result])
      }, 8000 + index * 2000)
    })
  }, [handleStoreSubmit])

  // Register the handleStartScan function with parent component
  React.useEffect(() => {
    if (onStartScan) {
      onStartScan(handleStartScan)
    }
  }, [onStartScan, handleStartScan])

  if (isScanning) {
    return (
      <ScanningAnimation
        storeUrl={storeUrl}
        scanSteps={scanSteps}
        currentScanStep={currentScanStep}
        aiThoughts={aiThoughts}
        scanResults={scanResults}
        scanProgress={scanProgress}
        currentStep={currentStep}
        scanningSteps={scanningSteps}
      />
    )
  }
  return (
    <div 
      className="w-full p-8 rounded-3xl backdrop-blur-lg"
      style={{
        background: 'rgba(255, 255, 255, 01)',
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

      {scanProgress > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium" style={{ color: '#A5D6A7' }}>Progress</span>
            <span className="text-sm text-gray-600">{scanProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="h-full rounded-full transition-all duration-500"
              style={{ 
                width: `${scanProgress}%`,
                background: `linear-gradient(90deg, #A5D6A7 0%, #C8E6C9 100%)`
              }}
            />
          </div>
          <p className="text-center font-medium text-gray-700">
            {scanningSteps[currentStep]?.message || "Initializing scan..."}
          </p>

          {/* Scanning Steps Checklist */}
          <div className="grid grid-cols-1 gap-3 text-sm mt-6">
            {scanningSteps.map((step, index) => (
              <div 
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                  index <= currentStep 
                    ? 'bg-green-50 text-green-700' 
                    : 'bg-gray-50 text-gray-400'
                }`}
              >
                {index <= currentStep ? (
                  <RiCheckboxCircleLine size={18} className="text-green-600" />
                ) : (
                  <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                )}
                <span className="flex-1">{step.message.replace('...', '')}</span>
                {index <= currentStep && (
                  <span className="text-xs font-medium text-green-600">Complete</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Scanning Animation Component
interface ScanningAnimationProps {
  storeUrl: string
  scanSteps: ScanStepItem[]
  currentScanStep: number
  aiThoughts: string[]
  scanResults: string[]
  scanProgress: number
  currentStep: number
  scanningSteps: ScanStep[]
}

function ScanningAnimation({
  storeUrl,
  scanSteps,
  currentScanStep,
  aiThoughts,
  scanResults,
  scanProgress,
  currentStep,
  scanningSteps
}: ScanningAnimationProps) {
  return (
    <div
      className="w-full p-8 rounded-3xl backdrop-blur-lg"
      style={{
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.9)
        `
      }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <RiPulseLine size={32} className="text-blue-500 animate-pulse" />
          <h1 className="text-3xl font-bold text-gray-900">Scanning Your Store</h1>
        </div>
        <p className="text-lg text-gray-600">
          Analyzing <span className="font-mono bg-gray-100 px-2 py-1 rounded">{storeUrl}</span>
        </p>
        <p className="text-sm text-gray-500 mt-2">
          This usually takes 20-30 seconds. We're analyzing 4 different aspects of your store.
        </p>
      </div>

      {/* Main Scanning Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {scanSteps.map((step, index) => {
          const IconComponent = step.icon
          const isActive = index === currentScanStep
          const isCompleted = index < currentScanStep

          return (
            <div
              key={step.id}
              className={`p-6 rounded-2xl border-2 transition-all duration-500 ${
                isActive
                  ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                  : isCompleted
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-4 mb-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isActive ? 'animate-pulse scale-110' : ''
                  }`}
                  style={{
                    backgroundColor: isActive ? step.color : isCompleted ? '#10B981' : '#F3F4F6',
                    color: isActive || isCompleted ? 'white' : step.color,
                    boxShadow: isActive ? `0 0 20px ${step.color}40` : 'none'
                  }}
                >
                  {isCompleted ? (
                    <RiCheckLine size={24} />
                  ) : (
                    <IconComponent size={24} />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold text-lg ${
                    isActive ? 'text-blue-700' : isCompleted ? 'text-green-700' : 'text-gray-700'
                  }`}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                </div>
                {isActive && (
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                )}
              </div>

              {isActive && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{Math.round((aiThoughts.length / 5) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                      style={{ width: `${(aiThoughts.length / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* AI Thoughts Feed */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <RiPulseLine size={20} className="text-blue-500" />
          AI Agent Activity
        </h3>
        <div className="bg-gray-50 rounded-xl p-4 max-h-32 overflow-y-auto">
          {aiThoughts.length === 0 ? (
            <div className="text-gray-500 text-center py-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <RiLoader4Line size={24} className="animate-spin text-blue-500" />
                <RiPulseLine size={20} className="animate-pulse text-blue-400" />
              </div>
              <p className="text-sm">AI is initializing analysis...</p>
              <div className="flex justify-center gap-1 mt-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {aiThoughts.map((thought, index) => (
                <div key={index} className="flex items-start gap-3 text-sm animate-fadeIn">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                  <span className="text-gray-700 leading-relaxed">{thought}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results Feed */}
      {scanResults.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <RiBarChartLine size={20} className="text-green-500" />
            Analysis Results
          </h3>
          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-sm font-medium text-green-700">Analysis Complete! 🎉</span>
            </div>
            <div className="space-y-2">
              {scanResults.map((result, index) => (
                <div key={index} className="flex items-start gap-3 text-sm animate-fadeIn">
                  <RiCheckLine size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-green-700">{result}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>Overall Progress</span>
          <span>{scanProgress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${scanProgress}%`,
              backgroundSize: '200% 100%',
              animation: scanProgress > 0 ? 'shimmer 2s ease-in-out infinite' : 'none'
            }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          {scanningSteps[currentStep]?.message || "Preparing analysis..."}
        </p>
      </div>
    </div>
  )
}
