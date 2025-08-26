interface HeroProps {
  title: string
  subtitle: string
  className?: string
}

export default function Hero({ title, subtitle, className = '' }: HeroProps) {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-polaris-text mb-4 leading-tight">
          {title}
        </h1>
        <p className="text-lg text-polaris-text-subdued leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  )
}
