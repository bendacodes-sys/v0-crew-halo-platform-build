"use client"

import { useState } from "react"
import { FileText, Clock, CheckCircle2, TrendingUp, Upload, Send } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { mockDocuments, mockEmployees } from "@/lib/mock-data"
import { DocumentList } from "./document-list"

export function AdminDocuments() {
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([])

  const pendingDocs = mockDocuments.filter((d) => d.status === "pending")
  const signedDocs = mockDocuments.filter((d) => d.status === "signed")

  const stats = [
    { label: "Total Documentos", value: mockDocuments.length, icon: FileText, color: "text-primary" },
    { label: "Pendientes de Firma", value: pendingDocs.length, icon: Clock, color: "text-warning" },
    { label: "Firmados este mes", value: signedDocs.length, icon: CheckCircle2, color: "text-success" },
    { label: "Tasa de Cumplimiento", value: "94%", icon: TrendingUp, color: "text-primary" },
  ]

  const toggleEmployee = (id: string) => {
    setSelectedEmployees((prev) => (prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Gestión de Documentos</h1>
          <p className="text-muted-foreground">Administra y distribuye documentos al equipo</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Send className="h-4 w-4 mr-2" />
                Enviar Documento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Enviar Documento a Empleados</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Documento</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar documento" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockDocuments.map((doc) => (
                          <SelectItem key={doc.id} value={doc.id}>
                            {doc.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Fecha límite</Label>
                    <Input type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Mensaje (opcional)</Label>
                  <Textarea placeholder="Añade un mensaje para los empleados..." />
                </div>
                <div className="space-y-2">
                  <Label>Seleccionar empleados</Label>
                  <div className="border rounded-lg max-h-48 overflow-y-auto">
                    {mockEmployees.map((emp) => (
                      <div
                        key={emp.id}
                        className="flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer"
                        onClick={() => toggleEmployee(emp.id)}
                      >
                        <Checkbox checked={selectedEmployees.includes(emp.id)} />
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={emp.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{emp.preferredName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{emp.fullName}</p>
                          <p className="text-xs text-muted-foreground">{emp.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {selectedEmployees.length} empleado(s) seleccionado(s)
                  </p>
                </div>
                <Button className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Enviar a {selectedEmployees.length || "todos los"} empleados
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Subir Documento
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Subir Nuevo Documento</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Nombre del documento</Label>
                  <Input placeholder="Ej: Política de vacaciones 2024" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Categoría</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="legal">Legal</SelectItem>
                        <SelectItem value="hr">Recursos Humanos</SelectItem>
                        <SelectItem value="finance">Finanzas</SelectItem>
                        <SelectItem value="training">Capacitación</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Tipo</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="contract">Contrato</SelectItem>
                        <SelectItem value="policy">Política</SelectItem>
                        <SelectItem value="certificate">Certificado</SelectItem>
                        <SelectItem value="other">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="signature" />
                  <Label htmlFor="signature" className="text-sm">
                    Requiere firma
                  </Label>
                </div>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                  <p className="text-sm text-muted-foreground">Arrastra archivos aquí o haz clic para seleccionar</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX hasta 10MB</p>
                </div>
                <Button className="w-full">Subir Documento</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
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

      {/* Documents Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="pending">
            Pendientes
            {pendingDocs.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {pendingDocs.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="tracking">Seguimiento</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <DocumentList documents={mockDocuments} isAdmin />
        </TabsContent>

        <TabsContent value="pending">
          <DocumentList documents={pendingDocs} isAdmin />
        </TabsContent>

        <TabsContent value="tracking">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Seguimiento de Documentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockDocuments
                  .filter((d) => d.requiresSignature)
                  .map((doc) => {
                    const signedCount =
                      doc.status === "signed" ? mockEmployees.length : Math.floor(mockEmployees.length * 0.6)
                    const progress = (signedCount / mockEmployees.length) * 100
                    return (
                      <div key={doc.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-medium">{doc.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {signedCount} de {mockEmployees.length} empleados han firmado
                            </p>
                          </div>
                          <Badge variant={progress === 100 ? "default" : "secondary"}>{progress.toFixed(0)}%</Badge>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
                        </div>
                        {progress < 100 && (
                          <div className="flex gap-1 mt-3">
                            {mockEmployees.slice(0, 3).map((emp) => (
                              <Avatar key={emp.id} className="h-6 w-6 border-2 border-background">
                                <AvatarImage src={emp.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="text-xs">{emp.preferredName[0]}</AvatarFallback>
                              </Avatar>
                            ))}
                            <span className="text-xs text-muted-foreground ml-2 self-center">pendientes de firma</span>
                          </div>
                        )}
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
