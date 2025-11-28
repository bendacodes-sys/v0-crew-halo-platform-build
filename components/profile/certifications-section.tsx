import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, ExternalLink, Calendar } from "lucide-react"
import type { Certification } from "@/lib/types"

interface CertificationsSectionProps {
  certifications: Certification[]
}

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  if (certifications.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Award className="h-5 w-5 text-primary" />
          Certificaciones
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">{cert.name}</p>
                  <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(cert.date).getFullYear()}
                </Badge>
                {cert.credentialUrl && (
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
