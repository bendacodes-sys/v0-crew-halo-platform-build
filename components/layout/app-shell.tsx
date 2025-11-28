import type React from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"

interface AppShellProps {
  children: React.ReactNode
  userRole: "employee" | "admin" | "manager" | "client"
}

export function AppShell({ children, userRole }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar userRole={userRole} />
      <div className="pl-64">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
