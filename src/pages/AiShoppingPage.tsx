import { useState, useEffect, useCallback, useRef } from 'react'
import SmartSuggestOrb from '../components/SmartSuggestOrb'
import Badge from '../components/Badge'
import { RiArrowLeftLine, RiTruckLine, RiArrowGoBackLine, RiPlantLine } from '@remixicon/react'

export default function AiShoppingPage() {
  const [showOrb, setShowOrb] = useState(false)
  const [hoverTimeout, setHoverTimeout] = useState<number | null>(null)
  const [isOrbExpanded, setIsOrbExpanded] = useState(false)
  const [orbMode, setOrbMode] = useState<'discovery' | 'help'>('discovery')
  
  // Idle state nudge
  const [showHelpOrb, setShowHelpOrb] = useState(false)
  const [helpOrbExpanded, setHelpOrbExpanded] = useState(false)
  const idleTimerRef = useRef<number | null>(null)
  
  // Individual section orbs for inline positioning
  const [showDescriptionOrb, setShowDescriptionOrb] = useState(false)
  const [descriptionOrbExpanded, setDescriptionOrbExpanded] = useState(false)
  const descriptionHoverTimeout = useRef<number | null>(null)
  
  const [showHighlightsOrb, setShowHighlightsOrb] = useState(false)
  const [highlightsOrbExpanded, setHighlightsOrbExpanded] = useState(false)
  const highlightsHoverTimeout = useRef<number | null>(null)
  
  const [showPricingOrb, setShowPricingOrb] = useState(false)
  const pricingHoverTimeout = useRef<number | null>(null)
  
  const [showOptionsOrb, setShowOptionsOrb] = useState(false)
  const optionsHoverTimeout = useRef<number | null>(null)
  
  const [showCartOrb, setShowCartOrb] = useState(false)
  const cartHoverTimeout = useRef<number | null>(null)
  
  const [showTrustOrb, setShowTrustOrb] = useState(false)
  const trustHoverTimeout = useRef<number | null>(null)

  // Smart Suggest Orb hover handlers
  const handleProductImageHover = () => {
    // Mark that user is hovering over product image
    setIsHoveringAnySection(true)
    
    // Hide help orb when product orb might show
    if (showHelpOrb && !helpOrbExpanded) {
      setShowHelpOrb(false)
    }
    
    // Clear any existing timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
    }

    // Set new timeout for 800 milliseconds  
    const timeout = setTimeout(() => {
      setOrbMode('discovery')  // Set to discovery mode
      setShowOrb(true)
    }, 800) // 0.8 second delay for intentional interaction
    
    setHoverTimeout(timeout)
  }

  const handleProductImageLeave = () => {
    // Mark that user is no longer hovering over product image
    setIsHoveringAnySection(false)
    
    // Clear timeout if user moves away before 2 seconds
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }
    // Only hide orb if it hasn't expanded into chat interface
    if (!isOrbExpanded) {
      setShowOrb(false)
    }
  }

  const handleCloseSmartOrb = () => {
    setShowOrb(false)
    setIsOrbExpanded(false)
    setOrbMode('discovery')   // Reset to discovery mode
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }
  }

  const handleOrbExpanded = (expanded: boolean) => {
    setIsOrbExpanded(expanded)
  }

  // Track if user is hovering over any interactive area
  const [isHoveringAnySection, setIsHoveringAnySection] = useState(false)
  
  // Handle user activity for idle detection  
  const handleActivity = useCallback(() => {
    // Only hide help orb if not expanded (respect user's active engagement)
    if (!helpOrbExpanded) {
      setShowHelpOrb(false)
    }
    
    // Clear existing idle timer
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current)
      idleTimerRef.current = null
    }
    
    // Set new idle timer - only if no other orbs are active and not hovering anywhere
    idleTimerRef.current = setTimeout(() => {
      // Only show help orb if no other orbs are active and not hovering on any section
      const anyOrbActive = showOrb || showDescriptionOrb || showHighlightsOrb || 
                          showPricingOrb || showOptionsOrb || showCartOrb || showTrustOrb
      if (!anyOrbActive && !isHoveringAnySection) {
        setShowHelpOrb(true)
      }
    }, 2000) // 2 seconds
  }, [helpOrbExpanded, showOrb, showDescriptionOrb, showHighlightsOrb, 
      showPricingOrb, showOptionsOrb, showCartOrb, showTrustOrb, isHoveringAnySection])


  // Handle help orb close
  const handleCloseHelpOrb = () => {
    setShowHelpOrb(false)
    setHelpOrbExpanded(false)
  }

  // Handle help orb expansion
  const handleHelpOrbExpanded = (expanded: boolean) => {
    setHelpOrbExpanded(expanded)
  }

  // Individual section hover handlers
  const createSectionHandlers = (
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    timeoutRef: React.MutableRefObject<number | null>,
    expanded: boolean
  ) => ({
    onMouseEnter: () => {
      // Mark that user is hovering over a section
      setIsHoveringAnySection(true)
      
      // Hide ALL other orbs when this section orb might show
      if (showHelpOrb && !helpOrbExpanded) {
        setShowHelpOrb(false)
      }
      if (showOrb && !isOrbExpanded) {
        setShowOrb(false)
      }
      
      // Hide all other section orbs
      if (setShow !== setShowDescriptionOrb && showDescriptionOrb && !descriptionOrbExpanded) {
        setShowDescriptionOrb(false)
      }
      if (setShow !== setShowHighlightsOrb && showHighlightsOrb && !highlightsOrbExpanded) {
        setShowHighlightsOrb(false)
      }
      if (setShow !== setShowPricingOrb && showPricingOrb) {
        setShowPricingOrb(false)
      }
      if (setShow !== setShowOptionsOrb && showOptionsOrb) {
        setShowOptionsOrb(false)
      }
      if (setShow !== setShowCartOrb && showCartOrb) {
        setShowCartOrb(false)
      }
      if (setShow !== setShowTrustOrb && showTrustOrb) {
        setShowTrustOrb(false)
      }
      
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // Set new timeout for responsive delay
      timeoutRef.current = setTimeout(() => {
        setShow(true)
      }, 400) // Reduced delay for more responsive feel
    },
    onMouseLeave: () => {
      // Mark that user is no longer hovering over this section
      setIsHoveringAnySection(false)
      
      // Clear timeout if user moves away before delay
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      
      // Add a longer delay before hiding to prevent blinking when moving within the section
      setTimeout(() => {
        // Only hide orb if it hasn't expanded
        if (!expanded) {
          setShow(false)
        }
      }, 500) // Longer delay to prevent rapid hide/show when moving within section
    }
  })
  
  // Create handlers for each section
  const descriptionHandlers = createSectionHandlers(setShowDescriptionOrb, descriptionHoverTimeout, descriptionOrbExpanded)
  const highlightsHandlers = createSectionHandlers(setShowHighlightsOrb, highlightsHoverTimeout, highlightsOrbExpanded)
  const pricingHandlers = createSectionHandlers(setShowPricingOrb, pricingHoverTimeout, false)
  const optionsHandlers = createSectionHandlers(setShowOptionsOrb, optionsHoverTimeout, false)
  const cartHandlers = createSectionHandlers(setShowCartOrb, cartHoverTimeout, false)
  const trustHandlers = createSectionHandlers(setShowTrustOrb, trustHoverTimeout, false)

  // Set up activity listeners
  useEffect(() => {
    const events = ['scroll', 'click', 'keydown'] // Removed mousemove - let mouse movement be allowed during idle
    
    events.forEach(event => {
      document.addEventListener(event, handleActivity)
    })

    // Start initial timer
    handleActivity()

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity)
      })
      
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current)
      }
    }
  }, [handleActivity])

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current)
      }
      if (descriptionHoverTimeout.current) {
        clearTimeout(descriptionHoverTimeout.current)
      }
      if (highlightsHoverTimeout.current) {
        clearTimeout(highlightsHoverTimeout.current)
      }
      if (pricingHoverTimeout.current) {
        clearTimeout(pricingHoverTimeout.current)
      }
      if (optionsHoverTimeout.current) {
        clearTimeout(optionsHoverTimeout.current)
      }
      if (cartHoverTimeout.current) {
        clearTimeout(cartHoverTimeout.current)
      }
      if (trustHoverTimeout.current) {
        clearTimeout(trustHoverTimeout.current)
      }
    }
  }, [])


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div 
        className="bg-white border-b border-gray-200 px-6 py-4"
        {...pricingHandlers}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                try {
                  window.history.back()
                } catch {
                  window.location.href = '/'
                }
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <RiArrowLeftLine size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">AI Shopping Assistant</h1>
              <p className="text-sm text-gray-500">Powered by Shopos AI</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Personalized for Kerala, India
          </div>
        </div>
      </div>

      {/* Navigation breadcrumb */}
      <div 
        className="bg-white px-6 py-3 border-b border-gray-100"
        {...pricingHandlers}
      >
        <div className="max-w-7xl mx-auto">
          <nav className="flex text-sm text-gray-500">
            <span>Home</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Premium Earl Grey Tea</span>
          </nav>
        </div>
      </div>

      {/* Main Shopify Product Page */}
      <div className="flex-1 bg-white">
        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Product Images - 7 columns */}
            <div className="lg:col-span-7">
              <div className="space-y-4">
                {/* Main product image with Smart Suggest Orb */}
                <div 
                  className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative"
                  onMouseEnter={handleProductImageHover}
                  onMouseLeave={handleProductImageLeave}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&h=800&fit=crop&crop=center"
                    alt="Premium Earl Grey Tea"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Smart Suggest Orb positioned on image */}
                  <SmartSuggestOrb 
                    isVisible={showOrb}
                    onClose={handleCloseSmartOrb}
                    onExpanded={handleOrbExpanded}
                    userLocation="Kerala"
                    productCategory="tea"
                    isOnProduct={true}
                    mode={orbMode}
                  />
                </div>
                
                {/* Thumbnail images */}
                <div className="grid grid-cols-4 gap-3">
                  {[
                    {
                      src: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=200&h=200&fit=crop&crop=center',
                      alt: 'Earl Grey tea leaves close-up view',
                      label: 'Tea Leaves'
                    },
                    {
                      src: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=200&h=200&fit=crop&crop=center', 
                      alt: 'Brewed Earl Grey tea in elegant cup',
                      label: 'Brewed Tea'
                    },
                    {
                      src: 'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?w=200&h=200&fit=crop&crop=center',
                      alt: 'Premium tea packaging and bergamot',
                      label: 'Packaging'
                    },
                    {
                      src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop&crop=center',
                      alt: 'Tea ceremony setup with Earl Grey',
                      label: 'Tea Setup'
                    }
                  ].map((image, idx) => (
                    <button 
                      key={idx} 
                      className="aspect-square bg-gray-100 rounded-lg overflow-hidden hover:ring-2 hover:ring-gray-300 transition-all group relative"
                      onMouseEnter={handleProductImageHover}
                      onMouseLeave={handleProductImageLeave}
                      title={image.label}
                    >
                      <img 
                        src={image.src} 
                        alt={image.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          // Fallback placeholder if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkVhcmwgR3JleSBUZWE8L3RleHQ+PC9zdmc+';
                          target.alt = `${image.label} - Earl Grey Tea`;
                        }}
                        loading="lazy"
                      />
                      
                      {/* Subtle label overlay on hover */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="p-2">
                          <span className="text-white text-xs font-medium">{image.label}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Details - 5 columns */}
            <div className="lg:col-span-5 space-y-6">
              {/* Product title and price */}
              <div
                {...pricingHandlers}
              >
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Premium Earl Grey Tea</h1>
                <p className="text-sm text-gray-600 mb-4">Organic Ceylon black tea with natural bergamot</p>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl font-bold text-gray-900">$24.99</span>
                  <span className="text-lg text-gray-500 line-through">$32.99</span>
                  <Badge variant="warning" className="bg-gray-100 text-gray-800 px-2 py-1 text-xs">25% OFF</Badge>
                </div>
              </div>

              {/* Product options */}
              <div 
                className="space-y-4"
                {...optionsHandlers}
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['50g', '100g', '250g'].map((size, idx) => (
                      <button 
                        key={size} 
                        className={`p-3 border rounded-lg text-sm font-medium transition-colors ${
                          idx === 1 ? 'border-gray-800 bg-gray-50' : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Loose Leaf', 'Tea Bags'].map((format, idx) => (
                      <button 
                        key={format} 
                        className={`p-3 border rounded-lg text-sm font-medium transition-colors ${
                          idx === 0 ? 'border-gray-800 bg-gray-50' : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {format}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <div className="flex items-center border border-gray-300 rounded-lg w-32">
                    <button className="p-2 hover:bg-gray-100 transition-colors">-</button>
                    <span className="flex-1 text-center py-2 border-x border-gray-300">1</span>
                    <button className="p-2 hover:bg-gray-100 transition-colors">+</button>
                  </div>
                </div>
              </div>

              {/* Add to cart actions */}
              <div 
                className="space-y-3"
                {...cartHandlers}
              >
                <button className="w-full py-3 text-lg font-semibold bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors">
                  Add to Cart - $24.99
                </button>
                <button className="w-full py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Buy it now
                </button>
              </div>

              {/* Product highlights - Unified hover area */}
              <div className="border-t border-gray-200 pt-6">
                <div 
                  className="relative p-4 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-sm group cursor-pointer"
                  {...highlightsHandlers}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 relative">
                    Product Highlights
                    
                    {/* Inline Product Highlights Orb - positioned 4px from heading */}
                    {showHighlightsOrb && (
                      <div className="absolute top-0 left-full z-50" style={{marginLeft: '4px'}}>
                        <SmartSuggestOrb 
                          isVisible={showHighlightsOrb}
                          onClose={() => {
                            setShowHighlightsOrb(false)
                            setHighlightsOrbExpanded(false)
                            if (highlightsHoverTimeout.current) {
                              clearTimeout(highlightsHoverTimeout.current)
                              highlightsHoverTimeout.current = null
                            }
                          }}
                          onExpanded={setHighlightsOrbExpanded}
                          userLocation="Kerala"
                          productCategory="tea"
                          isOnProduct={true}
                          mode="agent"
                          showTooltipImmediately={true}
                        />
                      </div>
                    )}
                  </h3>
                  
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 mt-1">✓</span>
                      <span className="text-sm text-gray-700">Premium Earl Grey tea blend with bergamot oil</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 mt-1">✓</span>
                      <span className="text-sm text-gray-700">Hand-picked Ceylon black tea leaves</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 mt-1">✓</span>
                      <span className="text-sm text-gray-700">Natural bergamot flavoring from Italian citrus</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 mt-1">✓</span>
                      <span className="text-sm text-gray-700">Available in loose leaf and tea bag formats</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Trust indicators */}
              <div 
                className="border-t border-gray-200 pt-6 space-y-2 text-sm text-gray-600"
                {...trustHandlers}
              >
                <div className="flex items-center gap-2">
                  <RiTruckLine size={16} className="text-green-600" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-2">
                  <RiArrowGoBackLine size={16} className="text-green-600" />
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center gap-2">
                  <RiPlantLine size={16} className="text-green-600" />
                  <span>Organic certified & ethically sourced</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product description section - Unified hover area */}
          <div className="mt-16 pt-12 border-t border-gray-200">
            <div 
              className="relative p-6 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-sm group cursor-pointer"
              {...descriptionHandlers}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 relative">
                Description
                
                {/* Inline Description Orb - positioned 4px from heading */}
                {showDescriptionOrb && (
                  <div className="absolute top-0 left-full z-50" style={{marginLeft: '4px'}}>
                    <SmartSuggestOrb 
                      isVisible={showDescriptionOrb}
                      onClose={() => {
                        setShowDescriptionOrb(false)
                        setDescriptionOrbExpanded(false)
                        if (descriptionHoverTimeout.current) {
                          clearTimeout(descriptionHoverTimeout.current)
                          descriptionHoverTimeout.current = null
                        }
                      }}
                      onExpanded={setDescriptionOrbExpanded}
                      userLocation="Kerala"
                      productCategory="tea"
                      isOnProduct={true}
                      mode="agent"
                      showTooltipImmediately={true}
                    />
                  </div>
                )}
              </h2>
              
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  Experience the timeless elegance of our Premium Earl Grey Tea, carefully crafted from the finest Ceylon black tea leaves 
                  and infused with authentic bergamot oil from Italian citrus groves. This classic English blend delivers a perfect balance 
                  of robust tea flavor and delicate citrus aromatics.
                </p>
                <p className="mb-4">
                  Hand-picked at high altitude gardens in Sri Lanka, our tea leaves are processed using traditional methods to preserve 
                  their natural character and strength. The addition of cornflower petals adds a touch of visual beauty to each cup, 
                  making this not just a beverage, but a moment of daily luxury.
                </p>
                <p>
                  Whether you're starting your morning or taking an afternoon break, this Earl Grey provides the perfect caffeine boost 
                  while delivering an sophisticated taste experience that tea enthusiasts have cherished for generations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs text-gray-500">
            AI-powered recommendations based on your location and preferences
          </p>
        </div>
      </div>

      {/* Help Orb - Right Side */}
      {showHelpOrb && !showOrb && !showDescriptionOrb && !showHighlightsOrb && 
       !showPricingOrb && !showOptionsOrb && !showCartOrb && !showTrustOrb && (
        <div className="fixed top-1/2 right-8 z-50 transform -translate-y-1/2" 
             style={{ 
               right: helpOrbExpanded ? '408px' : '78px',
               transition: 'right 0.3s ease-out'
             }}>
          <SmartSuggestOrb 
            isVisible={showHelpOrb}
            onClose={handleCloseHelpOrb}
            onExpanded={handleHelpOrbExpanded}
            userLocation="Kerala"
            productCategory="tea"
            isOnProduct={false}
            mode="help"
            showTooltipImmediately={true}
          />
        </div>
      )}


      <style>{`
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

        .bounce-in {
          animation: bounceIn 0.75s;
        }
      `}</style>
    </div>
  )
}
