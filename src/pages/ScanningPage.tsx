import ProgressBar from '../components/ProgressBar'

export default function ScanningPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <ProgressBar 
          progress={50} 
          label="Scanning"
          className="w-full"
        />
      </div>
    </div>
  )
}