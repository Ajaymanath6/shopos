import type { PropsWithChildren } from 'react'

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-dvh bg-polaris-surface-subdued text-polaris-text">
      <header className="border-b border-polaris-border bg-polaris-surface shadow-polaris-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-polaris bg-polaris-blue text-white font-bold text-sm">
              A
            </div>
            <h1 className="text-xl font-semibold text-polaris-text">
              Aggo
            </h1>
            <span className="text-xs bg-polaris-green text-white px-2 py-1 rounded-polaris">
              AI Performance Consultant
            </span>
          </div>
          <nav className="flex items-center gap-6 text-sm">
            <a href="#" className="text-polaris-text-subdued hover:text-polaris-interactive">Dashboard</a>
            <a href="#" className="text-polaris-text-subdued hover:text-polaris-interactive">Reports</a>
            <a href="#" className="text-polaris-text-subdued hover:text-polaris-interactive">Settings</a>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">
        {children}
      </main>
      <footer className="border-t border-polaris-border bg-polaris-surface">
        <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-polaris-text-subdued">
          © {new Date().getFullYear()} Aggo - AI-Native Store Diagnostic
        </div>
      </footer>
    </div>
  )
}


