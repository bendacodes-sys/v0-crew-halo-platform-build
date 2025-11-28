import { AppShell } from "@/components/layout/app-shell"
import { AdminDocuments } from "@/components/documents/admin-documents"

export default function AdminDocumentsPage() {
  return (
    <AppShell userRole="admin">
      <AdminDocuments />
    </AppShell>
  )
}
