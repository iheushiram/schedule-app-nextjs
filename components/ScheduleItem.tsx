import { FC } from 'react'
import { List, Stack, Paper, Text, Title, Box, Tooltip } from '@mantine/core'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'
import { Schedule } from '@prisma/client'
import useStore from '../store'
import { useMutateSchedule } from '../hooks/useMutateSchedule'
import { start } from 'repl'

export const ScheduleItem: FC<
  Omit<Schedule, 'createdAt' | 'updatedAt' | 'userId'>
> = ({ scheduleId, title, scheduledDate, startTime, endTime, place }) => {
  const update = useStore((state) => state.updateEditedSchedule)
  const { deleteScheduleMutation } = useMutateSchedule()
  return (
    <Box
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        textAlign: 'center',
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        cursor: 'pointer',
        width: 350,
        marginBottom: 10,
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[5]
              : theme.colors.gray[1],
        },
      })}
    >
      <div className="">
        <div className="float-left mr-10">
          <Tooltip label="消去">
            <TrashIcon
              className="ml-3 h-6 w-6 cursor-pointer text-blue-500"
              onClick={() => {
                deleteScheduleMutation.mutate(scheduleId)
              }}
            />
          </Tooltip>
        </div>
        <span className="">{scheduledDate.toString().split('T')[0]}</span>
        <span className="ml-2">
          {startTime.toString().split('T')[1].substring(0, 5)} -{' '}
          {endTime.toString().split('T')[1].substring(0, 5)}
        </span>

        <Title order={4}>{title}</Title>
      </div>
    </Box>
  )
}
