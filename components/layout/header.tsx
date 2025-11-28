"use client"

import { Bell, Search, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { mockNotifications } from "@/lib/mock-data"

export function Header() {
  const unreadCount = mockNotifications.filter((n) => !n.read).length

  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-30 flex items-center justify-between px-6">
      {/* Search */}
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar colaboradores, documentos..."
          className="pl-10 bg-muted/50 border-0 focus-visible:ring-1"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <MessageSquare className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notificaciones
              <Button variant="ghost" size="sm" className="text-xs">
                Marcar como leídas
              </Button>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {mockNotifications.slice(0, 5).map((notification) => (
              <DropdownMenuItem key={notification.id} className="flex flex-col items-start gap-1 py-3">
                <div className="flex items-center gap-2">
                  {!notification.read && <div className="h-2 w-2 rounded-full bg-primary" />}
                  <span className="font-medium text-sm">{notification.title}</span>
                </div>
                <p className="text-xs text-muted-foreground pl-4">{notification.message}</p>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center justify-center text-primary">
              Ver todas las notificaciones
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
