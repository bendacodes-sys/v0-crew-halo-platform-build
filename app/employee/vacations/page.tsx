import { AppShell } from "@/components/layout/app-shell"
import { EmployeeVacations } from "@/components/vacations/employee-vacations"

export default function EmployeeVacationsPage() {
  return (
    <AppShell userRole="employee">
      <EmployeeVacations />
    </AppShell>
  )
}
