// routes/_authenticated/_layout.tsx
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { getCookie } from '@/lib/cookies'

export const Route = createFileRoute('/_authenticated/_layout')({
  beforeLoad: () => {
    const token = getCookie('accessToken')

    if (!token) {
      throw redirect({
        to: '/login',
      })
    }
  },

  component: () => {
    return <Outlet />
  }
})
