import { useState, useEffect, useCallback } from 'react'
import {
  RiCheckLine,
  RiLoader4Fill,
  RiRocketLine,
  RiEyeLine,
  RiArrowLeftLine,
  RiPulseLine,
  RiStarFill
} from '@remixicon/react'
import { ShiningText } from '../components/ui/shining-text'

// Dark Gray Monochromatic Palette
const DARK_PALETTE = {
  primary: '#1F2937',    // Dark gray
  secondary: '#374151',  // Medium gray  
  tertiary: '#4B5563',   // Light gray
  accent: '#6B7280',     // Lighter gray
  light: '#9CA3AF'       // Very light gray
}

interface LogEntry {
  id: string
  timestamp: string
  message: string
  status: 'in-progress' | 'completed' | 'error'
  isImportant?: boolean
}

interface AgentLiveViewProps {
  onComplete?: () => void
  onViewStore?: () => void
}

export default function AgentLiveView({ onComplete, onViewStore }: AgentLiveViewProps) {
  const [logEntries, setLogEntries] = useState<LogEntry[]>([])
  const [overallProgress, setOverallProgress] = useState(0)
  const [currentStatus, setCurrentStatus] = useState<'initializing' | 'deploying' | 'complete'>('initializing')
  const [showCompletion, setShowCompletion] = useState(false)
  const [heartbeatData, setHeartbeatData] = useState<number[]>([])

  // Simulate heartbeat data
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartbeatData(prev => {
        const newData = [...prev, Math.random() * 40 + 30]
        return newData.slice(-20) // Keep last 20 points
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  const addLogEntry = useCallback((message: string, isImportant = false) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
    
    const newEntry: LogEntry = {
      id: Date.now().toString(),
      timestamp,
      message,
      status: 'in-progress',
      isImportant
    }

    setLogEntries(prev => [...prev, newEntry])

    // Complete the entry after a delay
    setTimeout(() => {
      setLogEntries(prev => prev.map(entry => 
        entry.id === newEntry.id 
          ? { ...entry, status: 'completed' }
          : entry
      ))
    }, Math.random() * 2000 + 1000) // 1-3 seconds
  }, [])

  // Start the deployment sequence
  useEffect(() => {
    const sequence = [
      { delay: 500, message: "Initializing Aggo Image Agent...", progress: 5 },
      { delay: 1500, message: "Secure connection to yourstore.shopify.com established.", progress: 10 },
      { delay: 2500, message: "Creating a secure backup of your current theme...", progress: 20, important: true },
      { delay: 4000, message: "Theme backup 'shopos-backup-2025-01-20.zip' created successfully.", progress: 25 },
      { delay: 5000, message: "Scanning theme files to locate relevant image assets...", progress: 35 },
      { delay: 6500, message: "Located 23 images to optimize in 'product-gallery.liquid'.", progress: 45 },
      { delay: 7500, message: "Applying AI super-resolution and compression models... (This may take a moment)", progress: 55 },
      { delay: 10000, message: "Image processing complete. Average file size reduced by 72%.", progress: 70 },
      { delay: 11000, message: "Running automated quality assurance checks on new assets...", progress: 80, important: true },
      { delay: 12500, message: "QA checks passed. No visual degradation detected.", progress: 85 },
      { delay: 13500, message: "Preparing to deploy changes to the live theme...", progress: 90 },
      { delay: 15000, message: "SUCCESS! Fix deployed. Your store has been updated.", progress: 100, important: true }
    ]

    setCurrentStatus('deploying')

    sequence.forEach(({ delay, message, progress, important }) => {
      setTimeout(() => {
        addLogEntry(message, important)
        setOverallProgress(progress)
        
        if (progress === 100) {
          setTimeout(() => {
            setCurrentStatus('complete')
            setShowCompletion(true)
          }, 2000)
        }
      }, delay)
    })
  }, [addLogEntry])

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl"
              style={{
                backgroundColor: DARK_PALETTE.primary,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)'
              }}
            >
              <RiRocketLine size={32} className="text-white" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Agent Live View
          </h1>

          <div className="mb-6">
            <ShiningText 
              text="Aggo is optimizing your store in real-time. Watch the magic happen."
              className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed"
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-8">
          {/* Left Panel - Live Log Stream (70%) */}
          <div className="col-span-8">
            <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm h-[600px] flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center">
                  <RiPulseLine size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Live Mission Control</h2>
                  <p className="text-gray-600">Real-time deployment log</p>
                </div>
              </div>

              {/* Log Container */}
              <div className="flex-1 bg-gray-900 rounded-lg p-4 overflow-y-auto font-mono text-sm">
                <div className="space-y-2">
                  {logEntries.map((entry) => (
                    <div key={entry.id} className="flex items-start gap-3">
                      <span className="text-green-400 text-xs mt-1">
                        [{entry.timestamp}]
                      </span>
                      <div className="flex items-start gap-2 flex-1">
                        {entry.status === 'in-progress' ? (
                          <RiLoader4Fill size={14} className="text-yellow-400 animate-spin mt-0.5" />
                        ) : (
                          <RiCheckLine size={14} className="text-green-400 mt-0.5" />
                        )}
                        <span 
                          className={`${
                            entry.isImportant 
                              ? 'text-white font-semibold' 
                              : 'text-gray-300'
                          } leading-relaxed`}
                        >
                          {entry.message}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  {/* Cursor */}
                  <div className="flex items-center gap-3">
                    <span className="text-green-400 text-xs">
                      [{new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]
                    </span>
                    <span className="text-white animate-pulse">█</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Status & Visualization (30%) */}
          <div className="col-span-4 space-y-6">
            {/* Agent Profile */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                  <RiStarFill size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">AI Agent: Aggo</h3>
                  <p className="text-sm text-gray-600">Image Optimization Specialist</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    currentStatus === 'complete' ? 'bg-green-500' : 'bg-blue-500 animate-pulse'
                  }`}
                ></div>
                <span className="text-sm font-medium text-gray-700">
                  STATUS: {currentStatus === 'complete' ? 'COMPLETE' : 'DEPLOYING'}
                </span>
              </div>
            </div>

            {/* Progress */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Overall Progress</h3>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Deployment Progress</span>
                  <span className="text-sm text-gray-600">{overallProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-1000"
                    style={{
                      width: `${overallProgress}%`,
                      background: `linear-gradient(90deg, ${DARK_PALETTE.primary} 0%, ${DARK_PALETTE.secondary} 100%)`
                    }}
                  />
                </div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {Math.round((logEntries.filter(e => e.status === 'completed').length / Math.max(logEntries.length, 1)) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Steps Completed</div>
              </div>
            </div>

            {/* Live Heartbeat Visualization */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">System Vitals</h3>
              
              <div className="h-24 bg-gray-50 rounded-lg p-4 relative overflow-hidden">
                <svg className="w-full h-full">
                  <polyline
                    fill="none"
                    stroke={DARK_PALETTE.primary}
                    strokeWidth="2"
                    points={heartbeatData.map((value, index) => 
                      `${(index / (heartbeatData.length - 1)) * 100},${100 - (value / 70) * 100}`
                    ).join(' ')}
                  />
                </svg>
                
                {currentStatus === 'complete' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-green-50">
                    <RiCheckLine size={32} className="text-green-600" />
                  </div>
                )}
              </div>
              
              <div className="mt-3 text-center">
                <div className="text-sm text-gray-600">
                  {currentStatus === 'complete' ? 'System Stable' : 'Processing Active'}
                </div>
              </div>
            </div>

            {/* Completion Actions */}
            {showCompletion && (
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Deployment Complete!</h3>
                
                <div className="space-y-3">
                  <button
                    onClick={onViewStore}
                    className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <RiEyeLine size={18} />
                    View Live Store
                  </button>
                  
                  <button
                    onClick={onComplete}
                    className="w-full py-3 px-4 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <RiArrowLeftLine size={18} />
                    Back to Health Report
                  </button>
                </div>

                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-800 font-medium text-center">
                    ✅ 23 images optimized • Store performance improved
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
