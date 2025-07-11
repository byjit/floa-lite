'use client'

import { useEffect, useState } from "react"
import { Button } from "./ui/button"

export const InstallPwaPrompt = () => {
    const [isIOS, setIsIOS] = useState(false)
    const [isStandalone, setIsStandalone] = useState(false)
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
    const [showInstall, setShowInstall] = useState(false)

    useEffect(() => {
      setIsIOS(
        /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
      )
      setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)

        const handler = (e: any) => {
            e.preventDefault()
            setDeferredPrompt(e)
            setShowInstall(true)
        }
        window.addEventListener('beforeinstallprompt', handler)
        return () => window.removeEventListener('beforeinstallprompt', handler)
    }, [])

    if (isStandalone) {
      return null // Don't show install button if already installed
    }

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt()
            const { outcome } = await deferredPrompt.userChoice
            if (outcome === 'accepted' || outcome === 'dismissed') {
                setShowInstall(false)
                setDeferredPrompt(null)
            }
        }
    }

    return (
        <div>
            {/* {showInstall && !isIOS && (
                <Button onClick={handleInstallClick}>Add to Home Screen</Button>
            )} */}
        {isIOS && (
          <p>
            To install this app on your iOS device, tap the share button
            <span role="img" aria-label="share icon">
                        {' '}⎋{' '}
            </span>
            and then "Add to Home Screen"
            <span role="img" aria-label="plus icon">
                        {' '}➕{' '}
            </span>.
          </p>
        )}
      </div>
    )
}