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
      name: 'Super Admin',
      logo: Command,
      plan: 'Role',
    },
    {
      name: 'Manager',
      logo: GalleryVerticalEnd,
      plan: 'Role',
    },
    {
      name: 'Receptionist',
      logo: AudioWaveform,
      plan: 'Role',
    },
    {
      name: 'Pathologist',
      logo: LineChart,
      plan: 'Role',
    },
    {
      name: 'Accountant',
      logo: Users,
      plan: 'Role',
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
          title: 'Users',
          url: '/users',
          icon: Users,
          items: [
            {
              title: 'List of Users',
              url: "#",
            },
            {
              title: 'List of Roles',
              url: "#",
            },
            {
              title: 'User Wise Themes',
              url: "#",
            },
            {
              title: 'User Wise Menus',
              url: "#",
            },
          ]
        },
        {
          title: 'Settings',
          icon: Settings,
          items: [
            {
              title: 'App Configuration',
              url: '/settings',
              icon: UserCog,
            },
            {
              title: 'System Preferences',
              url: '/settings/appearance',
              icon: Wrench,
            },
            {
              title: 'Language Settings',
              url: '/settings/display',
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
              url: '/tests',
              icon: UserCog,
            },
            {
              title: 'List of Department',
              url: '/departments',
              icon: Wrench,
            },
            {
              title: 'List of Category',
              url: '/categories',
              icon: Palette,
            },
            {
              title: 'List of Doctor',
              url: '/doctors',
              icon: List,
            },
          ],
        },
        {
          title: 'Outdoor:Reception',
          icon: Settings,
          items: [
            {
              title: 'Create Invoice',
              url: '/invoices/create',
              icon: UserCog,
            },
            {
              title: 'Due Collection',
              url: '/due-collection',
              icon: UserCog,
            },
            {
              title: 'List of Patients',
              url: '/patients',
              icon: UserCog,
            },
            {
              title: 'List of Invoices',
              url: '/invoices/list',
              title: 'Create Invoice',
              url: '/create-invoice',
              icon: UserCog,
            },
             {
              title: 'Due Collection',
              url: '/settings',
              icon: UserCog,
            },
             {
              title: 'List of Patients',
              url: '/settings',
              icon: UserCog,
            },
             {
              title: 'List of Invoices',
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
              url: '/services',
              icon: UserCog,
            },
            {
              title: 'List of Services Category',
              url: '/services-category',
              icon: UserCog,
            },
            {
              title: 'Treatment Outcome List',
              url: '/treatment-outcome-list',
              icon: UserCog,
            },
            {
              title: 'List of Operation Type',
              url: '/operation-type-list',
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
          title: 'Service Bill',
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
          title: 'Pathology:Biochemical',
          icon: Settings,
          items: [
            {
              title: 'All Reports',
              url: '/pathology/biochemical/all-reports',
              icon: UserCog,
            },
            {
              title: 'Lipid Profile',
              url: '/pathology/biochemical/lipid-profile',
              icon: UserCog,
            },
          ],
        },
        {
          title: 'Pathology:Hematology',
          icon: Settings,
          items: [
            {
              title: 'All Reports',
              url: '/settings',
              icon: UserCog,
            },
            {
              title: 'Blood For TCDC',
              url: '/settings',
              icon: UserCog,
            },
            {
              title: 'Blood For BT & CT',
              url: '/settings',
              icon: UserCog,
            },
            {
              title: 'CBC Short',
              url: '/settings',
              icon: UserCog,
            },
            {
              title: 'CBC Detail',
              url: '/settings',
              icon: UserCog,
            },
            {
              title: 'Prothom Bin Time Short',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Peripheral Blood Film',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'CBC With PBF',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Prothom Bin Time Full',
              url: '#',
              icon: UserCog,
            },
          ],
        },
        {
          title: 'Pathology:Immunuology',
          icon: Settings,
          items: [
            {
              title: 'All Reports',
              url: '/settings',
              icon: UserCog,
            },
            {
              title: 'Widal Test',
              url: '/settings',
              icon: UserCog,
            },
            {
              title: 'Blood Group',
              url: '/settings',
              icon: UserCog,
            },
            {
              title: 'MT',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Beta HCG',
              url: '#',
              icon: UserCog,
            },
          ],
        },
        {
          title: 'Pathology:Urine',
          icon: Settings,
          items: [
            {
              title: 'Urine For R/E Short',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Urine For R/E Full',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Urine For Sugar',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Urine For Albumin',
              url: '#',
              icon: UserCog,
            },
          ],
        },
        {
          title: 'Pathology:Stool',
          icon: Settings,
          items: [
            {
              title: 'Stool For R/E',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Ocult Blood Test(O.B.T)',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Reducing Substance',
              url: '#',
              icon: UserCog,
            },
          ],
        },
        {
          title: 'Pathology:Special',
          icon: Settings,
          items: [
            {
              title: 'All Hormon',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Sputum',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Semen',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Electrolytes',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Skin Scrapping For Fungus',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'T3T4TSH',
              url: '#',
              icon: UserCog,
            },
          ],
        },
        {
          title: 'X-Ray',
          icon: Settings,
          items: [
            {
              title: 'All Hormon',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Sputum',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Semen',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Electrolytes',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Skin Scrapping For Fungus',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'T3T4TSH',
              url: '#',
              icon: UserCog,
            },
          ],
        },
        {
          title: 'Ultra Sound',
          icon: Settings,
          items: [
            {
              title: 'All Hormon',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Sputum',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Semen',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Electrolytes',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Skin Scrapping For Fungus',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'T3T4TSH',
              url: '#',
              icon: UserCog,
            },
          ],
        },
        {
          title: 'ECG',
          icon: Settings,
          items: [
            {
              title: 'All Hormon',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Sputum',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Semen',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Electrolytes',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'Skin Scrapping For Fungus',
              url: '#',
              icon: UserCog,
            },
            {
              title: 'T3T4TSH',
              url: '#',
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
