import { useState, useRef, useEffect } from 'react'
import { 
  RiHealthBookLine,
  RiSearchEyeLine,
  RiAddLine,
  RiNotification3Line,
  RiSettings3Line,
  RiUser3Line,
  RiSearchLine,
  RiMicLine,
  RiAttachmentLine,
  RiSendPlaneLine,
  RiCheckboxCircleLine
} from '@remixicon/react'
import shopOSLogo from '../assets/Shop OS logo.svg'

interface TaskCard {
  id: string
  title: string
  subtitle: string
  icon: React.ComponentType<any>
  iconBg: string
}

const taskCards: TaskCard[] = [
  {
    id: 'store-health',
    title: 'Store Health Check',
    subtitle: 'Connect your Shopify store for an instant AI diagnostic',
    icon: RiHealthBookLine,
    iconBg: '#9F7E4C'
  },
  {
    id: 'seo-optimizer', 
    title: 'SEO Optimizer',
    subtitle: 'AI-powered SEO analysis and optimization',
    icon: RiSearchEyeLine,
    iconBg: '#8B6F47'
  }
]

export default function CanvasLanding() {
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [scanProgress, setScanProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const canvasRef = useRef<HTMLDivElement>(null)

  const scanningSteps = [
    { progress: 15, message: "Connecting to your store..." },
    { progress: 30, message: "Analyzing page load speeds..." },
    { progress: 50, message: "Checking SEO optimization..." },
    { progress: 70, message: "Reviewing conversion funnels..." },
    { progress: 85, message: "Scanning for accessibility issues..." },
    { progress: 100, message: "Calculating revenue impact..." }
  ]

  // Handle mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY * -0.001
    const newZoom = Math.min(Math.max(0.3, zoom + delta), 3)
    setZoom(newZoom)
  }

  // Handle mouse drag for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Keyboard shortcuts for zoom
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '=' || e.key === '+') {
        e.preventDefault()
        setZoom(prev => Math.min(prev + 0.1, 3))
      } else if (e.key === '-') {
        e.preventDefault()
        setZoom(prev => Math.max(prev - 0.1, 0.3))
      } else if (e.key === 'Escape') {
        setExpandedCard(null)
        setScanProgress(0)
        setCurrentStep(0)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Handle task card click
  const handleTaskClick = (taskId: string) => {
    if (taskId === 'store-health') {
      setExpandedCard(taskId)
      // Start scanning simulation
      setScanProgress(0)
      setCurrentStep(0)
      
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          const nextStep = prev + 1
          if (nextStep >= scanningSteps.length) {
            clearInterval(interval)
            return prev
          }
          setScanProgress(scanningSteps[nextStep].progress)
          return nextStep
        })
      }, 2000)
    } else {
      alert(`${taskCards.find(t => t.id === taskId)?.title} - Coming Soon!`)
    }
  }

  // Reset view
  const resetView = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ backgroundColor: '#F5F1EB' }}>
      {/* Canvas Container */}
      <div
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Transformable Content */}
        <div
          className="w-full h-full flex flex-col items-center justify-center transition-transform duration-200 ease-out"
          style={{
            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
            transformOrigin: 'center center'
          }}
        >
          {/* Logo and Welcome */}
          <div className="text-center mb-16">
            <div className="mb-8">
              <img 
                src={shopOSLogo} 
                alt="Shop OS" 
                className="h-16 mx-auto"
                draggable={false}
              />
            </div>
            <h1 className="text-4xl font-light text-gray-800 font-sans">
              Welcome to Shop OS
            </h1>
          </div>

          {/* Task Cards Grid */}
          <div className="flex gap-8 max-w-6xl">
            {/* Task Cards */}
            {taskCards.map((task) => {
              const IconComponent = task.icon
              return (
                <div
                  key={task.id}
                  className="group rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border border-white/20 backdrop-blur-sm"
                  onClick={() => handleTaskClick(task.id)}
                  style={{ 
                    width: '380px', 
                    height: '220px',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)'
                  }}
                >
                  <div className="flex flex-col h-full">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-white mb-4 shadow-md"
                      style={{ 
                        background: `linear-gradient(135deg, ${task.iconBg} 0%, ${task.iconBg}dd 100%)` 
                      }}
                    >
                      <IconComponent size={24} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:opacity-80 transition-opacity" style={{ color: '#9F7E4C' }}>
                      {task.title}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed flex-1">
                      {task.subtitle}
                    </p>
                    <div className="mt-4 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#9F7E4C' }}>
                      Click to start →
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Add New Task Card */}
            <div
              className="group rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border-2 border-dashed backdrop-blur-sm"
              onClick={() => alert('Add new AI agent task - Coming Soon!')}
              style={{ 
                width: '380px', 
                height: '220px',
                borderColor: '#9F7E4C',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.4) 100%)'
              }}
            >
              <div className="flex flex-col items-center justify-center h-full transition-colors" style={{ color: '#9F7E4C' }}>
                <div className="w-14 h-14 border-2 border-current rounded-xl flex items-center justify-center mb-4 group-hover:bg-opacity-10 group-hover:bg-current transition-colors">
                  <RiAddLine size={24} />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  Add New Task
                </h3>
                <p className="text-sm text-center text-gray-600">
                  Create a new AI agent for your store
                </p>
              </div>
            </div>
          </div>

          {/* Expandable Interface */}
          {expandedCard === 'store-health' && (
            <div className="mt-16 max-w-4xl">
              <div 
                className="rounded-2xl p-8 shadow-xl border border-white/20 backdrop-blur-sm"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)'
                }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold mb-2" style={{ color: '#9F7E4C' }}>
                    Analyzing demo-store.myshopify.com
                  </h2>
                  <p className="text-gray-600">
                    Our AI is performing a comprehensive diagnostic scan of your store
                  </p>
                </div>

                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#9F7E4C' }}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <RiSearchLine size={24} style={{ color: '#9F7E4C' }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium" style={{ color: '#9F7E4C' }}>Scan Progress</span>
                    <span className="text-sm text-gray-600">{scanProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-full rounded-full transition-all duration-300"
                      style={{ 
                        width: `${scanProgress}%`,
                        backgroundColor: '#9F7E4C'
                      }}
                    />
                  </div>
                  <p className="text-center mt-4 font-medium text-gray-700">
                    {scanningSteps[currentStep]?.message || "Initializing scan..."}
                  </p>
                </div>

                <div className="text-center mb-6">
                  <p className="text-sm text-gray-500">This usually takes 30 seconds</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  {scanningSteps.map((step, index) => (
                    <div 
                      key={index}
                      className={`flex items-center gap-2 ${
                        index <= currentStep ? 'text-green-600' : 'text-gray-400'
                      }`}
                    >
                      {index <= currentStep ? (
                        <RiCheckboxCircleLine size={16} />
                      ) : (
                        <div className="w-4 h-4 border border-gray-300 rounded-full" />
                      )}
                      {step.message.replace('...', '')}
                    </div>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <p className="text-sm text-gray-500">
                    Please don't close this page. We're working hard to find opportunities to boost your revenue.
                  </p>
                </div>

                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setExpandedCard(null)}
                    className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Close (ESC)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Minimal User Profile & Controls */}
      <div className="fixed top-4 right-4 flex items-center gap-4">
        {/* User Profile Icons */}
        <div className="flex items-center gap-3">
          <button 
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors backdrop-blur-sm"
            onClick={() => alert('Notifications - Coming Soon!')}
            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          >
            <RiNotification3Line size={18} style={{ color: '#9F7E4C' }} />
          </button>
          <button 
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors backdrop-blur-sm"
            onClick={() => alert('Settings - Coming Soon!')}
            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          >
            <RiSettings3Line size={18} style={{ color: '#9F7E4C' }} />
          </button>
          <div className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm" style={{ backgroundColor: '#9F7E4C' }}>
            <RiUser3Line size={18} className="text-white" />
          </div>
        </div>

        {/* Canvas Controls */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl px-3 py-2">
          <button
            onClick={resetView}
            className="text-xs text-gray-700 hover:text-gray-900 transition-colors mr-2"
          >
            Reset
          </button>
          <span className="text-xs text-gray-600">
            {Math.round(zoom * 100)}%
          </span>
        </div>
      </div>

      {/* Universal Search */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="bg-white rounded-full shadow-xl border border-gray-200 px-6 py-3 flex items-center gap-4 min-w-96">
          <RiSearchLine size={20} style={{ color: '#9F7E4C' }} />
          <input
            type="text"
            placeholder="Ask anything..."
            className="flex-1 outline-none text-gray-700 placeholder-gray-400"
          />
          <div className="flex items-center gap-2">
            <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <RiAttachmentLine size={18} className="text-gray-400" />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <RiMicLine size={18} className="text-gray-400" />
            </button>
            <button 
              className="p-2 rounded-full text-white transition-colors hover:opacity-90"
              style={{ backgroundColor: '#9F7E4C' }}
            >
              <RiSendPlaneLine size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="fixed bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg text-sm text-gray-600 max-w-xs">
        <div className="font-medium mb-1">Canvas Controls:</div>
        <div>• Scroll or +/- keys to zoom</div>
        <div>• Drag to pan around</div>
        <div>• Click cards to start tasks</div>
        <div>• ESC to close expanded view</div>
      </div>
    </div>
  )
}
