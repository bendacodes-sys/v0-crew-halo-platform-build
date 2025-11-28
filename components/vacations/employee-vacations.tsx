"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Palmtree, Plus, Clock, CheckCircle2, XCircle, CalendarDays } from "lucide-react"
import { mockEmployees, mockVacationRequests } from "@/lib/mock-data"

export function EmployeeVacations() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Current user simulation
  const currentUser = mockEmployees[0]
  const availableDays = currentUser.vacationDays - currentUser.vacationDaysUsed

  const myRequests = mockVacationRequests.filter((r) => r.employeeId === currentUser.id)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Palmtree className="h-6 w-6 text-primary" />
            Mis Vacaciones
          </h1>
          <p className="text-muted-foreground">Solicita y gestiona tus días de descanso</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nueva Solicitud
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Solicitar Vacaciones</DialogTitle>
              <DialogDescription>Tienes {availableDays} días disponibles</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Tipo de ausencia</Label>
                <Select defaultValue="vacation">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vacation">Vacaciones</SelectItem>
                    <SelectItem value="personal">Permiso personal</SelectItem>
                    <SelectItem value="sick">Incapacidad</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Fecha inicio</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Fecha fin</Label>
                  <Input type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Notas (opcional)</Label>
                <Textarea placeholder="Agrega cualquier detalle relevante..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>Enviar solicitud</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Balance Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30">
                  <p className="text-3xl font-bold text-emerald-600">{availableDays}</p>
                  <p className="text-sm text-muted-foreground">Disponibles</p>
                </div>
                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30">
                  <p className="text-3xl font-bold text-blue-600">{currentUser.vacationDaysUsed}</p>
                  <p className="text-sm text-muted-foreground">Usados</p>
                </div>
                <div className="p-4 rounded-xl bg-muted">
                  <p className="text-3xl font-bold">{currentUser.vacationDays}</p>
                  <p className="text-sm text-muted-foreground">Total anual</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* My Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-primary" />
                Mis Solicitudes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {myRequests.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No tienes solicitudes registradas</p>
              ) : (
                myRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <p className="font-medium">
                        {new Date(request.startDate).toLocaleDateString("es-MX", {
                          day: "numeric",
                          month: "long",
                        })}{" "}
                        -{" "}
                        {new Date(request.endDate).toLocaleDateString("es-MX", {
                          day: "numeric",
                          month: "long",
                        })}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {request.days} días · {request.type}
                      </p>
                    </div>
                    <Badge
                      variant={request.status === "pending" ? "outline" : "default"}
                      className={
                        request.status === "approved"
                          ? "bg-emerald-500"
                          : request.status === "rejected"
                            ? "bg-red-500"
                            : ""
                      }
                    >
                      {request.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                      {request.status === "approved" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                      {request.status === "rejected" && <XCircle className="h-3 w-3 mr-1" />}
                      {request.status === "pending"
                        ? "Pendiente"
                        : request.status === "approved"
                          ? "Aprobada"
                          : "Rechazada"}
                    </Badge>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Calendario</CardTitle>
            <CardDescription>Visualiza tus días de descanso</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
