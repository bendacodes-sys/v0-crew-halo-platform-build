import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flag, AlertTriangle, Star, CheckCircle2 } from "lucide-react"
import type { Flag as FlagType } from "@/lib/types"

interface FlagsSectionProps {
  flags: FlagType[]
}

export function FlagsSection({ flags }: FlagsSectionProps) {
  const redFlags = flags.filter((f) => f.type === "red")
  const blueFlags = flags.filter((f) => f.type === "blue")

  if (flags.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Flag className="h-5 w-5 text-primary" />
            Red & Blue Flags
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">No hay flags registrados</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Flag className="h-5 w-5 text-primary" />
          Red & Blue Flags
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary */}
        <div className="flex gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
            <Star className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">{blueFlags.length} Blue</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <span className="text-sm font-medium text-red-700 dark:text-red-300">{redFlags.length} Red</span>
          </div>
        </div>

        {/* Flags list */}
        <div className="space-y-3">
          {flags.map((flag) => (
            <div
              key={flag.id}
              className={`p-3 rounded-lg border ${
                flag.type === "blue"
                  ? "bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800"
                  : "bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-800"
              }`}
            >
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-2">
                  {flag.type === "blue" ? (
                    <Star className="h-4 w-4 text-blue-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  )}
                  <p className="font-medium text-sm">{flag.title}</p>
                </div>
                {flag.resolved && (
                  <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Resuelto
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground ml-6">{flag.description}</p>
              <p className="text-xs text-muted-foreground mt-2 ml-6">
                {new Date(flag.date).toLocaleDateString("es-MX")} · Por: {flag.reportedBy}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
