import { useQuerySchedules } from '../hooks/useQuerySchedules'
import { List, ThemeIcon, Loader } from '@mantine/core'
import { IconCircleDashed } from '@tabler/icons'
import { ScheduleItem } from './ScheduleItem'
import { ScheduleForm } from './ScheduleForm'

export const ScheduleList = () => {
  const { data: schedules, status } = useQuerySchedules()
  if (status === 'loading') return <Loader my="lg" color="cyan" />

  return (
    <List
      my="lg"
      spacing="sm"
      size="sm"
      icon={
        <ThemeIcon color="cyan" size={24} radius="xl">
          <IconCircleDashed size={16} />
        </ThemeIcon>
      }
    >
      {schedules?.map((schedule) => (
        <ScheduleItem
          key={schedule.scheduleId}
          scheduleId={schedule.scheduleId}
          title={schedule.title}
          scheduledDate={schedule.scheduledDate}
          startTime={schedule.startTime}
          endTime={schedule.endTime}
          place={schedule.place}
        />
      ))}
    </List>
  )
}
