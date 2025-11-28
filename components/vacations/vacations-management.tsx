"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, XCircle, Clock, Palmtree, CalendarDays } from "lucide-react"
import { mockEmployees, mockVacationRequests } from "@/lib/mock-data"

export function VacationsManagement() {
  const [requests, setRequests] = useState(mockVacationRequests)

  const pendingRequests = requests.filter((r) => r.status === "pending")
  const approvedRequests = requests.filter((r) => r.status === "approved")
  const rejectedRequests = requests.filter((r) => r.status === "rejected")

  const handleApprove = (id: string) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: "approved" as const } : r)))
  }

  const handleReject = (id: string) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: "rejected" as const } : r)))
  }

  const getEmployee = (employeeId: string) => {
    return mockEmployees.find((e) => e.id === employeeId)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Palmtree className="h-6 w-6 text-primary" />
          Gestión de Vacaciones
        </h1>
        <p className="text-muted-foreground">Administra las solicitudes de vacaciones y permisos</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pendientes</p>
                <p className="text-3xl font-bold text-amber-600">{pendingRequests.length}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Aprobadas</p>
                <p className="text-3xl font-bold text-emerald-600">{approvedRequests.length}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rechazadas</p>
                <p className="text-3xl font-bold text-red-600">{rejectedRequests.length}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending" className="gap-2">
            <Clock className="h-4 w-4" />
            Pendientes
            {pendingRequests.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {pendingRequests.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="approved" className="gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Aprobadas
          </TabsTrigger>
          <TabsTrigger value="all" className="gap-2">
            <CalendarDays className="h-4 w-4" />
            Todas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingRequests.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <CheckCircle2 className="h-12 w-12 mx-auto text-emerald-500 mb-4" />
                <h3 className="font-medium mb-1">Todo al día</h3>
                <p className="text-sm text-muted-foreground">No hay solicitudes pendientes de revisión</p>
              </CardContent>
            </Card>
          ) : (
            pendingRequests.map((request) => {
              const employee = getEmployee(request.employeeId)
              if (!employee) return null

              return (
                <Card key={request.id}>
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={employee.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {employee.fullName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{employee.fullName}</h3>
                          <p className="text-sm text-muted-foreground">{employee.role}</p>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="text-sm">
                          <p className="text-muted-foreground">Fechas</p>
                          <p className="font-medium">
                            {new Date(request.startDate).toLocaleDateString("es-MX", {
                              day: "numeric",
                              month: "short",
                            })}{" "}
                            -{" "}
                            {new Date(request.endDate).toLocaleDateString("es-MX", {
                              day: "numeric",
                              month: "short",
                            })}
                          </p>
                        </div>
                        <div className="text-sm">
                          <p className="text-muted-foreground">Días</p>
                          <p className="font-medium">{request.days} días</p>
                        </div>
                        <Badge variant="outline">{request.type}</Badge>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleReject(request.id)}>
                          Rechazar
                        </Button>
                        <Button size="sm" onClick={() => handleApprove(request.id)}>
                          Aprobar
                        </Button>
                      </div>
                    </div>
                    {request.notes && (
                      <p className="text-sm text-muted-foreground mt-4 pt-4 border-t">Nota: {request.notes}</p>
                    )}
                  </CardContent>
                </Card>
              )
            })
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {approvedRequests.map((request) => {
            const employee = getEmployee(request.employeeId)
            if (!employee) return null

            return (
              <Card key={request.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={employee.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {employee.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{employee.fullName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(request.startDate).toLocaleDateString("es-MX")} -{" "}
                          {new Date(request.endDate).toLocaleDateString("es-MX")}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-emerald-500">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Aprobada
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {requests.map((request) => {
            const employee = getEmployee(request.employeeId)
            if (!employee) return null

            return (
              <Card key={request.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={employee.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {employee.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{employee.fullName}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(request.startDate).toLocaleDateString("es-MX")} -{" "}
                          {new Date(request.endDate).toLocaleDateString("es-MX")} ({request.days} días)
                        </p>
                      </div>
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
                      {request.status === "pending"
                        ? "Pendiente"
                        : request.status === "approved"
                          ? "Aprobada"
                          : "Rechazada"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>
      </Tabs>
    </div>
  )
}
