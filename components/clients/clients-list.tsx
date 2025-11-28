"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Building2, Mail, Phone, ExternalLink } from "lucide-react"
import { HubSpotContact } from "@/lib/hubspot"
import Link from "next/link"

interface ClientsListProps {
  contacts: HubSpotContact[]
}

export function ClientsList({ contacts }: ClientsListProps) {
  const getClientName = (contact: HubSpotContact): string => {
    const firstName = contact.properties.firstname || ""
    const lastName = contact.properties.lastname || ""
    const company = contact.properties.company || ""
    
    if (firstName || lastName) {
      return `${firstName} ${lastName}`.trim()
    }
    if (company) {
      return company
    }
    if (contact.properties.email) {
      return contact.properties.email.split("@")[0]
    }
    return "Sin nombre"
  }

  const getInitials = (contact: HubSpotContact): string => {
    const name = getClientName(contact)
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold mb-1">Clientes</h2>
        <p className="text-sm text-muted-foreground">
          Lista de contactos de HubSpot ({contacts.length} total)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.map((contact) => {
          const name = getClientName(contact)
          const initials = getInitials(contact)

          return (
            <Card key={contact.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{name}</CardTitle>
                      {contact.properties.company && (
                        <div className="flex items-center gap-1 mt-1">
                          <Building2 className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {contact.properties.company}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {contact.properties.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground truncate">
                      {contact.properties.email}
                    </span>
                  </div>
                )}
                {contact.properties.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">
                      {contact.properties.phone}
                    </span>
                  </div>
                )}
                {contact.url && (
                  <Link
                    href={contact.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary hover:underline mt-3 pt-3 border-t"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Ver en HubSpot</span>
                  </Link>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {contacts.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">No se encontraron clientes</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

