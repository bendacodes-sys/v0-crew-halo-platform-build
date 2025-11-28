import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { GraduationCap, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import type { Training, Badge as BadgeType } from "@/lib/types"

interface TrainingsSectionProps {
  trainings: Training[]
  badges: BadgeType[]
}

const statusConfig = {
  pending: { label: "Pendiente", color: "bg-amber-500", icon: Clock },
  "in-progress": { label: "En Progreso", color: "bg-blue-500", icon: AlertCircle },
  completed: { label: "Completado", color: "bg-emerald-500", icon: CheckCircle2 },
}

export function TrainingsSection({ trainings, badges }: TrainingsSectionProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <GraduationCap className="h-5 w-5 text-primary" />
          Trainings & Badges
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Badges */}
        {badges.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">Badges Obtenidos</h4>
            <div className="flex flex-wrap gap-3">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/50 border border-accent"
                >
                  <span className="text-xl">{badge.icon}</span>
                  <div>
                    <p className="text-sm font-medium">{badge.name}</p>
                    <p className="text-xs text-muted-foreground">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trainings */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Cursos</h4>
          <div className="space-y-3">
            {trainings.map((training) => {
              const config = statusConfig[training.status]
              const StatusIcon = config.icon

              return (
                <div key={training.id} className="p-3 rounded-lg border bg-card">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-sm">{training.name}</p>
                      <p className="text-xs text-muted-foreground">{training.category}</p>
                    </div>
                    <Badge variant="outline" className={`${config.color} bg-opacity-10 text-xs`}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {config.label}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Progreso</span>
                      <span>{training.progress}%</span>
                    </div>
                    <Progress value={training.progress} className="h-1.5" />
                  </div>
                  {training.dueDate && training.status !== "completed" && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Fecha límite: {new Date(training.dueDate).toLocaleDateString("es-MX")}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
