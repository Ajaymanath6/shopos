import { useState, useEffect } from 'react'
import {
  RiRocketLine,
  RiLoader4Line,
  RiTerminalLine,
  RiImageLine
} from '@remixicon/react'

// Dark Gray Monochromatic Palette
const DARK_PALETTE = {
  primary: '#1F2937',    // Dark gray
  secondary: '#374151',  // Medium gray
  tertiary: '#4B5563',   // Light gray
  accent: '#6B7280',     // Lighter gray
  light: '#9CA3AF'       // Very light gray
}

interface AiDeployPageProps {
  onComplete?: () => void
  onViewStore?: () => void
}

interface LogEntry {
  timestamp: string
  message: string
  id: number
}

export default function AiDeployPage({ onComplete, onViewStore }: AiDeployPageProps) {
  const [deploymentProgress, setDeploymentProgress] = useState(20)
  const [overallProgress, setOverallProgress] = useState(33)
  const [stepsCompleted, setStepsCompleted] = useState(3)
  const [logEntries, setLogEntries] = useState<LogEntry[]>([
    { id: 1, timestamp: '12:10:37', message: 'Initializing Aggo Image Agent...' },
    { id: 2, timestamp: '12:10:37', message: 'Initializing Aggo Image Agent...' },
    { id: 3, timestamp: '12:10:38', message: 'Secure connection to yourstore.shopify.com established.' },
    { id: 4, timestamp: '12:10:38', message: 'Secure connection to yourstore.shopify.com established.' },
    { id: 5, timestamp: '12:10:39', message: 'Creating a secure backup of your current theme...' },
    { id: 6, timestamp: '12:10:39', message: 'Creating a secure backup of your current theme...' },
  ])

  // Simulate real-time log updates
  useEffect(() => {
    const additionalLogs = [
      'Theme backup 1.2.7_backup_20231215.zip created successfully.',
      'Scanning theme files to locate relevant image assets...',
      'Scanning theme files to locate relevant image assets...',
      'Located 23 images to optimize in /product-gallery/ layout.',
      'Located 23 images to optimize in /product-gallery/ layout.',
      'Applying AI super-resolution and compression models...',
      'Applying AI super-resolution and compression models... (This may take a moment)',
    ]

    const interval = setInterval(() => {
      if (logEntries.length < 13) {
        const currentTime = new Date()
        const timeString = `${currentTime.getHours()}:${currentTime.getMinutes().toString().padStart(2, '0')}:${currentTime.getSeconds().toString().padStart(2, '0')}`
        
        const nextLogIndex = logEntries.length - 6
        if (nextLogIndex >= 0 && nextLogIndex < additionalLogs.length) {
          setLogEntries(prev => [
            ...prev,
            {
              id: prev.length + 1,
              timestamp: timeString,
              message: additionalLogs[nextLogIndex]
            }
          ])
        }

        // Update progress
        if (logEntries.length >= 8) {
          setDeploymentProgress(45)
          setOverallProgress(50)
          setStepsCompleted(4)
        }
        if (logEntries.length >= 11) {
          setDeploymentProgress(75)
          setOverallProgress(80)
          setStepsCompleted(6)
        }
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [logEntries.length])

  return (
    <div className="w-full bg-white">
      <div className="w-full p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-6 mb-8">
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-xl"
              style={{
                backgroundColor: DARK_PALETTE.primary,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)'
              }}
            >
              <RiRocketLine size={40} className="text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
            Agent Live View
          </h1>

          <p className="text-lg text-gray-700 leading-relaxed">
            Shopos AI is deploying optimizations to your store. Real-time progress and insights below.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Side - Live Mission Control */}
          <div className="lg:col-span-8 space-y-6">
            {/* Live Mission Control */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gray-800 flex items-center justify-center">
                  <RiTerminalLine size={28} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Live Mission Control</h2>
                  <p className="text-gray-600">Real-time deployment log</p>
                </div>
              </div>

              {/* Terminal/Log Display */}
              <div 
                className="bg-gray-900 rounded-xl p-6 font-mono text-sm overflow-y-auto"
                style={{ height: '400px', maxHeight: '400px' }}
              >
                <div className="space-y-2">
                  {logEntries.map((entry) => (
                    <div key={entry.id} className="flex items-start gap-3">
                      <span className="text-green-400 flex-shrink-0">[{entry.timestamp}]</span>
                      <span className="text-gray-300">{entry.message}</span>
                    </div>
                  ))}
                  {/* Cursor blink */}
                  <div className="flex items-start gap-3 animate-pulse">
                    <span className="text-green-400 flex-shrink-0">
                      [{new Date().toLocaleTimeString('en-US', { hour12: false })}]
                    </span>
                    <span className="text-gray-300">
                      <span className="bg-green-400 text-gray-900 px-1">█</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Agent Status & Progress */}
          <div className="lg:col-span-4 space-y-6">
            {/* AI Agent Status */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
                  <RiImageLine size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">AI Agent: Shopos AI</h3>
                <p className="text-sm text-gray-600 mb-4">Image Optimization Specialist</p>
                
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  <RiLoader4Line size={16} className="animate-spin" />
                  STATUS: DEPLOYING
                </div>
              </div>
            </div>

            {/* Overall Progress */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Overall Progress</h3>

              {/* Deployment Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Deployment Progress</span>
                  <span className="text-sm font-bold text-gray-900">{deploymentProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${deploymentProgress}%`,
                      backgroundColor: DARK_PALETTE.primary
                    }}
                  />
                </div>
              </div>

              {/* Overall Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                  <span className="text-sm font-bold text-gray-900">{overallProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${overallProgress}%`,
                      backgroundColor: DARK_PALETTE.secondary
                    }}
                  />
                </div>
              </div>

              {/* Steps Completed */}
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">{stepsCompleted}</div>
                <div className="text-sm font-medium text-gray-600">Steps Completed</div>
              </div>
            </div>

            {/* What's Next */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">What's Next?</h3>

              <div className="space-y-4">
                <button
                  className="w-full py-3 px-6 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-md"
                  onClick={() => {
                    // Handle fix another issue
                    console.log('Fix Another Issue clicked')
                  }}
                >
                  Fix Another Issue
                </button>

                <button
                  className="w-full py-3 px-6 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold rounded-xl transition-all duration-200 hover:shadow-md"
                  onClick={onViewStore}
                >
                  View Live Store
                </button>

                <button
                  className="w-full py-3 px-6 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold rounded-xl transition-all duration-200 hover:shadow-md"
                  onClick={() => {
                    // Handle schedule follow-up call
                    console.log('Schedule Follow-up Call clicked')
                  }}
                >
                  Schedule Follow-up Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
