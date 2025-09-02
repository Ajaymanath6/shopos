import ProgressBar from '../components/ProgressBar'

export default function ScanningPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-8" style={{ background: '#F4FBF2' }}>
      <div className="w-full max-w-lg">
        <ProgressBar 
          progress={50} 
          label="Scanning your store..."
          className="w-full"
        />
      </div>
    </div>
  )
}