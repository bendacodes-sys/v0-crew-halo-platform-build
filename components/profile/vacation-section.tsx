import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Palmtree, Plus } from "lucide-react"

interface VacationSectionProps {
  totalDays: number
  usedDays: number
  isOwnProfile?: boolean
}

export function VacationSection({ totalDays, usedDays, isOwnProfile }: VacationSectionProps) {
  const availableDays = totalDays - usedDays
  const usagePercentage = (usedDays / totalDays) * 100

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Palmtree className="h-5 w-5 text-primary" />
            Vacaciones
          </CardTitle>
          {isOwnProfile && (
            <Button variant="outline" size="sm" className="gap-1 bg-transparent">
              <Plus className="h-4 w-4" />
              Solicitar
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200 dark:border-emerald-800">
          <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">{availableDays}</p>
          <p className="text-sm text-muted-foreground">días disponibles</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Usados este año</span>
            <span className="font-medium">
              {usedDays} de {totalDays} días
            </span>
          </div>
          <Progress value={usagePercentage} className="h-2" />
        </div>
      </CardContent>
    </Card>
  )
}
