import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Globe, Languages, Calendar } from "lucide-react"
import type { Employee } from "@/lib/types"

interface ProfessionalSnapshotProps {
  employee: Employee
}

export function ProfessionalSnapshot({ employee }: ProfessionalSnapshotProps) {
  const startDate = new Date(employee.startDate)
  const today = new Date()
  const yearsAtCompany = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365))
  const monthsAtCompany = Math.floor(((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30)) % 12)

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Briefcase className="h-5 w-5 text-primary" />
          Snapshot Profesional
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Briefcase className="h-3 w-3" />
              Experiencia Total
            </p>
            <p className="font-semibold">{employee.yearsOfExperience}+ años</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              En DaCodes
            </p>
            <p className="font-semibold">
              {yearsAtCompany > 0 ? `${yearsAtCompany}a ` : ""}
              {monthsAtCompany}m
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Languages className="h-3 w-3" />
              Nivel de Inglés
            </p>
            <Badge variant="secondary" className="font-semibold">
              {employee.englishLevel}
            </Badge>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Globe className="h-3 w-3" />
              Clientes US
            </p>
            <Badge
              variant={employee.usClientExperience ? "default" : "outline"}
              className={employee.usClientExperience ? "bg-emerald-500" : ""}
            >
              {employee.usClientExperience ? "Sí" : "No"}
            </Badge>
          </div>
        </div>

        {employee.bio && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-muted-foreground">{employee.bio}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
