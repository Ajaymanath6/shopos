import { useState, useEffect, useRef } from 'react'
import { RiDownloadLine, RiStoreLine, RiCalendarLine, RiArrowRightSLine } from '@remixicon/react'
import SmartSuggestOrb from '../components/SmartSuggestOrb'

interface LogEntry {
  timestamp: string
  message: string
  id: number
}

interface AiDeployPageProps {
  onFixAnother?: () => void
}

export default function AiDeployPage({ onFixAnother }: AiDeployPageProps) {
  const [logEntries, setLogEntries] = useState<LogEntry[]>([
    { id: 1, timestamp: '12:10:37', message: 'Initializing Aggo Image Agent...' },
    { id: 2, timestamp: '12:10:37', message: 'Initializing Aggo Image Agent...' },
    { id: 3, timestamp: '12:10:38', message: 'Secure connection to yourstore.shopify.com established.' },
    { id: 4, timestamp: '12:10:38', message: 'Secure connection to yourstore.shopify.com established.' },
    { id: 5, timestamp: '12:10:39', message: 'Creating a secure backup of your current theme...' },
    { id: 6, timestamp: '12:10:39', message: 'Creating a secure backup of your current theme...' },
  ])
  const [isDeploymentComplete, setIsDeploymentComplete] = useState(false)
  const [showOrb, setShowOrb] = useState(false)
  const [scrollTimeout, setScrollTimeout] = useState<number | null>(null)
  const scrollPositionRef = useRef(0)
  const lastScrollTimeRef = useRef(Date.now())

  // Simulate real-time log updates
  useEffect(() => {
    const additionalLogs = [
      'Theme backup 1.2.7_backup_20231215.zip created successfully.',
      'Scanning theme files to locate relevant image assets...',
      'Located 23 images to optimize in /product-gallery/ layout.',
      'Applying AI super-resolution and compression models...',
      'Processing images with advanced AI algorithms...',
      'Optimizing image quality and file sizes...',
      'Deployment completed successfully! ✓'
    ]

    const interval = setInterval(() => {
      if (logEntries.length < 13 && !isDeploymentComplete) {
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
          
          // Check if this is the last log entry (deployment complete)
          if (nextLogIndex === additionalLogs.length - 1) {
            setTimeout(() => setIsDeploymentComplete(true), 2000)
          }
        }
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [logEntries.length, isDeploymentComplete])

  // AI Orb scroll handlers - appears during idle scrolling
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const currentTime = Date.now()
      
      // Update refs
      scrollPositionRef.current = currentScrollY
      lastScrollTimeRef.current = currentTime
      
      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
      
      // Hide orb while actively scrolling
      setShowOrb(false)
      
      // Only show orb if user has scrolled and then stopped scrolling for a bit
      // and if they've scrolled past the initial view (more than 200px)
      if (currentScrollY > 200) {
        const timeout = setTimeout(() => {
          // Double check user is still in scrolled state and not actively scrolling
          if (window.scrollY > 200 && Date.now() - lastScrollTimeRef.current > 2000) {
            setShowOrb(true)
          }
        }, 2000) // Show orb 2s after user stops scrolling
        
        setScrollTimeout(timeout)
      }
    }

    // Add scroll listener
    window.addEventListener('scroll', handleScroll)
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
    }
  }, [scrollTimeout])

  const handleCloseOrb = () => {
    setShowOrb(false)
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
      setScrollTimeout(null)
    }
  }

  return (
    <div className="w-full flex justify-center rounded-lg" style={{ background: '#f8f9fb' }}>
      <div className="p-6" style={{ width: '1440px', maxWidth: '1440px', minWidth: '1440px' }}>
        {!isDeploymentComplete ? (
          /* Real-time Deployment Logs Card */
          <div 
            className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm relative"
          >
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Real-time Deployment Logs</h3>
              <p className="text-sm text-gray-600 mb-4">Live deployment progress and system messages</p>
              
              <hr className="border-gray-200 mb-4" />
              
              {/* Terminal/Log Display */}
              <div 
                className="bg-gray-900 rounded-lg p-6 font-mono text-sm overflow-y-auto"
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
                  {!isDeploymentComplete && (
                    <div className="flex items-start gap-3 animate-pulse">
                      <span className="text-green-400 flex-shrink-0">
                        [{new Date().toLocaleTimeString('en-US', { hour12: false })}]
                      </span>
                      <span className="text-gray-300">
                        <span className="bg-green-400 text-gray-900 px-1">█</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700 font-medium">
                  Deployment in progress • Live system monitoring active
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Success Message with Next Steps Card */
          <div 
            className="bg-white rounded-lg p-8 border border-gray-200 shadow-sm relative"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Congratulations</h2>
              <p className="text-lg text-gray-600 mb-6">You just deployed all your changes to <span className="text-green-700 font-medium">https://yourstore.myshopify.com</span></p>
            </div>

            {/* Actions Section */}
            <div className="pt-6">
              <div className="space-y-3">
                <button
                  className="w-full flex items-center justify-between py-4 px-4 hover:bg-gray-50 active:bg-gray-100 text-gray-700 font-medium rounded-lg transition-colors duration-200"
                  onClick={() => {
                    // Handle download report
                    console.log('Download Report clicked')
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center">
                      <RiDownloadLine size={20} className="text-gray-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Download Report</div>
                      <div className="text-sm text-gray-500">Get a detailed PDF summary of all optimizations</div>
                      <div className="text-sm text-gray-500">and performance improvements made to your store</div>
                    </div>
                  </div>
                  <RiArrowRightSLine size={20} className="text-gray-400" />
                </button>

                <button
                  className="w-full flex items-center justify-between py-4 px-4 hover:bg-gray-50 active:bg-gray-100 text-gray-700 font-medium rounded-lg transition-colors duration-200"
                  onClick={() => {
                    if (onFixAnother) {
                      onFixAnother()
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center">
                      <RiStoreLine size={20} className="text-gray-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Scan Another Store</div>
                      <div className="text-sm text-gray-500">Run a health check on a different Shopify store</div>
                      <div className="text-sm text-gray-500">and identify new optimization opportunities</div>
                    </div>
                  </div>
                  <RiArrowRightSLine size={20} className="text-gray-400" />
                </button>

                <button
                  className="w-full flex items-center justify-between py-4 px-4 hover:bg-gray-50 active:bg-gray-100 text-gray-700 font-medium rounded-lg transition-colors duration-200"
                  onClick={() => {
                    // Handle schedule follow-up call
                    console.log('Schedule Call clicked')
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center">
                      <RiCalendarLine size={20} className="text-gray-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Schedule Call</div>
                      <div className="text-sm text-gray-500">Book a 15-minute call with our optimization experts</div>
                      <div className="text-sm text-gray-500">to discuss advanced growth strategies for your store</div>
                    </div>
                  </div>
                  <RiArrowRightSLine size={20} className="text-gray-400" />
                </button>
              </div>

              {/* Continue to Store Health CTA */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <button
                  className="w-full px-8 py-3 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-lg transition-colors duration-200"
                  onClick={() => {
                    if (onFixAnother) {
                      onFixAnother()
                    }
                  }}
                >
                  Continue to Store Health
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* AI Orb - shows during scroll behavior */}
        <SmartSuggestOrb
          isVisible={showOrb}
          onClose={handleCloseOrb}
          userLocation="Kerala"
          productCategory="deployment"
          isOnProduct={true}
          mode="help"
          showTooltipImmediately={true}
        />
      </div>
    </div>
  )
}
