import {
  LayoutDashboard,
  Settings,
  Users,
  MessagesSquare,
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  LineChart,
  HandCoins,
  FileText,
  List,
  Scale,
  PieChart,
  VaultIcon,
  Car,
  PlusCircle,
  User,
  ShoppingCart,
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
              url: "/users",
            },
            {
              title: '- List of Roles',
              url: "/roles",
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
          title: "Customers",
          icon: User,
          items: [
            {
              title: "List of Customers",
              url: "/customers",
              icon: List,
            },
            {
              title: "Add New Customer",
              url: "/customers/create",
              icon: PlusCircle,
            },
          ],
        },
        {
          title: "Suppliers",
          icon: User,
          items: [
            {
              title: "List of Suppliers",
              url: "/suppliers",
              icon: List,
            },
            {
              title: "Add New Supplier",
              url: "/suppliers/create",
              icon: PlusCircle,
            },
          ],
        },
        {
          title: "Products",
          icon: Car,
          items: [
            {
              title: "List of Products",
              url: "/products",
              icon: FileText,
            },
            {
              title: "Add New Product",
              url: "/products/create",
              icon: List,
            },
            {
              title: "Categories",
              url: "/products/categories",
              icon: FileText,
            },
            {
              title: "Units",
              url: "/products/units",
              icon: PieChart,
            },
          ],
        },

        {
          title: "Purchase",
          icon: VaultIcon,
          items: [
            {
              title: "Purchase Orders",
              url: "/purchase/order",
              icon: FileText,
            },
            {
              title: "Add New Purchase Order",
              url: "/purchase/order/create",
              icon: PlusCircle,
            },
            {
              title: "Purchase Invoices",
              url: "/purchase/invoices",
              icon: FileText,
            },
            {
              title: "Purchase Payments",
              url: "/purchase/payments",
              icon: FileText,
            },
          ],
        },
        {
          title: "Inventory",
          icon: ShoppingCart,
          items: [
            {
              title: "Stocks",
              url: "/inventory/stocks",
              icon: FileText,
            },
          ],
        },
        {
          title: "Sales & Orders",
          icon: ShoppingCart,
          items: [
            {
              title: "Sales Orders",
              url: "/sales/order",
              icon: FileText,
            },
            {
              title: "Add New Sales Order",
              url: "/sales/order/create",
              icon: PlusCircle,
            },
            {
              title: "Sales Invoices",
              url: "/sales/invoices",
              icon: FileText,
            },
          ],
        },
        {
          title: "Accounting",
          icon: HandCoins,
          items: [
            {
              title: "Dashboard",
              url: "/accounting",
              icon: LayoutDashboard,
            },
            {
              title: "Transactions",
              url: "/accounting/transactions",
              icon: FileText,
            },
            {
              title: "Chart of Accounts",
              url: "/accounting/accounts",
              icon: List,
            },
            {
              title: "Journal Report",
              url: "/accounting/reports/journal",
              icon: FileText,
            },
            {
              title: "Ledger Report",
              url: "/accounting/reports/ledger",
              icon: FileText,
            },
            {
              title: "Trial Balance",
              url: "/accounting/reports/trial-balance",
              icon: Scale,
            },
            {
              title: "Profit & Loss",
              url: "/accounting/reports/profit-loss",
              icon: PieChart,
            },
          ],
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
        {
          title: 'Help',
          url: '/help',
          icon: MessagesSquare,
        },
      ],
    },
  ],
}
