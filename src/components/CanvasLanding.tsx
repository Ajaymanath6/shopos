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
  RiCheckboxCircleLine,
  RiRobotLine,
  RiStore2Line,
  RiArrowRightSLine
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
  const [storeUrl, setStoreUrl] = useState('')
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m your AI assistant. I can help you analyze your store, suggest improvements, and answer any questions about the diagnostic process.' }
  ])
  const [chatInput, setChatInput] = useState('')
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

  // Handle chat send
  const handleChatSend = () => {
    if (!chatInput.trim()) return
    
    const newMessage = { role: 'user', content: chatInput }
    setChatMessages(prev => [...prev, newMessage])
    setChatInput('')
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I can see you're working on store health diagnostics. Would you like me to explain any of the scanning steps?",
        "Great question! I can help you understand what each diagnostic metric means for your store's performance.",
        "I'm analyzing your store data. Feel free to ask me about any specific issues you'd like to focus on.",
        "Based on the scan progress, I can already suggest some quick wins for your store optimization."
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setChatMessages(prev => [...prev, { role: 'assistant', content: randomResponse }])
    }, 1000)
  }

  // Handle store URL submission
  const handleStoreSubmit = () => {
    if (!storeUrl.trim()) return
    
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
  }

  // Handle task card click
  const handleTaskClick = (taskId: string) => {
    if (taskId === 'store-health') {
      setExpandedCard(taskId)
      setScanProgress(0)
      setCurrentStep(0)
      setStoreUrl('')
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
                  className="group rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 border border-white/30 backdrop-blur-md overflow-hidden relative"
                  onClick={() => handleTaskClick(task.id)}
                  style={{ 
                    width: '400px', 
                    height: '240px',
                    background: `linear-gradient(135deg, 
                      rgba(255,255,255,0.95) 0%, 
                      rgba(255,255,255,0.85) 50%,
                      rgba(159,126,76,0.1) 100%)`
                  }}
                >
                  {/* Gradient overlay */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, 
                        rgba(159,126,76,0.05) 0%, 
                        rgba(159,126,76,0.15) 100%)`
                    }}
                  />
                  
                  <div className="flex flex-col h-full relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                        style={{ 
                          background: `linear-gradient(135deg, ${task.iconBg} 0%, ${task.iconBg}cc 50%, ${task.iconBg}aa 100%)`,
                          boxShadow: `0 8px 32px ${task.iconBg}40`
                        }}
                      >
                        <IconComponent size={28} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1 group-hover:opacity-90 transition-opacity" style={{ color: '#9F7E4C' }}>
                          {task.title}
                        </h3>
                        <div className="w-12 h-1 rounded-full" style={{ backgroundColor: task.iconBg }} />
                      </div>
                    </div>
                    
                    <p className="text-gray-700 text-sm leading-relaxed flex-1 mb-4">
                      {task.subtitle}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2" style={{ color: '#9F7E4C' }}>
                        <span>Launch workspace</span>
                        <RiArrowRightSLine size={16} />
                      </div>
                      <div className="w-8 h-8 rounded-full border-2 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center" style={{ borderColor: task.iconBg }}>
                        <RiArrowRightSLine size={16} style={{ color: task.iconBg }} />
                      </div>
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
            <div className="mt-20 w-full max-w-7xl">
              {/* Main Heading */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2" style={{ color: '#9F7E4C' }}>
                  Store Health Check
                </h1>
                <p className="text-lg text-gray-600">
                  AI-powered diagnostic and optimization workspace
                </p>
              </div>

              {/* Two Section Layout */}
              <div 
                className="rounded-3xl shadow-2xl border border-white/30 backdrop-blur-md overflow-hidden"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.92) 100%)',
                  minHeight: '600px'
                }}
              >
                <div className="flex h-full">
                  {/* Left Section - Workflow */}
                  <div className="flex-1 p-8 border-r border-gray-200/50">
                    <div className="flex items-center gap-3 mb-6">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                        style={{ backgroundColor: '#9F7E4C' }}
                      >
                        <RiStore2Line size={20} />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold" style={{ color: '#9F7E4C' }}>
                          Store Analysis
                        </h2>
                        <p className="text-sm text-gray-600">Complete diagnostic workflow</p>
                      </div>
                    </div>

                    {/* Store URL Input */}
                    {!scanProgress && (
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Shopify Store URL
                          </label>
                          <div className="flex gap-3">
                            <input
                              type="url"
                              value={storeUrl}
                              onChange={(e) => setStoreUrl(e.target.value)}
                              placeholder="yourstore.myshopify.com"
                              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-50"
                              style={{ '--tw-ring-color': '#9F7E4C' } as any}
                            />
                            <button
                              onClick={handleStoreSubmit}
                              disabled={!storeUrl.trim()}
                              className="px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
                              style={{ backgroundColor: '#9F7E4C' }}
                            >
                              Start Scan
                            </button>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-xl p-4">
                          <h3 className="font-medium text-gray-800 mb-2">What we'll analyze:</h3>
                          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                            <div>• Page load speeds</div>
                            <div>• SEO optimization</div>
                            <div>• Conversion funnels</div>
                            <div>• Accessibility issues</div>
                            <div>• Mobile responsiveness</div>
                            <div>• Revenue opportunities</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Scanning Progress */}
                    {scanProgress > 0 && (
                      <div className="space-y-6">
                        <div className="text-center">
                          <h3 className="text-lg font-semibold mb-2" style={{ color: '#9F7E4C' }}>
                            Analyzing {storeUrl || 'your store'}
                          </h3>
                          <p className="text-gray-600">AI diagnostic in progress...</p>
                        </div>

                        <div className="flex justify-center mb-6">
                          <div className="relative">
                            <div className="w-20 h-20 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#9F7E4C' }}>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <RiSearchLine size={28} style={{ color: '#9F7E4C' }} />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium" style={{ color: '#9F7E4C' }}>Progress</span>
                            <span className="text-sm text-gray-600">{scanProgress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="h-full rounded-full transition-all duration-500"
                              style={{ 
                                width: `${scanProgress}%`,
                                background: `linear-gradient(90deg, #9F7E4C 0%, #B8926B 100%)`
                              }}
                            />
                          </div>
                          <p className="text-center font-medium text-gray-700">
                            {scanningSteps[currentStep]?.message || "Initializing scan..."}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 gap-3 text-sm">
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

                  {/* Right Section - AI Chat */}
                  <div className="w-96 flex flex-col">
                    {/* Chat Header */}
                    <div className="p-6 border-b border-gray-200/50">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                          style={{ backgroundColor: '#9F7E4C' }}
                        >
                          <RiRobotLine size={20} />
                        </div>
                        <div>
                          <h3 className="font-semibold" style={{ color: '#9F7E4C' }}>
                            AI Assistant
                          </h3>
                          <p className="text-xs text-gray-500">Always here to help</p>
                        </div>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4" style={{ maxHeight: '400px' }}>
                      {chatMessages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                              message.role === 'user'
                                ? 'text-white'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                            style={{
                              backgroundColor: message.role === 'user' ? '#9F7E4C' : undefined
                            }}
                          >
                            {message.content}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chat Input */}
                    <div className="p-4 border-t border-gray-200/50">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                          placeholder="Ask me anything..."
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-50 text-sm"
                          style={{ '--tw-ring-color': '#9F7E4C' } as any}
                        />
                        <button
                          onClick={handleChatSend}
                          disabled={!chatInput.trim()}
                          className="p-2 rounded-xl text-white transition-colors disabled:opacity-50"
                          style={{ backgroundColor: '#9F7E4C' }}
                        >
                          <RiSendPlaneLine size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Close Button */}
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => setExpandedCard(null)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    ×
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
