import type { PropsWithChildren } from 'react'

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-dvh bg-gray-50 text-gray-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="/" className="text-xl font-semibold">
            shopos
          </a>
          <nav className="flex items-center gap-6 text-sm">
            <a href="#" className="text-gray-600 hover:text-gray-900">Docs</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">GitHub</a>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-12">
        {children}
      </main>
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-gray-500">
          © {new Date().getFullYear()} shopos
        </div>
      </footer>
    </div>
  )
}


