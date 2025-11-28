import { AppShell } from "@/components/layout/app-shell"
import { ClientDashboard } from "@/components/dashboard/client-dashboard"

export default function ClientPage() {
  return (
    <AppShell userRole="client">
      <ClientDashboard />
    </AppShell>
  )
}
