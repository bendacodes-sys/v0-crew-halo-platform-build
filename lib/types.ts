// Core types for CrewHalo platform

export type UserRole = "employee" | "admin" | "manager" | "client" | "superadmin"

export type EmployeeStatus = "active" | "inactive" | "onboarding" | "offboarding"

export type WorkloadType = "full-time" | "part-time" | "50-50" | "contractor"

export type PaymentScheme = "nomina" | "mixto" | "honorarios" | "deel" | "pb"

export type FlagType = "red" | "blue"

export interface User {
  id: string
  email: string
  role: UserRole
  employeeId?: string
}

export interface Employee {
  id: string
  fullName: string
  preferredName: string
  email: string
  phone?: string
  avatar?: string
  role: string
  seniority: string
  service: string
  squad?: string
  client?: string
  project?: string
  status: EmployeeStatus
  workload: WorkloadType
  country: string
  countryCode: string
  startDate: string
  yearsOfExperience: number
  englishLevel: string
  usClientExperience: boolean
  skills: Skill[]
  certifications: Certification[]
  flags: Flag[]
  trainings: Training[]
  badges: Badge[]
  paymentInfo: PaymentInfo
  vacationDays: number
  vacationDaysUsed: number
  manager?: string
  bio?: string
}

export interface Skill {
  id: string
  name: string
  icon?: string
  yearsOfExperience: number
  level: "beginner" | "intermediate" | "advanced" | "expert"
  verified: boolean
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  expiryDate?: string
  credentialUrl?: string
}

export interface Flag {
  id: string
  type: FlagType
  title: string
  description: string
  date: string
  reportedBy: string
  resolved?: boolean
  resolvedDate?: string
}

export interface Training {
  id: string
  name: string
  category: string
  status: "pending" | "in-progress" | "completed"
  completedDate?: string
  dueDate?: string
  progress: number
}

export interface Badge {
  id: string
  name: string
  icon: string
  description: string
  earnedDate: string
}

export interface PaymentInfo {
  scheme: PaymentScheme
  channel: string
  nextPaymentDate: string
  lastPaymentDate?: string
  estimatedAmount?: number
  currency: string
}

export interface VacationRequest {
  id: string
  employeeId: string
  startDate: string
  endDate: string
  days: number
  status: "pending" | "approved" | "rejected"
  type: "vacation" | "personal" | "sick" | "other"
  notes?: string
  approvedBy?: string
  createdAt: string
}

export interface Document {
  id: string
  name: string
  type: "contract" | "policy" | "certificate" | "payslip" | "other"
  category: "legal" | "hr" | "finance" | "training" | "personal"
  url: string
  uploadedAt: string
  uploadedBy?: string
  status: "pending" | "signed" | "rejected" | "expired"
  signedAt?: string
  expiresAt?: string
  requiresSignature: boolean
  employeeId?: string
  size?: string
  description?: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "success" | "error"
  read: boolean
  createdAt: string
  link?: string
}

export interface Course {
  id: string
  title: string
  description: string
  category: "technical" | "soft-skills" | "leadership" | "compliance" | "onboarding"
  duration: string
  level: "beginner" | "intermediate" | "advanced"
  instructor: string
  thumbnail?: string
  modules: CourseModule[]
  enrolledCount: number
  rating: number
  tags: string[]
  mandatory: boolean
  createdAt: string
}

export interface CourseModule {
  id: string
  title: string
  duration: string
  type: "video" | "reading" | "quiz" | "exercise"
  completed?: boolean
}

export interface CourseEnrollment {
  id: string
  courseId: string
  employeeId: string
  progress: number
  status: "not-started" | "in-progress" | "completed"
  startedAt?: string
  completedAt?: string
  score?: number
  certificateUrl?: string
}

export interface ReportMetric {
  label: string
  value: number
  change?: number
  changeType?: "increase" | "decrease" | "neutral"
}

export interface HeadcountData {
  month: string
  total: number
  active: number
  onboarding: number
  offboarding: number
}

export interface SkillDistribution {
  skill: string
  count: number
  percentage: number
}

export interface TurnoverData {
  month: string
  hires: number
  departures: number
  rate: number
}
