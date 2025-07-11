'use client'

import { useEffect, useState } from "react"
import { Button, ButtonProps } from "./ui/button"
import { DownloadIcon } from "lucide-react"

export const InstallPwaButton = (props: ButtonProps) => {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
    const [showInstall, setShowInstall] = useState(false)
    const [isStandalone, setIsStandalone] = useState(false)

    useEffect(() => {
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
            {showInstall && (
                <Button onClick={handleInstallClick} {...props}>Install App <DownloadIcon className="w-4 h-4" /></Button>
            )}
        </div>
    )
}

export const IOSInstallPrompt = () => {
    const [isIOS, setIsIOS] = useState(false)
    const [isStandalone, setIsStandalone] = useState(false)

    useEffect(() => {
        setIsIOS(
            /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
        )
        setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
    }, [])

    if (!isIOS || isStandalone) {
        return null
    }

    return (
        <div>
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
        </div>
    )
}