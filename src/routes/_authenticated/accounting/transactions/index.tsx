import { createFileRoute } from '@tanstack/react-router';
import { useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

import { Header } from "@/components/layout/header";
import { TopNav } from "@/components/layout/top-nav";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { ConfigDrawer } from "@/components/config-drawer";
import { topNav } from "@/data/data";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Skeleton } from "@/components/ui/skeleton";

import { useAllTransactions } from "@/features/accounting/api/queries";
import { Transaction } from "@/types/accounting.types";

export default function TransactionsPage() {
    // Filter Query States
    const [dateRange, setDateRange] = useState<DateRange | undefined>();
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState<string | undefined>("ALL");

    const { data: transactionsData, isLoading } = useAllTransactions({
        search: searchQuery || undefined,
        type: filterType === "ALL" ? undefined : filterType,
        from: dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : undefined,
        to: dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined,
    });

    // @ts-ignore
    const transactions: Transaction[] = transactionsData?.data || [];

    const clearFilters = () => {
        setDateRange(undefined);
        setSearchQuery("");
        setFilterType("ALL");
    };

    const hasActiveFilters = dateRange || searchQuery || (filterType && filterType !== "ALL");

    return (
        <>
            <Header fixed>
                <TopNav links={topNav} />
                <div className="ms-auto flex items-center space-x-4">
                    <Search />
                    <ThemeSwitch />
                    <ConfigDrawer />
                    <ProfileDropdown />
                </div>
            </Header>
            <main className="p-6 lg:p-10">
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
                            <p className="text-muted-foreground">Manage your daily financial transactions.</p>
                        </div>
                    </div>

                    {/* Filters & Search */}
                    <div className="flex flex-col sm:flex-row gap-4 items-center bg-card p-4 rounded-lg border shadow-sm">
                        <div className="relative flex-1 w-full">
                            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search transactions..."
                                className="pl-8"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-2 w-full sm:w-auto">
                            <Select value={filterType} onValueChange={setFilterType}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder="All Types" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">All Types</SelectItem>
                                    <SelectItem value="SALES">Sales</SelectItem>
                                    <SelectItem value="PURCHASE">Purchase</SelectItem>
                                    <SelectItem value="EXPENSE">Expense</SelectItem>
                                    <SelectItem value="INCOME">Income</SelectItem>
                                    <SelectItem value="JOURNAL">Journal</SelectItem>
                                </SelectContent>
                            </Select>

                            <DateRangePicker
                                dateRange={dateRange}
                                onDateRangeChange={setDateRange}
                                placeholder="Pick a date range"
                                className="w-[240px]"
                            />

                            {hasActiveFilters && (
                                <Button variant="ghost" size="icon" onClick={clearFilters} title="Clear Filters">
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Data Table */}
                    <div className="border rounded-lg bg-card">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Mode</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <Skeleton className="h-8 w-full" />
                                                <Skeleton className="h-8 w-full" />
                                                <Skeleton className="h-8 w-full" />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : transactions.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center">
                                            No transactions found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    transactions.map((tx) => (
                                        <TableRow key={tx.id}>
                                            <TableCell>{tx.date}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        tx.type === "Sales" ? "default" :
                                                            tx.type === "Purchase" ? "secondary" :
                                                                tx.type === "Expense" ? "destructive" : "outline"
                                                    }
                                                    className={
                                                        tx.type === "Sales" ? "bg-emerald-600 hover:bg-emerald-700" :
                                                            tx.type === "Income" ? "bg-blue-600 hover:bg-blue-700 text-white border-0" : ""
                                                    }
                                                >
                                                    {tx.type}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{tx.description}</TableCell>
                                            <TableCell>{tx.mode}</TableCell>
                                            <TableCell className="text-right font-medium">
                                                {Number(tx.amount).toFixed(2)}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </main>
        </>
    );
}

export const Route = createFileRoute('/_authenticated/accounting/transactions/')({
    component: TransactionsPage,
})
