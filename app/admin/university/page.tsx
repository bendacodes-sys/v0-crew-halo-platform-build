import { AppShell } from "@/components/layout/app-shell"
import { AdminUniversity } from "@/components/university/admin-university"

export default function AdminUniversityPage() {
  return (
    <AppShell userRole="admin">
      <AdminUniversity />
    </AppShell>
  )
}
