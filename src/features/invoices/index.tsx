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
import { useQuery } from '@tanstack/react-query'


type InvoiceItem = {
    id: number;
    patient_name: string;
    sex: string | null;
    age: number | null;
    phone: string | null;
    reference_doctor: string | null;
    invoice_date: string | null;
    delivery_date: string | null;
    delivery_time: string | null;
    total_amount: number | null;
    net_amount: number | null;
    created_at: string;
    created_by: number | null;
};

export default function Invoices() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const limit = 10;

    const token = getCookie('accessToken');

    const { data } = useQuery({
        queryKey: ["invoices", page, search],

        queryFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/outdoor-invoice?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (!res.ok) throw new Error("Failed to fetch invoices");
            return res.json(); // MUST match placeholderData
        },

        enabled: !!token,

        // ⭐ Perfect smooth pagination
        placeholderData: (prev) =>
            prev
                ? prev
                : {
                    data: {
                        rows: [],
                        total: 0,
                    },
                },
    });


    //console.log(data?.data);

    const columns: ColumnDef<InvoiceItem>[] = [
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
            header: "Invoice ID",
        },
        {
            accessorKey: "patient_name",
            header: "Patient Name",
        },
        {
            accessorKey: "phone",
            header: "Phone",
        },
        {
            accessorKey: "reference_doctor",
            header: "Reference Doctor",
        },
        {
            accessorKey: "total_amount",
            header: "Total Amount",
            cell: ({ row }) => {
                const amount = row.getValue("total_amount") as number | null;
                return <div>{amount ?? "-"}</div>;
            },
        },
        {
            accessorKey: "created_at",
            header: "Date",
            cell: ({ row }) => {
                const iso = row.getValue("created_at") as string;
                const date = new Date(iso);

                const formatted = date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                });

                return <div>{formatted}</div>; // Example: Nov 23, 2025
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
                        <Button size="sm" variant="default" onClick={() => alert("Edit " + item.id)}>
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
                <h1 className="text-2xl font-bold tracking-tight">List of Invoices</h1>
            </div>
            <DataTable columns={columns} data={data?.data?.rows || []} meta={{ page, limit, total: data?.data?.total || 0 }} onPageChange={setPage} search={search} onSearchChange={setSearch} />
        </Main>
    </>
}
