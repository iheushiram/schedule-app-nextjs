import { useRouter } from 'next/router'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Schedule } from '@prisma/client'

export const useQuerySchedules = () => {
  const router = useRouter()
  const getSchedules = async () => {
    const { data } = await axios.get<Schedule[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/schedule`
    )
    return data
  }
  return useQuery<Schedule[], Error>({
    queryKey: ['schedules'],
    queryFn: getSchedules,
    onError: (err: any) => {
      if (err.response.status === 401 || err.response.status === 403)
        router.push('/')
    },
  })
}
