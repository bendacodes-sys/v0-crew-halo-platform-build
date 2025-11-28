"use client"
import { BookOpen, Users, TrendingUp, Award, Plus, BarChart3, Clock, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockCourses, mockEnrollments, mockEmployees } from "@/lib/mock-data"
import { CourseCatalog } from "./course-catalog"

export function AdminUniversity() {
  const totalEnrollments = mockEnrollments.length
  const completedEnrollments = mockEnrollments.filter((e) => e.status === "completed").length
  const avgCompletion = mockEnrollments.reduce((acc, e) => acc + e.progress, 0) / totalEnrollments

  const stats = [
    { label: "Cursos Disponibles", value: mockCourses.length, icon: BookOpen, color: "text-primary" },
    { label: "Inscripciones Activas", value: totalEnrollments, icon: Users, color: "text-chart-2" },
    {
      label: "Tasa de Finalización",
      value: `${((completedEnrollments / totalEnrollments) * 100).toFixed(0)}%`,
      icon: TrendingUp,
      color: "text-success",
    },
    { label: "Certificados Emitidos", value: completedEnrollments, icon: Award, color: "text-warning" },
  ]

  // Get top performing employees
  const employeeProgress = mockEmployees
    .map((emp) => {
      const empEnrollments = mockEnrollments.filter((e) => e.employeeId === emp.id)
      const completed = empEnrollments.filter((e) => e.status === "completed").length
      const avgScore = empEnrollments.reduce((acc, e) => acc + (e.score || 0), 0) / (empEnrollments.length || 1)
      return { ...emp, completed, avgScore, totalCourses: empEnrollments.length }
    })
    .sort((a, b) => b.completed - a.completed)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">DaCodes University - Admin</h1>
          <p className="text-muted-foreground">Gestiona cursos y capacitaciones del equipo</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Crear Curso
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Curso</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Título del curso</Label>
                <Input placeholder="Ej: React Advanced Patterns" />
              </div>
              <div className="space-y-2">
                <Label>Descripción</Label>
                <Textarea placeholder="Describe el contenido y objetivos del curso..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Categoría</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Técnico</SelectItem>
                      <SelectItem value="soft-skills">Soft Skills</SelectItem>
                      <SelectItem value="leadership">Liderazgo</SelectItem>
                      <SelectItem value="compliance">Compliance</SelectItem>
                      <SelectItem value="onboarding">Onboarding</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Nivel</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Principiante</SelectItem>
                      <SelectItem value="intermediate">Intermedio</SelectItem>
                      <SelectItem value="advanced">Avanzado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Duración estimada</Label>
                  <Input placeholder="Ej: 8 horas" />
                </div>
                <div className="space-y-2">
                  <Label>Instructor</Label>
                  <Input placeholder="Nombre del instructor" />
                </div>
              </div>
              <Button className="w-full">Crear Curso</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="courses">Cursos</TabsTrigger>
          <TabsTrigger value="progress">Progreso del Equipo</TabsTrigger>
          <TabsTrigger value="analytics">Analíticas</TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          <CourseCatalog courses={mockCourses} enrollments={mockEnrollments} isEmployee={false} />
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Progreso por Empleado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employeeProgress.map((emp) => (
                  <div
                    key={emp.id}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={emp.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{emp.preferredName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium truncate">{emp.fullName}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {emp.completed}/{emp.totalCourses} cursos
                          </Badge>
                          {emp.avgScore > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              Promedio: {emp.avgScore.toFixed(0)}%
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{emp.role}</p>
                      <Progress
                        value={emp.totalCourses > 0 ? (emp.completed / emp.totalCourses) * 100 : 0}
                        className="h-1.5"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cursos Más Populares</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockCourses
                    .sort((a, b) => b.enrolledCount - a.enrolledCount)
                    .slice(0, 5)
                    .map((course, idx) => (
                      <div key={course.id} className="flex items-center gap-3">
                        <span className="text-lg font-semibold text-muted-foreground w-6">{idx + 1}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{course.title}</p>
                          <p className="text-xs text-muted-foreground">{course.enrolledCount} inscritos</p>
                        </div>
                        <Badge variant="secondary">{course.rating}</Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Progreso General</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded bg-success/10">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      </div>
                      <span className="text-sm">Completados</span>
                    </div>
                    <span className="font-semibold">{completedEnrollments}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded bg-primary/10">
                        <Clock className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">En progreso</span>
                    </div>
                    <span className="font-semibold">
                      {mockEnrollments.filter((e) => e.status === "in-progress").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded bg-muted">
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <span className="text-sm">Promedio completado</span>
                    </div>
                    <span className="font-semibold">{avgCompletion.toFixed(0)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
