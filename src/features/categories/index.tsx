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
import { CreateCategoryForm } from './components/CreateCategoryForm'
import { useState } from 'react'
import { EditCategoryForm } from './components/EditCategoryForm'
import { getCookie } from '@/lib/cookies'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

type CategoryItem = {
    id: number;
    name: string;
    department_id: number;
    department_name: string;
    created_at: string;
};

export default function Categories() {
    const [openEditForm, setOpenEditForm] = useState<boolean>(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [page, setPage] = useState(1);
    const limit = 10;

    const queryClient = useQueryClient();
    const token = getCookie('accessToken');

    const { data } = useQuery({
        queryKey: ["category", page],

        queryFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/test-category?page=${page}&limit=${limit}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (!res.ok) throw new Error("Failed to fetch categories");
            return res.json();
        },

        enabled: !!token,

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

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: async (categoryId: number) => {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/test-category/${categoryId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!res.ok) throw new Error("Failed to delete category");
            return res.json();
        },
        onSuccess: () => {
            toast.success("Category deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["category"] });
        },
        onError: (error: any) => {
            toast.error(error?.message || "Failed to delete category");
        },
    });

    const handleDelete = (categoryId: number, categoryName: string) => {
        if (window.confirm(`Are you sure you want to delete "${categoryName}"?`)) {
            deleteMutation.mutate(categoryId);
        }
    };

    console.log(data?.data);

    const columns: ColumnDef<CategoryItem>[] = [
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
            accessorKey: "id",
            header: "Category ID",
        },
        {
            accessorKey: "name",
            header: "Category Name",
        },
        {
            accessorKey: "department_name",
            header: "Department Name",
        },
        // Actions Column
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const item = row.original;

                return (
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            variant="default"
                            onClick={() => {
                                setSelectedCategoryId(item.id);
                                setOpenEditForm(true);
                            }}
                        >
                            Edit
                        </Button>
                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(item.id, item.name)}
                            disabled={deleteMutation.isPending}
                        >
                            Delete
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
                <h1 className="text-2xl font-bold tracking-tight mb-4">List of Categories</h1>
                <CreateCategoryForm />
            </div>
            <DataTable columns={columns} data={data?.data?.items || []} meta={data?.data?.meta} onPageChange={setPage} />
            <EditCategoryForm open={openEditForm} setOpen={setOpenEditForm} categoryId={selectedCategoryId} />
        </Main>
    </>
}