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

  RiCheckboxCircleLine, 
  RiStore2Line, 
  RiStarFill,
  RiFocus3Line,
  RiCheckLine,
  RiArrowUpSLine,
  RiHomeLine,
  RiCloseLine
} from '@remixicon/react'
import shopOSLogo from '../assets/shop-os-logo.svg'

// Custom SVG Icons
const SectionIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 10H4V19H20V10ZM15 6V8H19V6H15Z" />
  </svg>
)

const StarIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0.5L16 8L23.5 12L16 16L12 23.5L8 16L0.5 12L8 8L12 0.5Z" />
  </svg>
)

interface TaskCard {
  id: string
  title: string
  subtitle: string
  icon: React.ComponentType<{ size?: string | number }>
  iconBg: string
}

// Dark Gray Monochromatic Palette
const DARK_PALETTE = {
  primary: '#1F2937',    // Dark gray
  secondary: '#374151',  // Medium gray  
  tertiary: '#4B5563',   // Light gray
  accent: '#6B7280',     // Lighter gray
  light: '#9CA3AF'       // Very light gray
}

const DEFAULT_TASKS: TaskCard[] = [
  {
    id: 'store-health',
    title: 'Store Health Check',
    subtitle: 'Connect your Shopify store for an instant AI diagnostic and optimization recommendations',
    icon: RiHealthBookLine,
    iconBg: DARK_PALETTE.primary
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
  data?: Record<string, unknown>
  subtasks?: Array<{
    id: string
    text: string
    completed: boolean
  }>
}

interface SystemFeedback {
  isVisible: boolean
  state: 'running' | 'waiting'
  subtasks: Array<{
    id: string
    text: string
    completed: boolean
  }>
}

export default function CanvasLanding() {
  const [taskCards, setTaskCards] = useState<TaskCard[]>(() => {
    try {
      const saved = localStorage.getItem('aggo_tasks')
      if (saved) {
        const parsed: TaskCard[] = JSON.parse(saved)
        // Ensure defaults always exist at the start
        const defaultsFirst = DEFAULT_TASKS.filter(d => !parsed.find(p => p.id === d.id))
        return [...DEFAULT_TASKS, ...parsed.filter(p => !DEFAULT_TASKS.find(d => d.id === p.id)), ...defaultsFirst]
      }
    } catch {
      // ignore corrupt localStorage
    }
    return DEFAULT_TASKS
  })
  const [showAddTask, setShowAddTask] = useState(false)
  const [newTaskName, setNewTaskName] = useState('')
  const [newTaskDesc, setNewTaskDesc] = useState('')
  const [showTemplates, setShowTemplates] = useState(false)

  useEffect(() => {
    try {
      // Do not persist built-ins redundantly; only custom tasks
      const custom = taskCards.filter(t => !DEFAULT_TASKS.find(d => d.id === t.id))
      localStorage.setItem('aggo_tasks', JSON.stringify(custom))
    } catch {
      // ignore persistence errors
    }
  }, [taskCards])

  const TEMPLATES: Array<{ id: string; title: string; subtitle: string; icon: TaskCard['icon']; iconBg: string }> = [
    { id: 'abandoned-cart', title: 'Abandoned Cart Recovery', subtitle: 'Automated outreach and incentives', icon: RiNotification3Line, iconBg: DARK_PALETTE.tertiary },
    { id: 'price-optimizer', title: 'Price Optimizer', subtitle: 'AI-driven price testing', icon: RiSettings3Line, iconBg: DARK_PALETTE.tertiary },
    { id: 'inventory-mentor', title: 'Inventory Mentor', subtitle: 'Forecasts and restock alerts', icon: RiUser3Line, iconBg: DARK_PALETTE.tertiary }
  ]

  const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const addCustomTask = (title: string, subtitle: string) => {
    if (!title.trim()) return
    let idBase = slugify(title)
    if (!idBase) idBase = `task-${Date.now()}`
    let id = idBase
    let tries = 1
    while (taskCards.find(t => t.id === id)) {
      id = `${idBase}-${tries++}`
    }
    const newTask: TaskCard = {
      id,
      title,
      subtitle,
      icon: RiStarFill,
      iconBg: DARK_PALETTE.tertiary
    }
    setTaskCards(prev => [...prev, newTask])
    setShowAddTask(false)
    setNewTaskName('')
    setNewTaskDesc('')
  }

  const addTemplateTask = (templateId: string) => {
    const tpl = TEMPLATES.find(t => t.id === templateId)
    if (!tpl) return
    let id = templateId
    let tries = 1
    while (taskCards.find(t => t.id === id)) id = `${templateId}-${tries++}`
    setTaskCards(prev => [...prev, { id, title: tpl.title, subtitle: tpl.subtitle, icon: tpl.icon, iconBg: tpl.iconBg }])
    setShowAddTask(false)
    setShowTemplates(false)
  }
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [expandedCards, setExpandedCards] = useState<string[]>([])
  const [scanProgress, setScanProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [storeUrl, setStoreUrl] = useState('')
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { 
      id: '1',
      role: 'ai', 
      content: 'Hi! I\'m your AI assistant. Enter your Shopify store URL to start a comprehensive health analysis.',
      timestamp: new Date().toISOString(),
      state: 'completed',
      icon: 'RiStarFill'
    }
  ])
  const [chatInput, setChatInput] = useState('')
  const [isAiThinking] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [systemFeedback, setSystemFeedback] = useState<SystemFeedback>({
    isVisible: false,
    state: 'waiting',
    subtasks: []
  })
  const [showAiSearch, setShowAiSearch] = useState(false)
  const [projectStatus, setProjectStatus] = useState('Ready to analyze your store')
  const [sectionMode, setSectionMode] = useState(false)
  const [selectedProjects, setSelectedProjects] = useState<string[]>([])
  const [projectSections, setProjectSections] = useState<{[key: string]: {
    projects: string[]
    name: string
    description?: string
  }}>({}) // sectionId -> section data
  const [editingSection, setEditingSection] = useState<string | null>(null)
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
    // Only allow dragging with middle mouse button (button 1)
    if (e.button === 1) {
      e.preventDefault()
      setIsDragging(true)
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
    }
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
        if (sectionMode) {
          setSectionMode(false)
          setSelectedProjects([])
        } else {
          setExpandedCards([])
          setScanProgress(0)
          setCurrentStep(0)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [sectionMode])



  // Handle chat send with enterprise system feedback
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
      
      // Show system feedback with subtasks
      const subtasks = [
        { id: '1', text: 'Searching inventory', completed: false },
        { id: '2', text: 'Filtering by criteria', completed: false },
        { id: '3', text: 'Analyzing results', completed: false },
        { id: '4', text: 'Generating response', completed: false }
      ]
      
      setSystemFeedback({
        isVisible: true,
        state: 'running',
        subtasks: subtasks
      })
      
      // Simulate progressive task completion
      let completedCount = 0
      const taskInterval = setInterval(() => {
        if (completedCount < subtasks.length) {
          setSystemFeedback(prev => ({
            ...prev,
            subtasks: prev.subtasks.map((task, index) => 
              index === completedCount ? { ...task, completed: true } : task
            )
          }))
          completedCount++
        } else {
          clearInterval(taskInterval)
          
          // Hide system feedback and show AI response
          setTimeout(() => {
            setSystemFeedback({ isVisible: false, state: 'waiting', subtasks: [] })
            
            const aiResponse: ChatMessage = {
              id: Date.now().toString(),
              role: 'ai',
              content: userMessage.content.toLowerCase().includes('analyze') 
                ? 'I found 8 optimization opportunities in your store. Your current health score is 76%. Would you like me to prioritize the fixes by impact?'
                : userMessage.content.toLowerCase().includes('products')
                ? 'I can help you find products. Could you specify what type of products you\'re looking for and any specific criteria like price range, brand, or features?'
                : 'I understand your request. Let me provide you with the most relevant information and recommendations.',
              timestamp: new Date().toISOString(),
              state: 'completed'
            }
            
            setChatMessages(prev => [...prev, aiResponse])
            setIsSending(false)
          }, 500)
        }
      }, 800)
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
    
    // Add chat message about starting analysis
    const analysisMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'ai',
      content: `Perfect! Starting comprehensive analysis of ${storeUrl}. I'll check performance, SEO, accessibility, and more.`,
      timestamp: new Date().toISOString(),
      state: 'completed',
      icon: 'RiStarFill'
    }
    setChatMessages(prev => [...prev, analysisMessage])
    
    setProjectStatus(`Analyzing ${storeUrl}...`)
    setScanProgress(0)
    setCurrentStep(0)
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        const nextStep = prev + 1
        if (nextStep >= scanningSteps.length) {
          clearInterval(interval)
          // Add completion message to chat
          setTimeout(() => {
            const completionMessage: ChatMessage = {
              id: Date.now().toString() + '_complete',
              role: 'ai',
              content: `✅ Analysis complete! Found 8 optimization opportunities. Your store health score is 78%. Ready to see the detailed report?`,
              timestamp: new Date().toISOString(),
              state: 'completed',
              icon: 'RiStarFill'
            }
            setChatMessages(prev => [...prev, completionMessage])
            setProjectStatus('Analysis complete - 78% health score')
          }, 1000)
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
      if (!expandedCards.includes(taskId)) {
        setExpandedCards(prev => [...prev, taskId])
        setScanProgress(0)
        setCurrentStep(0)
        setStoreUrl('')
      }
    } else {
      alert(`${taskCards.find(t => t.id === taskId)?.title} - Coming Soon!`)
    }
  }

  // Reset view
  const resetView = () => {
    // Only normalize zoom/pan; keep all canvas state (open projects, sections, selections)
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  // Handle section mode
  const handleSectionClick = () => {
    if (sectionMode && selectedProjects.length > 0) {
      // Create section from selected projects
      const sectionId = `section-${Date.now()}`
      setProjectSections(prev => ({
        ...prev,
        [sectionId]: {
          projects: [...selectedProjects],
          name: `Section ${Object.keys(prev).length + 1}`,
          description: `${selectedProjects.length} projects grouped together`
        }
      }))
      setSelectedProjects([])
      setSectionMode(false)
      setEditingSection(sectionId) // Auto-edit new section name
    } else {
      // Toggle section mode
      setSectionMode(!sectionMode)
      setSelectedProjects([])
    }
  }

  // Handle project selection in section mode
  const handleProjectSelection = (projectId: string) => {
    if (sectionMode) {
      setSelectedProjects(prev => 
        prev.includes(projectId) 
          ? prev.filter(id => id !== projectId)
          : [...prev, projectId]
      )
    }
  }

  // Get section for project
  const getProjectSection = (projectId: string) => {
    return Object.entries(projectSections).find(([, sectionData]) => 
      sectionData.projects.includes(projectId)
    )?.[0]
  }

  // Update section name
  const updateSectionName = (sectionId: string, name: string, description?: string) => {
    setProjectSections(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        name,
        description
      }
    }))
  }

  return (
    <div 
      className="fixed inset-0 overflow-hidden" 
      style={{ 
        background: 'linear-gradient(135deg, #FFF9C4 0%, #F0F4C3 8%, #E8F5E8 20%, #C8E6C9 40%, #A5D6A7 100%)'
      }}
    >
      {/* Canvas Container */}
      <div
        ref={canvasRef}
        className={`w-full h-full ${!showAddTask ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
        onWheel={!showAddTask ? handleWheel : undefined}
        onMouseDown={!showAddTask ? handleMouseDown : undefined}
        onMouseMove={!showAddTask ? handleMouseMove : undefined}
        onMouseUp={!showAddTask ? handleMouseUp : undefined}
        onMouseLeave={!showAddTask ? handleMouseUp : undefined}
      >
        {/* Transformable Content */}
        <div
          className="w-full h-full flex flex-col items-center justify-center transition-transform duration-200 ease-out"
          style={{
            transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
            transformOrigin: 'center center',
            minWidth: '100vw'
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
          <div className="flex gap-6 justify-center w-full">
            {/* Task Cards */}
            {taskCards.map((task) => {
              const IconComponent = task.icon
              return (
                <div
                  key={task.id}
                  className="rounded-2xl p-6 shadow-lg cursor-pointer border border-white/30 backdrop-blur-xl overflow-hidden relative group hover:shadow-xl transition-all duration-300"
                  onClick={() => handleTaskClick(task.id)}
                  style={{ 
                    width: '360px', 
                    height: '240px',
                    background: `rgba(255, 255, 255, 0.95)`,
                    backdropFilter: 'blur(15px)',
                    boxShadow: `0 8px 32px rgba(0, 0, 0, 0.08)`
                  }}
                >
                  <div className="flex flex-col h-full relative z-10">
                    {/* Icon and Title Section */}
                    <div className="flex items-center gap-4 mb-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
                        style={{ 
                          backgroundColor: '#F9FAFB',
                          color: '#4B5563'
                        }}
                      >
                        <IconComponent size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                          {task.title}
                        </h3>
                      </div>
                    </div>
                    
                    {/* Subtitle */}
                    <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-5">
                      {task.subtitle}
                    </p>
                    
                    {/* Action indicator */}
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-medium text-gray-500 opacity-70 group-hover:opacity-100 transition-opacity">
                        Click to launch →
                      </div>
                      <div className="w-8 h-1 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full opacity-30"></div>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Add New Task Card */}
            <div
              className="rounded-2xl p-6 shadow-lg cursor-pointer border-2 border-dashed backdrop-blur-xl group hover:shadow-xl hover:border-gray-400 transition-all duration-300"
              onClick={() => {
                // Reset canvas to 100% zoom and center
                setZoom(1)
                setPan({ x: 0, y: 0 })
                setShowAddTask(true)
              }}
              style={{ 
                width: '360px', 
                height: '240px',
                borderColor: DARK_PALETTE.accent,
                background: `rgba(255, 255, 255, 0.3)`,
                backdropFilter: 'blur(15px)',
                boxShadow: `0 8px 32px rgba(0, 0, 0, 0.05)`
              }}
            >
              <div className="flex flex-col items-center justify-center h-full transition-all duration-300 group-hover:scale-105">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors shadow-sm" style={{ backgroundColor: '#F9FAFB', color: '#6B7280' }}>
                  <RiAddLine size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                  Add New Task
                </h3>
                <p className="text-sm text-center text-gray-600 leading-relaxed px-2">
                  Create a custom AI agent for your store
                </p>
              </div>
            </div>
          </div>



          {/* Section Headers */}
          {Object.entries(projectSections).map(([sectionId, sectionData]) => {
            const sectionProjects = sectionData.projects.filter(projectId => expandedCards.includes(projectId))
            if (sectionProjects.length === 0) return null
            
            // Each project is 1400px wide. Gap between projects is 48px (gap-12).
            // The section container also has horizontal padding p-6 (24px each side = 48px total).
            // Add an extra small buffer (24px) to avoid subpixel overflow at certain zoom levels.
            const sectionWidth =
              sectionProjects.length * 1400 +
              (sectionProjects.length - 1) * 48 +
              48 +
              24
            // => total = projects + gaps + container padding + buffer
            
            return (
              <div key={sectionId} className="mt-16 flex flex-col items-start">
                {/* Section Container with Background */}
                <div 
                  className="bg-gradient-to-br from-green-50/40 to-yellow-50/40 rounded-3xl p-6 border border-green-200/30"
                  style={{ width: `${sectionWidth}px` }}
                >
                  {/* Section Header */}
                  <div className="mb-6 p-4 rounded-2xl border bg-white/80 backdrop-blur-sm border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      {editingSection === sectionId ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={sectionData.name}
                            onChange={(e) => updateSectionName(sectionId, e.target.value, sectionData.description)}
                            onBlur={() => setEditingSection(null)}
                            onKeyPress={(e) => e.key === 'Enter' && setEditingSection(null)}
                            className="text-xl font-bold bg-transparent border-b-2 border-gray-300 focus:border-gray-500 outline-none text-gray-900"
                            autoFocus
                          />
                          <input
                            type="text"
                            value={sectionData.description || ''}
                            onChange={(e) => updateSectionName(sectionId, sectionData.name, e.target.value)}
                            placeholder="Add description..."
                            className="text-sm bg-transparent border-b border-gray-200 focus:border-gray-400 outline-none text-gray-600 w-full"
                          />
                        </div>
                      ) : (
                        <div onClick={() => setEditingSection(sectionId)} className="cursor-pointer">
                          <h2 className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
                            {sectionData.name}
                          </h2>
                          {sectionData.description && (
                            <p className="text-sm text-gray-600 mt-1">{sectionData.description}</p>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 bg-white/60 px-2 py-1 rounded-full">
                        {sectionProjects.length} project{sectionProjects.length > 1 ? 's' : ''}
                      </span>
                      <button
                        onClick={() => {
                          setProjectSections(prev => {
                            const newSections = { ...prev }
                            delete newSections[sectionId]
                            return newSections
                          })
                        }}
                        className="p-1 hover:bg-red-100 rounded-full transition-colors text-gray-400 hover:text-red-600"
                        title="Remove section"
                      >
                        <RiCloseLine size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Sectioned Projects Container */}
                <div className="flex gap-12 mt-6">
                  {sectionProjects.map(projectId => (
                    <div key={projectId} className="contents">
                      {projectId === 'store-health' && expandedCards.includes('store-health') && (
                        <div 
                          className={`transition-all duration-300 ${
                            sectionMode ? 'cursor-pointer' : ''
                          } ${
                            selectedProjects.includes('store-health') ? 'border-2 border-dashed border-gray-600' : ''
                          }`}
                          style={{ 
                            width: '1400px',
                            minWidth: '1400px',
                            flexShrink: 0
                          }}
                          onClick={() => handleProjectSelection('store-health')}
                        >
                          {/* Store Health Check Full Interface */}
                          <div className="text-left mb-6 relative">
                            <div className="flex items-center justify-between">
                              <div>
                                <h1 className="text-3xl font-bold mb-2 text-gray-900">
                                  Store Health Check
                                </h1>
                                <p className="text-lg text-gray-600">
                                  AI-powered diagnostic and optimization workspace
                                </p>
                              </div>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setExpandedCards(prev => prev.filter(id => id !== 'store-health'))
                                }}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-gray-700"
                              >
                                <RiCloseLine size={24} />
                              </button>
                            </div>
                          </div>
                          
                          {/* Notification Banner */}
                          <div 
                            className="mb-8 p-4 rounded-2xl border flex items-center gap-4"
                            style={{
                              background: 'rgba(255, 255, 255, 0.8)',
                              borderColor: '#E5E7EB',
                              backdropFilter: 'blur(10px)'
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-8 h-8 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: '#F9FAFB' }}
                              >
                                <RiStarFill size={16} style={{ color: '#6B7280' }} />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">AI Agent: Store Health Analyzer</div>
                                <div className="text-xs text-gray-600">{projectStatus}</div>
                              </div>
                            </div>
                            <div className="ml-auto flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              <span className="text-xs text-gray-500">Active</span>
                            </div>
                          </div>

                          {/* Two Section Layout */}
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
                              minHeight: 'auto'
                            }}
                          >
                            <div className="flex h-full gap-6 p-6">
                              {/* Left Section - Workflow (70%) */}
                              <div 
                                className="w-[70%] p-8 rounded-2xl backdrop-blur-lg"
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
                                    className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
                                    style={{ backgroundColor: '#F9FAFB', color: '#6B7280' }}
                                  >
                                    <RiStore2Line size={20} />
                                  </div>
                                  <div>
                                    <h2 className="text-xl font-bold text-gray-900">Store Analysis</h2>
                                    <p className="text-gray-600 text-sm">Connect your Shopify store for comprehensive diagnostics</p>
                                  </div>
                                </div>

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
                                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                                        style={{ '--tw-ring-color': '#A5D6A7' } as React.CSSProperties}
                                      />
                                      <button
                                        onClick={handleStoreSubmit}
                                        disabled={!storeUrl.trim()}
                                        className="px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
                                        style={{ backgroundColor: DARK_PALETTE.primary }}
                                      >
                                        Start Scan
                                      </button>
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
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Right Section - AI Chat (30%) */}
                              <div 
                                className="w-[30%] rounded-2xl flex flex-col border"
                                style={{
                                  background: 'rgba(255, 255, 255, 0.8)',
                                  borderColor: '#E5E7EB',
                                  minHeight: 'auto'
                                }}
                              >
                                {/* Chat Header */}
                                <div className="p-4 border-b" style={{ borderColor: '#E5E7EB' }}>
                                  <div className="flex items-center gap-3">
                                    <div 
                                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                                      style={{ backgroundColor: '#F9FAFB' }}
                                    >
                                      <RiStarFill size={16} style={{ color: '#6B7280' }} />
                                    </div>
                                    <div>
                                      <h3 className="font-medium text-sm text-gray-900">
                                        Shopping Assistant
                                      </h3>
                                      <p className="text-xs text-gray-600">Enterprise AI</p>
                                    </div>
                                  </div>
                                </div>

                                {/* Chat Messages */}
                                <div className="flex-1 p-4 space-y-3">
                                  {chatMessages.map((message) => (
                                    <div
                                      key={message.id}
                                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                      <div className={`max-w-[85%] ${message.role === 'user' ? 'ml-8' : 'mr-8'}`}>
                                        <div
                                          className="px-4 py-3 rounded-lg text-sm"
                                          style={{
                                            backgroundColor: message.role === 'user' ? '#F3F4F6' : '#E5E7EB',
                                            color: '#374151'
                                          }}
                                        >
                                          <div>{message.content}</div>
                                          <div className="text-xs mt-2 text-gray-500">
                                            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                {/* Chat Input */}
                                <div className="border-t p-4" style={{ borderColor: '#E5E7EB' }}>
                                  <div className="mb-3">
                                    <textarea
                                      value={chatInput}
                                      onChange={(e) => setChatInput(e.target.value)}
                                      placeholder="Ask about products, orders, or anything else..."
                                      disabled={isSending || isAiThinking}
                                      rows={2}
                                      className="w-full resize-none outline-none text-sm p-3 rounded-lg border"
                                      style={{
                                        backgroundColor: '#FFFFFF',
                                        borderColor: '#E5E7EB',
                                        color: '#374151',
                                        fontFamily: 'Inter, sans-serif'
                                      }}
                                    />
                                  </div>
                                  
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <button 
                                        className="p-2 rounded-lg transition-colors"
                                        onClick={() => alert('File attachment - Coming Soon!')}
                                        style={{ 
                                          color: '#6B7280',
                                          backgroundColor: 'transparent'
                                        }}
                                      >
                                        <RiAttachmentLine size={18} />
                                      </button>
                                      
                                      <button 
                                        className="p-2 rounded-lg transition-colors"
                                        onClick={toggleRecording}
                                        style={{ 
                                          color: isRecording ? '#FF4444' : '#6B7280',
                                          backgroundColor: 'transparent'
                                        }}
                                      >
                                        <RiMicLine size={18} />
                                      </button>
                                    </div>
                                    
                                    <button 
                                      onClick={handleChatSend}
                                      disabled={!chatInput.trim() || isAiThinking}
                                      className="p-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                      style={{
                                        backgroundColor: chatInput.trim() && !isAiThinking ? DARK_PALETTE.primary : '#E5E7EB',
                                        color: chatInput.trim() && !isAiThinking ? '#FFFFFF' : '#6B7280'
                                      }}
                                    >
                                      <RiArrowUpSLine size={18} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                    </div>
                  ))}
                </div>
              </div>
            </div>
            )
          })}

          {/* Projects Container - Full Canvas Layout */}
          <div className="mt-20 w-full flex flex-wrap gap-12" style={{ minWidth: '100vw', padding: '0 2rem' }}>
            {/* Store Health Check Expandable Interface - Only when NOT in section */}
            {expandedCards.includes('store-health') && !getProjectSection('store-health') && (
              <div 
                className={`transition-all duration-300 ${
                  sectionMode ? 'cursor-pointer' : ''
                } ${
                  selectedProjects.includes('store-health') ? 'border-2 border-dashed border-gray-600' : ''
                }`}
                style={{ 
                  width: '1400px',
                  minWidth: '1400px',
                  flexShrink: 0
                }}
                onClick={() => handleProjectSelection('store-health')}
              >
              {/* Main Heading */}
              <div className="text-left mb-6 relative">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-2 text-gray-900">
                      Store Health Check
                    </h1>
                    <p className="text-lg text-gray-600">
                      AI-powered diagnostic and optimization workspace
                    </p>
                  </div>
                  <button 
                    onClick={() => setExpandedCards(prev => prev.filter(id => id !== 'store-health'))}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-gray-700"
                  >
                    <RiCloseLine size={24} />
                  </button>
                </div>
              </div>
              
              {/* Notification Banner */}
              <div 
                className="mb-8 p-4 rounded-2xl border flex items-center gap-4"
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  borderColor: '#E5E7EB',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: DARK_PALETTE.primary }}
                  >
                    <RiStarFill size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">AI Agent: Store Health Analyzer</div>
                    <div className="text-xs text-gray-600">{projectStatus}</div>
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-500">Active</span>
                </div>
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
                  minHeight: 'auto'
                }}
              >
                <div className="flex h-full gap-6 p-6">
                  {/* Left Section - Workflow (70%) */}
                  <div 
                    className="w-[70%] p-8 rounded-2xl backdrop-blur-lg"
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
                          style={{ backgroundColor: DARK_PALETTE.secondary }}
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
                              style={{ '--tw-ring-color': '#A5D6A7' } as React.CSSProperties}
                            />
                            <button
                              onClick={handleStoreSubmit}
                              disabled={!storeUrl.trim()}
                              className="px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
                              style={{ backgroundColor: DARK_PALETTE.primary }}
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
                          <h3 className="text-lg font-semibold mb-2" style={{ color: '#A5D6A7' }}>
                            Analyzing {storeUrl || 'your store'}
                          </h3>
                          <p className="text-gray-600">AI diagnostic in progress...</p>
                        </div>

                        <div className="flex justify-center mb-6">
                          <div className="relative">
                            <div className="w-20 h-20 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: '#A5D6A7' }}>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <RiSearchLine size={28} style={{ color: '#A5D6A7' }} />
                              </div>
                            </div>
                          </div>
                        </div>

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

                  {/* Right Section - Enterprise AI Chat (30%) */}
                  <div 
                    className="w-[30%] rounded-2xl flex flex-col border"
                    style={{
                      background: 'rgba(255, 255, 255, 0.8)',
                      borderColor: '#E5E7EB',
                      minHeight: 'auto'
                    }}
                  >
                    {/* Enterprise Chat Header */}
                    <div className="p-4 border-b" style={{ borderColor: '#E5E7EB' }}>
                                                            <div className="flex items-center gap-3">
                                        <div 
                                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                                          style={{ backgroundColor: '#F9FAFB' }}
                                        >
                                          <RiStarFill size={16} style={{ color: '#6B7280' }} />
                                        </div>
                                        <div>
                                          <h3 className="font-medium text-sm text-gray-900">
                                            Shopping Assistant
                                          </h3>
                                          <p className="text-xs text-gray-600">Enterprise AI</p>
                                        </div>
                                      </div>
                    </div>

                    {/* Enterprise Chat History */}
                    <div className="flex-1 p-4 space-y-3">
                      {chatMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[85%] ${message.role === 'user' ? 'ml-8' : 'mr-8'}`}>
                            {/* Message Bubble */}
                            <div
                              className="px-4 py-3 rounded-lg text-sm"
                              style={{
                                backgroundColor: message.role === 'user' ? '#F3F4F6' : '#E5E7EB',
                                color: '#374151'
                              }}
                            >
                              <div>{message.content}</div>
                              
                              {/* Timestamp */}
                              <div className="text-xs mt-2 text-gray-500">
                                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* System Feedback Component */}
                      {systemFeedback.isVisible && (
                        <div className="w-full">
                          <div 
                            className="p-4 rounded-lg border"
                            style={{ 
                              backgroundColor: '#F9FAFB',
                              borderColor: '#E5E7EB'
                            }}
                          >
                            {systemFeedback.state === 'running' ? (
                              <div>
                                <div className="flex items-center gap-3 mb-3">
                                  <RiFocus3Line 
                                    size={16} 
                                    className="text-white animate-spin" 
                                    style={{ 
                                      animation: 'spin 2s linear infinite',
                                      color: DARK_PALETTE.light
                                    }} 
                                  />
                                  <span className="text-sm font-medium text-gray-900">
                                    Running...
                                  </span>
                                </div>
                                
                                {/* Subtasks Checklist */}
                                <div className="space-y-2">
                                  {systemFeedback.subtasks.map((task) => (
                                    <div key={task.id} className="flex items-center gap-2">
                                      {task.completed ? (
                                        <RiCheckLine size={14} style={{ color: DARK_PALETTE.light }} />
                                      ) : (
                                        <div className="w-3.5 h-3.5 border border-gray-500 rounded-sm" />
                                      )}
                                      <span 
                                        className={`text-xs ${task.completed ? 'text-gray-900' : 'text-gray-500'}`}
                                      >
                                        {task.text}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <div className="text-xs text-gray-500">
                                Assistant is waiting for your response...
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Enterprise Input Area - Fixed to Bottom */}
                    <div 
                      className="border-t p-4"
                      style={{ borderColor: '#E5E7EB' }}
                    >
                      {/* Multi-line Text Input */}
                      <div className="mb-3">
                        <textarea
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault()
                              handleChatSend()
                            }
                          }}
                          placeholder="Ask about products, orders, or anything else..."
                          disabled={isSending || isAiThinking}
                          rows={2}
                          className="w-full resize-none outline-none text-sm p-3 rounded-lg border"
                          style={{
                            backgroundColor: '#FFFFFF',
                            borderColor: '#E5E7EB',
                            color: '#374151',
                            fontFamily: 'Inter, sans-serif'
                          }}
                        />
                      </div>
                      
                      {/* Action Buttons Row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {/* Attach File */}
                          <button 
                            className="p-2 rounded-lg transition-colors"
                            onClick={() => alert('File attachment - Coming Soon!')}
                            style={{ 
                              color: '#6B7280',
                              backgroundColor: 'transparent'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = DARK_PALETTE.primary}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}
                          >
                            <RiAttachmentLine size={18} />
                          </button>
                          
                          {/* Voice Dictation */}
                          <button 
                            className={`p-2 rounded-lg transition-all duration-300 ${
                              isRecording ? 'animate-pulse' : ''
                            }`}
                            onClick={toggleRecording}
                            style={{ 
                              color: isRecording ? '#FF4444' : '#6B7280',
                              backgroundColor: 'transparent'
                            }}
                            onMouseEnter={(e) => !isRecording && (e.currentTarget.style.color = DARK_PALETTE.primary)}
                            onMouseLeave={(e) => !isRecording && (e.currentTarget.style.color = '#6B7280')}
                          >
                            <RiMicLine size={18} />
                          </button>
                        </div>
                        
                        {/* Send Button */}
                        <button 
                          onClick={handleChatSend}
                          disabled={!chatInput.trim() || isAiThinking}
                          className="p-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{
                            backgroundColor: chatInput.trim() && !isAiThinking ? DARK_PALETTE.primary : '#E5E7EB',
                            color: chatInput.trim() && !isAiThinking ? '#FFFFFF' : '#6B7280'
                          }}
                        >
                          <RiArrowUpSLine size={18} />
                        </button>
                      </div>
                      
                      {/* Recording Indicator */}
                      {isRecording && (
                        <div className="flex items-center justify-center gap-2 mt-3 text-xs" style={{ color: '#FF4444' }}>
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <span>Recording... Tap microphone to stop</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Close Button */}
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => setExpandedCards([])}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
                        )}

            {/* SEO Optimizer Expandable Interface - Only when NOT in section */}
            {expandedCards.includes('seo-optimizer') && !getProjectSection('seo-optimizer') && (
              <div 
                className={`transition-all duration-300 ${
                  sectionMode ? 'cursor-pointer' : ''
                } ${
                  selectedProjects.includes('seo-optimizer') ? 'border-2 border-dashed border-gray-600' : ''
                }`}
                style={{ 
                  width: '1400px',
                  minWidth: '1400px',
                  flexShrink: 0
                }}
                onClick={() => handleProjectSelection('seo-optimizer')}
              >
              {/* Main Heading */}
              <div className="text-left mb-6 relative">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-2 text-gray-900">
                      SEO Optimizer
                    </h1>
                    <p className="text-lg text-gray-600">
                      AI-powered SEO analysis and optimization for better search rankings
                    </p>
                  </div>
                  <button 
                    onClick={() => setExpandedCards(prev => prev.filter(id => id !== 'seo-optimizer'))}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-gray-700"
                  >
                    <RiCloseLine size={24} />
                  </button>
                </div>
              </div>
              
              {/* Notification Banner */}
              <div 
                className="mb-8 p-4 rounded-2xl border flex items-center gap-4"
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  borderColor: '#E5E7EB',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: DARK_PALETTE.secondary }}
                  >
                    <RiSearchEyeLine size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">AI Agent: SEO Analyzer</div>
                    <div className="text-xs text-gray-600">Ready to optimize your search rankings</div>
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-500">Active</span>
                </div>
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
                  `
                }}
              >
                <div className="flex gap-6 p-6">
                  {/* Left Section - SEO Analysis (70%) */}
                  <div 
                    className="w-[70%] rounded-2xl p-8"
                    style={{
                      background: 'rgba(255, 255, 255, 0.8)',
                      minHeight: 'auto'
                    }}
                  >
                    {/* SEO Analysis Header */}
                    <div className="flex items-center gap-4 mb-8">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: DARK_PALETTE.secondary }}
                      >
                        <RiSearchEyeLine size={24} className="text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">SEO Analysis</h2>
                        <p className="text-gray-600">Comprehensive SEO audit and optimization recommendations</p>
                      </div>
                    </div>

                    {/* URL Input Section */}
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Website URL
                        </label>
                        <div className="flex gap-3">
                          <input
                            type="url"
                            value={storeUrl}
                            onChange={(e) => setStoreUrl(e.target.value)}
                            placeholder="https://your-website.com"
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                          />
                          <button
                            onClick={() => alert('SEO Analysis - Coming Soon!')}
                            className="px-6 py-3 text-white font-medium rounded-lg transition-all duration-300 hover:opacity-90"
                            style={{ backgroundColor: DARK_PALETTE.secondary }}
                          >
                            Analyze SEO
                          </button>
                        </div>
                      </div>

                      {/* SEO Metrics Preview */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">85</div>
                          <div className="text-sm text-gray-600">SEO Score</div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">12</div>
                          <div className="text-sm text-gray-600">Keywords Ranking</div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">3</div>
                          <div className="text-sm text-gray-600">Issues Found</div>
                        </div>
                      </div>

                      {/* SEO Recommendations */}
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-gray-900">Top Recommendations</h3>
                        <div className="space-y-2">
                          {[
                            'Optimize meta descriptions for better CTR',
                            'Add alt text to 8 images',
                            'Improve page loading speed',
                            'Fix broken internal links'
                          ].map((recommendation, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                              </div>
                              <span className="text-sm text-gray-700">{recommendation}</span>
                              <button className="ml-auto text-xs text-blue-600 hover:text-blue-800">
                                Fix Now
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Section - AI SEO Assistant (30%) */}
                  <div 
                    className="w-[30%] rounded-2xl flex flex-col border"
                    style={{
                      background: 'rgba(255, 255, 255, 0.8)',
                      borderColor: '#E5E7EB',
                      minHeight: 'auto'
                    }}
                  >
                    {/* SEO Chat Header */}
                    <div className="p-4 border-b" style={{ borderColor: '#E5E7EB' }}>
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: DARK_PALETTE.secondary }}
                        >
                          <RiSearchEyeLine size={16} className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-sm text-gray-900">
                            SEO Assistant
                          </h3>
                          <p className="text-xs text-gray-600">AI-powered SEO guidance</p>
                        </div>
                      </div>
                    </div>

                    {/* SEO Chat Messages */}
                    <div className="flex-1 p-4 space-y-3">
                      <div className="flex justify-start">
                        <div className="max-w-[85%] mr-8">
                          <div
                            className="px-4 py-3 rounded-lg text-sm"
                            style={{
                              backgroundColor: '#E5E7EB',
                              color: '#374151'
                            }}
                          >
                            <div>Hi! I'm your SEO assistant. I can help you optimize your website for search engines. What would you like to improve?</div>
                            <div className="text-xs mt-2 text-gray-500">
                              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SEO Chat Input */}
                    <div 
                      className="border-t p-4"
                      style={{ borderColor: '#E5E7EB' }}
                    >
                      <div className="mb-3">
                        <textarea
                          placeholder="Ask about SEO best practices..."
                          rows={2}
                          className="w-full resize-none outline-none text-sm p-3 rounded-lg border"
                          style={{
                            backgroundColor: '#FFFFFF',
                            borderColor: '#E5E7EB',
                            color: '#374151',
                            fontFamily: 'Inter, sans-serif'
                          }}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button 
                            className="p-2 rounded-lg transition-colors"
                            style={{ 
                              color: '#6B7280',
                              backgroundColor: 'transparent'
                            }}
                          >
                            <RiAttachmentLine size={18} />
                          </button>
                          <button 
                            className="p-2 rounded-lg transition-colors"
                            style={{ 
                              color: '#6B7280',
                              backgroundColor: 'transparent'
                            }}
                          >
                            <RiMicLine size={18} />
                          </button>
                        </div>
                        
                        <button 
                          className="p-2 rounded-lg transition-all duration-300"
                          style={{
                            backgroundColor: DARK_PALETTE.secondary,
                            color: '#FFFFFF'
                          }}
                        >
                          <RiArrowUpSLine size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                        )}
          </div>
        </div>
      </div>

      {/* Minimal User Profile & Controls */}
      <div className="fixed top-4 right-4 flex items-center gap-4">
        {/* User Profile Icons */}
        <div 
          className="flex items-center gap-1 p-1 rounded-3xl backdrop-blur-xl border border-white/40"
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
            <RiNotification3Line size={18} style={{ color: DARK_PALETTE.tertiary }} />
          </button>
          <button 
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={() => alert('Settings - Coming Soon!')}
          >
            <RiSettings3Line size={18} style={{ color: DARK_PALETTE.tertiary }} />
          </button>
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F9FAFB' }}>
            <RiUser3Line size={18} style={{ color: '#6B7280' }} />
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

      {/* Navigation Toggle */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <div 
          className="rounded-full shadow-xl border border-white/40 p-2 flex items-center gap-2 backdrop-blur-xl"
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
          {!showAiSearch ? (
            <>
              {/* Section Button */}
              <button 
                className={`p-3 rounded-full transition-all duration-300 ${
                  sectionMode ? 'text-white' : 'text-gray-600 hover:text-gray-800'
                }`}
                style={{ 
                  backgroundColor: sectionMode ? DARK_PALETTE.tertiary : 'transparent',
                  cursor: sectionMode ? 'pointer' : 'default'
                }}
                onClick={handleSectionClick}
                title={sectionMode && selectedProjects.length > 0 ? 'Create Section' : 'Section Mode'}
              >
                <SectionIcon size={20} />
              </button>
              
              {/* Home Button */}
              <button 
                className="p-3 rounded-full transition-all duration-300 text-white"
                style={{ backgroundColor: DARK_PALETTE.primary }}
                onClick={() => resetView()}
              >
                <RiHomeLine size={20} />
              </button>
              
              {/* AI Search Button */}
              <button 
                className="p-3 rounded-full transition-all duration-300 text-gray-600 hover:text-gray-800"
                style={{ backgroundColor: 'transparent' }}
                onClick={() => setShowAiSearch(true)}
              >
                <StarIcon size={20} />
              </button>
            </>
          ) : (
            /* Expanded AI Search Bar */
            <div className="flex items-center gap-4 px-4 py-2 min-w-96">
              <RiSearchLine size={20} style={{ color: DARK_PALETTE.tertiary }} />
              <input
                type="text"
                placeholder="Ask AI anything..."
                className="flex-1 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
                autoFocus
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
                  style={{ backgroundColor: DARK_PALETTE.primary }}
                >
                  <RiArrowUpSLine size={16} />
                </button>
                <button 
                  className="p-2 rounded-full text-gray-600 hover:text-gray-800 transition-colors"
                  onClick={() => setShowAiSearch(false)}
                >
                  <RiCloseLine size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>



      {/* Section Mode Indicator */}
      {sectionMode && (
        <div className="fixed top-4 left-4 bg-gray-800 text-white rounded-lg px-4 py-2 shadow-lg text-sm font-medium">
          <div className="flex items-center gap-2">
            <SectionIcon size={16} />
            <span>
              {selectedProjects.length === 0 
                ? 'Click projects to select them for sectioning'
                : `${selectedProjects.length} project${selectedProjects.length > 1 ? 's' : ''} selected`
              }
            </span>
          </div>
        </div>
      )}

      {/* Instructions */}
      {sectionMode && (
        <div className="fixed bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg text-sm text-gray-600 max-w-xs">
          <div className="text-gray-700 font-medium">
            • Click projects to group them
          </div>
        </div>
      )}

      {/* Add Task Modal - Full Viewport Overlay */}
      {showAddTask && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setShowAddTask(false)} />
          <div className="relative w-full max-w-xl mx-4 rounded-2xl border border-white/40 backdrop-blur-2xl p-6 shadow-2xl" style={{ background: 'rgba(255,255,255,0.95)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Create Task</h3>
              <button className="p-1 rounded-lg hover:bg-gray-100 text-gray-500" onClick={() => setShowAddTask(false)}>
                <RiCloseLine size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Task name</label>
                <input
                  value={newTaskName}
                  onChange={(e) => setNewTaskName(e.target.value)}
                  placeholder="e.g., Conversion Uplift Assistant"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': '#A5D6A7' } as React.CSSProperties}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Description</label>
                <textarea
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                  rows={3}
                  placeholder="What should this agent do?"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': '#A5D6A7' } as React.CSSProperties}
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  className="px-4 py-2 rounded-lg text-white"
                  style={{ backgroundColor: DARK_PALETTE.primary }}
                  onClick={() => addCustomTask(newTaskName, newTaskDesc || 'Custom AI task')}
                  disabled={!newTaskName.trim()}
                >
                  Save Task
                </button>
                <button
                  className="px-4 py-2 rounded-lg text-gray-700 border"
                  style={{ borderColor: '#E5E7EB', background: '#FFFFFF' }}
                  onClick={() => setShowTemplates(v => !v)}
                >
                  {showTemplates ? 'Hide Templates' : 'Choose from Templates'}
                </button>
              </div>

              {showTemplates && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {TEMPLATES.map(t => (
                    <button
                      key={t.id}
                      className="text-left rounded-xl border p-3 hover:shadow transition bg-white"
                      style={{ borderColor: '#E5E7EB' }}
                      onClick={() => addTemplateTask(t.id)}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: t.iconBg }}>
                          {(() => { const I = t.icon; return <I size={16} /> })()}
                        </div>
                        <div className="font-medium text-gray-900">{t.title}</div>
                      </div>
                      <div className="text-xs text-gray-600">{t.subtitle}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

