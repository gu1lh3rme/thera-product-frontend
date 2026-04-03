'use client'

import { useEffect, useState } from 'react'

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [mswReady, setMswReady] = useState(false)

  useEffect(() => {
    async function initMSW() {
      if (typeof window !== 'undefined') {
        const { worker } = await import('@/mocks/browser')
        await worker.start({ onUnhandledRequest: 'bypass' })
        setMswReady(true)
      }
    }
    initMSW()
  }, [])

  if (!mswReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Initializing...</div>
      </div>
    )
  }

  return <>{children}</>
}
