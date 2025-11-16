import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/test/')({
    component: RouteComponent,
})

function RouteComponent() {
    return <Header>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
            <ThemeSwitch />
            <ConfigDrawer />
            <ProfileDropdown />
        </div>
    </Header>
}
