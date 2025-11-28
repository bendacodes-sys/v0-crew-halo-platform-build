import { AppShell } from "@/components/layout/app-shell"
import { CourseCatalog } from "@/components/university/course-catalog"
import { mockCourses, mockEnrollments } from "@/lib/mock-data"

export default function EmployeeUniversityPage() {
  // Filter enrollments for current employee (mock: employee id 1)
  const employeeEnrollments = mockEnrollments.filter((e) => e.employeeId === "1")

  return (
    <AppShell userRole="employee">
      <CourseCatalog courses={mockCourses} enrollments={employeeEnrollments} isEmployee />
    </AppShell>
  )
}
