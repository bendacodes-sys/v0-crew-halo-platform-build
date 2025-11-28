import { AppShell } from "@/components/layout/app-shell"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfessionalSnapshot } from "@/components/profile/professional-snapshot"
import { SkillsSection } from "@/components/profile/skills-section"
import { TrainingsSection } from "@/components/profile/trainings-section"
import { FlagsSection } from "@/components/profile/flags-section"
import { PaymentSection } from "@/components/profile/payment-section"
import { VacationSection } from "@/components/profile/vacation-section"
import { CertificationsSection } from "@/components/profile/certifications-section"
import { mockEmployees } from "@/lib/mock-data"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function AdminEmployeeProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const employee = mockEmployees.find((e) => e.id === id)

  if (!employee) {
    notFound()
  }

  return (
    <AppShell userRole="admin">
      <div className="space-y-6 max-w-6xl mx-auto">
        <Link href="/admin/directory">
          <Button variant="ghost" size="sm" className="gap-2 mb-2">
            <ArrowLeft className="h-4 w-4" />
            Volver al directorio
          </Button>
        </Link>

        <ProfileHeader employee={employee} canEdit />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            <ProfessionalSnapshot employee={employee} />
            <SkillsSection skills={employee.skills} />
            <CertificationsSection certifications={employee.certifications} />
            <TrainingsSection trainings={employee.trainings} badges={employee.badges} />
            <FlagsSection flags={employee.flags} />
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            <PaymentSection paymentInfo={employee.paymentInfo} />
            <VacationSection totalDays={employee.vacationDays} usedDays={employee.vacationDaysUsed} />
          </div>
        </div>
      </div>
    </AppShell>
  )
}
