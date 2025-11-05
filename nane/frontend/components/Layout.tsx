import React, { ReactNode } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-4">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="mt-4">{children}</main>
      </div>
    </div>
  )
}