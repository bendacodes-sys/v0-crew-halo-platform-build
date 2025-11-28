import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  Calendar,
  FileText,
  AlertCircle,
  Clock,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  UserPlus,
  Palmtree,
} from "lucide-react"
import Link from "next/link"
import { mockEmployees, mockVacationRequests } from "@/lib/mock-data"

export function AdminDashboard() {
  const activeEmployees = mockEmployees.filter((e) => e.status === "active").length
  const onboardingCount = mockEmployees.filter((e) => e.status === "onboarding").length
  const pendingVacations = mockVacationRequests.filter((v) => v.status === "pending").length

  const todayOutOfOffice = [
    { name: "Ana Sofía Hernández", reason: "Vacaciones", until: "5 Mar" },
    { name: "Roberto Sánchez", reason: "Permiso personal", until: "Hoy" },
  ]

  const recentJoins = mockEmployees
    .filter((e) => e.status === "onboarding" || new Date(e.startDate) > new Date("2024-01-01"))
    .slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard Admin</h1>
        <p className="text-muted-foreground">Bienvenido de vuelta. Aquí está el resumen de hoy.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Colaboradores Activos</p>
                <p className="text-3xl font-bold">{activeEmployees}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-sm text-emerald-600">
              <TrendingUp className="h-4 w-4" />
              <span>+3 este mes</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">En Onboarding</p>
                <p className="text-3xl font-bold">{onboardingCount}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <UserPlus className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Nuevos ingresos</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Solicitudes Pendientes</p>
                <p className="text-3xl font-bold">{pendingVacations}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Vacaciones por aprobar</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Docs Pendientes</p>
                <p className="text-3xl font-bold">8</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <FileText className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">Por firmar</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Tasks */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Tareas Pendientes
            </CardTitle>
            <CardDescription>Acciones que requieren tu atención</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Solicitud de vacaciones</p>
                  <p className="text-xs text-muted-foreground">María García - 4 días (20-25 Feb)</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  Rechazar
                </Button>
                <Button size="sm">Aprobar</Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Documentos por revisar</p>
                  <p className="text-xs text-muted-foreground">3 contratos pendientes de firma</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Ver todos
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                  <UserPlus className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Onboarding incompleto</p>
                  <p className="text-xs text-muted-foreground">Fernanda López - Faltan 3 documentos</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Ver detalle
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Red Flag sin resolver</p>
                  <p className="text-xs text-muted-foreground">1 incidencia requiere seguimiento</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Revisar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Out of Office */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Palmtree className="h-5 w-5 text-primary" />
              Fuera Hoy
            </CardTitle>
            <CardDescription>Quién está de vacaciones o permiso</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {todayOutOfOffice.map((person, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={`/professional-person.png?height=36&width=36&query=professional person ${i}`} />
                  <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{person.name}</p>
                  <p className="text-xs text-muted-foreground">{person.reason}</p>
                </div>
                <Badge variant="outline" className="text-xs shrink-0">
                  Hasta {person.until}
                </Badge>
              </div>
            ))}
            {todayOutOfOffice.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">Todos están trabajando hoy</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Joins & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-primary" />
                Incorporaciones Recientes
              </CardTitle>
              <Link href="/admin/directory">
                <Button variant="ghost" size="sm" className="gap-1">
                  Ver todos
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentJoins.map((employee) => (
              <Link key={employee.id} href={`/admin/directory/${employee.id}`}>
                <div className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
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
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{employee.fullName}</p>
                    <p className="text-xs text-muted-foreground truncate">{employee.role}</p>
                  </div>
                  <Badge variant={employee.status === "onboarding" ? "secondary" : "outline"} className="shrink-0">
                    {employee.status === "onboarding"
                      ? "En Onboarding"
                      : new Date(employee.startDate).toLocaleDateString("es-MX", {
                          day: "numeric",
                          month: "short",
                        })}
                  </Badge>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Accesos Rápidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/admin/directory">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 bg-transparent">
                  <Users className="h-5 w-5" />
                  <span className="text-sm">Directorio</span>
                </Button>
              </Link>
              <Link href="/admin/vacations">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 bg-transparent">
                  <Calendar className="h-5 w-5" />
                  <span className="text-sm">Vacaciones</span>
                </Button>
              </Link>
              <Link href="/admin/documents">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 bg-transparent">
                  <FileText className="h-5 w-5" />
                  <span className="text-sm">Documentos</span>
                </Button>
              </Link>
              <Link href="/admin/university">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 bg-transparent">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="text-sm">University</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
