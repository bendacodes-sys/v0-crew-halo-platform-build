import { AppShell } from "@/components/layout/app-shell"
import { AdminDashboard } from "@/components/dashboard/admin-dashboard"

export default function AdminPage() {
  return (
    <AppShell userRole="admin">
      <AdminDashboard />
    </AppShell>
  )
}
