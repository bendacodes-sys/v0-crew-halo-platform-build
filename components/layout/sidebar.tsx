"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  Users,
  Calendar,
  FileText,
  GraduationCap,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  UserCircle,
  Bot,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"

interface SidebarProps {
  userRole: "employee" | "admin" | "manager" | "client"
}

const adminNavItems = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/directory", label: "Directorio", icon: Users },
  { href: "/admin/vacations", label: "Vacaciones", icon: Calendar },
  { href: "/admin/documents", label: "Documentos", icon: FileText },
  { href: "/admin/university", label: "University", icon: GraduationCap },
  { href: "/admin/reports", label: "Reportes", icon: BarChart3 },
  { href: "/admin/settings", label: "Configuración", icon: Settings },
]

const employeeNavItems = [
  { href: "/employee", label: "Mi Dashboard", icon: Home },
  { href: "/employee/profile", label: "Mi Perfil", icon: UserCircle },
  { href: "/employee/vacations", label: "Vacaciones", icon: Calendar },
  { href: "/employee/documents", label: "Documentos", icon: FileText },
  { href: "/employee/university", label: "University", icon: GraduationCap },
  { href: "/employee/directory", label: "Directorio", icon: Users },
]

const clientNavItems = [
  { href: "/client", label: "Dashboard", icon: Home },
  { href: "/client/team", label: "Mi Equipo", icon: Users },
]

export function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const navItems =
    userRole === "admin" || userRole === "manager"
      ? adminNavItems
      : userRole === "client"
        ? clientNavItems
        : employeeNavItems

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-card border-r border-border transition-all duration-300 flex flex-col",
        collapsed ? "w-[72px]" : "w-64",
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">CH</span>
            </div>
            <span className="font-semibold text-lg">CrewHalo</span>
          </Link>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center mx-auto">
            <span className="text-primary-foreground font-bold text-sm">CH</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-8 w-8", collapsed && "absolute -right-4 bg-card border shadow-sm")}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* AI Assistant Button */}
        {!collapsed && (
          <div className="mt-6 px-1">
            <Button variant="outline" className="w-full justify-start gap-2 border-dashed bg-transparent">
              <Bot className="h-4 w-4" />
              <span>Preguntar a CrewBot</span>
            </Button>
          </div>
        )}
      </nav>

      {/* User Profile */}
      <div className="border-t border-border p-3">
        <div
          className={cn(
            "flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-muted transition-colors cursor-pointer",
            collapsed && "justify-center",
          )}
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src="/professional-headshot.png" />
            <AvatarFallback>MG</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">María García</p>
              <p className="text-xs text-muted-foreground truncate">Admin People</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
