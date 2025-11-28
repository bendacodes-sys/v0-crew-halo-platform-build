"use client"

import { useState } from "react"
import {
  FileText,
  Download,
  Eye,
  Pencil,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Search,
  Filter,
  Upload,
  MoreHorizontal,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { Document } from "@/lib/types"
import { cn } from "@/lib/utils"

interface DocumentListProps {
  documents: Document[]
  isAdmin?: boolean
}

const statusConfig = {
  pending: { label: "Pendiente", icon: Clock, color: "bg-warning/10 text-warning border-warning/20" },
  signed: { label: "Firmado", icon: CheckCircle2, color: "bg-success/10 text-success border-success/20" },
  rejected: { label: "Rechazado", icon: XCircle, color: "bg-destructive/10 text-destructive border-destructive/20" },
  expired: { label: "Expirado", icon: AlertTriangle, color: "bg-muted text-muted-foreground border-muted" },
}

const categoryLabels = {
  legal: "Legal",
  hr: "Recursos Humanos",
  finance: "Finanzas",
  training: "Capacitación",
  personal: "Personal",
}

const typeLabels = {
  contract: "Contrato",
  policy: "Política",
  certificate: "Certificado",
  payslip: "Recibo de Nómina",
  other: "Otro",
}

export function DocumentList({ documents, isAdmin = false }: DocumentListProps) {
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = categoryFilter === "all" || doc.category === categoryFilter
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const pendingCount = documents.filter((d) => d.status === "pending" && d.requiresSignature).length

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Documentos</h1>
          <p className="text-muted-foreground">
            {pendingCount > 0 ? (
              <span className="text-warning">Tienes {pendingCount} documento(s) pendiente(s) de firma</span>
            ) : (
              "Todos tus documentos al día"
            )}
          </p>
        </div>
        {isAdmin && (
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
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                  <p className="text-sm text-muted-foreground">Arrastra archivos aquí o haz clic para seleccionar</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX hasta 10MB</p>
                </div>
                <Button className="w-full">Subir</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar documentos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="legal">Legal</SelectItem>
                <SelectItem value="hr">Recursos Humanos</SelectItem>
                <SelectItem value="finance">Finanzas</SelectItem>
                <SelectItem value="training">Capacitación</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="pending">Pendientes</SelectItem>
                <SelectItem value="signed">Firmados</SelectItem>
                <SelectItem value="rejected">Rechazados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Document Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDocs.map((doc) => {
          const status = statusConfig[doc.status]
          const StatusIcon = status.icon
          return (
            <Card key={doc.id} className="group hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-primary/10 shrink-0">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">{doc.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {typeLabels[doc.type]} • {categoryLabels[doc.category]}
                    </p>
                    {doc.description && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{doc.description}</p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className={cn("text-xs", status.color)}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {status.label}
                      </Badge>
                      {doc.size && <span className="text-xs text-muted-foreground">{doc.size}</span>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Subido: {new Date(doc.uploadedAt).toLocaleDateString("es-MX")}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        Ver
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" />
                        Descargar
                      </DropdownMenuItem>
                      {doc.status === "pending" && doc.requiresSignature && (
                        <DropdownMenuItem className="text-primary">
                          <Pencil className="h-4 w-4 mr-2" />
                          Firmar
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredDocs.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No se encontraron documentos</p>
        </div>
      )}
    </div>
  )
}
