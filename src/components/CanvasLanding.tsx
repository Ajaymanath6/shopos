import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import shopOSLogo from '../assets/Shop OS logo.svg'

interface TaskCard {
  id: string
  title: string
  subtitle: string
  icon: string
  color: string
}

const taskCards: TaskCard[] = [
  {
    id: 'store-health',
    title: 'Store Health Check',
    subtitle: 'Connect your Shopify store for an instant AI diagnostic',
    icon: '🏥',
    color: 'bg-blue-500'
  },
  {
    id: 'seo-optimizer',
    title: 'SEO Optimizer',
    subtitle: 'AI-powered SEO analysis and optimization',
    icon: '🔍',
    color: 'bg-green-500'
  },
  {
    id: 'conversion-booster',
    title: 'Conversion Booster',
    subtitle: 'Identify and fix conversion bottlenecks',
    icon: '📈',
    color: 'bg-purple-500'
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
          <div className="grid grid-cols-2 gap-8 max-w-4xl">
            {/* Task Cards */}
            {taskCards.map((task) => (
              <div
                key={task.id}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border border-gray-200"
                onClick={() => handleTaskClick(task.id)}
                style={{ width: '280px', height: '200px' }}
              >
                <div className="flex flex-col h-full">
                  <div className={`w-12 h-12 ${task.color} rounded-xl flex items-center justify-center text-white text-xl mb-4`}>
                    {task.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {task.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">
                    {task.subtitle}
                  </p>
                  <div className="mt-4 text-blue-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to start →
                  </div>
                </div>
              </div>
            ))}

            {/* Add New Task Card */}
            <div
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border-2 border-dashed border-gray-300 hover:border-blue-400"
              onClick={() => alert('Add new AI agent task - Coming Soon!')}
              style={{ width: '280px', height: '200px' }}
            >
              <div className="flex flex-col items-center justify-center h-full text-gray-500 group-hover:text-blue-500 transition-colors">
                <div className="w-12 h-12 border-2 border-current rounded-xl flex items-center justify-center text-2xl mb-4">
                  +
                </div>
                <h3 className="text-lg font-medium mb-2">
                  Add New Task
                </h3>
                <p className="text-sm text-center">
                  Create a new AI agent for your store
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="fixed top-4 right-4 flex flex-col gap-2">
        <button
          onClick={resetView}
          className="bg-white rounded-lg px-4 py-2 shadow-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Reset View
        </button>
        <div className="bg-white rounded-lg px-4 py-2 shadow-lg text-sm text-gray-600">
          Zoom: {Math.round(zoom * 100)}%
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
