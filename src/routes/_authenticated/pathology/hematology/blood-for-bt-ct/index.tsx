import { createFileRoute } from '@tanstack/react-router';
import { ConfigDrawer } from "@/components/config-drawer";
import { DataTable } from "@/components/DataTable";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { TopNav } from "@/components/layout/top-nav";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { EditBloodForBTCTForm } from '@/features/pathology/hematology/blood-for-bt-ct/_components/EditBloodForBTCTForm';
import { useState } from 'react';
import { getCookie } from '@/lib/cookies';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute(
  '/_authenticated/pathology/hematology/blood-for-bt-ct/',
)({
  component: BloodForBTCT,
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

type BTCT = {
  id: number;
  invoice_id: number;
  bleeding_time: number;
  clotting_time: number;
};

function BloodForBTCT() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const limit = 10;

  const token = getCookie('accessToken');

  const { data } = useQuery({
    queryKey: ["btct", page],

    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/btct?page=${page}&limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch blood for tcdc reports");
      return res.json(); // MUST match placeholderData
    },

    enabled: !!token,

    // ⭐ Perfect smooth pagination
    placeholderData: (prev) =>
      prev
        ? prev
        : {
          data: {
            items: [],
            meta: {
              page,
              limit,
              total: 0,
            },
          },
        },
  });


  //console.log(data?.data);

  const columns: ColumnDef<BTCT>[] = [
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
      accessorKey: "invoice_id",
      header: "Invoice ID",
    },
    {
      accessorKey: "bleeding_time",
      header: "Bleeding Time",
    },

    // ✅ FIXED Tests column
    {
      accessorKey: "clotting_time",
      header: "Clotting Time",
    },

    // Actions Column
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const item = row.original;

        return (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => alert("View " + item.id)}>
              View
            </Button>

            <Button size="sm" variant="default" onClick={() => setIsDrawerOpen(true)}>Edit</Button>

            <Button size="sm" variant="destructive" onClick={() => alert("Delete " + item.id)}>
              Delete
            </Button>
          </div>
        );
      },
    },

  ];

  return (
    <>
      <Header>
        <TopNav links={topNav} />
        <div className='ms-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>
      <Main>
        <div className="mb-4">
          <h1 className='text-2xl font-bold tracking-tight'>Blood For BT/CT</h1>
        </div>
        <DataTable columns={columns} data={data?.data.items || []} meta={data?.data.meta} onPageChange={setPage} />
        <EditBloodForBTCTForm open={isDrawerOpen} setOpen={setIsDrawerOpen} />
      </Main>
    </>

  )
}

