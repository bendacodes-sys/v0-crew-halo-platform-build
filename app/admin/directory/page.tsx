import { AppShell } from "@/components/layout/app-shell"
import { DirectoryPage } from "@/components/directory/directory-page"

export default function AdminDirectoryPage() {
  return (
    <AppShell userRole="admin">
      <DirectoryPage />
    </AppShell>
  )
}
