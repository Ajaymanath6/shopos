import { useState, useEffect, useRef } from 'react'
import { RiSparklingFill, RiCloseLine, RiSearchLine, RiMicLine, RiSendPlaneLine, RiEyeLine, RiHeartLine, RiStarLine } from '@remixicon/react'

// Custom bouncing keyframes for smooth animation
const bounceInAnimation = `
@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  
  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }
  
  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }
  
  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }
  
  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }
  
  100% {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}

@keyframes bounceOut {
  0% {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
  
  20% {
    transform: scale3d(0.97, 0.97, 0.97);
  }
  
  40% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }
  
  60% {
    transform: scale3d(0.9, 0.9, 0.9);
  }
  
  80% {
    transform: scale3d(1.1, 1.1, 1.1);
  }
  
  100% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
}

.bounce-in {
  animation: bounceIn 0.75s;
}

.bounce-in-reverse {
  animation: bounceOut 0.75s;
}
`

// Add the styles to the document head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.type = 'text/css'
  styleSheet.innerText = bounceInAnimation
  document.head.appendChild(styleSheet)
}

interface SmartSuggestOrbProps {
  isVisible: boolean
  onClose: () => void
  userLocation?: string
  productCategory?: string
  isOnProduct?: boolean
  onExpanded?: (expanded: boolean) => void
}

interface SuggestionProduct {
  id: string
  name: string
  image: string
  price: string
  description: string
}

const KERALA_TEA_SUGGESTIONS: SuggestionProduct[] = [
  {
    id: 'kerala-mural-tea-set',
    name: 'Kerala Mural Art Tea Set',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=200&h=200&fit=crop&crop=center',
    price: '$34.99',
    description: 'Traditional Kerala mural designs'
  },
  {
    id: 'theyyam-inspired-mug',
    name: 'Theyyam Inspired Tea Mug',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=200&h=200&fit=crop&crop=center',
    price: '$24.99',
    description: 'Hand-painted Theyyam art'
  },
  {
    id: 'backwater-serenity-set',
    name: 'Backwater Serenity Tea Collection',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=200&h=200&fit=crop&crop=center',
    price: '$39.99',
    description: 'Kerala backwater landscapes'
  }
]

export default function SmartSuggestOrb({ 
  isVisible, 
  onClose, 
  userLocation = 'Kerala',
  productCategory = 'tea',
  isOnProduct = false,
  onExpanded
}: SmartSuggestOrbProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showSeeMore, setShowSeeMore] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [inputText, setInputText] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [inputMode, setInputMode] = useState<'search' | 'voice' | null>(null)
  const orbRef = useRef<HTMLDivElement>(null)

  const handleOrbClick = () => {
    setShowSeeMore(true)
  }

  // Auto-expand after 1 second when orb becomes visible
  useEffect(() => {
    if (isVisible && !showSeeMore && !isExpanded) {
      const autoExpandTimeout = setTimeout(() => {
        setShowSeeMore(true)
      }, 1000) // Auto-expand after 1 second
      
      return () => clearTimeout(autoExpandTimeout)
    }
  }, [isVisible, showSeeMore, isExpanded])

  const handleSeeMoreClick = () => {
    setIsExpanded(true)
    onExpanded?.(true) // Notify parent that orb is now expanded
    // Delay showing suggestions to allow morphing animation to complete
    setTimeout(() => {
      setShowSuggestions(true)
    }, 300)
  }

  const handleClose = () => {
    setShowSuggestions(false)
    setIsExpanded(false)
    setShowSeeMore(false)
    setInputMode(null)
    setInputText('')
    setIsListening(false)
    onExpanded?.(false) // Notify parent that orb is no longer expanded
    setTimeout(() => {
      onClose()
    }, 300)
  }

  const handleSearchClick = () => {
    setInputMode('search')
    setShowSuggestions(true)
  }

  const handleVoiceClick = () => {
    setInputMode('voice')
    setIsListening(!isListening)
    // Voice recognition would be implemented here
    if (!isListening) {
      // Start voice recognition
      console.log('Starting voice recognition...')
    } else {
      // Stop voice recognition
      console.log('Stopping voice recognition...')
    }
  }

  const handleSendInput = () => {
    if (inputText.trim()) {
      setShowSuggestions(true)
      // Process the input and show relevant suggestions
      console.log('Processing input:', inputText)
    }
  }

  // Reset states when visibility changes
  useEffect(() => {
    if (!isVisible) {
      setIsExpanded(false)
      setShowSuggestions(false)
      setShowSeeMore(false)
      setInputMode(null)
      setInputText('')
      setIsListening(false)
      onExpanded?.(false) // Notify parent that orb is no longer expanded
    }
  }, [isVisible, onExpanded])

  if (!isVisible) return null

  return (
    <>
      {/* Container positioning - different for canvas vs product image */}
      <div 
        className={`${isOnProduct ? 'absolute' : 'fixed'} z-50 pointer-events-none inset-0`}
        style={{ background: 'transparent' }}
      >
        <div 
          ref={orbRef}
          className={`absolute pointer-events-auto ${
            isOnProduct
              ? isExpanded 
                ? 'top-3 right-3 transform origin-top-right' // Stay anchored to top-right corner when expanded
                : 'top-3 right-3' // Always stay in same position, just expand in place
              : 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' // Center when on canvas
          }`}
        >
        {/* Morphing Orb Container */}
        <div
          className={`transition-all duration-300 ease-out transform ${
            isExpanded 
              ? 'w-96 h-64 rounded-3xl scale-100' // Smaller height with fully rounded corners
              : showSeeMore
                ? 'w-80 h-16 rounded-full scale-100' // Keep same line height with fully rounded corners
                : `w-12 h-12 rounded-full ${isVisible ? 'scale-100 opacity-100 bounce-in' : 'scale-0 opacity-0 bounce-in-reverse'}` // Bouncing animation in both directions
          }`}
          style={{
            background: isExpanded 
              ? '#ffffff' // White background
              : showSeeMore 
                ? 'rgba(255, 255, 255, 0.95)' // White with transparency
                : 'transparent', // Transparent for glass-morphism orb
            backdropFilter: (isExpanded || showSeeMore) ? 'blur(12px)' : 'none',
            border: (isExpanded || showSeeMore) ? '1px solid rgba(229, 231, 235, 0.8)' : 'none',
            boxShadow: (isExpanded || showSeeMore)
              ? '0 10px 25px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1)'
              : 'none' // No shadow for initial orb (handled by inner glass element)
          }}
        >
          {!showSeeMore && !isExpanded ? (
            /* Apple-Style Initial Orb State */
            <div 
              className="w-full h-full flex items-center justify-center cursor-pointer group relative"
              onClick={handleOrbClick}
            >
              {/* Apple-style Glass Morphism Orb */}
              <div 
                className="w-full h-full rounded-full backdrop-blur-xl border border-white/20 flex items-center justify-center relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  boxShadow: `
                    0 4px 16px rgba(4, 120, 87, 0.3),
                    inset 0 1px 0 rgba(255,255,255,0.2)
                  `
                }}
              >
                {/* Subtle breathing animation */}
                <div 
                  className="absolute inset-0 rounded-full animate-pulse"
                  style={{
                    background: 'radial-gradient(circle, rgba(4,120,87,0.3) 0%, transparent 70%)',
                    animationDuration: '3s'
                  }}
                />
                
                {/* Main AI Icon */}
                <RiSparklingFill 
                  size={20} 
                  className="text-white relative z-10" 
                />
              </div>
              
              {/* Side Text */}
              <div className="absolute left-10 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                <div className="text-black text-sm font-medium whitespace-nowrap">
                  Hey Ajay! Want to see more?
                </div>
              </div>
            </div>
          ) : showSeeMore && !isExpanded ? (
            /* Orb with Side Text State - Same Line */
            <div className="w-full h-full flex items-center justify-between p-2">
              {/* AI Orb */}
              <div 
                className="w-12 h-12 rounded-full backdrop-blur-xl border border-white/20 flex items-center justify-center relative overflow-hidden cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  boxShadow: `
                    0 4px 16px rgba(4, 120, 87, 0.3),
                    inset 0 1px 0 rgba(255,255,255,0.2)
                  `
                }}
                onClick={handleSeeMoreClick}
              >
                <RiSparklingFill size={20} className="text-white" />
              </div>
              
              {/* Text beside orb */}
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium" style={{ color: '#374151' }}>
                  Hey Ajay! More regional mugs 
                  <button
                    onClick={handleSeeMoreClick}
                    className="ml-1 underline underline-offset-2 hover:no-underline transition-all"
                    style={{ color: '#059669' }} 
                  >
                    for you
                  </button>
                </span>
              </div>
            </div>
          ) : (
            /* Expanded Chat Interface */
            <div className="w-full h-full flex flex-col overflow-hidden rounded-3xl">
              {/* Header */}
              <div className="flex items-center justify-between p-3 rounded-t-3xl" style={{ borderBottom: '1px solid rgba(229, 231, 235, 0.2)', background: '#ffffff' }}>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                    }}
                  >
                    <RiSparklingFill size={16} className="text-white" />
                  </div>
                </div>
                <button 
                  onClick={handleClose}
                  className="p-1.5 rounded-lg transition-all hover:bg-gray-50"
                  style={{
                    background: 'rgba(249, 250, 251, 0.5)',
                    border: '1px solid rgba(229, 231, 235, 0.3)',
                  }}
                >
                  <RiCloseLine size={16} style={{ color: '#6B7280' }} />
                </button>
              </div>

              {/* Scrollable Content Area */}
              <div className="flex-1 p-3 overflow-y-auto" style={{ background: '#ffffff' }}>
                <div className="space-y-2">
                  {KERALA_TEA_SUGGESTIONS.map((product, index) => (
                    <div 
                      key={product.id}
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition-all duration-300 cursor-pointer group animate-fadeIn"
                        style={{
                          background: 'rgba(249, 250, 251, 0.7)', // Lighter background
                          border: '1px solid rgba(229, 231, 235, 0.4)',
                          animationDelay: `${index * 0.15}s`
                        }}
                    >
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-xs truncate mb-1" style={{ color: '#111827' }}>
                          {product.name}
                        </h4>
                        <p className="text-xs mb-1.5" style={{ color: '#6B7280' }}>
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs" style={{ color: '#059669' }}>
                            {product.price}
                          </span>
                          <button 
                            className="text-xs text-white px-2.5 py-1 rounded-lg transition-all duration-200 font-medium"
                            style={{
                              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.opacity = '0.9'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.opacity = '1'
                            }}
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer - Search Bar and Voice Input (Always Visible at Bottom) */}
              <div className="border-t p-3 rounded-b-3xl" style={{ borderColor: 'rgba(229, 231, 235, 0.3)', background: '#ffffff' }}>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Ask me anything, Ajay..."
                      className="w-full px-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 text-sm"
                      style={{
                        background: 'rgba(249, 250, 251, 0.8)', // Cleaner input background
                        border: '1px solid rgba(209, 213, 219, 0.5)',
                        color: '#111827' // Darker text
                      }}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendInput()}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#047857' // Darker green focus
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(4, 120, 87, 0.1)'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(209, 213, 219, 0.5)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    />
                  </div>
                  <button
                    onClick={handleSendInput}
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                    style={{
                      background: 'rgba(249, 250, 251, 0.8)',
                      border: '1px solid rgba(209, 213, 219, 0.5)',
                      color: '#059669'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#047857'
                      e.currentTarget.style.background = 'rgba(249, 250, 251, 1)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(209, 213, 219, 0.5)'
                      e.currentTarget.style.background = 'rgba(249, 250, 251, 0.8)'
                    }}
                  >
                    <RiSendPlaneLine size={16} />
                  </button>
                  <button
                    onClick={handleVoiceClick}
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                    style={{
                      background: 'rgba(249, 250, 251, 0.8)',
                      border: '1px solid rgba(209, 213, 219, 0.5)',
                      color: '#059669'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#047857'
                      e.currentTarget.style.background = 'rgba(249, 250, 251, 1)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(209, 213, 219, 0.5)'
                      e.currentTarget.style.background = 'rgba(249, 250, 251, 0.8)'
                    }}
                  >
                    <RiMicLine size={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        </div>

      </div>
    </>
  )
}
