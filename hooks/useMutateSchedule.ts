import { useRouter } from 'next/router'
import axios from 'axios'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { Schedule } from '@prisma/client'
import useStore from '../store'
import { EditedSchedule } from '../types'

export const useMutateSchedule = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const reset = useStore((state) => state.resetEditedSchedule)

  const createScheduleMutation = useMutation(
    async (schedule: Omit<EditedSchedule, 'scheduleId'>) => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/schedule`,
        schedule
      )
      return res.data
    },
    {
      onSuccess: (res) => {
        const previousSchedules = queryClient.getQueryData<Schedule[]>([
          'schedules',
        ]) //既存のスケジュール一覧を取得
        if (previousSchedules)
          [queryClient.setQueryData(['schedules'], [res, ...previousSchedules])]
        reset()
      },
      onError: (err: any) => {
        reset()
        if (err.response.status === 401 || err.response.status === 403) {
          router.push('/')
        }
      },
    }
  )
  //   const updateScheduleMutation = useMutation(
  //     async (schedule: EditedSchedule) => {},
  //     {
  //       onSuccess: (res, avriables) => {},
  //       onError: (err: any) => {},
  //     }
  //   )
  const deleteScheduleMutation = useMutation(
    async (scheduleId: string) => {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/schedule/${scheduleId}`
      )
    },
    {
      //非同期関数に渡したscheduleIdがvariablesに格納してある
      onSuccess: (_, variables) => {
        const previousSchedules = queryClient.getQueryData<Schedule[]>([
          'schedules',
        ])
        if (previousSchedules) {
          queryClient.setQueryData(
            ['schedules'],
            previousSchedules.filter(
              (schedule) => schedule.scheduleId !== variables
            )
          )
        }
        reset()
      },
      onError: (err: any) => {
        reset()
        if (err.response.status === 401 || err.response.status === 403) {
          router.push('/')
        }
      },
    }
  )

  return { createScheduleMutation, deleteScheduleMutation }
}
