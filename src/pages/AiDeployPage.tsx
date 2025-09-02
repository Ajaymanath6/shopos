import { useState, useEffect } from 'react'

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

  return (
    <div className="w-full flex justify-center rounded-lg" style={{ background: '#F7FFF7' }}>
      <div className="p-6" style={{ width: '1440px', maxWidth: '1440px', minWidth: '1440px' }}>
        {!isDeploymentComplete ? (
          /* Real-time Deployment Logs Card */
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
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
          /* Success Message Card */
          <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-sm">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Deployment Successful!</h2>
              <p className="text-lg text-gray-600 mb-6">Your store improvements have been applied successfully</p>
              
              <div className="bg-green-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center gap-2 text-green-700">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">All changes deployed to your live store</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Next Steps Card */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm mt-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Next Steps</h3>
            <p className="text-sm text-gray-600 mb-6">Quick actions</p>
            
            <div className="space-y-3">
              <button
                className="w-full py-3 px-4 bg-white border border-gray-200 hover:bg-gray-50 active:bg-gray-100 text-gray-700 font-medium rounded-lg transition-colors duration-200 text-left"
                onClick={() => {
                  // Handle download report
                  console.log('Download Report clicked')
                }}
              >
                Download Report
              </button>

              <button
                className="w-full py-3 px-4 bg-white border border-gray-200 hover:bg-gray-50 active:bg-gray-100 text-gray-700 font-medium rounded-lg transition-colors duration-200 text-left"
                onClick={() => {
                  if (onFixAnother) {
                    onFixAnother()
                  }
                }}
              >
                Scan Another Store
              </button>

              <button
                className="w-full py-3 px-4 bg-white border border-gray-200 hover:bg-gray-50 active:bg-gray-100 text-gray-700 font-medium rounded-lg transition-colors duration-200 text-left"
                onClick={() => {
                  // Handle schedule follow-up call
                  console.log('Schedule Call clicked')
                }}
              >
                Schedule Call
              </button>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <button
                className="py-2 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors duration-200"
                onClick={() => {
                  if (onFixAnother) {
                    onFixAnother()
                  }
                }}
              >
                Back to Report
              </button>
              
              <p className="text-sm text-gray-700 font-medium">
                {isDeploymentComplete ? 'Deployment complete • Ready for next steps' : 'Choose your next action'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
