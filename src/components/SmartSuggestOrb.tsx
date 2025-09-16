import { useState, useEffect, useRef } from 'react'
import { RiSparklingFill, RiCloseLine, RiSearchLine, RiMicLine, RiSendPlaneLine, RiEyeLine, RiHeartLine, RiStarLine, RiBrainLine, RiLoader4Fill, RiCheckLine, RiUser3Line } from '@remixicon/react'

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

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateX(10px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out;
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
  mode?: 'discovery' | 'help'
  showTooltipImmediately?: boolean
}

interface SuggestionProduct {
  id: string
  name: string
  image: string
  price: string
  description: string
}

interface ConversationMessage {
  id: string
  type: 'thinking' | 'analyzing' | 'result'
  content: string
  timestamp: number
  isTyping: boolean
  icon?: React.ComponentType<{ size?: string | number }>
  statusIndicator?: string
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

// Voice responses for discovery mode (regional designs)
const DISCOVERY_VOICE_RESPONSES = [
  "Show me the cheapest regional tea designs you found.",
  "Which Kerala-style tea set has the best traditional patterns?",
  "Can you find some regional mugs under $25?",
  "What's the most authentic Kerala design you discovered?",
  "Show me those Theyyam-inspired tea designs you mentioned.",
  "Are there any regional tea sets with modern twists on traditional patterns?",
  "Which regional design would make the best gift?",
  "Can you find any limited edition Kerala tea collections?",
  "Show me the most colorful regional tea designs available.",
  "What's the difference between these Kerala designs and regular tea sets?"
]

// Voice responses for help mode (tea ingredients and brewing) - matched pairs
const HELP_VOICE_QUESTIONS = [
  "What are the main ingredients in this Earl Grey tea?",
  "How should I brew this tea for the best flavor?", 
  "Can I add milk and sugar to this Earl Grey?",
  "What's the caffeine content in this tea?",
  "What are those blue petals I see in the tea blend?",
  "Is this tea good for people with diabetes?",
  "Are there any health benefits to drinking Earl Grey?",
  "How many cups of this tea can I drink per day?",
  "What makes the bergamot flavor so special in this tea?",
  "Will this tea help me sleep or keep me awake?"
]

const HELP_AI_ANSWERS = [
  "This Earl Grey contains Ceylon black tea, natural bergamot oil from Italy, and cornflower petals. The bergamot gives it that distinctive citrus aroma and flavor.",
  "For best results, use water heated to 95°C (just below boiling). Steep for 3-5 minutes depending on your taste preference. Longer steeping can make it bitter.",
  "Absolutely! Adding milk creates a smoother, creamier taste. The bergamot pairs well with milk, and a touch of sugar or honey complements the citrus notes beautifully.",
  "Earl Grey contains 40-70mg of caffeine per cup, which is about half the amount in coffee. Perfect for those who want energy without the coffee jitters.",
  "Those are cornflower petals! They're added for visual appeal and give a subtle floral note that complements the bergamot. They're completely safe and edible.",
  "Earl Grey can be enjoyed by diabetics since it's naturally sugar-free. The black tea may even help with blood sugar regulation, but always consult your doctor about dietary changes.",
  "Earl Grey is rich in antioxidants from the black tea, and bergamot oil may help with digestion and stress relief. It's also lower in caffeine than coffee.",
  "You can safely enjoy 3-4 cups per day. With 40-70mg caffeine per cup, that's well within healthy limits and provides steady energy throughout the day.",
  "Bergamot oil comes from the rind of bergamot oranges grown in Calabria, Italy. It gives Earl Grey that distinctive floral-citrus aroma that sets it apart from other teas.",
  "Earl Grey contains moderate caffeine (40-70mg), so it will provide gentle energy rather than make you sleepy. Avoid drinking it 4-6 hours before bedtime."
]

export default function SmartSuggestOrb({ 
  isVisible, 
  onClose, 
  userLocation = 'Kerala',
  productCategory = 'tea',
  isOnProduct = false,
  onExpanded,
  mode = 'discovery',
  showTooltipImmediately = false
}: SmartSuggestOrbProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showSeeMore, setShowSeeMore] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [inputText, setInputText] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [inputMode, setInputMode] = useState<'search' | 'voice' | null>(null)
  const [showTooltip, setShowTooltip] = useState(false)
  const [isInConversation, setIsInConversation] = useState(false)
  const [conversationMessages, setConversationMessages] = useState<ConversationMessage[]>([])
  const [showConversationSkeleton, setShowConversationSkeleton] = useState(false)
  const [isVoiceRecording, setIsVoiceRecording] = useState(false)
  const [showVoiceAnimation, setShowVoiceAnimation] = useState(false)
  const [isAiResponding, setIsAiResponding] = useState(false)
  const [selectedHelpIndex, setSelectedHelpIndex] = useState<number | null>(null)
  const orbRef = useRef<HTMLDivElement>(null)
  const voiceTimeoutRef = useRef<number | null>(null)

  // Add typing message function
  const addTypingMessage = ({ type, content, icon, statusIndicator }: {
    type: 'thinking' | 'analyzing' | 'result'
    content: string
    icon?: React.ComponentType<{ size?: string | number }>
    statusIndicator?: string
  }) => {
    const newMessage: ConversationMessage = {
      id: Date.now().toString(),
      type,
      content: '',
      timestamp: Date.now(),
      isTyping: true,
      icon,
      statusIndicator
    }

    setConversationMessages(prev => [...prev, newMessage])

    // Update status indicator first if provided
    if (statusIndicator) {
      setConversationMessages(prev => prev.map(msg => 
        msg.id === newMessage.id 
          ? { ...msg, content: statusIndicator, icon: RiLoader4Fill }
          : msg
      ))
      
      // Wait before starting typing animation
      setTimeout(() => {
        let currentIndex = 0
        const fullContent = content
        
        const typeChar = () => {
          if (currentIndex < fullContent.length) {
            setConversationMessages(prev => prev.map(msg => 
              msg.id === newMessage.id 
                ? { ...msg, content: fullContent.substring(0, currentIndex + 1), icon: icon || RiBrainLine }
                : msg
            ))
            currentIndex++
            setTimeout(typeChar, 30) // 30ms per character for smooth typing
          } else {
            // Finished typing
            setConversationMessages(prev => prev.map(msg => 
              msg.id === newMessage.id 
                ? { ...msg, isTyping: false }
                : msg
            ))
          }
        }
        typeChar()
      }, 1000)
    } else {
      // Direct typing without status indicator
      let currentIndex = 0
      const fullContent = content
      
      const typeChar = () => {
        if (currentIndex < fullContent.length) {
          setConversationMessages(prev => prev.map(msg => 
            msg.id === newMessage.id 
              ? { ...msg, content: fullContent.substring(0, currentIndex + 1) }
              : msg
          ))
          currentIndex++
          setTimeout(typeChar, 30)
        } else {
          setConversationMessages(prev => prev.map(msg => 
            msg.id === newMessage.id 
              ? { ...msg, isTyping: false }
              : msg
          ))
        }
      }
      setTimeout(typeChar, 300)
    }
  }

  // Ingredients analysis sequence
  const startIngredientsAnalysis = () => {
    setIsInConversation(true)
    setShowSuggestions(false)
    setShowConversationSkeleton(true)
    // Don't clear existing messages, append to conversation

    // Hide skeleton after short delay
    setTimeout(() => {
      setShowConversationSkeleton(false)
    }, 800)

    // Analysis sequence with progressive messages
    setTimeout(() => {
      addTypingMessage({
        type: 'thinking',
        content: "Analyzing Earl Grey tea composition and identifying key botanical ingredients...",
        icon: RiBrainLine,
        statusIndicator: 'SHOPOS_ANALYZING'
      })
    }, 1200)

    setTimeout(() => {
      addTypingMessage({
        type: 'analyzing',
        content: "Scanning flavor profiles, bergamot oil concentrations, and brewing parameters...",
        icon: RiSearchLine,
        statusIndicator: 'SHOPOS_PROCESSING'
      })
    }, 3000)

      setTimeout(() => {
        addTypingMessage({
          type: 'result',
          content: `**Earl Grey Premium Tea Analysis Complete**

**Primary Ingredients:**
• **Black Tea Base**: Ceylon & Indian Assam blend (85%)
• **Bergamot Oil**: Natural bergamot extract from Calabria (12%)
• **Cornflower Petals**: Dried blue cornflowers for visual appeal (3%)

**Brewing Specifications:**
• **Water Temperature**: 95°C (203°F)
• **Steeping Time**: 3-5 minutes
• **Tea-to-Water Ratio**: 1 tsp per 200ml

**Nutritional Profile:**
• **Caffeine Content**: 40-70mg per cup
• **Antioxidants**: Rich in theaflavins and catechins
• **Calories**: 2-4 per cup (without additives)

**Flavor Notes**: Citrusy bergamot aroma with robust black tea base, floral finish from cornflower petals.

**Best Served**: With honey or lemon, avoid milk to preserve bergamot essence.`,
          icon: RiCheckLine,
          statusIndicator: 'SHOPOS_COMPLETE'
        })
        
        // Don't show regional designs after ingredient analysis - help mode should stay focused on tea info
      }, 6500)
  }

  const handleOrbClick = () => {
    if (mode === 'help' && showTooltip) {
      // Help mode: clicking orb expands immediately
      setShowTooltip(false)
      setIsExpanded(true)
      onExpanded?.(true)
      setTimeout(() => {
        setShowSuggestions(true)
      }, 300)
    } else {
      setShowSeeMore(true)
    }
  }

  // Auto-expand and tooltip logic
  useEffect(() => {
    if (isVisible && !showSeeMore && !isExpanded) {
      if (mode === 'help') {
        // Help mode: show tooltip immediately, but don't auto-expand
        if (showTooltipImmediately) {
          setShowTooltip(true)
          // Just show tooltip, wait for user click to expand
        }
        // Don't auto-expand - wait for user interaction
      } else {
        // Discovery mode: show prompt first
        const autoExpandTimeout = setTimeout(() => {
          setShowSeeMore(true)
        }, 1000) // Auto-expand after 1 second
        
        return () => clearTimeout(autoExpandTimeout)
      }
    }
  }, [isVisible, showSeeMore, isExpanded, mode, onExpanded, showTooltipImmediately])

  const handleSeeMoreClick = () => {
    setIsExpanded(true)
    onExpanded?.(true) // Notify parent that orb is now expanded
    // Delay showing suggestions to allow morphing animation to complete
    // Only show suggestions if not in conversation, otherwise keep conversation visible
    if (!isInConversation) {
      setTimeout(() => {
        setShowSuggestions(true)
      }, 300)
    }
  }

  const handleClose = () => {
    setShowSuggestions(false)
    setIsExpanded(false)
    setShowSeeMore(false)
    setInputMode(null)
    setInputText('')
    setIsListening(false)
    setIsInConversation(false)
    setConversationMessages([]) // Only clear when user explicitly closes orb
    setShowConversationSkeleton(false)
    setIsVoiceRecording(false)
    setShowVoiceAnimation(false)
    setIsAiResponding(false)
    setSelectedHelpIndex(null)
    
    // Clear voice timeout
    if (voiceTimeoutRef.current) {
      clearTimeout(voiceTimeoutRef.current)
      voiceTimeoutRef.current = null
    }
    
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
    if (!isVoiceRecording) {
      // Start voice recording
      setIsVoiceRecording(true)
      setShowVoiceAnimation(true)
    setInputMode('voice')
      
      // Auto-stop after 3 seconds
      voiceTimeoutRef.current = window.setTimeout(() => {
        stopVoiceRecording()
      }, 3000)
    } else {
      // Stop voice recording early
      stopVoiceRecording()
    }
  }

  const stopVoiceRecording = () => {
    setIsVoiceRecording(false)
    setShowVoiceAnimation(false)
    setInputMode(null)
    
    // Clear timeout if exists
    if (voiceTimeoutRef.current) {
      clearTimeout(voiceTimeoutRef.current)
      voiceTimeoutRef.current = null
    }
    
    // Simulate voice transcription - select random response based on mode
    const voiceResponses = mode === 'discovery' ? DISCOVERY_VOICE_RESPONSES : HELP_VOICE_QUESTIONS
    const randomIndex = Math.floor(Math.random() * voiceResponses.length)
    const randomResponse = voiceResponses[randomIndex]
    setInputText(randomResponse)
    
    // Store the index for matching AI response later
    if (mode === 'help') {
      setSelectedHelpIndex(randomIndex)
    }
    
    // Auto-send to chat after brief delay
    setTimeout(() => {
      if (randomResponse.trim()) {
        // Create user message
        const userMessage: ConversationMessage = {
          id: `user-${Date.now()}`,
          type: 'result',
          content: randomResponse.trim(),
          timestamp: Date.now(),
          isTyping: false,
          icon: RiUser3Line
        }
        
        // Add user message to conversation
        setIsInConversation(true)
        setShowSuggestions(false)  // Temporarily hide suggestions while AI responds
        setConversationMessages(prev => [...prev, userMessage])
        
        // Clear input
        setInputText('')
        
        // Generate AI response after delay
        setTimeout(() => {
          setIsAiResponding(true)
          
          // Different responses based on mode
          const discoveryResponses = [
            "Here are the most affordable regional designs I found! The Theyyam Inspired Tea Mug at $24.99 offers authentic Kerala art at the best price point.",
            "The Kerala Mural Art Tea Set has the most traditional patterns - featuring authentic temple mural designs passed down through generations. The intricate details are stunning!",
            "Perfect! I found several beautiful options under $25, including the Theyyam Inspired Mug ($24.99) with hand-painted traditional dance motifs.",
            "The most authentic design is definitely the Kerala Mural Art Set - it features genuine temple art patterns and uses traditional color palettes from ancient Kerala murals.",
            "The Theyyam-inspired collection is incredible! These pieces capture the vibrant colors and spiritual energy of Kerala's traditional Theyyam performances.",
            "Yes! The Backwater Serenity Collection blends traditional Kerala landscapes with contemporary minimalist design - perfect for modern homes with cultural appreciation.",
            "For gifting, I'd recommend the Kerala Mural Art Tea Set - it's culturally significant, beautifully crafted, and comes with a story about Kerala's artistic heritage.",
            "I found some exclusive pieces! The Backwater Serenity Collection includes limited edition designs inspired by Kerala's famous backwater scenes.",
            "The most vibrant designs are in the Theyyam collection - featuring bold reds, deep blues, and golden accents that represent the energy of Kerala's traditional performances.",
            "Kerala designs are unique because they tell stories - each pattern represents local culture, from temple art to backwater scenes, unlike generic tea sets."
          ]

          let randomResponse: string
          
          if (mode === 'discovery') {
            randomResponse = discoveryResponses[Math.floor(Math.random() * discoveryResponses.length)]
          } else {
            // For help mode, use the matching answer if available
            if (selectedHelpIndex !== null) {
              randomResponse = HELP_AI_ANSWERS[selectedHelpIndex]
              setSelectedHelpIndex(null) // Reset after use
            } else {
              randomResponse = HELP_AI_ANSWERS[Math.floor(Math.random() * HELP_AI_ANSWERS.length)]
            }
          }
          
          addTypingMessage({
            type: 'result',
            content: randomResponse,
            icon: RiBrainLine
          })
          
          // Clear AI responding state after typing finishes and show images ONLY in discovery mode
          setTimeout(() => {
            setIsAiResponding(false)
            // Show Kerala tea images after AI response - ONLY for discovery mode
            if (mode === 'discovery') {
              setTimeout(() => {
                setShowSuggestions(true)
              }, 500)
            }
          }, 2000 + randomResponse.length * 30) // Account for typing animation duration
        }, 1500)
      }
    }, 500)
  }

  const handleSendInput = () => {
    if (inputText.trim()) {
      // Create user message
      const userMessage: ConversationMessage = {
        id: `user-${Date.now()}`,
        type: 'result',
        content: inputText.trim(),
        timestamp: Date.now(),
        isTyping: false,
        icon: RiUser3Line
      }
      
      // Add user message to conversation
      setIsInConversation(true)
      setShowSuggestions(false)  // Temporarily hide suggestions while AI responds
      setConversationMessages(prev => [...prev, userMessage])
      
      // Clear input
      setInputText('')
      
      // Generate AI response after delay
      setTimeout(() => {
        setIsAiResponding(true)
        
        // Different responses based on mode
        const discoveryResponses = [
          "Here are the most affordable regional designs I found! The Theyyam Inspired Tea Mug at $24.99 offers authentic Kerala art at the best price point.",
          "The Kerala Mural Art Tea Set has the most traditional patterns - featuring authentic temple mural designs passed down through generations. The intricate details are stunning!",
          "Perfect! I found several beautiful options under $25, including the Theyyam Inspired Mug ($24.99) with hand-painted traditional dance motifs.",
          "The most authentic design is definitely the Kerala Mural Art Set - it features genuine temple art patterns and uses traditional color palettes from ancient Kerala murals.",
          "The Theyyam-inspired collection is incredible! These pieces capture the vibrant colors and spiritual energy of Kerala's traditional Theyyam performances.",
          "Yes! The Backwater Serenity Collection blends traditional Kerala landscapes with contemporary minimalist design - perfect for modern homes with cultural appreciation.",
          "For gifting, I'd recommend the Kerala Mural Art Tea Set - it's culturally significant, beautifully crafted, and comes with a story about Kerala's artistic heritage.",
          "I found some exclusive pieces! The Backwater Serenity Collection includes limited edition designs inspired by Kerala's famous backwater scenes.",
          "The most vibrant designs are in the Theyyam collection - featuring bold reds, deep blues, and golden accents that represent the energy of Kerala's traditional performances.",
          "Kerala designs are unique because they tell stories - each pattern represents local culture, from temple art to backwater scenes, unlike generic tea sets."
        ]

        let teaResponse: string
        
        if (mode === 'discovery') {
          teaResponse = discoveryResponses[Math.floor(Math.random() * discoveryResponses.length)]
        } else {
          // For help mode, use random response for manual input
          teaResponse = HELP_AI_ANSWERS[Math.floor(Math.random() * HELP_AI_ANSWERS.length)]
        }
        
        addTypingMessage({
          type: 'result',
          content: teaResponse,
          icon: RiBrainLine
        })
        
        // Clear AI responding state after typing finishes and show images ONLY in discovery mode
        setTimeout(() => {
          setIsAiResponding(false)
          // Show Kerala tea images after AI response - ONLY for discovery mode
          if (mode === 'discovery') {
            setTimeout(() => {
              setShowSuggestions(true)
            }, 500)
          }
        }, 2000 + randomResponse.length * 30) // Account for typing animation duration
      }, 1500)
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
      setIsInConversation(false)
      setConversationMessages([]) // Clear when orb becomes invisible
      setShowConversationSkeleton(false)
      setIsVoiceRecording(false)
      setShowVoiceAnimation(false)
      setIsAiResponding(false)
      setSelectedHelpIndex(null)
      
      // Clear voice timeout
      if (voiceTimeoutRef.current) {
        clearTimeout(voiceTimeoutRef.current)
        voiceTimeoutRef.current = null
      }
      
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
              : isExpanded
                ? 'transform origin-top-left' // Help mode: expand from top-left corner, expanding to the left
                : '' // Help mode orb: no special positioning (handled by parent)
          }`}
        >
        {/* Morphing Orb Container */}
        <div
          className={`transition-all duration-300 ease-out transform ${
            isExpanded 
              ? 'w-96 h-96 rounded-3xl scale-100' // Increased height to show all 3 options properly
              : showSeeMore
                ? 'min-w-80 h-16 rounded-full scale-100' // Keep same line height with fully rounded corners, allow content to expand
                : `w-12 h-12 rounded-full ${isVisible ? 'scale-100 opacity-100 bounce-in' : 'scale-0 opacity-0 bounce-in-reverse'}` // Bouncing animation in both directions
          }`}
          style={{
            background: isExpanded 
              ? 'rgba(255, 255, 255, 0.98)' // Slightly more opaque white
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
              
              {/* Help Mode: Immediate Tooltip OR Discovery Mode: Hover Text */}
              {mode === 'help' && showTooltip ? (
                /* Help Tooltip - Shows immediately to the left of orb */
                <div className="absolute top-1/2 right-14 transform -translate-y-1/2 pointer-events-none">
                  <div 
                    className="bg-white px-4 py-3 rounded-xl shadow-lg border border-gray-200 whitespace-nowrap animate-fadeIn"
                    style={{
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
                    }}
                  >
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      Tea questions?
                    </p>
                    <p className="text-xs text-gray-500">
                      AI assistant ready
                    </p>
                    
                    {/* Tooltip Arrow - Points right toward orb */}
                    <div 
                      className="absolute top-1/2 left-full transform -translate-y-1/2 w-0 h-0"
                      style={{
                        borderTop: '6px solid transparent',
                        borderBottom: '6px solid transparent',
                        borderLeft: '6px solid white'
                      }}
                    />
                  </div>
                </div>
              ) : mode === 'discovery' ? (
                /* Discovery Mode: Side Text on Hover */
                <div className="absolute left-10 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                  <div className="text-black text-sm font-medium whitespace-nowrap">
                    Hey Ajay! Need help with tea selection?
                  </div>
                </div>
              ) : null}
            </div>
          ) : showSeeMore && !isExpanded ? (
            /* Orb with Side Text State - Same Line */
            <div className="w-full h-full flex items-center justify-between p-3" style={{ minWidth: 'max-content' }}>
              {/* AI Orb */}
              <div 
                className="w-12 h-12 rounded-full backdrop-blur-xl border border-white/20 flex items-center justify-center relative overflow-hidden cursor-pointer mr-1"
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
                <span className="text-xs font-medium" style={{ color: '#374151' }}>
                  Hey Ajay! Found regional tea designs —
                  <button
                    onClick={handleSeeMoreClick}
                    className="ml-1 underline underline-offset-2 hover:no-underline transition-all"
                    style={{ color: '#059669' }} 
                  >
                    see more
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
                  {isAiResponding && (
                    <RiLoader4Fill size={16} className="animate-spin" style={{ color: '#374151' }} />
                  )}
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
                {isInConversation ? (
                  /* Conversation Mode: Show AI analysis messages */
                  <div className="space-y-3">
                    {showConversationSkeleton ? (
                      /* Skeleton Loader */
                      <div className="space-y-4 animate-pulse">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-lg bg-gray-200"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-lg bg-gray-200"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        {conversationMessages.map((message) => {
                          let IconComponent = message.icon || RiSparklingFill
                          const iconStyle = { color: '#374151' }

                          const isUserMessage = message.id.startsWith('user-')

                          return (
                            <div key={message.id} className={`flex items-start gap-3 animate-fadeIn ${isUserMessage ? 'flex-row-reverse' : ''}`}>
                              <div className={`w-6 h-6 flex items-center justify-center flex-shrink-0 rounded-full ${isUserMessage ? 'bg-green-100' : ''}`}>
                                <IconComponent 
                                  size={14} 
                                  style={isUserMessage ? { color: '#059669' } : { color: '#374151' }} 
                                  className={IconComponent === RiLoader4Fill ? 'animate-spin' : ''}
                                />
                              </div>
                              <div className={`flex-1 text-sm ${isUserMessage ? 'text-right' : ''}`} style={{ color: '#374151', lineHeight: '1.6' }}>
                                {message.content.includes('**') ? (
                                  /* Render markdown-style bold text */
                                  <div 
                                    dangerouslySetInnerHTML={{
                                      __html: message.content
                                        .split('\n').map(line => line.trim()).join('<br/>')
                                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                        .replace(/•/g, '•')
                                    }}
                                  />
                                ) : (
                                  <>
                                    {message.content.split('').map((char, index) => (
                                      <span key={index}>{char}</span>
                                    ))}
                                    {message.isTyping && (
                                      <span className="inline-block w-0.5 h-4 ml-1 animate-pulse" style={{ backgroundColor: '#374151' }}></span>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          )
                        })}
                        
                        {/* Show Kerala tea suggestions after conversation if enabled - ONLY in discovery mode */}
                        {showSuggestions && mode === 'discovery' && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <h4 className="text-sm font-semibold text-gray-900 mb-3">Regional Tea Designs</h4>
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
                            
                            {/* Simple option below regional designs */}
                            <div className="mt-3 pt-3 border-t border-gray-100">
                              <button
                                className="w-full p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 text-left"
                                style={{
                                  background: '#f9fafb',
                                  border: '1px solid #e5e7eb',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = '#f3f4f6'
                                  e.currentTarget.style.borderColor = '#d1d5db'
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = '#f9fafb'
                                  e.currentTarget.style.borderColor = '#e5e7eb'
                                }}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium" style={{ color: '#111827' }}>
                                    View all regional tea collections
                                  </span>
                                  <span className="text-xs px-2 py-1 rounded" style={{ background: '#e5e7eb', color: '#6b7280' }}>
                                    12 items
                                  </span>
                                </div>
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ) : mode === 'discovery' ? (
                  /* Discovery Mode: Show Kerala recommendations */
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
                ) : (
                  /* Help Mode: Show welcome message and default options */
                  <div className="flex-1 flex flex-col py-4">
                    {/* Welcome Message */}
                    <div className="text-center mb-6">
                      <div 
                        className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                        }}
                      >
                        <RiSparklingFill size={16} className="text-white" />
                      </div>
                      <h3 className="font-semibold text-sm mb-1" style={{ color: '#111827' }}>
                        How can I help with this tea?
                      </h3>
                      <p className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>
                        Choose an option below or ask me anything
                      </p>
                    </div>

                    {/* Default Options */}
                    <div className="space-y-3 px-1 flex-1">
                      {[
                        { 
                          text: "Buy this product", 
                          icon: RiHeartLine, 
                          action: () => {
                            setInputText("Help me buy this Premium Earl Grey Tea")
                            handleSendInput()
                          }
                        },
                        { 
                          text: "Compare with other teas", 
                          icon: RiEyeLine, 
                          action: () => {
                            setInputText("Can you compare this Earl Grey with other similar teas?")
                            handleSendInput()
                          }
                        },
                        { 
                          text: "Learn about ingredients", 
                          icon: RiStarLine, 
                          action: () => {
                            startIngredientsAnalysis()
                          }
                        }
                      ].map((option, index) => (
                        <button
                          key={index}
                          onClick={option.action}
                          className="w-full p-3 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer group text-left"
                          style={{
                            background: '#f9fafb',
                            border: '1px solid #e5e7eb',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#f3f4f6'
                            e.currentTarget.style.borderColor = '#d1d5db'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#f9fafb'
                            e.currentTarget.style.borderColor = '#e5e7eb'
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <option.icon size={16} style={{ color: '#059669' }} />
                            <span className="text-sm font-medium" style={{ color: '#111827' }}>
                              {option.text}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer - Search Bar and Voice Input (Always Visible at Bottom) */}
              <div className="border-t p-3 rounded-b-3xl" style={{ borderColor: 'rgba(229, 231, 235, 0.3)', background: '#ffffff' }}>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder={isVoiceRecording ? "Listening..." : (mode === 'discovery' ? "Ask me anything, Ajay..." : "Ask about this Earl Grey tea...")}
                      className="w-full px-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 text-sm"
                      style={{
                        background: 'rgba(249, 250, 251, 0.8)',
                        border: '1px solid rgba(209, 213, 219, 0.5)',
                        color: '#111827',
                        paddingLeft: showVoiceAnimation ? '60px' : '12px' // Make room for voice bars
                      }}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendInput()}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#047857'
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(4, 120, 87, 0.1)'
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(209, 213, 219, 0.5)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                      disabled={isVoiceRecording}
                    />
                    
                    {/* Voice Animation - 8 Purple Bars */}
                    {showVoiceAnimation && (
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-0.5">
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className="w-0.5 bg-green-600 rounded-full animate-pulse"
                            style={{
                              height: '16px',
                              animationDelay: `${i * 0.1}s`,
                              animationDuration: '1s',
                              animationIterationCount: 'infinite'
                            }}
                          />
                        ))}
                      </div>
                    )}
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
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 relative group"
                    style={{
                      background: isVoiceRecording ? '#059669' : 'rgba(249, 250, 251, 0.8)', // Green when recording
                      border: `1px solid ${isVoiceRecording ? '#059669' : 'rgba(209, 213, 219, 0.5)'}`,
                      color: isVoiceRecording ? '#ffffff' : '#059669'
                    }}
                    onMouseEnter={(e) => {
                      if (!isVoiceRecording) {
                      e.currentTarget.style.borderColor = '#047857'
                      e.currentTarget.style.background = 'rgba(249, 250, 251, 1)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isVoiceRecording) {
                      e.currentTarget.style.borderColor = 'rgba(209, 213, 219, 0.5)'
                      e.currentTarget.style.background = 'rgba(249, 250, 251, 0.8)'
                      }
                    }}
                    title={isVoiceRecording ? "Stop recording" : "Voice input"}
                  >
                    <RiMicLine size={16} />
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                      {isVoiceRecording ? "Stop recording" : "Voice input"}
                    </div>
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
