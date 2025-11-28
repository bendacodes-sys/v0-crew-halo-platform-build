import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Shield, Building2, UserCircle } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-6">
            <span className="text-primary-foreground font-bold text-2xl">CH</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Bienvenido a <span className="text-primary">CrewHalo</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            La plataforma de People Ops moderna para gestionar tu equipo con estilo
          </p>
        </div>

        {/* Role Selection */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <Link href="/employee">
            <Card className="h-full hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                  <UserCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Colaborador</CardTitle>
                <CardDescription>Accede a tu perfil, solicita vacaciones y consulta tu información</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent">
                  Ingresar
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin">
            <Card className="h-full hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Admin People</CardTitle>
                <CardDescription>Gestiona colaboradores, documentos, vacaciones y reportes</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent">
                  Ingresar
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin">
            <Card className="h-full hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Manager</CardTitle>
                <CardDescription>Ve tu equipo, aprueba vacaciones y registra feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent">
                  Ingresar
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/client">
            <Card className="h-full hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer group">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Cliente</CardTitle>
                <CardDescription>Conoce a tu equipo asignado y deja evaluaciones</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent">
                  Ingresar
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-sm text-muted-foreground">
          <p>DaCodes People OS · CrewHalo v1.0</p>
        </div>
      </div>
    </div>
  )
}
