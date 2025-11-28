import { AppShell } from "@/components/layout/app-shell"
import { EmployeeDashboard } from "@/components/dashboard/employee-dashboard"

export default function EmployeePage() {
  return (
    <AppShell userRole="employee">
      <EmployeeDashboard />
    </AppShell>
  )
}
