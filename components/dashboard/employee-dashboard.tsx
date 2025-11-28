import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Wallet,
  Calendar,
  Palmtree,
  FileText,
  GraduationCap,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { mockEmployees, mockHolidays, mockEvents } from "@/lib/mock-data"

export function EmployeeDashboard() {
  // Simulating current user as María García
  const currentUser = mockEmployees[0]

  const nextPaymentDate = new Date(currentUser.paymentInfo.nextPaymentDate)
  const today = new Date()
  const daysUntilPayment = Math.ceil((nextPaymentDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  const availableVacationDays = currentUser.vacationDays - currentUser.vacationDaysUsed

  const pendingTrainings = currentUser.trainings.filter((t) => t.status !== "completed")

  const upcomingEvents = [...mockHolidays.map((h) => ({ ...h, type: "holiday" })), ...mockEvents]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 4)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Hola, {currentUser.preferredName} 👋</h1>
        <p className="text-muted-foreground">Aquí está tu resumen personal de hoy.</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Next Payment */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-1">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {daysUntilPayment > 0 ? `En ${daysUntilPayment} días` : "Hoy"}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Próximo pago</p>
              <p className="text-3xl font-bold">${currentUser.paymentInfo.estimatedAmount?.toLocaleString("es-MX")}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {nextPaymentDate.toLocaleDateString("es-MX", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Vacation Days */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <Palmtree className="h-6 w-6 text-emerald-600" />
              </div>
              <Link href="/employee/vacations">
                <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                  Solicitar
                </Button>
              </Link>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Días disponibles</p>
              <p className="text-3xl font-bold text-emerald-600">{availableVacationDays}</p>
              <p className="text-sm text-muted-foreground mt-1">de {currentUser.vacationDays} días totales</p>
            </div>
          </CardContent>
        </Card>

        {/* Pending Trainings */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-blue-600" />
              </div>
              <Link href="/employee/university">
                <Button variant="ghost" size="sm" className="gap-1">
                  Ver todos
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Trainings pendientes</p>
              <p className="text-3xl font-bold">{pendingTrainings.length}</p>
              <p className="text-sm text-muted-foreground mt-1">cursos por completar</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Link href="/employee/vacations">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 bg-transparent">
                  <Palmtree className="h-5 w-5 text-emerald-600" />
                  <span className="text-sm">Solicitar vacaciones</span>
                </Button>
              </Link>
              <Link href="/employee/documents">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 bg-transparent">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span className="text-sm">Mis documentos</span>
                </Button>
              </Link>
              <Link href="/employee/profile">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 bg-transparent">
                  <Clock className="h-5 w-5 text-amber-600" />
                  <span className="text-sm">Ver constancia</span>
                </Button>
              </Link>
              <Link href="/employee/university">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 bg-transparent">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <span className="text-sm">University</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Documents Status */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Documentos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <span className="text-sm">Contrato actualización</span>
              </div>
              <Badge variant="outline" className="text-amber-600 border-amber-300">
                Pendiente
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span className="text-sm">NDA Cliente</span>
              </div>
              <Badge variant="outline" className="text-emerald-600 border-emerald-300">
                Firmado
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trainings Progress */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Mis Trainings
              </CardTitle>
              <Link href="/employee/university">
                <Button variant="ghost" size="sm" className="gap-1">
                  Ver todos
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentUser.trainings.map((training) => (
              <div key={training.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{training.name}</p>
                    <p className="text-xs text-muted-foreground">{training.category}</p>
                  </div>
                  <Badge
                    variant={training.status === "completed" ? "default" : "outline"}
                    className={
                      training.status === "completed"
                        ? "bg-emerald-500"
                        : training.status === "in-progress"
                          ? "border-blue-300 text-blue-600"
                          : ""
                    }
                  >
                    {training.status === "completed"
                      ? "Completado"
                      : training.status === "in-progress"
                        ? "En progreso"
                        : "Pendiente"}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={training.progress} className="h-2 flex-1" />
                  <span className="text-xs text-muted-foreground w-10">{training.progress}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Calendar */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Próximos Eventos
            </CardTitle>
            <CardDescription>Calendario de empresa</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingEvents.map((event, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg border">
                <div
                  className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                    event.type === "holiday"
                      ? "bg-red-100 dark:bg-red-900/30"
                      : event.type === "training"
                        ? "bg-blue-100 dark:bg-blue-900/30"
                        : "bg-emerald-100 dark:bg-emerald-900/30"
                  }`}
                >
                  <span className="text-lg">
                    {event.type === "holiday" ? "🎉" : event.type === "training" ? "📚" : "✨"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{event.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(event.date).toLocaleDateString("es-MX", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={
                    event.type === "holiday"
                      ? "border-red-200 text-red-600"
                      : event.type === "training"
                        ? "border-blue-200 text-blue-600"
                        : "border-emerald-200 text-emerald-600"
                  }
                >
                  {event.type === "holiday" ? "Feriado" : event.type === "training" ? "Training" : "Evento"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
