import { AppShell } from "@/components/layout/app-shell"
import { AdminReports } from "@/components/reports/admin-reports"

export default function AdminReportsPage() {
  return (
    <AppShell userRole="admin">
      <AdminReports />
    </AppShell>
  )
}
