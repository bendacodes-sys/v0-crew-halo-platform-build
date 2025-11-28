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

export default function EmployeeProfilePage() {
  // Simulating current user
  const employee = mockEmployees[0]

  return (
    <AppShell userRole="employee">
      <div className="space-y-6 max-w-6xl mx-auto">
        <ProfileHeader employee={employee} isOwnProfile canEdit />

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
            <VacationSection totalDays={employee.vacationDays} usedDays={employee.vacationDaysUsed} isOwnProfile />
          </div>
        </div>
      </div>
    </AppShell>
  )
}
