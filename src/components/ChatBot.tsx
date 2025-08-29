import React, { useState } from 'react'
import { 
  RiAttachmentLine,
  RiMicLine,
  RiArrowUpSLine,
  RiStarFill,
  RiFocus3Line,
  RiCheckLine
} from '@remixicon/react'

// Dark Gray Monochromatic Palette
const DARK_PALETTE = {
  primary: '#1F2937',    // Dark gray
  secondary: '#374151',  // Medium gray  
  tertiary: '#4B5563',   // Light gray
  accent: '#6B7280',     // Lighter gray
  light: '#9CA3AF'       // Very light gray
}

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

interface ChatBotProps {
  title?: string
  subtitle?: string
  placeholder?: string
  className?: string
  style?: React.CSSProperties
  initialMessages?: ChatMessage[]
}

export default function ChatBot({ 
  title = "Shopping Assistant",
  subtitle = "Enterprise AI",
  placeholder = "Ask about products, orders, or anything else...",
  className = "",
  style = {},
  initialMessages = []
}: ChatBotProps) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(
    initialMessages.length > 0 ? initialMessages : [
      { 
        id: '1',
        role: 'ai', 
        content: 'Hi! I\'m your AI assistant. How can I help you today?',
        timestamp: new Date().toISOString(),
        state: 'completed',
        icon: 'RiStarFill'
      }
    ]
  )
  const [chatInput, setChatInput] = useState('')
  const [isAiThinking] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [systemFeedback, setSystemFeedback] = useState<SystemFeedback>({
    isVisible: false,
    state: 'waiting',
    subtasks: []
  })

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
        { id: '1', text: 'Analysis: Processing your request and identifying key requirements', completed: false },
        { id: '2', text: 'Plan: Developing structured approach to address your needs', completed: false },
        { id: '3', text: 'Execution: Implementing solution and gathering relevant information', completed: false },
        { id: '4', text: 'Reflection: Reviewing results and preparing comprehensive response', completed: false }
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
                ? "Analysis: I can see you're interested in a comprehensive store analysis. Let me break this down systematically.\n\nPlan: I'll examine your optimization opportunities, calculate performance metrics, and provide prioritized recommendations.\n\nExecution: Based on my analysis, I've identified 8 key optimization opportunities with your current health score at 76%. The most impactful improvements focus on performance bottlenecks and conversion optimization.\n\nReflection: This assessment provides a solid foundation for growth. Would you like me to prioritize these fixes by potential impact and implementation complexity?"
                : userMessage.content.toLowerCase().includes('products')
                ? "Analysis: You're looking for product-related assistance. Let me understand your specific needs to provide the most relevant recommendations.\n\nPlan: I'll need details about your product requirements to deliver accurate suggestions.\n\nExecution: I can help you find products, but I'd need more specific criteria to provide the most valuable recommendations.\n\nReflection: Could you specify what type of products you're looking for? Details like price range, brand preferences, or specific features would help me provide more targeted assistance."
                : "Analysis: I understand your request and I'm ready to help. Let me process what you're asking for.\n\nPlan: I'll analyze your specific needs and provide the most relevant information and actionable recommendations.\n\nExecution: I've reviewed your request and prepared comprehensive information based on the details you've provided.\n\nReflection: I've provided the most relevant information and recommendations for your specific situation. Does this address what you were looking for?",
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

  return (
    <div
      className={`rounded-2xl flex flex-col border ${className}`}
      style={{
        background: 'rgba(255, 255, 255, 0.8)',
        borderColor: '#E5E7EB',
        minHeight: 'auto',
        ...style
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
              {title}
            </h3>
            <p className="text-xs text-gray-600">{subtitle}</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto" style={{ maxHeight: '400px' }}>
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
                <div>
                  {message.content.split('\n').map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < message.content.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </div>
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

      {/* Chat Input */}
      <div className="border-t p-4" style={{ borderColor: '#E5E7EB' }}>
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
            placeholder={placeholder}
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
              onMouseEnter={(e) => e.currentTarget.style.color = DARK_PALETTE.primary}
              onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}
            >
              <RiAttachmentLine size={18} />
            </button>
            
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
  )
}
