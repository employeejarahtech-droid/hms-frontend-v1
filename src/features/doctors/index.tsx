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
import { CreateDoctorForm } from './components/CreateDoctorForm'
import { EditDoctorForm } from './components/EditDoctorForm'
import { useState } from 'react'
import { getCookie } from '@/lib/cookies'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'


type DoctorItem = {
    id: string;
    doctor_name: string;
    title: string;
    qualification: string;
    speciality: string;
    country: string;
    city: string;
    phone: string;
    mobile: string;
    email: string;
};

export default function Doctors() {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const limit = 10;

    const token = getCookie('accessToken');
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: ["doctor", page, search],

        queryFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/doctor?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (!res.ok) throw new Error("Failed to fetch doctors");
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

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/doctor/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to delete doctor");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["doctor"] });
        },
    });

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this doctor?")) {
            deleteMutation.mutate(id);
        }
    };


    //console.log(data?.data);

    const columns: ColumnDef<DoctorItem>[] = [
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
            header: "ID",
        },
        {
            accessorKey: "doctor_name",
            header: "Doctor's Name",
        },
        {
            accessorKey: "title",
            header: "Title",
        },
        {
            accessorKey: "qualification",
            header: "Qualification",
        },
        {
            accessorKey: "speciality",
            header: "Speciality",
        },
        {
            accessorKey: "country",
            header: "Country",
        },
        {
            accessorKey: "city",
            header: "City",
        },
        {
            accessorKey: "phone",
            header: "Phone",
        },
        {
            accessorKey: "mobile",
            header: "Mobile",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "score",
            header: "Score",
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
                        <Button size="sm" variant="default" onClick={() => {
                            setSelectedDoctorId(item.id);
                            setOpen(true);
                        }}>
                            Edit
                        </Button>
                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(item.id)}
                            disabled={deleteMutation.isPending}
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
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <h1 className="text-2xl font-bold tracking-tight">List of Doctor</h1>
                <CreateDoctorForm />
            </div>
            <DataTable
                columns={columns}
                data={data?.data?.rows || data?.data?.items || []}
                meta={data?.data?.meta || { page, limit, total: data?.data?.total || 0 }}
                onPageChange={setPage}
                search={search}
                onSearchChange={setSearch}
            />
            <EditDoctorForm open={open} setOpen={setOpen} doctorId={selectedDoctorId} />
        </Main>
    </>
}