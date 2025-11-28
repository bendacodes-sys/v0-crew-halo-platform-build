"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Search, Plus, LayoutGrid, List, Mail, MapPin } from "lucide-react"
import Link from "next/link"
import { mockEmployees } from "@/lib/mock-data"
import type { Employee, EmployeeStatus } from "@/lib/types"

const statusConfig: Record<EmployeeStatus, { label: string; color: string }> = {
  active: { label: "Activo", color: "bg-emerald-500" },
  inactive: { label: "Inactivo", color: "bg-gray-400" },
  onboarding: { label: "En Onboarding", color: "bg-amber-500" },
  offboarding: { label: "En Offboarding", color: "bg-red-400" },
}

export function DirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [serviceFilter, setServiceFilter] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const services = [...new Set(mockEmployees.map((e) => e.service))]

  const filteredEmployees = mockEmployees.filter((employee) => {
    const matchesSearch =
      employee.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || employee.status === statusFilter
    const matchesService = serviceFilter === "all" || employee.service === serviceFilter
    return matchesSearch && matchesStatus && matchesService
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            Directorio de Colaboradores
          </h1>
          <p className="text-muted-foreground">{filteredEmployees.length} colaboradores encontrados</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Colaborador
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por nombre, email o rol..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="active">Activos</SelectItem>
                <SelectItem value="inactive">Inactivos</SelectItem>
                <SelectItem value="onboarding">En Onboarding</SelectItem>
                <SelectItem value="offboarding">En Offboarding</SelectItem>
              </SelectContent>
            </Select>
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Servicio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los servicios</SelectItem>
                {services.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-1 border rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredEmployees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              {filteredEmployees.map((employee) => (
                <EmployeeListItem key={employee.id} employee={employee} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {filteredEmployees.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Users className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="font-medium mb-1">No se encontraron resultados</h3>
            <p className="text-sm text-muted-foreground">Intenta ajustar los filtros de búsqueda</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function EmployeeCard({ employee }: { employee: Employee }) {
  const status = statusConfig[employee.status]
  const initials = employee.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)

  return (
    <Link href={`/admin/directory/${employee.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group">
        <div className="h-12 bg-gradient-to-r from-primary/60 to-primary/40 relative" />
        <CardContent className="pt-0 -mt-6 relative">
          <div className="relative inline-block">
            <Avatar className="h-12 w-12 border-2 border-card shadow">
              <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.fullName} />
              <AvatarFallback className="bg-primary text-primary-foreground">{initials}</AvatarFallback>
            </Avatar>
            <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${status.color} border-2 border-card`} />
          </div>

          <div className="mt-2">
            <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{employee.fullName}</h3>
            <p className="text-xs text-muted-foreground truncate">{employee.role}</p>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-2">
            <Badge variant="outline" className="text-xs">
              {employee.service}
            </Badge>
            <Badge variant="outline" className={`text-xs ${status.color} bg-opacity-10`}>
              {status.label}
            </Badge>
          </div>

          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{employee.country}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

function EmployeeListItem({ employee }: { employee: Employee }) {
  const status = statusConfig[employee.status]
  const initials = employee.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)

  return (
    <Link href={`/admin/directory/${employee.id}`}>
      <div className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
        <div className="relative">
          <Avatar className="h-10 w-10">
            <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.fullName} />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">{initials}</AvatarFallback>
          </Avatar>
          <div className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ${status.color} border-2 border-card`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-sm">{employee.fullName}</h3>
            <Badge variant="outline" className="text-xs hidden md:inline-flex">
              {status.label}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground truncate">
            {employee.role} · {employee.service}
          </p>
        </div>

        <div className="hidden lg:flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Mail className="h-3 w-3" />
            <span className="truncate max-w-32">{employee.email}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{employee.country}</span>
          </div>
        </div>

        {employee.client && (
          <Badge variant="secondary" className="text-xs hidden md:inline-flex">
            {employee.client}
          </Badge>
        )}
      </div>
    </Link>
  )
}
