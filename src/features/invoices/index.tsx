import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DataTable } from '@/components/DataTable'
import { useState, useMemo } from 'react'
import { getCookie } from '@/lib/cookies'
import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { TopNav } from '@/components/layout/top-nav'
import { topNav } from '@/data/data'
import { FileText, DollarSign, TrendingUp, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'


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
    status: string | null;
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

    // Calculate stats
    const stats = useMemo(() => {
        const invoices = data?.data?.items || [];
        const totalInvoices = data?.data?.meta?.total || data?.data?.total || 0;

        // Calculate total revenue
        const totalRevenue = invoices.reduce((sum: number, inv: InvoiceItem) =>
            sum + Number(inv.total_amount || 0), 0
        );

        // Calculate average invoice amount
        const averageAmount = invoices.length > 0
            ? totalRevenue / invoices.length
            : 0;

        // Count today's invoices
        const today = new Date().toDateString();
        const todayInvoices = invoices.filter((inv: InvoiceItem) =>
            new Date(inv.created_at).toDateString() === today
        ).length;

        return [
            {
                label: "Total Invoices",
                value: totalInvoices,
                gradient: "from-blue-600 to-blue-400",
                shadow: "shadow-blue-500/30",
                icon: <FileText className="w-6 h-6 text-white" />,
            },
            {
                label: "Total Revenue",
                value: `৳${totalRevenue.toLocaleString()}`,
                gradient: "from-emerald-600 to-emerald-400",
                shadow: "shadow-emerald-500/30",
                icon: <DollarSign className="w-6 h-6 text-white" />,
            },
            {
                label: "Average Amount",
                value: `৳${averageAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
                gradient: "from-purple-600 to-purple-400",
                shadow: "shadow-purple-500/30",
                icon: <TrendingUp className="w-6 h-6 text-white" />,
            },
            {
                label: "Today's Invoices",
                value: todayInvoices,
                gradient: "from-amber-600 to-amber-400",
                shadow: "shadow-amber-500/30",
                icon: <Calendar className="w-6 h-6 text-white" />,
            },
        ];
    }, [data]);


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
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.original.status || (row.index % 2 === 0 ? "paid" : "unpaid");
                const isPaid = status.toLowerCase() === "paid";
                return (
                    <Badge
                        variant={isPaid ? "default" : "destructive"}
                        className={isPaid ? "bg-emerald-500 hover:bg-emerald-500 text-white border-transparent" : ""}
                    >
                        {status.toUpperCase()}
                    </Badge>
                );
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
                        <Link to={`/outdoor/reception/invoices/$invoiceId`} params={{ invoiceId: row.original.id.toString() }}>
                            <Button size="sm" variant="outline">
                                View
                            </Button>
                        </Link>
                        <Button size="sm" variant="default" onClick={() => alert("Edit " + item.id)}>
                            Edit
                        </Button>
                    </div>
                );
            },
        },
    ];
    return <>
        <Header fixed>
            <TopNav links={topNav} />
            <div className='ms-auto flex items-center space-x-4'>
                <Search />
                <ThemeSwitch />
                <ConfigDrawer />
                <ProfileDropdown />
            </div>
        </Header>

        <main className='p-6 lg:p-10'>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                <h1 className="text-2xl font-bold tracking-tight">List of Invoices</h1>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                {stats.map((item, idx) => (
                    <div
                        key={idx}
                        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${item.gradient} p-6 shadow-lg ${item.shadow} transition-all duration-300 hover:scale-[1.02] hover:translate-y-[-2px]`}
                    >
                        {/* Background Pattern */}
                        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
                        <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-black/10 blur-2xl" />

                        <div className="relative flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-white/90">{item.label}</p>
                                <h3 className="mt-2 text-3xl font-bold text-white">
                                    {item.value || 0}
                                </h3>
                            </div>
                            <div className="rounded-xl bg-white/20 p-2.5 backdrop-blur-sm">
                                {item.icon}
                            </div>
                        </div>

                        {/* Progress/Indicator line */}
                        <div className="mt-4 h-1 w-full rounded-full bg-black/10">
                            <div className="h-full w-2/3 rounded-full bg-white/40" />
                        </div>
                    </div>
                ))}
            </div>

            <DataTable columns={columns} data={data?.data?.items || []} meta={data?.data?.meta} onPageChange={setPage} search={search} onSearchChange={setSearch} />
        </main>
    </>
}
