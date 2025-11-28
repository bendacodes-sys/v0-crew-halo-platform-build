import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, MessageSquare, Languages, Briefcase, ExternalLink } from "lucide-react"
import Link from "next/link"
import { mockEmployees } from "@/lib/mock-data"
import { ClientsList } from "@/components/clients/clients-list"
import { fetchHubSpotContacts } from "@/lib/hubspot"

export async function ClientDashboard() {
  // Simulating team assigned to client "Interprotección"
  const clientTeam = mockEmployees.filter((e) => e.client === "Interprotección" || e.client === "Banorte")
  
  // Fetch HubSpot contacts
  const hubSpotContacts = await fetchHubSpotContacts()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Bienvenido</h1>
        <p className="text-muted-foreground">Conoce a tu equipo de DaCodes asignado a tu proyecto</p>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tu Equipo</p>
                <p className="text-3xl font-bold">{clientTeam.length}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">profesionales asignados</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Experiencia Promedio</p>
                <p className="text-3xl font-bold">
                  {Math.round(clientTeam.reduce((acc, e) => acc + e.yearsOfExperience, 0) / clientTeam.length)}+
                </p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">años de experiencia</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Aptos para Calls</p>
                <p className="text-3xl font-bold">{clientTeam.filter((e) => e.englishLevel >= "B2").length}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Languages className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">inglés B2 o superior</p>
          </CardContent>
        </Card>
      </div>

      {/* Team Grid */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Tu Equipo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clientTeam.map((member) => (
            <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {/* Mini Banner */}
              <div className="h-16 bg-gradient-to-r from-primary/60 to-primary/40 relative" />

              <CardContent className="pt-0 -mt-8 relative">
                <Avatar className="h-16 w-16 border-4 border-card shadow-md">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.fullName} />
                  <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                    {member.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>

                <div className="mt-3">
                  <h3 className="font-semibold">{member.fullName}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>

                {/* Quick Info */}
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="outline" className="text-xs">
                    {member.yearsOfExperience}+ años exp
                  </Badge>
                  <Badge
                    variant={member.englishLevel >= "B2" ? "default" : "secondary"}
                    className={`text-xs ${member.englishLevel >= "B2" ? "bg-emerald-500" : ""}`}
                  >
                    {member.englishLevel}
                  </Badge>
                </div>

                {/* Skills Preview */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {member.skills.slice(0, 4).map((skill) => (
                    <Badge key={skill.id} variant="secondary" className="text-xs">
                      {skill.name}
                    </Badge>
                  ))}
                  {member.skills.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{member.skills.length - 4}
                    </Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4 pt-3 border-t">
                  <Link href={`/client/team/${member.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full gap-1 bg-transparent">
                      <ExternalLink className="h-3.5 w-3.5" />
                      Ver perfil
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" className="shrink-0">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Clients List from HubSpot */}
      <div className="mt-8">
        <ClientsList contacts={hubSpotContacts} />
      </div>
    </div>
  )
}
