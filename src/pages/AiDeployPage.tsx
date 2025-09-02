import { useState, useEffect } from 'react'

interface LogEntry {
  timestamp: string
  message: string
  id: number
}

export default function AiDeployPage() {
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
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [logEntries.length])

  return (
    <div className="w-full flex justify-center" style={{ background: '#F7FFF7' }}>
      <div className="p-6" style={{ width: '1440px', maxWidth: '1440px', minWidth: '1440px' }}>
        {/* Real-time Deployment Logs Card */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Real-time Deployment Logs</h3>
            <p className="text-sm text-gray-600 mb-4">Live deployment progress and system messages</p>
            
            <hr className="border-gray-200 mb-4" />
            
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

            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-700 font-medium">
                Deployment in progress • Live system monitoring active
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
