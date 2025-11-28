"use client"

import { useState } from "react"
import { BookOpen, Clock, Users, Star, Search, Filter, Play, CheckCircle2, Award, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Course, CourseEnrollment } from "@/lib/types"
import { cn } from "@/lib/utils"

interface CourseCatalogProps {
  courses: Course[]
  enrollments: CourseEnrollment[]
  isEmployee?: boolean
}

const categoryColors = {
  technical: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  "soft-skills": "bg-purple-500/10 text-purple-600 border-purple-500/20",
  leadership: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  compliance: "bg-red-500/10 text-red-600 border-red-500/20",
  onboarding: "bg-green-500/10 text-green-600 border-green-500/20",
}

const categoryLabels = {
  technical: "Técnico",
  "soft-skills": "Soft Skills",
  leadership: "Liderazgo",
  compliance: "Compliance",
  onboarding: "Onboarding",
}

const levelLabels = {
  beginner: "Principiante",
  intermediate: "Intermedio",
  advanced: "Avanzado",
}

export function CourseCatalog({ courses, enrollments, isEmployee = true }: CourseCatalogProps) {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  const getEnrollment = (courseId: string) => enrollments.find((e) => e.courseId === courseId)

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const myCourses = courses.filter((c) => enrollments.some((e) => e.courseId === c.id))
  const inProgressCourses = myCourses.filter((c) => {
    const enrollment = getEnrollment(c.id)
    return enrollment?.status === "in-progress"
  })
  const completedCourses = myCourses.filter((c) => {
    const enrollment = getEnrollment(c.id)
    return enrollment?.status === "completed"
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">DaCodes University</h1>
        <p className="text-muted-foreground">Desarrolla tus habilidades con nuestros cursos</p>
      </div>

      {/* Stats for employees */}
      {isEmployee && (
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Play className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{inProgressCourses.length}</p>
                <p className="text-sm text-muted-foreground">En progreso</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{completedCourses.length}</p>
                <p className="text-sm text-muted-foreground">Completados</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <Award className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-semibold">{completedCourses.length}</p>
                <p className="text-sm text-muted-foreground">Certificados</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tabs */}
      <Tabs defaultValue={isEmployee ? "my-courses" : "catalog"} className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <TabsList>
            {isEmployee && <TabsTrigger value="my-courses">Mis Cursos</TabsTrigger>}
            <TabsTrigger value="catalog">Catálogo</TabsTrigger>
            {isEmployee && <TabsTrigger value="certificates">Certificados</TabsTrigger>}
          </TabsList>

          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar cursos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 w-[200px]"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[160px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="technical">Técnico</SelectItem>
                <SelectItem value="soft-skills">Soft Skills</SelectItem>
                <SelectItem value="leadership">Liderazgo</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
                <SelectItem value="onboarding">Onboarding</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* My Courses */}
        {isEmployee && (
          <TabsContent value="my-courses" className="space-y-4">
            {inProgressCourses.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium text-muted-foreground">En progreso</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {inProgressCourses.map((course) => {
                    const enrollment = getEnrollment(course.id)
                    return (
                      <CourseCard
                        key={course.id}
                        course={course}
                        enrollment={enrollment}
                        onSelect={() => setSelectedCourse(course)}
                      />
                    )
                  })}
                </div>
              </div>
            )}

            {myCourses.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No tienes cursos inscritos</p>
                <p className="text-sm text-muted-foreground">Explora el catálogo para comenzar</p>
              </div>
            )}
          </TabsContent>
        )}

        {/* Catalog */}
        <TabsContent value="catalog" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => {
              const enrollment = getEnrollment(course.id)
              return (
                <CourseCard
                  key={course.id}
                  course={course}
                  enrollment={enrollment}
                  onSelect={() => setSelectedCourse(course)}
                />
              )
            })}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">No se encontraron cursos</p>
            </div>
          )}
        </TabsContent>

        {/* Certificates */}
        {isEmployee && (
          <TabsContent value="certificates" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {completedCourses.map((course) => {
                const enrollment = getEnrollment(course.id)
                return (
                  <Card key={course.id} className="overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-primary to-chart-2" />
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-warning/10">
                          <Award className="h-6 w-6 text-warning" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{course.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Completado:{" "}
                            {enrollment?.completedAt
                              ? new Date(enrollment.completedAt).toLocaleDateString("es-MX")
                              : "-"}
                          </p>
                          {enrollment?.score && (
                            <p className="text-sm text-success mt-1">Puntuación: {enrollment.score}%</p>
                          )}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
                        Descargar Certificado
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {completedCourses.length === 0 && (
              <div className="text-center py-12">
                <Award className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">Aún no tienes certificados</p>
                <p className="text-sm text-muted-foreground">Completa cursos para obtener certificados</p>
              </div>
            )}
          </TabsContent>
        )}
      </Tabs>

      {/* Course Detail Dialog */}
      <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedCourse && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className={cn("text-xs", categoryColors[selectedCourse.category])}>
                    {categoryLabels[selectedCourse.category]}
                  </Badge>
                  {selectedCourse.mandatory && (
                    <Badge variant="destructive" className="text-xs">
                      Obligatorio
                    </Badge>
                  )}
                </div>
                <DialogTitle className="text-xl">{selectedCourse.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <img
                  src={selectedCourse.thumbnail || "/placeholder.svg"}
                  alt={selectedCourse.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p className="text-muted-foreground">{selectedCourse.description}</p>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedCourse.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedCourse.enrolledCount} inscritos</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 text-warning fill-warning" />
                    <span>{selectedCourse.rating}</span>
                  </div>
                  <Badge variant="secondary">{levelLabels[selectedCourse.level]}</Badge>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Instructor</h4>
                  <p className="text-muted-foreground">{selectedCourse.instructor}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Contenido del curso</h4>
                  <div className="space-y-2">
                    {selectedCourse.modules.map((module, idx) => (
                      <div key={module.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                        <span className="text-sm font-medium text-muted-foreground w-6">{idx + 1}</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{module.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {module.type} • {module.duration}
                          </p>
                        </div>
                        {module.completed && <CheckCircle2 className="h-4 w-4 text-success" />}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedCourse.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button className="w-full">
                  {getEnrollment(selectedCourse.id) ? "Continuar Curso" : "Inscribirse"}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function CourseCard({
  course,
  enrollment,
  onSelect,
}: {
  course: Course
  enrollment?: CourseEnrollment
  onSelect: () => void
}) {
  return (
    <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow group" onClick={onSelect}>
      <div className="relative">
        <img
          src={course.thumbnail || "/placeholder.svg"}
          alt={course.title}
          className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {enrollment && enrollment.status !== "not-started" && (
          <div className="absolute bottom-2 left-2 right-2">
            <div className="bg-background/90 backdrop-blur rounded-lg p-2">
              <div className="flex items-center justify-between text-xs mb-1">
                <span>{enrollment.progress}% completado</span>
                {enrollment.status === "completed" && <CheckCircle2 className="h-3.5 w-3.5 text-success" />}
              </div>
              <Progress value={enrollment.progress} className="h-1.5" />
            </div>
          </div>
        )}
        {course.mandatory && (
          <Badge variant="destructive" className="absolute top-2 right-2 text-xs">
            Obligatorio
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className={cn("text-xs", categoryColors[course.category])}>
            {categoryLabels[course.category]}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {levelLabels[course.level]}
          </Badge>
        </div>
        <h3 className="font-medium line-clamp-2 mb-2">{course.title}</h3>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-warning fill-warning" />
            <span>{course.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            <span>{course.enrolledCount}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
