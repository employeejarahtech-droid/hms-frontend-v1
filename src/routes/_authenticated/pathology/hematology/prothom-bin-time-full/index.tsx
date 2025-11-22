import { createFileRoute } from '@tanstack/react-router';
import { ConfigDrawer } from "@/components/config-drawer";
import { DataTable } from "@/components/DataTable";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { TopNav } from "@/components/layout/top-nav";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { reportsData } from "@/data/data";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from 'react';
import { EditProthrombinTimeForm } from '@/features/pathology/hematology/prothom-bin-time/EditProthomBinTimeForm';

export const Route = createFileRoute(
  '/_authenticated/pathology/hematology/prothom-bin-time-full/',
)({
  component: ProthomBinTimeFull,
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

type ReportsItem = {
  id: string;
  receiptId: string;
  patientName: string;
  tests: string[];
  date: string;
};

const reports: ReportsItem[] = reportsData;

function ProthomBinTimeFull() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const handleOpenEditForm = () => {
    setIsDrawerOpen(true);
  }
  const columns: ColumnDef<ReportsItem>[] = [
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
      accessorKey: "receiptId",
      header: "Receipt ID",
    },
    {
      accessorKey: "patientName",
      header: "Patient Name",
    },

    // ✅ FIXED Tests column
    {
      accessorKey: "tests",
      header: "Tests",
      cell: ({ row }) => {
        const tests = row.getValue("tests") as string[];
        return tests.join(", ");
      },
    },

    {
      accessorKey: "date",
      header: "Date",
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
            <Button size="sm" variant="outline" onClick={() => alert("View " + item.id)}>
              View
            </Button>

            <Button size="sm" variant="default" onClick={() => handleOpenEditForm()}>Edit</Button>

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
          <h1 className='text-2xl font-bold tracking-tight'>Prothom Bin Time Full</h1>
        </div>
        <DataTable columns={columns} data={reports} />
        <EditProthrombinTimeForm open={isDrawerOpen} setOpen={setIsDrawerOpen} />
      </Main>
    </>

  )
}

