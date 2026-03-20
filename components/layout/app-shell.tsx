"use client"

import type React from "react"
import { useState } from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AppShellProps {
  children: React.ReactNode
  userRole: "employee" | "admin" | "manager" | "client"
}

export function AppShell({ children, userRole }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Button
          variant="outline"
          size="icon"
          className="bg-card"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <Sidebar userRole={userRole} mobileOpen={sidebarOpen} onMobileClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-64 transition-all duration-300">
        <Header />
        <main className="p-4 pt-16 lg:pt-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
