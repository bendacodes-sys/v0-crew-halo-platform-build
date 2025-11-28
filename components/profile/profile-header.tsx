import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Mail, Phone, Edit2, Download, MoreHorizontal } from "lucide-react"
import type { Employee } from "@/lib/types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ProfileHeaderProps {
  employee: Employee
  isOwnProfile?: boolean
  canEdit?: boolean
}

const statusColors = {
  active: "bg-emerald-500",
  inactive: "bg-gray-400",
  onboarding: "bg-amber-500",
  offboarding: "bg-red-400",
}

const statusLabels = {
  active: "Activo",
  inactive: "Inactivo",
  onboarding: "En Onboarding",
  offboarding: "En Offboarding",
}

export function ProfileHeader({ employee, isOwnProfile, canEdit }: ProfileHeaderProps) {
  const initials = employee.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)

  return (
    <Card className="overflow-hidden">
      {/* Banner */}
      <div className="h-32 bg-gradient-to-r from-primary/80 via-primary to-primary/60 relative">
        <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern.png')] opacity-10 bg-cover bg-center" />
      </div>

      {/* Content */}
      <div className="px-6 pb-6">
        <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-12 relative">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="h-28 w-28 border-4 border-card shadow-lg">
              <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.fullName} />
              <AvatarFallback className="text-2xl bg-primary text-primary-foreground">{initials}</AvatarFallback>
            </Avatar>
            <div
              className={`absolute bottom-2 right-2 h-4 w-4 rounded-full ${statusColors[employee.status]} border-2 border-card`}
            />
          </div>

          {/* Info */}
          <div className="flex-1 pt-2 md:pt-0">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
              <h1 className="text-2xl font-bold">{employee.fullName}</h1>
              {employee.preferredName !== employee.fullName.split(" ")[0] && (
                <Badge variant="secondary" className="w-fit">
                  "{employee.preferredName}"
                </Badge>
              )}
            </div>

            <p className="text-lg text-muted-foreground mb-3">
              {employee.role} · {employee.service}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="outline" className={`${statusColors[employee.status]} bg-opacity-10`}>
                <span className={`h-2 w-2 rounded-full ${statusColors[employee.status]} mr-1.5`} />
                {statusLabels[employee.status]}
              </Badge>

              <Badge variant="outline">
                <span className="mr-1.5">🇲🇽</span>
                {employee.country}
              </Badge>

              <Badge variant="secondary">{employee.workload === "full-time" ? "Full-time" : employee.workload}</Badge>

              {employee.client && (
                <Badge variant="outline" className="bg-accent/50">
                  Asignado: {employee.client}
                </Badge>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-4 md:pt-0">
            {(isOwnProfile || canEdit) && (
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Edit2 className="h-4 w-4" />
                Editar perfil
              </Button>
            )}
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Exportar CV
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Ver historial</DropdownMenuItem>
                <DropdownMenuItem>Generar constancia</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Reportar incidencia</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            {employee.email}
          </div>
          {employee.phone && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              {employee.phone}
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {employee.country}
          </div>
        </div>
      </div>
    </Card>
  )
}
