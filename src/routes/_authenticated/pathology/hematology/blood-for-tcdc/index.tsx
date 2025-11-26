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
import { useState } from 'react';
import { EditBloodForTcDcForm } from '@/features/pathology/hematology/blood-for-tcdc/EditBloodForTcDcForm';
import { getCookie } from '@/lib/cookies';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute(
  '/_authenticated/pathology/hematology/blood-for-tcdc/',
)({
  component: BloodForTcdc,
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

type TCDC = {
  id: string;
  invoice_id: string;
  patient_name: string;
  basophils: string;
  eosinophils: string;
  lymphocytes: string;
  monocytes: string;
  neutrophils: string;
  total_count: string;
};

function BloodForTcdc() {
  const [open, setOpen] = useState<boolean>(false);

  const [page, setPage] = useState(1);
  const limit = 10;

  const token = getCookie('accessToken');

  const { data } = useQuery({
    queryKey: ["tcdc", page],

    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/tcdc?page=${page}&limit=${limit}`,
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

  const columns: ColumnDef<TCDC>[] = [
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
      accessorKey: "patient_name",
      header: "Patient Name",
    },

    // ✅ FIXED Tests column
    {
      accessorKey: "basophils",
      header: "Basophils",
    },

   {
      accessorKey: "eosinophils",
      header: "Eosinophils",
    },
   {
      accessorKey: "lymphocytes",
      header: "Lymphocytes",
    },
     {
      accessorKey: "monocytes",
      header: "Monocytes",
    },
    {
      accessorKey: "neutrophils",
      header: "Neutrophils",
    },
     {
      accessorKey: "total_count",
      header: "Total Count",
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

            <Button size="sm" variant="default" onClick={() => setOpen(true)}>Edit</Button>

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
      <Header fixed>
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
          <h1 className='text-2xl font-bold tracking-tight'>Blood For TCDC</h1>
        </div>
        <DataTable columns={columns} data={data?.data?.items || []} meta={data?.data?.meta} onPageChange={setPage} />
        <EditBloodForTcDcForm open={open} setOpen={setOpen} />
      </Main>
    </>

  )
}
