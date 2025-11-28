import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Code2 } from "lucide-react"
import type { Skill } from "@/lib/types"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SkillsSectionProps {
  skills: Skill[]
}

const levelProgress = {
  beginner: 25,
  intermediate: 50,
  advanced: 75,
  expert: 100,
}

const levelLabels = {
  beginner: "Principiante",
  intermediate: "Intermedio",
  advanced: "Avanzado",
  expert: "Experto",
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Code2 className="h-5 w-5 text-primary" />
          Skills & Stack Tecnológico
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <TooltipProvider>
            {skills.map((skill) => (
              <Tooltip key={skill.id}>
                <TooltipTrigger asChild>
                  <Badge
                    variant="secondary"
                    className="px-3 py-1.5 text-sm cursor-pointer hover:bg-secondary/80 transition-colors"
                  >
                    {skill.name}
                    {skill.verified && <CheckCircle2 className="h-3.5 w-3.5 ml-1.5 text-primary" />}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent side="top" className="w-48 p-3">
                  <p className="font-medium mb-1">{skill.name}</p>
                  <p className="text-xs text-muted-foreground mb-2">{skill.yearsOfExperience} años de experiencia</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Nivel</span>
                      <span className="font-medium">{levelLabels[skill.level]}</span>
                    </div>
                    <Progress value={levelProgress[skill.level]} className="h-1.5" />
                  </div>
                  {skill.verified && (
                    <p className="text-xs text-primary mt-2 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Verificado
                    </p>
                  )}
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  )
}
