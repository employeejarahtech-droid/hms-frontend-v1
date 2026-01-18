import { getRouteApi } from '@tanstack/react-router'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { UsersDialogs } from './components/users-dialogs'
import { UsersPrimaryButtons } from './components/users-primary-buttons'
import { UsersProvider } from './components/users-provider'
import { UsersTable } from './components/users-table'
import { users } from './data/users'
import { Users as UsersIcon, UserCheck, UserX, Mail } from 'lucide-react'

const route = getRouteApi('/_authenticated/users/')

export function Users() {
  const search = route.useSearch()
  const navigate = route.useNavigate()

  // Calculate stats
  const totalUsers = users.length
  const activeUsers = users.filter(u => u.status === 'active').length
  const inactiveUsers = users.filter(u => u.status === 'inactive' || u.status === 'suspended').length
  const invitedUsers = users.filter(u => u.status === 'invited').length

  const stats = [
    {
      label: "Total Users",
      value: totalUsers,
      gradient: "from-blue-600 to-blue-400",
      shadow: "shadow-blue-500/30",
      icon: <UsersIcon className="w-6 h-6 text-white" />,
    },
    {
      label: "Active Users",
      value: activeUsers,
      gradient: "from-emerald-600 to-emerald-400",
      shadow: "shadow-emerald-500/30",
      icon: <UserCheck className="w-6 h-6 text-white" />,
    },
    {
      label: "Inactive/Suspended",
      value: inactiveUsers,
      gradient: "from-rose-600 to-rose-400",
      shadow: "shadow-rose-500/30",
      icon: <UserX className="w-6 h-6 text-white" />,
    },
    {
      label: "Invited",
      value: invitedUsers,
      gradient: "from-amber-600 to-amber-400",
      shadow: "shadow-amber-500/30",
      icon: <Mail className="w-6 h-6 text-white" />,
    },
  ]

  return (
    <UsersProvider>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <main className='flex flex-1 flex-col gap-4 sm:gap-6 p-6 lg:p-10'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>User List</h2>
            <p className='text-muted-foreground'>
              Manage your users and their roles here.
            </p>
          </div>
          <UsersPrimaryButtons />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${item.gradient} p-6 shadow-lg ${item.shadow} transition-all duration-300 hover:scale-[1.02] hover:translate-y-[-2px]`}
            >
              {/* Background Pattern */}
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-black/10 blur-2xl" />

              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-white/90">{item.label}</p>
                  <h3 className="mt-2 text-3xl font-bold text-white">
                    {item.value || 0}
                  </h3>
                </div>
                <div className="rounded-xl bg-white/20 p-2.5 backdrop-blur-sm">
                  {item.icon}
                </div>
              </div>

              {/* Progress/Indicator line */}
              <div className="mt-4 h-1 w-full rounded-full bg-black/10">
                <div className="h-full w-2/3 rounded-full bg-white/40" />
              </div>
            </div>
          ))}
        </div>

        <UsersTable data={users} search={search} navigate={navigate} />
      </main>

      <UsersDialogs />
    </UsersProvider>
  )
}
