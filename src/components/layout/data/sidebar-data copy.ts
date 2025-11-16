import {
  LayoutDashboard,
  Monitor,
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
          title: 'Reception Indoor',
          icon: Settings,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: UserCog,
            },
            {
              title: 'Account',
              url: '/settings/account',
              icon: Wrench,
            },
            {
              title: 'Appearance',
              url: '/settings/appearance',
              icon: Palette,
            },
            {
              title: 'Notifications',
              url: '/settings/notifications',
              icon: Bell,
            },
            {
              title: 'Display',
              url: '/settings/display',
              icon: Monitor,
            },
          ],
        },
        {
          title: 'Reception Outdoor',
          icon: Settings,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: UserCog,
            },
            {
              title: 'Account',
              url: '/settings/account',
              icon: Wrench,
            },
            {
              title: 'Appearance',
              url: '/settings/appearance',
              icon: Palette,
            },
            {
              title: 'Notifications',
              url: '/settings/notifications',
              icon: Bell,
            },
            {
              title: 'Display',
              url: '/settings/display',
              icon: Monitor,
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
            {
              title: 'Account',
              url: '/settings/account',
              icon: Wrench,
            },
            {
              title: 'Appearance',
              url: '/settings/appearance',
              icon: Palette,
            },
            {
              title: 'Notifications',
              url: '/settings/notifications',
              icon: Bell,
            },
            {
              title: 'Display',
              url: '/settings/display',
              icon: Monitor,
            },
          ],
        },
        {
          title: 'General Ledger',
          icon: Settings,
          items: [
            {
              title: 'View Transactions',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Post Entry',
              url: '#',
              icon: Wrench,
            },
            {
              title: 'Account Reconciliation',
              url: '#',
              icon: Palette,
            },
          ],
        },
        {
          title: 'Banking & Payments',
          icon: Settings,
          items: [
            {
              title: 'View Bank Accounts',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Record Payments',
              url: '#',
              icon: Wrench,
            },
            {
              title: 'Bank Reconciliation',
              url: '#',
              icon: Palette,
            },
          ],
        },
        {
          title: 'Receivables/Payables',
          icon: Settings,
          items: [
            {
              title: 'View Invoices',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Manage Outstanding Payments',
              url: '#',
              icon: Wrench,
            },
            {
              title: 'Create New Invoice',
              url: '#',
              icon: Palette,
            },
            {
              title: 'Payment History',
              url: '#',
              icon: Palette,
            },
          ],
        },
        {
          title: 'Employee Payroll',
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
          title: 'Timesheet Management',
          icon: Settings,
          items: [
            {
              title: 'Track Attendance',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Leave Requests',
              url: '#',
              icon: Wrench,
            },
            {
              title: 'Overtime Records',
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
          title: 'Tax & Compliance',
          icon: Settings,
          items: [
            {
              title: 'Tax Calculations',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Generate Tax Reports',
              url: '#',
              icon: Wrench,
            },
            {
              title: 'Government Reporting',
              url: '#',
              icon: Palette,
            },
          ],
        },
        {
          title: 'Masters',
          icon: Settings,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: UserCog,
            },
            {
              title: 'Account',
              url: '/settings/account',
              icon: Wrench,
            },
            {
              title: 'Appearance',
              url: '/settings/appearance',
              icon: Palette,
            },
            {
              title: 'Notifications',
              url: '/settings/notifications',
              icon: Bell,
            },
            {
              title: 'Display',
              url: '/settings/display',
              icon: Monitor,
            },
          ],
        },
        {
          title: 'Medicine Inventory',
          icon: Settings,
          items: [
            {
              title: 'Add Medicine',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Update Medicine Stock',
              url: '#',
              icon: Wrench,
            },
            {
              title: 'Track Expiry Dates',
              url: '#',
              icon: Palette,
            },
          ],
        },
        {
          title: 'Pharmacy Sales',
          icon: Settings,
          items: [
            {
              title: 'Create Prescription',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Generate Sales Invoice',
              url: '#',
              icon: Wrench,
            },
            {
              title: 'Pharmacy Revenue Report',
              url: '#',
              icon: Palette,
            },
          ],
        },
        {
          title: 'Medicine Orders',
          icon: Settings,
          items: [
            {
              title: 'Place New Order',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Track Orders',
              url: '#',
              icon: Wrench,
            },
            {
              title: 'Supplier Management',
              url: '#',
              icon: Palette,
            },
          ],
        },
        {
          title: 'Appointment & Schedule',
          icon: Settings,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: UserCog,
            },
            {
              title: 'Account',
              url: '/settings/account',
              icon: Wrench,
            },
            {
              title: 'Appearance',
              url: '/settings/appearance',
              icon: Palette,
            },
            {
              title: 'Notifications',
              url: '/settings/notifications',
              icon: Bell,
            },
            {
              title: 'Display',
              url: '/settings/display',
              icon: Monitor,
            },
          ],
        },
        {
          title: 'Cash / Billing',
          icon: Settings,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: UserCog,
            },
            {
              title: 'Account',
              url: '/settings/account',
              icon: Wrench,
            },
            {
              title: 'Appearance',
              url: '/settings/appearance',
              icon: Palette,
            },
            {
              title: 'Notifications',
              url: '/settings/notifications',
              icon: Bell,
            },
            {
              title: 'Display',
              url: '/settings/display',
              icon: Monitor,
            },
          ],
        },
        {
          title: 'Stock Management',
          url: '#',
          icon: UserCog,
          items: [
            {
              title: 'Add New Items',
              url: '#',
              icon: Users,
            },
            {
              title: 'Update Stock',
              url: '#',
              icon: Users,
            },
            {
              title: 'Track Expiry Dates',
              url: '#',
              icon: Users,
            },
            {
              title: 'Low Stock Alerts',
              url: '#',
              icon: Users,
            },
          ]
        },
        {
          title: 'Inventory Reports',
          url: '#',
          icon: UserCog,
          items: [
            {
              title: 'Stock Valuation Report',
              url: '#',
              icon: Users,
            },
            {
              title: 'Stock Movement Report',
              url: '#',
              icon: Users,
            },
          ]
        },
        {
          title: 'Supplier Management',
          url: '#',
          icon: UserCog,
          items: [
            {
              title: 'View Supplier Info',
              url: '#',
              icon: Users,
            },
            {
              title: 'Purchase Orders',
              url: '#',
              icon: Users,
            },
            {
              title: 'Manage Suppliers',
              url: '#',
              icon: Users,
            },
          ]
        },
        {
          title: 'Staffs',
          icon: Users,
          items: [
            {
              title: "Staff 1",
              url: "#",
              icon: Users,
              items: [
                {
                  title: "Sub Staff 1",
                  url: "#",
                },
                {
                  title: "Sub Staff 2",
                  url: "#",
                },
                {
                  title: "Sub Staff 3",
                  url: "#",
                },
              ]
            }
          ]
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
