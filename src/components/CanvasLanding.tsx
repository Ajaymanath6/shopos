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
  RiArrowRightSLine,
  RiPauseLine,
  RiErrorWarningLine,
  RiLoader4Line
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
    iconBg: '#6B46C1'
  },
  {
    id: 'seo-optimizer', 
    title: 'SEO Optimizer',
    subtitle: 'AI-powered SEO analysis and optimization',
    icon: RiSearchEyeLine,
    iconBg: '#7C3AED'
  }
]

interface ChatMessage {
  id: string
  role: 'user' | 'ai' | 'system'
  content: string
  timestamp: string
  state?: 'thinking' | 'generating' | 'creating' | 'retrieving' | 'suggesting' | 'completed' | 'error'
  icon?: string
  progress?: number
  data?: any
}

export default function CanvasLanding() {
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [scanProgress, setScanProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [storeUrl, setStoreUrl] = useState('')
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { 
      id: '1',
      role: 'ai', 
      content: 'Hi! I\'m your AI assistant. How can I help optimize your store today?',
      timestamp: new Date().toISOString(),
      state: 'completed',
      icon: 'RiRobotLine'
    }
  ])
  const [chatInput, setChatInput] = useState('')
  const [isAiThinking, setIsAiThinking] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
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

  const getAiResponse = (userMessage: string): ChatMessage[] => {
    const responses = [
      {
        id: Date.now().toString() + '_thinking',
        role: 'ai' as const,
        content: 'Let me analyze that for you...',
        timestamp: new Date().toISOString(),
        state: 'thinking' as const,
        icon: 'RiBrainLine'
      },
      {
        id: Date.now().toString() + '_response',
        role: 'ai' as const,
        content: userMessage.toLowerCase().includes('analyze') 
          ? 'I found 8 optimization opportunities in your store. Your current health score is 76%. Would you like me to prioritize the fixes by impact?'
          : userMessage.toLowerCase().includes('fix') || userMessage.toLowerCase().includes('optimize')
          ? 'I can help optimize that! Let me create an implementation plan for you.'
          : 'Great question! Based on your store data, here\'s what I recommend...',
        timestamp: new Date().toISOString(),
        state: 'completed' as const,
        icon: 'RiCheckboxCircleLine'
      }
    ]
    return responses
  }

  // Handle chat send
  const handleChatSend = async () => {
    if (chatInput.trim() && !isSending) {
      setIsSending(true)
      
      // Add user message
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: chatInput,
        timestamp: new Date().toISOString(),
        state: 'completed'
      }
      
      setChatMessages(prev => [...prev, userMessage])
      setChatInput('')
      
      // Show AI thinking state
      setTimeout(() => {
        setIsAiThinking(true)
        const aiResponses = getAiResponse(userMessage.content)
        
        // Add thinking message
        setChatMessages(prev => [...prev, aiResponses[0]])
        
        // Replace with actual response after delay
        setTimeout(() => {
          setChatMessages(prev => {
            const newMessages = [...prev]
            newMessages[newMessages.length - 1] = aiResponses[1]
            return newMessages
          })
          setIsAiThinking(false)
          setIsSending(false)
        }, 2000)
      }, 500)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleChatSend()
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      // Simulate voice recording
      setTimeout(() => {
        setIsRecording(false)
        setChatInput('Can you analyze my store performance?')
      }, 3000)
    }
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
    <div 
      className="fixed inset-0 overflow-hidden" 
      style={{ 
        background: 'linear-gradient(135deg, #FFF9C4 0%, #F0F4C3 25%, #E8F5E8 50%, #C8E6C9 75%, #A5D6A7 100%)'
      }}
    >
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
                  className="group rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer transform hover:scale-105 border border-white/40 backdrop-blur-xl overflow-hidden relative"
                  onClick={() => handleTaskClick(task.id)}
                  style={{ 
                    width: '420px', 
                    height: '260px',
                    background: `rgba(255, 255, 255, 0.25)`,
                    backdropFilter: 'blur(20px)',
                    boxShadow: `
                      0 8px 32px rgba(0, 0, 0, 0.1),
                      inset 0 1px 0 rgba(255, 255, 255, 0.5),
                      inset 0 -1px 0 rgba(255, 255, 255, 0.2)
                    `
                  }}
                >
                  {/* Glassmorphism overlay */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `rgba(30, 58, 138, 0.1)`,
                      backdropFilter: 'blur(25px)'
                    }}
                  />
                  
                  <div className="flex flex-col h-full relative z-10">
                    <div className="flex items-start gap-4 mb-6">
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:shadow-2xl transition-shadow duration-300"
                        style={{ 
                          background: `linear-gradient(135deg, ${task.iconBg} 0%, ${task.iconBg}dd 50%, ${task.iconBg}bb 100%)`,
                          boxShadow: `0 12px 40px ${task.iconBg}50`
                        }}
                      >
                        <IconComponent size={28} />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="text-xl font-bold mb-2 group-hover:opacity-90 transition-opacity text-left text-gray-900">
                          {task.title}
                        </h3>
                        <div className="w-16 h-1 rounded-full" style={{ backgroundColor: task.iconBg }} />
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-6 text-left">
                      {task.subtitle}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2" style={{ color: '#6B46C1' }}>
                        <span>Launch workspace</span>
                        <RiArrowRightSLine size={16} />
                      </div>
                      <div className="w-10 h-10 rounded-full border-2 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center" style={{ borderColor: task.iconBg, backgroundColor: 'rgba(255,255,255,0.2)' }}>
                        <RiArrowRightSLine size={18} style={{ color: task.iconBg }} />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Add New Task Card */}
            <div
              className="group rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer transform hover:scale-105 border-2 border-dashed backdrop-blur-xl"
              onClick={() => alert('Add new AI agent task - Coming Soon!')}
              style={{ 
                width: '420px', 
                height: '260px',
                borderColor: '#6B46C1',
                background: `rgba(255, 255, 255, 0.2)`,
                backdropFilter: 'blur(20px)',
                boxShadow: `
                  0 8px 32px rgba(0, 0, 0, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.4),
                  inset 0 -1px 0 rgba(255, 255, 255, 0.1)
                `
              }}
            >
              <div className="flex flex-col items-center justify-center h-full transition-colors" style={{ color: '#6B46C1' }}>
                <div className="w-16 h-16 border-2 border-current rounded-2xl flex items-center justify-center mb-6 group-hover:bg-opacity-10 group-hover:bg-current transition-colors">
                  <RiAddLine size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2">
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
                <h1 className="text-3xl font-bold mb-2 text-gray-900">
                  Store Health Check
                </h1>
                <p className="text-lg text-gray-600">
                  AI-powered diagnostic and optimization workspace
                </p>
              </div>

              {/* Two Section Layout - Fully Transparent Glassmorphism */}
              <div 
                className="rounded-3xl shadow-2xl border border-white/40 backdrop-blur-xl overflow-hidden"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(25px)',
                  boxShadow: `
                    0 12px 40px rgba(0, 0, 0, 0.15),
                    inset 0 1px 0 rgba(255, 255, 255, 0.6),
                    inset 0 -1px 0 rgba(255, 255, 255, 0.3)
                  `,
                  minHeight: '600px'
                }}
              >
                <div className="flex h-full gap-6 p-6">
                  {/* Left Section - Workflow */}
                  <div 
                    className="flex-1 p-8 rounded-2xl backdrop-blur-lg"
                    style={{
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(20px)',
                      boxShadow: `
                        0 8px 32px rgba(0, 0, 0, 0.1),
                        inset 0 1px 0 rgba(255, 255, 255, 0.9)
                      `
                    }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                        style={{ backgroundColor: '#6B46C1' }}
                      >
                        <RiStore2Line size={20} />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">
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
                              style={{ backgroundColor: '#6B46C1' }}
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
                  <div 
                    className="w-96 rounded-2xl backdrop-blur-lg flex flex-col"
                    style={{
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(20px)',
                      boxShadow: `
                        0 8px 32px rgba(0, 0, 0, 0.1),
                        inset 0 1px 0 rgba(255, 255, 255, 0.9)
                      `
                    }}
                  >
                    {/* Chat Header */}
                    <div className="p-6 border-b border-gray-200/30">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                          style={{ backgroundColor: '#6B46C1' }}
                        >
                          <RiRobotLine size={20} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            AI Assistant
                          </h3>
                          <p className="text-xs text-gray-500">Always here to help</p>
                        </div>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 p-6 overflow-y-auto space-y-4" style={{ maxHeight: '400px' }}>
                      {chatMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex items-start gap-3 max-w-xs ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                            {/* Message Icon */}
                            {message.role === 'ai' && (
                              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" 
                                   style={{ backgroundColor: message.state === 'thinking' ? '#F59E0B' : '#6B46C1' }}>
                                {message.state === 'thinking' ? (
                                  <RiLoader4Line size={16} className="text-white animate-spin" />
                                ) : message.state === 'error' ? (
                                  <RiErrorWarningLine size={16} className="text-white" />
                                ) : (
                                  <RiRobotLine size={16} className="text-white" />
                                )}
                              </div>
                            )}
                            
                            {/* Message Bubble */}
                            <div
                              className={`px-4 py-3 rounded-2xl text-sm relative ${
                                message.role === 'user'
                                  ? 'text-white shadow-lg'
                                  : 'text-gray-800 shadow-sm border border-gray-100'
                              }`}
                              style={{
                                backgroundColor: message.role === 'user' 
                                  ? '#6B46C1' 
                                  : message.state === 'thinking'
                                  ? 'linear-gradient(135deg, #FFF9C4 0%, #F0F4C3 100%)'
                                  : 'rgba(255, 255, 255, 0.9)'
                              }}
                            >
                              {/* AI State Indicator */}
                              {message.role === 'ai' && message.state === 'thinking' && (
                                <div className="flex items-center gap-2 mb-2 text-xs text-gray-600">
                                  <div className="flex space-x-1">
                                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                  </div>
                                  <span>AI is thinking...</span>
                                </div>
                              )}
                              
                              <div>{message.content}</div>
                              
                              {/* Timestamp */}
                              <div className={`text-xs mt-2 ${message.role === 'user' ? 'text-purple-100' : 'text-gray-400'}`}>
                                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* AI Working Indicator */}
                      {isAiThinking && (
                        <div className="flex justify-start">
                          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl" 
                               style={{ background: 'linear-gradient(135deg, #FFF9C4 0%, #F0F4C3 100%)' }}>
                            <RiLoader4Line size={16} className="text-gray-600 animate-spin" />
                            <span className="text-sm text-gray-700">AI is analyzing...</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Modern Chat Input */}
                    <div className="p-6 border-t border-gray-200/30">
                      <div 
                        className="flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300"
                        style={{
                          background: isAiThinking 
                            ? 'linear-gradient(135deg, #FFF9C4 0%, #F0F4C3 100%)' 
                            : 'rgba(255, 255, 255, 0.9)',
                          borderColor: isSending ? '#6B46C1' : '#E5E7EB',
                          boxShadow: isSending 
                            ? '0 0 0 3px rgba(107, 70, 193, 0.1)' 
                            : '0 2px 8px rgba(0, 0, 0, 0.05)'
                        }}
                      >
                        {/* Attach Button */}
                        <button 
                          className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                          onClick={() => alert('File attachment - Coming Soon!')}
                        >
                          <RiAttachmentLine size={18} className="text-gray-400" />
                        </button>
                        
                        {/* Text Input */}
                        <input
                          type="text"
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder={isAiThinking ? "AI is working..." : "Ask me anything about your store..."}
                          disabled={isSending || isAiThinking}
                          className="flex-1 outline-none bg-transparent text-gray-700 placeholder-gray-400 disabled:opacity-50"
                        />
                        
                        {/* Voice/Recording Button */}
                        <button 
                          className={`p-2 rounded-xl transition-all duration-300 ${
                            isRecording 
                              ? 'bg-red-500 text-white animate-pulse' 
                              : 'hover:bg-gray-100 text-gray-400'
                          }`}
                          onClick={toggleRecording}
                        >
                          <RiMicLine size={18} />
                        </button>
                        
                        {/* Send/Pause Button */}
                        <button 
                          onClick={handleChatSend}
                          disabled={!chatInput.trim() || isAiThinking}
                          className={`p-3 rounded-xl text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                            isSending 
                              ? 'bg-orange-500 hover:bg-orange-600' 
                              : 'bg-purple-600 hover:bg-purple-700 hover:shadow-lg'
                          }`}
                        >
                          {isSending ? (
                            <RiPauseLine size={16} />
                          ) : (
                            <RiSendPlaneLine size={16} />
                          )}
                        </button>
                      </div>
                      
                      {/* Recording Indicator */}
                      {isRecording && (
                        <div className="flex items-center justify-center gap-2 mt-3 text-sm text-red-600">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <span>Recording... Tap to stop</span>
                        </div>
                      )}
                      
                      {/* Quick Suggestions */}
                      {!isSending && !isAiThinking && chatMessages.length === 1 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {['Analyze my store', 'Check performance', 'Find issues', 'Optimize SEO'].map((suggestion) => (
                            <button
                              key={suggestion}
                              onClick={() => setChatInput(suggestion)}
                              className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
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
        <div 
          className="flex items-center gap-3 p-3 rounded-2xl backdrop-blur-xl border border-white/40"
          style={{
            background: 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(20px)',
            boxShadow: `
              0 8px 32px rgba(0, 0, 0, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.5),
              inset 0 -1px 0 rgba(255, 255, 255, 0.2)
            `
          }}
        >
          <button 
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={() => alert('Notifications - Coming Soon!')}
          >
            <RiNotification3Line size={18} style={{ color: '#6B46C1' }} />
          </button>
          <button 
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={() => alert('Settings - Coming Soon!')}
          >
            <RiSettings3Line size={18} style={{ color: '#6B46C1' }} />
          </button>
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#6B46C1' }}>
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
        <div 
          className="rounded-full shadow-xl border border-white/40 px-6 py-3 flex items-center gap-4 min-w-96 backdrop-blur-xl"
          style={{ 
            background: 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(20px)',
            boxShadow: `
              0 8px 32px rgba(0, 0, 0, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.5),
              inset 0 -1px 0 rgba(255, 255, 255, 0.2)
            `
          }}
        >
          <RiSearchLine size={20} style={{ color: '#6B46C1' }} />
          <input
            type="text"
            placeholder="Ask anything..."
            className="flex-1 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
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
              style={{ backgroundColor: '#6B46C1' }}
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
