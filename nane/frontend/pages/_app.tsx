import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [dark])

  return (
    <div className="min-h-screen">
      <div className="p-4 max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">SMCNepal</h1>
          <button
            onClick={() => setDark(!dark)}
            className="px-3 py-1 border rounded"
          >
            {dark ? 'Light' : 'Dark'}
          </button>
        </header>
        <Component {...pageProps} />
      </div>
    </div>
  )
}