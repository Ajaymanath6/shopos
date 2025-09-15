import { useState } from 'react'
import SmartSuggestOrb from '../components/SmartSuggestOrb'
import Badge from '../components/Badge'
import { RiArrowLeftLine } from '@remixicon/react'

export default function AiShoppingPage() {
  const [showOrb, setShowOrb] = useState(false)
  const [hoverTimeout, setHoverTimeout] = useState<number | null>(null)
  const [isOrbExpanded, setIsOrbExpanded] = useState(false)

  // Smart Suggest Orb hover handlers
  const handleProductImageHover = () => {
    // Clear any existing timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
    }

    // Set new timeout for 800 milliseconds
    const timeout = setTimeout(() => {
      setShowOrb(true)
    }, 300) // Fast response for better UX
    
    setHoverTimeout(timeout)
  }

  const handleProductImageLeave = () => {
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
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }
  }

  const handleOrbExpanded = (expanded: boolean) => {
    setIsOrbExpanded(expanded)
  }


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
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
      <div className="bg-white px-6 py-3 border-b border-gray-100">
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
                  />
                </div>
                
                {/* Thumbnail images */}
                <div className="grid grid-cols-4 gap-3">
                  {[
                    'https://images.unsplash.com/photo-1553978297-833d24732ef6?w=200&h=200&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1594736797933-d0b22ba4e3d2?w=200&h=200&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=200&h=200&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=200&fit=crop&crop=center'
                  ].map((src, idx) => (
                    <button 
                      key={idx} 
                      className="aspect-square bg-gray-100 rounded-lg overflow-hidden hover:ring-2 hover:ring-gray-300 transition-all"
                      onMouseEnter={handleProductImageHover}
                      onMouseLeave={handleProductImageLeave}
                    >
                      <img src={src} alt={`Tea product view ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Details - 5 columns */}
            <div className="lg:col-span-5 space-y-6">
              {/* Product title and price */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Premium Earl Grey Tea</h1>
                <p className="text-sm text-gray-600 mb-4">Organic Ceylon black tea with natural bergamot</p>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl font-bold text-gray-900">$24.99</span>
                  <span className="text-lg text-gray-500 line-through">$32.99</span>
                  <Badge variant="warning" className="bg-gray-100 text-gray-800 px-2 py-1 text-xs">25% OFF</Badge>
                </div>
              </div>

              {/* Product options */}
              <div className="space-y-4">
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
              <div className="space-y-3">
                <button className="w-full py-3 text-lg font-semibold bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors">
                  Add to Cart - $24.99
                </button>
                <button className="w-full py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Buy it now
                </button>
              </div>

              {/* Product highlights */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Highlights</h3>
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

              {/* Trust indicators */}
              <div className="border-t border-gray-200 pt-6 space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span>🚚</span>
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>↩️</span>
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🌱</span>
                  <span>Organic certified & ethically sourced</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product description section */}
          <div className="mt-16 pt-12 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Description</h2>
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

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs text-gray-500">
            AI-powered recommendations based on your location and preferences
          </p>
        </div>
      </div>
    </div>
  )
}
