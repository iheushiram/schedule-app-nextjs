export type AuthForm = {
  userId: string
  password: string
  email: string
}

export type EditedSchedule = {
  scheduleId: string
  title: string
  scheduledDate: Date | null
  startTime: Date | null
  endTime: Date | null
  place?: string | null
}
