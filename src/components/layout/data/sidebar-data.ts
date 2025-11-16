import {
  LayoutDashboard,
  Bell,
  Palette,
  Settings,
  Wrench,
  UserCog,
  Users,
  MessagesSquare,
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  LineChart,
  List,
} from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Shadcn Admin',
      logo: Command,
      plan: 'Vite + ShadcnUI',
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
        {
          title: 'Settings',
          icon: Settings,
          items: [
            {
              title: 'App Configuration',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'System Preferences',
              url: '#',
              icon: Wrench,
            },
            {
              title: 'Language Settings',
              url: '#',
              icon: Palette,
            },
          ],
        },
        {
          title: 'Outdoor:Masters',
          icon: Settings,
          items: [
            {
              title: 'List of Test',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'List of Department',
              url: '#',
              icon: Wrench,
            },
            {
              title: 'List of Category',
              url: '#',
              icon: Palette,
            },
            {
              title: 'List of Doctor',
              url: '#',
              icon: List,
            },
          ],
        },
        {
          title: 'Outdoor:Reception',
          icon: Settings,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: UserCog,
            },
          ],
        },
        {
          title: 'Indoor:Master',
          icon: Settings,
          items: [
            {
              title: 'List of Services',
              url: '#',
              icon: UserCog,
            },
          ],
        },
        {
          title: 'Admission',
          icon: Settings,
          items: [
            {
              title: 'New Admission',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Advance Payment',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'First Time Service',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Finalise Services',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'First Time Create Bill',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Second Time Create Bill',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Create Invoice',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Due Collection',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Bed/Cabin Change',
              url: '#',
              icon: UserCog,
            },
          ],
        },
        {
          title: 'Service Wise Bill Distribute',
          icon: Settings,
          items: [
            {
              title: 'Bill Distribute',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Account Balance',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Balance Distribute',
              url: '#',
              icon: UserCog,
            },
          ],
        },
        {
          title: 'Pathology',
          icon: Settings,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: UserCog,
            },
          ],
        },
        {
          title: 'Accounts',
          icon: Settings,
          items: [
            {
              title: 'Daily Debit',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Daily Credit',
              url: '#',
              icon: Wrench,
            },
            {
              title: 'Payment to Surgeon',
              url: '#',
              icon: Palette,
            },
            {
              title: 'Payment to Anaesthetist',
              url: '#',
              icon: Palette,
            },
            {
              title: 'Payment to Assistant',
              url: '#',
              icon: Palette,
            },
            {
              title: 'Payment to Consultant',
              url: '#',
              icon: Palette,
            },
          ],
        },
        {
          title: 'Banks',
          icon: Settings,
          items: [
            {
              title: 'Bank Accounts',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Bank Transactions',
              url: '#',
              icon: Wrench,
            },
            {
              title: 'Bank Deposits',
              url: '#',
              icon: Palette,
            },
            {
              title: 'Bank Withdrawals',
              url: '#',
              icon: Palette,
            },
          ],
        },
        {
          title: 'Payroll',
          icon: Settings,
          items: [
            {
              title: 'View Salary Slips',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Create Payroll',
              url: '#',
              icon: Wrench,
            },
            {
              title: 'Manage Deductions',
              url: '#',
              icon: Palette,
            },
            {
              title: 'Bonuses & Allowances',
              url: '#',
              icon: Bell,
            },
          ],
        },
        {
          title: 'Notifications',
          icon: Bell,
          items: [
            {
              title: 'Email Notifications',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Push Notifications',
              url: '#',
              icon: Wrench,
            },
            {
              title: 'SMS Settings',
              url: '#',
              icon: Palette,
            },
          ],
        },
        {
          title: 'Chats',
          url: '/chats',
          badge: '3',
          icon: MessagesSquare,
        },
        {
          title: 'Users',
          url: '/users',
          icon: Users,
          items: [
            {
              title: 'Add New User',
              url: "#",
            },
            {
              title: 'View All Users',
              url: "#",
            },
            {
              title: 'Edit User Profile',
              url: "#",
            },
            {
              title: 'User Activity Log',
              url: "#",
            },
            {
              title: 'Deactivated Users',
              url: "#",
            },
          ]
        },
        {
          title: 'Reports',
          icon: LineChart,
          items: [
            {
              title: 'Report 1',
              url: "#",
            },
            {
              title: 'Report 2',
              url: "#",
            },
            {
              title: 'Report 3',
              url: "#",
            },
          ]
        },
        // {
        //   title: 'Secured by Clerk',
        //   icon: ClerkLogo,
        //   items: [
        //     {
        //       title: 'Sign In',
        //       url: '/clerk/sign-in',
        //     },
        //     {
        //       title: 'Sign Up',
        //       url: '/clerk/sign-up',
        //     },
        //     {
        //       title: 'User Management',
        //       url: '/clerk/user-management',
        //     },
        //   ],
        // },
      ],
    },
  ],
}
