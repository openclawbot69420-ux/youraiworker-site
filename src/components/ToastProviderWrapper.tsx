'use client'

import { ToastProvider } from './Toast'

export const ToastProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ToastProvider>{children}</ToastProvider>
}
