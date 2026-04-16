'use client'

import { useEffect } from 'react'
import { initRuntime } from '@/services/api'

export default function DisableRightClick() {
  useEffect(() => {
    void initRuntime()

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
    }

    document.addEventListener('contextmenu', handleContextMenu)

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [])

  return null
}
