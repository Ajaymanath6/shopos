import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Hero from '../components/Hero'
import Card from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'
import Badge from '../components/Badge'

export default function LandingPage() {
  const [storeUrl, setStoreUrl] = useState('')
  const [inputState, setInputState] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const validateUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`)
      return urlObj.hostname.includes('myshopify.com') || 
             urlObj.hostname.includes('shopify.com') ||
             /^[a-zA-Z0-9-]+\.(com|net|org|io|co)$/.test(urlObj.hostname)
    } catch {
      return false
    }
  }

  const handleScan = async () => {
    if (!storeUrl.trim()) {
      setInputState('error')
      setErrorMessage('Please enter your store URL')
      return
    }

    if (!validateUrl(storeUrl)) {
      setInputState('error')
      setErrorMessage('Please enter a valid store URL (e.g., yourstore.myshopify.com)')
      return
    }

    setInputState('loading')
    setErrorMessage('')

    // Simulate validation delay
    setTimeout(() => {
      navigate('/diagnostics/scanning', { 
        state: { storeUrl: storeUrl.trim() } 
      })
    }, 1000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoreUrl(e.target.value)
    if (inputState === 'error') {
      setInputState('idle')
      setErrorMessage('')
    }
  }

  return (
    <div className="space-y-8">
      <Hero
        title="Your 24/7 AI Performance Consultant"
        subtitle="Aggo finds performance issues in your Shopify store and deploys AI agents to fix them instantly. No developers needed, no long reports—just fast, actionable results."
      />

      <div className="flex items-center justify-center gap-4 mb-8">
        <Badge variant="success">✓ Instant Fixes</Badge>
        <Badge variant="info">✓ Visual Previews</Badge>
        <Badge variant="success">✓ Zero Code Required</Badge>
      </div>

      <Card 
        title="Store Health Check" 
        subtitle="Connect your Shopify store for an instant AI diagnostic"
        className="max-w-2xl mx-auto"
      >
        <div className="space-y-4">
          <Input
            type="url"
            placeholder="Enter your store URL (e.g., yourstore.myshopify.com)"
            value={storeUrl}
            onChange={handleInputChange}
            state={inputState}
            errorMessage={errorMessage}
            label="Store URL"
          />
          
          <Button 
            onClick={handleScan}
            loading={inputState === 'loading'}
            variant="primary"
            className="w-full"
          >
            {inputState === 'loading' ? 'Validating...' : '🚀 Start AI Scan'}
          </Button>

          <div className="text-center pt-4">
            <p className="text-sm text-polaris-text-subdued">
              Free scan • No signup required • Results in 30 seconds
            </p>
          </div>
        </div>
      </Card>

      {/* Trust Indicators */}
      <section className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Card title="⚡ Instant Results" subtitle="No waiting for reports">
          <p className="text-sm text-polaris-text-subdued">
            Get actionable insights in seconds, not hours. Our AI scans your entire store and prioritizes fixes by revenue impact.
          </p>
        </Card>
        
        <Card title="🎯 One-Click Fixes" subtitle="No developers needed">
          <p className="text-sm text-polaris-text-subdued">
            Deploy AI agents to fix issues automatically. Preview changes before they go live on your store.
          </p>
        </Card>
        
        <Card title="📊 Revenue Impact" subtitle="See the money behind every fix">
          <p className="text-sm text-polaris-text-subdued">
            Every recommendation shows potential revenue impact, so you can prioritize fixes that matter most to your bottom line.
          </p>
        </Card>
      </section>
    </div>
  )
}
