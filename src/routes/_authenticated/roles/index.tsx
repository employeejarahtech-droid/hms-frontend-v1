import { ConfigDrawer } from '@/components/config-drawer'
import { DataTable } from '@/components/DataTable'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { getCookie } from '@/lib/cookies'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ColumnDef } from '@tanstack/react-table'

export const Route = createFileRoute('/_authenticated/roles/')({
  component: ListOfRoles,
})

const topNav = [
  {
    title: 'Overview',
    href: 'dashboard/overview',
    isActive: true,
    disabled: false,
  },
  {
    title: 'Customers',
    href: 'dashboard/customers',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Products',
    href: 'dashboard/products',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Settings',
    href: 'dashboard/settings',
    isActive: false,
    disabled: true,
  },
]

interface Roles {
  name: string;
  category: string;
  status: string;
}

function ListOfRoles() {
  const token = getCookie('accessToken');

  const fetchedRoles = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/roles/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  };

  const { data } = useQuery({
    queryKey: ["roles"],
    queryFn: fetchedRoles,
    enabled: !!token,
  })

  console.log(data);



  const columns: ColumnDef<Roles>[] = [
    // Row selection  
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) =>
            table.toggleAllPageRowsSelected(Boolean(value))
          }
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(Boolean(value))}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: "name",
      header: "Test Name",
    },
    {
      accessorKey: "category",
      header: "Category",
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const color =
          status === "passed"
            ? "bg-green-500"
            : status === "failed"
              ? "bg-red-500"
              : "bg-yellow-500";

        return <Badge className={color + " text-white"}>{status}</Badge>;
      },
    },

    // Actions Column
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const item = row.original;

        return (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => alert("View " + item)}>
              View
            </Button>
            <Button size="sm" variant="default">
              Edit
            </Button>
            <Button size="sm" variant="destructive" onClick={() => alert("Delete " + item)}>
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
  return <>
    {/* Header */}
    <Header>
      <TopNav links={topNav} />
      <div className="ms-auto flex items-center space-x-4">
        <Search />
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </div>
    </Header>
    <Main>
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h1 className="text-2xl font-bold tracking-tight mb-4">List of Roles</h1>
        <Link to="/tests/create"><Button>Create New Role</Button></Link>
        {/* <CreateTestForm /> */}
      </div>
      <DataTable columns={columns} data={data?.data?.items || []} />
    </Main>
  </>
}
