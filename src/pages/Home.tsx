import Button from '../components/Button'

export default function Home() {
  return (
    <section className="grid gap-8 md:grid-cols-2 md:items-center">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">React + Vite + Tailwind</h1>
        <p className="text-gray-600">
          Starter template with a clean structure: layouts, pages, components, and Tailwind CSS 3.x configured.
        </p>
        <div className="flex gap-3">
          <Button>Get Started</Button>
          <a
            href="https://tailwindcss.com/docs"
            className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            target="_blank"
          >
            Tailwind Docs
          </a>
        </div>
      </div>
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <pre className="whitespace-pre-wrap text-xs text-gray-700">src/
├─ components/
├─ layouts/
├─ pages/
├─ assets/
└─ index.css</pre>
      </div>
    </section>
  )
}


