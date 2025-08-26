import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  RiHealthBookLine,
  RiSearchEyeLine,
  RiAddLine,
  RiNotification3Line,
  RiSettings3Line,
  RiUser3Line,
  RiSearchLine,
  RiMicLine,
  RiAttachmentLine
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
  const canvasRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

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

  // Handle task card click
  const handleTaskClick = (taskId: string) => {
    if (taskId === 'store-health') {
      // Navigate to the existing store health check flow
      navigate('/diagnostics/scanning', { 
        state: { storeUrl: 'demo-store.myshopify.com' } 
      })
    } else {
      // For other tasks, show coming soon
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
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border border-gray-200"
                  onClick={() => handleTaskClick(task.id)}
                  style={{ width: '380px', height: '220px' }}
                >
                  <div className="flex flex-col h-full">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-white mb-4"
                      style={{ backgroundColor: task.iconBg }}
                    >
                      <IconComponent size={24} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:opacity-80 transition-opacity" style={{ color: '#9F7E4C' }}>
                      {task.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed flex-1">
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
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border-2 border-dashed hover:border-opacity-60"
              onClick={() => alert('Add new AI agent task - Coming Soon!')}
              style={{ 
                width: '380px', 
                height: '220px',
                borderColor: '#9F7E4C'
              }}
            >
              <div className="flex flex-col items-center justify-center h-full text-gray-500 transition-colors" style={{ color: '#9F7E4C' }}>
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
        </div>
      </div>

      {/* User Profile & Controls */}
      <div className="fixed top-4 right-4 flex flex-col gap-3">
        {/* User Profile Section */}
        <div className="bg-white rounded-xl p-3 shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#9F7E4C' }}>
              <RiUser3Line size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-800">Sarah M.</div>
              <div className="text-xs text-gray-500">Product Manager</div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button 
              className="flex-1 flex items-center justify-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => alert('Notifications - Coming Soon!')}
            >
              <RiNotification3Line size={18} style={{ color: '#9F7E4C' }} />
            </button>
            <button 
              className="flex-1 flex items-center justify-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => alert('Settings - Coming Soon!')}
            >
              <RiSettings3Line size={18} style={{ color: '#9F7E4C' }} />
            </button>
          </div>
        </div>

        {/* Canvas Controls */}
        <div className="bg-white rounded-xl p-3 shadow-lg">
          <button
            onClick={resetView}
            className="w-full mb-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors rounded-lg"
          >
            Reset View
          </button>
          <div className="text-xs text-gray-600 text-center">
            Zoom: {Math.round(zoom * 100)}%
          </div>
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
              className="px-4 py-1 rounded-full text-white text-sm font-medium transition-colors hover:opacity-90"
              style={{ backgroundColor: '#9F7E4C' }}
            >
              ↑
            </button>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="fixed bottom-4 left-4 bg-white rounded-lg px-4 py-2 shadow-lg text-sm text-gray-600 max-w-xs">
        <div className="font-medium mb-1">Canvas Controls:</div>
        <div>• Scroll to zoom in/out</div>
        <div>• Drag to pan around</div>
        <div>• Click cards to start tasks</div>
      </div>
    </div>
  )
}
