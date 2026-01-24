import { createFileRoute } from '@tanstack/react-router';
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DataTable } from '@/components/DataTable'
import { useState } from 'react'
import { getCookie } from '@/lib/cookies'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CreateTestTableForm } from '@/features/test-tables/CreateTestTableForm';
import { EditTestTableForm } from '@/features/test-tables/EditTestTableForm';
import { toast } from 'sonner';

export const Route = createFileRoute(
  '/_authenticated/outdoor/master/test-tables/',
)({
  component: TestTables,
})


type TestItem = {
  id: string;
  name: string;
  category_id: number;
  category_name: string;
  price: string;
  created_at: string;
};

function TestTables() {
  const [tableId, setTableId] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 10;
  const queryClient = useQueryClient();

  const token = getCookie('accessToken');

  const { data, refetch: refetchTestTables } = useQuery({
    queryKey: ["test-tables", page, search],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/test-tables?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch tests");
      return res.json();
    },
    enabled: !!token,
    placeholderData: (prev) =>
      prev
        ? prev
        : {
          data: {
            items: [],
            total: 0,
          },
        },
  });

  //console.log(data);

  function confirmDelete(message: string, onConfirm: () => void) {
    toast.custom((t) => (
      <div className="flex flex-col gap-3 bg-white p-4 rounded-md shadow-md border">
        <span className="text-sm font-semibold">{message}</span>

        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-1 rounded-md border text-sm"
            onClick={() => toast.dismiss(t)}
          >
            No
          </button>

          <button
            className="px-3 py-1 rounded-md bg-red-600 text-white text-sm"
            onClick={() => {
              toast.dismiss(t);
              onConfirm();
            }}
          >
            Yes
          </button>
        </div>
      </div>
    ));
  }


  const deleteMutation = useMutation({
    mutationFn: async (deleteId: number) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/test-tables/${deleteId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const error = await res.json().catch(() => null);
        throw new Error(error?.message || "Failed to delete test table");
      }

      return res.json();
    },

    onSuccess: () => {
      toast.success("Test table deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["test-tables"] as const,
      });

      setOpen(false);
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete test table");
    },
  });


  const columns: ColumnDef<TestItem>[] = [
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
      id: "sl",
      header: "SL",
      cell: ({ row }) => (page - 1) * limit + row.index + 1,
    },
    {
      accessorKey: "table_name",
      header: "Test Table Name",
    },
    {
      accessorKey: "display_name",
      header: "Display Name",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
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
            <Button size="sm" variant="default" onClick={() => { setOpen(true); setTableId(Number(item.id)) }}>
              Edit
            </Button>
            <Button size="sm" variant="destructive" disabled={deleteMutation.isPending}
              onClick={() =>
                confirmDelete("Are you sure you want to delete this test table?", () =>
                  deleteMutation.mutate(Number(item.id)) // 👈 THIS guarantees correct item
                )
              }

            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        );
      },
    },
  ];

  return <>
    <Header>
      <Search />
      <div className='ms-auto flex items-center space-x-4'>
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </div>
    </Header>

    <Main>
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h1 className="text-2xl font-bold tracking-tight mb-4">List of Test Tables</h1>
        <CreateTestTableForm refetchTestTables={refetchTestTables} />
      </div>
      <DataTable
        columns={columns}
        data={data?.data?.items || []}
        meta={data?.data?.meta}
        onPageChange={(newPage) => setPage(newPage)} search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1); // reset page when searching
        }}
      />
      <EditTestTableForm id={tableId} open={open} setOpen={setOpen} />
    </Main>
  </>
}
