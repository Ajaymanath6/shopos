import { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import BeforeAfterSlider from '../components/BeforeAfterSlider'
import Button from '../components/Button'
import Badge from '../components/Badge'
import StatusIndicator from '../components/StatusIndicator'

interface Issue {
  id: string
  title: string
  description: string
  severity: 'critical' | 'warning'
  impact: string
  estimatedTime: string
}

interface FixData {
  beforeImage: string
  afterImage: string
  changes: string[]
  expectedImprovement: string
  technicalDetails: string[]
}

// Mock fix data for different issue types
const mockFixData: Record<string, FixData> = {
  '1': { // Slow Page Load Speed
    beforeImage: 'https://via.placeholder.com/600x400/ff6b6b/ffffff?text=Before%3A+Slow+Loading+(3.2s)',
    afterImage: 'https://via.placeholder.com/600x400/51cf66/ffffff?text=After%3A+Fast+Loading+(0.8s)',
    changes: [
      'Optimized image compression (reduced file sizes by 70%)',
      'Enabled browser caching for static assets',
      'Minified CSS and JavaScript files',
      'Implemented lazy loading for below-fold images'
    ],
    expectedImprovement: 'Page load time: 3.2s → 0.8s (75% improvement)',
    technicalDetails: [
      'Images compressed using WebP format with 85% quality',
      'Cache headers set to 1 year for static assets',
      'JavaScript bundles reduced from 450KB to 180KB',
      'Lazy loading implemented for 23 product images'
    ]
  },
  '2': { // Missing Alt Text
    beforeImage: 'https://via.placeholder.com/600x400/ffd43b/000000?text=Before%3A+No+Alt+Text',
    afterImage: 'https://via.placeholder.com/600x400/51cf66/ffffff?text=After%3A+SEO+Optimized',
    changes: [
      'Added descriptive alt text to 47 product images',
      'Optimized alt text for SEO keywords',
      'Improved accessibility compliance',
      'Enhanced screen reader compatibility'
    ],
    expectedImprovement: 'SEO score improvement + accessibility compliance',
    technicalDetails: [
      'Alt text follows best practices (descriptive, under 125 characters)',
      'Includes relevant product keywords naturally',
      'WCAG 2.1 AA compliance achieved',
      'Screen reader testing completed'
    ]
  },
  '3': { // Abandoned Cart Recovery - Shopify Tea Product Page
    beforeImage: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=400&fit=crop&crop=center',
    afterImage: 'https://images.unsplash.com/photo-1556881286-56d0de4039b9?w=600&h=400&fit=crop&crop=center',
    changes: [
      'Premium Earl Grey tea blend with bergamot oil',
      'Hand-picked Ceylon black tea leaves',
      'Natural bergamot flavoring from Italian citrus',
      'Available in loose leaf and tea bag formats'
    ],
    expectedImprovement: 'Premium quality tea experience with authentic Earl Grey flavor',
    technicalDetails: [
      'Origin: Sri Lanka (Ceylon) high-grown estates',
      'Caffeine Level: Medium-High (40-70mg per cup)',
      'Brewing Time: 3-5 minutes at 212°F (100°C)',
      'Ingredients: Black tea, natural bergamot oil, cornflower petals'
    ]
  },
  '4': { // Mobile Checkout Friction
    beforeImage: 'https://via.placeholder.com/600x400/ff6b6b/ffffff?text=Before%3A+6-Step+Checkout',
    afterImage: 'https://via.placeholder.com/600x400/51cf66/ffffff?text=After%3A+3-Step+Checkout',
    changes: [
      'Reduced checkout steps from 6 to 3',
      'Enabled guest checkout option',
      'Simplified form fields (removed 8 optional fields)',
      'Added mobile payment options (Apple Pay, Google Pay)'
    ],
    expectedImprovement: 'Reduce mobile checkout abandonment by 23%',
    technicalDetails: [
      'Combined shipping and billing address forms',
      'Auto-fill enabled for returning customers',
      'Express payment buttons prominently displayed',
      'Form validation improved with real-time feedback'
    ]
  }
}

export default function FixPage() {
  const { issueId } = useParams<{ issueId: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  
  const [isDeploying, setIsDeploying] = useState(false)
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false)
  
  const storeUrl = location.state?.storeUrl
  const diagnosticData = location.state?.diagnosticData
  const issue: Issue = location.state?.issue

  useEffect(() => {
    // Redirect if no data provided
    if (!issue || !storeUrl || !issueId) {
      navigate('/')
    }
  }, [issue, storeUrl, issueId, navigate])

  if (!issue || !storeUrl || !issueId) {
    return null
  }

  const fixData = mockFixData[issueId] || mockFixData['1']

  const handleDeploy = async () => {
    setIsDeploying(true)
    
    // Simulate API call to deploy fix
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      navigate('/diagnostics/confirmed', {
        state: {
          storeUrl,
          diagnosticData,
          fixedIssue: issue,
          fixData
        }
      })
    } catch (error) {
      console.error('Deploy failed:', error)
      setIsDeploying(false)
    }
  }

  const getSeverityType = (severity: string) => {
    return severity === 'critical' ? 'critical' as const : 'warning' as const
  }

  // Special Shopify-style tea product page for abandon cart recovery
  if (issueId === '3') {
    return (
      <div className="min-h-screen bg-white">
        {/* Navigation breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-sm text-gray-500">
            <button 
              onClick={() => navigate('/diagnostics/report', { state: { storeUrl, diagnosticData } })}
              className="hover:text-gray-700"
            >
              Home
            </button>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Premium Earl Grey Tea</span>
          </nav>
        </div>

        {/* Main product section - 12 column grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Product Images - 7 columns */}
            <div className="lg:col-span-7">
              <div className="space-y-4">
                {/* Main product image */}
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&h=800&fit=crop&crop=center"
                    alt="Premium Earl Grey Tea"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Thumbnail images */}
                <div className="grid grid-cols-4 gap-3">
                  {[
                    'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=200&h=200&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1556881286-56d0de4039b9?w=200&h=200&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1563822249366-221b3b3dcad9?w=200&h=200&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=200&h=200&fit=crop&crop=center'
                  ].map((src, idx) => (
                    <button key={idx} className="aspect-square bg-gray-100 rounded-lg overflow-hidden hover:ring-2 hover:ring-gray-300 transition-all">
                      <img src={src} alt={`Product view ${idx + 1}`} className="w-full h-full object-cover" />
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
                <Button 
                  variant="success" 
                  className="w-full py-3 text-lg font-semibold bg-gray-900 hover:bg-gray-800 text-white"
                  onClick={handleDeploy}
                  loading={isDeploying}
                >
                  {isDeploying ? 'Adding to Cart...' : 'Add to Cart - $24.99'}
                </Button>
                <button className="w-full py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Buy it now
                </button>
              </div>

              {/* Product highlights */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Highlights</h3>
                <ul className="space-y-2">
                  {fixData.changes.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-gray-400 mt-1">✓</span>
                      <span className="text-sm text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Product specifications */}
              <div className="border-t border-gray-200 pt-6">
                <button 
                  onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h3 className="text-lg font-semibold text-gray-900">Product Details</h3>
                  <span className="text-gray-500">{showTechnicalDetails ? '−' : '+'}</span>
                </button>
                {showTechnicalDetails && (
                  <div className="mt-4 space-y-2">
                    {fixData.technicalDetails.map((detail, idx) => (
                      <div key={idx} className="text-sm text-gray-700">
                        {detail}
                      </div>
                    ))}
                  </div>
                )}
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
        </div>

        {/* Product description section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-12">
          <div className="border-t border-gray-200 pt-12">
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
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-polaris-text mb-2">
          Fix Preview: {issue.title}
        </h1>
        <p className="text-polaris-text-subdued">
          Review the changes before deploying to {storeUrl}
        </p>
      </div>

      {/* Issue Summary */}
      <Card className="max-w-2xl mx-auto">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <StatusIndicator 
              severity={getSeverityType(issue.severity)} 
              size="lg" 
            />
            <div>
              <h3 className="font-semibold text-polaris-text">{issue.title}</h3>
              <p className="text-sm text-polaris-text-subdued mt-1">{issue.description}</p>
            </div>
          </div>
          <Badge variant={issue.severity === 'critical' ? 'critical' : 'warning'}>
            {issue.severity.toUpperCase()}
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-4 p-4 bg-polaris-surface-subdued rounded-polaris">
          <div>
            <p className="text-sm font-medium text-polaris-text">Current Impact</p>
            <p className="text-sm text-polaris-text-subdued">{issue.impact}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-polaris-text">Expected Improvement</p>
            <p className="text-sm text-polaris-green font-medium">{fixData.expectedImprovement}</p>
          </div>
        </div>
      </Card>

      {/* Before/After Comparison */}
      <Card title="Visual Comparison" className="max-w-4xl mx-auto">
        <BeforeAfterSlider
          beforeImage={fixData.beforeImage}
          afterImage={fixData.afterImage}
          beforeLabel="Current State"
          afterLabel="After Fix"
        />
      </Card>

      {/* Changes Summary */}
      <Card title="What Will Change" className="max-w-2xl mx-auto">
        <div className="space-y-3">
          {fixData.changes.map((change, index) => (
            <div key={index} className="flex items-start gap-3">
              <span className="text-polaris-green font-bold">✓</span>
              <p className="text-sm text-polaris-text">{change}</p>
            </div>
          ))}
        </div>

        {/* Technical Details Toggle */}
        <div className="mt-6 pt-4 border-t border-polaris-border">
          <button
            onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
            className="flex items-center gap-2 text-sm text-polaris-interactive hover:text-polaris-blue"
          >
            <span>{showTechnicalDetails ? '▼' : '▶'}</span>
            Technical Details
          </button>
          
          {showTechnicalDetails && (
            <div className="mt-3 space-y-2">
              {fixData.technicalDetails.map((detail, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-polaris-text-subdued">•</span>
                  <p className="text-sm text-polaris-text-subdued">{detail}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="max-w-2xl mx-auto">
        <Card>
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-polaris-text mb-2">
                Ready to Deploy?
              </h3>
              <p className="text-sm text-polaris-text-subdued">
                This fix will be applied to your live store. You can always revert changes if needed.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={() => navigate('/diagnostics/report', { state: { storeUrl, diagnosticData } })}
                className="flex-1"
                disabled={isDeploying}
              >
                ← Back to Report
              </Button>
              <Button
                variant="success"
                onClick={handleDeploy}
                loading={isDeploying}
                className="flex-1"
              >
                {isDeploying ? 'Deploying Fix...' : '🚀 Approve & Deploy'}
              </Button>
            </div>

            <div className="text-center">
              <p className="text-xs text-polaris-text-subdued">
                Estimated deployment time: {issue.estimatedTime} • Changes are reversible
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
