import {
  LayoutDashboard,
  Bell,
  Settings,
  Users,
  MessagesSquare,
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  LineChart,
} from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
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
              title: '- List of Users',
              url: "#",
            },
            {
              title: '- List of Roles',
              url: "#",
            },
            {
              title: '- User Wise Themes',
              url: "#",
            },
            {
              title: '- User Wise Menus',
              url: "#",
            },
          ]
        },
        {
          title: 'Settings',
          icon: Settings,
          items: [
            {
              title: '- App Configuration',
              url: '/settings',
            },
            {
              title: '- System Preferences',
              url: '/settings/appearance',
            },
            {
              title: '- Language Settings',
              url: '/settings/display',
            },
          ],
        },
        {
          title: 'Outdoor:Masters',
          icon: Settings,
          items: [
            {
              title: '- List of Test',
              url: '/tests',
            },
            {
              title: '- List of Department',
              url: '/departments',
            },
            {
              title: '- List of Category',
              url: '/categories',
            },
            {
              title: '- List of Doctor',
              url: '/doctors',
            },
          ],
        },
        {
          title: 'Outdoor:Reception',
          icon: Settings,
          items: [
            {
              title: '- Create Invoice',
              url: '/invoices/create',
            },
            {
              title: '- Due Collection',
              url: '/due-collection',
            },
            {
              title: '- List of Patients',
              url: '/patients',
            },
            {
              title: '- List of Invoices',
              url: '/invoices/list',
            },
          ],
        },
        {
          title: 'Indoor:Master',
          icon: Settings,
          items: [
            {
              title: '- Services',
              url: '/services',
            },
            {
              title: '- Service Categories',
              url: '/services-category',
            },
            {
              title: '- Treatment Outcomes',
              url: '/treatment-outcome-list',
            },
            {
              title: '- Operation Type List',
              url: '/operation-type-list',
            },
          ],
        },
        {
          title: 'Admission',
          icon: Settings,
          items: [
            {
              title: '- New Admission',
              url: '#',
            },
            {
              title: '- Advance Payment',
              url: '#',
            },
            {
              title: '- First Time Service',
              url: '#',
            },
            {
              title: '- Finalise Services',
              url: '#',
            },
            {
              title: '- First Time Bill',
              url: '#',
            },
            {
              title: '- Second Time Bill',
              url: '#',
            },
            {
              title: '- Create Invoice',
              url: '#',
            },
            {
              title: '- Due Collection',
              url: '#',
            },
            {
              title: '- Bed/Cabin Change',
              url: '#',
            },
          ],
        },
        {
          title: 'Service Bill',
          icon: Settings,
          items: [
            {
              title: '- Bill Distribute',
              url: '#',
            },
            {
              title: '- Account Balance',
              url: '#',
            },
            {
              title: '- Balance Distribute',
              url: '#',
            },
          ],
        },
        {
          title: 'Path:Biochemical',
          icon: Settings,
          items: [
            {
              title: '- All Reports',
              url: '/pathology/biochemical/reports',
            },
            {
              title: '- Lipid Profile',
              url: '/pathology/biochemical/lipid-profile',
            },
          ],
        },
        {
          title: 'Path:Hematology',
          icon: Settings,
          items: [
            {
              title: '- All Reports',
              url: '/pathology/hematology/reports',
            },
            {
              title: '- Blood For TCDC',
              url: '/pathology/hematology/blood-for-tcdc',
            },
            {
              title: '- Blood For BT & CT',
              url: '/pathology/hematology/blood-for-bt-ct',
            },
            {
              title: '- CBC Short',
              url: '/pathology/hematology/cbc-short',
            },
            {
              title: '- CBC Detail',
              url: '/pathology/hematology/cbc-detail',
            },
            {
              title: '- Prothom Bin Time Short',
              url: '#',
            },
            {
              title: '- Peripheral Blood Film',
              url: '/pathology/hematology/peripheral-blood-film',
            },
            {
              title: '- CBC With PBF',
              url: '#',
            },
            {
              title: '- Prothom Bin Time Full',
              url: '/pathology/hematology/prothom-bin-time-full',
            },
          ],
        },
        {
          title: 'Path:Immunology',
          icon: Settings,
          items: [
            {
              title: '- All Reports',
              url: '/pathology/immunology/reports',
            },
            {
              title: '- Widal Test',
              url: '/pathology/immunology/widal-test',
            },
            {
              title: '- Blood Group',
              url: '/pathology/immunology/blood-group',
            },
            {
              title: '- MT',
              url: '/pathology/immunology/mt',
            },
            {
              title: '- Beta HCG',
              url: '/pathology/immunology/beta-hcg',
            },
          ],
        },
        {
          title: 'Path:Urine',
          icon: Settings,
          items: [
            {
              title: '- Urine For R/E Short',
              url: '#',
            },
            {
              title: '- Urine For R/E Full',
              url: '/pathology/urine/urine-for-re-full',
            },
            {
              title: '- Urine For Sugar',
              url: '/pathology/urine/urine-for-sugar',
            },
            {
              title: '- Urine For Albumin',
              url: '/pathology/urine/urine-for-albumin',
            },
          ],
        },
        {
          title: 'Path:Stool',
          icon: Settings,
          items: [
            {
              title: '- Stool For R/E',
              url: '/pathology/stool/stool-re',
            },
            {
              title: '- Ocult Blood Test(O.B.T)',
              url: '/pathology/stool/ocult-blood-test',
            },
            {
              title: '- Reducing Substance',
              url: '/pathology/stool/reducing-substance',
            },
          ],
        },
        {
          title: 'Path:Special',
          icon: Settings,
          items: [
            {
              title: '- All Hormones',
              url: '/pathology/special/all-hormones',
            },
            {
              title: '- Sputum',
              url: '/pathology/special/sputum',
            },
            {
              title: '- Semen',
              url: '/pathology/special/semen',
            },
            {
              title: '- Electrolytes',
              url: '/pathology/special/electrolytes',
            },
            {
              title: '- Skin Scrapping For Fungus',
              url: '/pathology/special/skin-scrapping-for-fungus',
            },
            {
              title: '- T3T4TSH',
              url: '/pathology/special/t3t4tsh',
            },
          ],
        },
        {
          title: 'X-Ray',
          icon: Settings,
          items: [
            {
              title: '- All Reports',
              url: '/x-ray/all-reports',
            },
          ],
        },
        {
          title: 'Ultrasonogram',
          icon: Settings,
          items: [
            {
              title: '- All Reports',
              url: '/ultrasonogram/all-reports',
            },
          ],
        },
        {
          title: 'ECG',
          icon: Settings,
          items: [
            {
              title: '- All Reports',
              url: '/ecg/all-reports',
            },
          ],
        },
        {
          title: 'Accounts',
          icon: Settings,
          items: [
            {
              title: '- Daily Debit',
              url: '#',
            },
            {
              title: '- Daily Credit',
              url: '#',
            },
            {
              title: '- Payment to Surgeon',
              url: '#',
            },
            {
              title: '- Payment to Anaesthetist',
              url: '#',
            },
            {
              title: '- Payment to Assistant',
              url: '#',
            },
            {
              title: '- Payment to Consultant',
              url: '#',
            },
          ],
        },
        {
          title: 'Banks',
          icon: Settings,
          items: [
            {
              title: '- Bank Accounts',
              url: '#',
            },
            {
              title: '- Bank Transactions',
              url: '#',
            },
            {
              title: '- Bank Deposits',
              url: '#',
            },
            {
              title: '- Bank Withdrawals',
              url: '#',
            },
          ],
        },
        {
          title: 'Payroll',
          icon: Settings,
          items: [
            {
              title: '- View Salary Slips',
              url: '#',
            },
            {
              title: '- Create Payroll',
              url: '#',
            },
            {
              title: '- Manage Deductions',
              url: '#',
            },
            {
              title: '- Bonuses & Allowances',
              url: '#',
            },
          ],
        },
        {
          title: 'Notifications',
          icon: Bell,
          items: [
            {
              title: '- Email Notifications',
              url: '#',
            },
            {
              title: '- Push Notifications',
              url: '#',
            },
            {
              title: '- SMS Settings',
              url: '#',
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
      ],
    },
  ],
}
