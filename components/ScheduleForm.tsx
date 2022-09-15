import { FormEvent, useState } from 'react'
import { TextInput, Button, Center, Collapse } from '@mantine/core'
import { IconDatabase, IconClock } from '@tabler/icons'
import useStore from '../store'
import { useMutateSchedule } from '../hooks/useMutateSchedule'
import 'dayjs/locale/ja'
import { DatePicker, TimeInput } from '@mantine/dates'

export const ScheduleForm = () => {
  const { editedSchedule } = useStore()
  const update = useStore((state) => state.updateEditedSchedule)
  const { createScheduleMutation } = useMutateSchedule()
  const [opened, setOpened] = useState(false)
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createScheduleMutation.mutate({
      title: editedSchedule.title,
      scheduledDate: editedSchedule.scheduledDate,
      startTime: editedSchedule.startTime,
      endTime: editedSchedule.endTime,
      place: editedSchedule.place,
    })
  }
  return (
    <>
      <Button onClick={() => setOpened((o) => !o)}>新規スケジュール</Button>
      <Collapse in={opened}>
        <form onSubmit={handleSubmit}>
          <TextInput
            mt="md"
            placeholder="タイトル"
            value={editedSchedule.title || ''}
            onChange={(e) =>
              update({ ...editedSchedule, title: e.target.value })
            }
          />
          <TextInput
            mt="md"
            placeholder="場所"
            value={editedSchedule.place || ''}
            onChange={(e) => {
              update({ ...editedSchedule, place: e.target.value })
            }}
          />
          <DatePicker
            placeholder="日付を選択"
            label="開催日"
            mt="md"
            value={editedSchedule.scheduledDate || null}
            inputFormat="YYYY/MM/DD"
            onChange={(item) => {
              if (item) {
                update({ ...editedSchedule, scheduledDate: item })
              }
            }}
          />
          <TimeInput
            mt="md"
            label="開始予定"
            icon={<IconClock size={16} />}
            placeholder="開始予定"
            value={editedSchedule.startTime}
            onChange={(item) => {
              update({ ...editedSchedule, startTime: item })
            }}
          />
          <TimeInput
            mt="md"
            label="終了予定"
            icon={<IconClock size={16} />}
            value={editedSchedule.endTime}
            onChange={(item) => {
              update({ ...editedSchedule, endTime: item })
            }}
          />
          <Center mt="lg">
            <Button
              disabled={editedSchedule.title === ''}
              leftIcon={<IconDatabase size={14} />}
              color="cyan"
              type="submit"
            >
              Create
            </Button>
          </Center>
        </form>
      </Collapse>
    </>
  )
}
