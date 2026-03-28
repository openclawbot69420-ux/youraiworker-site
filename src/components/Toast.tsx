'use client'

import { useEffect, useState, createContext, useContext, useCallback } from 'react'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: string
  message: string
  type: ToastType
  duration?: number
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType, duration?: number) => void
  dismissToast: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

// Toast icon mapping
const ToastIcon: Record<ToastType, typeof CheckCircle> = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
}

const ToastColors: Record<ToastType, string> = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  error: 'border-rose-200 bg-rose-50 text-rose-800',
  warning: 'border-amber-200 bg-amber-50 text-amber-800',
  info: 'border-blue-200 bg-blue-50 text-blue-800',
}

const IconColors: Record<ToastType, string> = {
  success: 'text-emerald-600',
  error: 'text-rose-600',
  warning: 'text-amber-600',
  info: 'text-blue-600',
}

// Individual Toast item
const ToastItem: React.FC<{
  toast: Toast
  onDismiss: (id: string) => void
}> = ({ toast, onDismiss }) => {
  const [isEntering, setIsEntering] = useState(true)
  const [isExiting, setIsExiting] = useState(false)
  const Icon = ToastIcon[toast.type]

  useEffect(() => {
    // Trigger enter animation
    const enterTimer = setTimeout(() => setIsEntering(false), 50)
    
    // Auto dismiss
    const duration = toast.duration ?? 4000
    const dismissTimer = setTimeout(() => {
      handleDismiss()
    }, duration)

    return () => {
      clearTimeout(enterTimer)
      clearTimeout(dismissTimer)
    }
  }, [toast.id, toast.duration])

  const handleDismiss = () => {
    setIsExiting(true)
    setTimeout(() => onDismiss(toast.id), 300)
  }

  return (
    <div
      role="alert"
      aria-live="polite"
      className={[
        'pointer-events-auto flex w-full max-w-sm items-start gap-3',
        'rounded-xl border p-4 shadow-lg',
        'transition-all duration-300 ease-out',
        ToastColors[toast.type],
        isEntering ? 'translate-y-2 opacity-0' : '',
        isExiting ? 'translate-x-full opacity-0' : '',
      ].join(' ')}
    >
      <Icon
        className={`h-5 w-5 shrink-0 ${IconColors[toast.type]}`}
        aria-hidden="true"
      />
      <div className="flex-1">
        <p className="text-sm font-medium">{toast.message}</p>
      </div>
      <button
        onClick={handleDismiss}
        className="-mr-1 -mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-current opacity-60 transition-opacity hover:opacity-100"
        aria-label="Melding sluiten"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  )
}

// Toast container and provider
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback(
    (message: string, type: ToastType = 'info', duration?: number) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
      setToasts((prev) => [...prev, { id, message, type, duration }])
    },
    []
  )

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}
      {/* Toast container - fixed position */}
      {toasts.length > 0 && (
        <div
          className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2"
          aria-live="polite"
          aria-atomic="false"
        >
          {toasts.map((toast) => (
            <ToastItem
              key={toast.id}
              toast={toast}
              onDismiss={dismissToast}
            />
          ))}
        </div>
      )}
    </ToastContext.Provider>
  )
}

// Convenience hook for quick toast usage
export const useSuccessToast = () => {
  const { showToast } = useToast()
  return useCallback(
    (message: string, duration?: number) =>
      showToast(message, 'success', duration),
    [showToast]
  )
}

export const useErrorToast = () => {
  const { showToast } = useToast()
  return useCallback(
    (message: string, duration?: number) =>
      showToast(message, 'error', duration),
    [showToast]
  )
}
