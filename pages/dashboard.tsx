import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import axios from 'axios'
import { LogoutIcon } from '@heroicons/react/solid'
import { Layout } from '../components/Layout'
import { UserInfo } from '../components/UserInfo'
import { useQueryClient } from '@tanstack/react-query'
import { ScheduleForm } from '../components/ScheduleForm'
import { ScheduleList } from '../components/ScheduleList'
import { Tooltip } from '@mantine/core'

const Dashboard: NextPage = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const logout = async () => {
    queryClient.removeQueries(['schedules'])
    queryClient.removeQueries(['user'])
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`)
    router.push('/')
  }
  return (
    <Layout title="Schedule Board">
      <Tooltip label="ログアウト">
        <LogoutIcon
          className="mb-6 h-6 w-6 cursor-pointer text-blue-500"
          onClick={logout}
        />
      </Tooltip>
      <UserInfo />
      <ScheduleForm />
      <ScheduleList />
    </Layout>
  )
}

export default Dashboard
