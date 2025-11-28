import { AppShell } from "@/components/layout/app-shell"
import { VacationsManagement } from "@/components/vacations/vacations-management"

export default function AdminVacationsPage() {
  return (
    <AppShell userRole="admin">
      <VacationsManagement />
    </AppShell>
  )
}
