import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Card from '../components/Card'
import ProgressBar from '../components/ProgressBar'

const scanningSteps = [
  { progress: 10, message: "Connecting to your store..." },
  { progress: 25, message: "Analyzing page load speeds..." },
  { progress: 40, message: "Checking SEO optimization..." },
  { progress: 55, message: "Reviewing conversion funnels..." },
  { progress: 70, message: "Scanning for accessibility issues..." },
  { progress: 85, message: "Calculating revenue impact..." },
  { progress: 100, message: "Generating diagnostic report..." }
]

export default function ScanningPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const navigate = useNavigate()
  const location = useLocation()
  
  const storeUrl = location.state?.storeUrl || 'your store'

  useEffect(() => {
    // Redirect if no store URL provided
    if (!location.state?.storeUrl) {
      navigate('/')
      return
    }

    const interval = setInterval(() => {
      setCurrentStep(prev => {
        const nextStep = prev + 1
        if (nextStep >= scanningSteps.length) {
          clearInterval(interval)
          // Simulate API call to get diagnostic data
          setTimeout(() => {
            navigate('/diagnostics/report', {
              state: {
                storeUrl: location.state.storeUrl,
                diagnosticData: {
                  score: 72,
                  totalIssues: 4,
                  criticalIssues: 2,
                  topIssues: [
                    {
                      id: '1',
                      title: 'Slow Page Load Speed',
                      description: 'Your product pages are loading 3.2s slower than optimal, affecting conversion rates.',
                      severity: 'critical',
                      impact: 'Potential 15% revenue loss (~$2,400/month)',
                      estimatedTime: '2 minutes'
                    },
                    {
                      id: '3',
                      title: 'Abandoned Cart Recovery',
                      description: 'No automated email sequence for cart abandonment (68% cart abandonment rate).',
                      severity: 'critical',
                      impact: 'Missing ~$8,500/month in recovered sales',
                      estimatedTime: '5 minutes'
                    }
                  ],
                  allIssues: [
                    {
                      id: '1',
                      title: 'Slow Page Load Speed',
                      description: 'Your product pages are loading 3.2s slower than optimal, affecting conversion rates.',
                      severity: 'critical',
                      impact: 'Potential 15% revenue loss (~$2,400/month)',
                      estimatedTime: '2 minutes'
                    },
                    {
                      id: '2',
                      title: 'Missing Alt Text on Images',
                      description: '47 product images lack accessibility alt text, hurting SEO and compliance.',
                      severity: 'warning',
                      impact: 'SEO ranking decrease, accessibility issues',
                      estimatedTime: '30 seconds'
                    },
                    {
                      id: '3',
                      title: 'Abandoned Cart Recovery',
                      description: 'No automated email sequence for cart abandonment (68% cart abandonment rate).',
                      severity: 'critical',
                      impact: 'Missing ~$8,500/month in recovered sales',
                      estimatedTime: '5 minutes'
                    },
                    {
                      id: '4',
                      title: 'Mobile Checkout Friction',
                      description: 'Mobile checkout process has 3 unnecessary steps, causing 23% drop-off.',
                      severity: 'warning',
                      impact: 'Potential $3,200/month revenue increase',
                      estimatedTime: '3 minutes'
                    }
                  ]
                }
              }
            })
          }, 1000)
          return prev
        }
        return nextStep
      })
    }, 4000) // 4 seconds per step = ~30 seconds total

    return () => clearInterval(interval)
  }, [navigate, location.state])

  useEffect(() => {
    if (currentStep < scanningSteps.length) {
      setProgress(scanningSteps[currentStep].progress)
    }
  }, [currentStep])

  const currentMessage = currentStep < scanningSteps.length 
    ? scanningSteps[currentStep].message 
    : "Finalizing report..."

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-polaris-text mb-2">
          Analyzing {storeUrl}
        </h1>
        <p className="text-polaris-text-subdued">
          Our AI is performing a comprehensive diagnostic scan of your store
        </p>
      </div>

      <Card className="text-center">
        <div className="space-y-6">
          {/* Animated Scanner Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-polaris-interactive border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl">🔍</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <ProgressBar 
            progress={progress} 
            label="Scan Progress"
            className="mb-4"
          />

          {/* Current Step Message */}
          <div className="space-y-2">
            <p className="text-lg font-medium text-polaris-text">
              {currentMessage}
            </p>
            <p className="text-sm text-polaris-text-subdued">
              This usually takes 30 seconds
            </p>
          </div>

          {/* Scanning Steps Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-polaris-text-subdued">
            {scanningSteps.slice(0, 6).map((step, index) => (
              <div 
                key={index}
                className={`flex items-center gap-2 ${
                  index <= currentStep ? 'text-polaris-green' : 'text-polaris-text-subdued'
                }`}
              >
                <span className={index <= currentStep ? '✓' : '○'}>
                  {index <= currentStep ? '✓' : '○'}
                </span>
                {step.message.replace('...', '')}
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="text-center">
        <p className="text-sm text-polaris-text-subdued">
          Please don't close this page. We're working hard to find opportunities to boost your revenue.
        </p>
      </div>
    </div>
  )
}
