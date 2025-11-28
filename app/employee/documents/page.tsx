import { AppShell } from "@/components/layout/app-shell"
import { DocumentList } from "@/components/documents/document-list"
import { mockDocuments } from "@/lib/mock-data"

export default function EmployeeDocumentsPage() {
  // Filter documents for the current employee (mock: employee id 1)
  const employeeDocuments = mockDocuments.filter((doc) => !doc.employeeId || doc.employeeId === "1")

  return (
    <AppShell userRole="employee">
      <DocumentList documents={employeeDocuments} />
    </AppShell>
  )
}
