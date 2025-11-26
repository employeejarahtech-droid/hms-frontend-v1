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
import { useState } from "react";
import { EditLipidProfileForm } from '@/features/pathology/biochemical/lipid-profile/components/EditLipidProfileForm';
import { getCookie } from '@/lib/cookies';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute(
  '/_authenticated/pathology/biochemical/lipid-profile/',
)({
  component: LipidProfile,
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

type LipidProfile = {
  id: string;
  invoice_id: string;
  total_cholesterol: string;
  cholesterol_ratio: string;
  hdl: string;
  ldl: string;
  vldl: string;
  triglycerides: string;
  status: string;
};

function LipidProfile() {
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const limit = 10;

  const token = getCookie('accessToken');

  const { data } = useQuery({
    queryKey: ["lipid-profile", page],

    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/lipid-profile?page=${page}&limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch lipid profiles");
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

  const columns: ColumnDef<LipidProfile>[] = [
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
      header: "Invoice Id",
    },
    {
      accessorKey: "total_cholesterol",
      header: "Total Cholesterol",
    },
    {
      accessorKey: "cholesterol_ratio",
      header: "Cholesterol Ratio",
    },
    {
      accessorKey: "hdl",
      header: "HDL",
    },

    {
      accessorKey: "ldl",
      header: "LDL",
    },

    {
      accessorKey: "vldl",
      header: "VLDL",
    },
    {
      accessorKey: "triglycerides",
      header: "Triglycerides",
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
            <Button size="sm" variant="default" onClick={() => setOpen(true)}>
              Edit
            </Button>
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
          <h1 className='text-2xl font-bold tracking-tight'>Lipid Profile</h1>
        </div>
        <DataTable columns={columns} data={data?.data?.items || []} meta={data?.data?.meta} onPageChange={setPage} />
        <EditLipidProfileForm open={open} setOpen={setOpen} />
      </Main>
    </>

  )
}

