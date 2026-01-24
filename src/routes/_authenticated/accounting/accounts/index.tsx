<<<<<<< HEAD

"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, ChevronsUpDown, Check } from "lucide-react";
=======
import { createFileRoute } from '@tanstack/react-router'
import { useState } from "react";
import { Plus, Edit } from "lucide-react";
import { Header } from "@/components/layout/header";
import { TopNav } from "@/components/layout/top-nav";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { ConfigDrawer } from "@/components/config-drawer";
import { topNav } from "@/data/data";
>>>>>>> 7679d0545d77a1d38f37d42b927a31e47b0d1d8b
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
<<<<<<< HEAD
import { createFileRoute } from '@tanstack/react-router';

// Helper Components
import CreateExpenseHeadForm from "./components/CreateExpenseHead";
import CreateIncomeHeadForm from "./components/CreateIncomeHead";

import { DataTable } from "@/components/dashboard/components/DataTable";
import type { ColumnDef } from "@tanstack/react-table";
import { useForm, Controller } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";

import {
    useGetAccountingAccountsQuery,
    useLazyGetAccountingAccountsQuery,
    useAddAccountingAccountMutation,
    useUpdateAccountingAccountMutation,
} from "@/features/accounting/accountingQueries";
import { ChartOfAccount } from "@/types/accounting.types";
import { toast } from "sonner";
import { TopNav } from "@/components/layout/top-nav";
import { topNav } from "@/data/data";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { ConfigDrawer } from "@/components/config-drawer";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Header } from "@/components/layout/header";

export const Route = createFileRoute('/_authenticated/accounting/accounts/')({
    component: ChartOfAccounts,
})

type CreateAccountFormValues = {
    name: string;
    code: string;
    type: "ASSET" | "LIABILITY" | "EQUITY" | "INCOME" | "EXPENSE";
    parent_id?: string;
};

function ChartOfAccounts() {
    const [isOpen, setIsOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [limit] = useState(200);
    const [search, setSearch] = useState("");
    const [editingAccount, setEditingAccount] = useState<ChartOfAccount | null>(null);

    const { data: accountsData, isFetching } = useGetAccountingAccountsQuery({ page, limit, search });

    const { mutateAsync: addAccountingAccount, isPending: isAdding } = useAddAccountingAccountMutation();
    const { mutateAsync: updateAccountingAccount, isPending: isUpdating } = useUpdateAccountingAccountMutation();

    const isLoading = isAdding || isUpdating;

    const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm<CreateAccountFormValues>({
        defaultValues: { name: "", code: "", type: undefined, parent_id: undefined },
    });

    const onSubmit = async (values: CreateAccountFormValues) => {
        const payload: any = { name: values.name, code: values.code, type: values.type };
        if (values.parent_id) payload.parent_id = Number(values.parent_id);

        try {
            if (editingAccount) {
                const res = await updateAccountingAccount({ id: editingAccount.id, body: payload });
                // We assume the API returns the standard ListResponse or similar structure
                // Adjust per actual API response if needed. Assuming res.status exists.
                if ((res as any).status) {
                    toast.success((res as any).message || "Account updated successfully");
                }
            } else {
                const res = await addAccountingAccount(payload);
                if ((res as any).status) {
                    toast.success((res as any).message || "Account created successfully");
                }
            }
            reset();
            setEditingAccount(null);
            setIsOpen(false);
            // refetch is not strictly needed if invalidation works, but good for safety
            // refetch(); 
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Account operation failed");
            console.error("Account operation failed", error);
        }
    };

    const onEdit = (account: ChartOfAccount) => {
        setEditingAccount(account);
        setValue("name", account.name);
        setValue("code", account.code);
        // @ts-ignore
        setValue("type", account.type.toUpperCase() as any);
        setValue("parent_id", account.parent ? String(account.parent) : undefined);
        setIsOpen(true);
    };


    const ParentAccountSelect = ({ control }: { control: any }) => {
        const [query, setQuery] = useState("");
        const [searchAccounts, setSearchAccounts] = useState<ChartOfAccount[]>([]);
        const [open, setOpen] = useState(false);

        // This simulates the lazy query usage. 
        // In TanStack Query we called useLazy... which returns [trigger, result]
        const [fetchAccounts] = useLazyGetAccountingAccountsQuery();

        useEffect(() => {
            const timeout = setTimeout(() => {
                fetchAccounts({ page: 1, limit: 10, search: query })
                    .then((res: any) => setSearchAccounts(res?.data || []));
            }, 300);
            return () => clearTimeout(timeout);
        }, [query]);

        return (
            <Controller
                name="parent_id"
                control={control}
                render={({ field }) => (
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="outline" role="combobox" className="w-full justify-between">
                                {field.value ? searchAccounts.find(acc => String(acc.id) === field.value)?.name : (field.value || "Root account")}
                                <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-full p-0">
                            <Command>
                                <CommandInput placeholder="Search parent account..." value={query} onValueChange={setQuery} />
                                <CommandEmpty>No account found.</CommandEmpty>
                                <CommandGroup>
                                    {searchAccounts.map(acc => (
                                        <CommandItem
                                            key={acc.id}
                                            value={`${acc.code} ${acc.name}`}
                                            onSelect={() => { setOpen(false); field.onChange(String(acc.id)); }}
                                        >
                                            <Check className={cn("mr-2 h-4 w-4", field.value === String(acc.id) ? "opacity-100" : "opacity-0")} />
                                            {acc.code} — {acc.name}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>
                    </Popover>
                )}
            />
        );
    };

    const accountColumns: ColumnDef<ChartOfAccount>[] = [
        { accessorKey: "code", header: "Code", cell: ({ row }) => <span className="font-mono text-xs text-muted-foreground">{row.original.code}</span> },
        {
            accessorKey: "name",
            header: "Account Name",
            cell: ({ row }) => (
                <div className="flex items-center" style={{ paddingLeft: `${(row.original.level || 0) * 20}px` }}>
                    {(row.original.level || 0) > 0 && <span className="mr-2 text-muted-foreground">└─</span>}
                    <span className={(row.original.level || 0) === 0 ? "font-semibold" : ""}>{row.original.name}</span>
                </div>
            ),
        },
        { accessorKey: "type", header: "Type", cell: ({ row }) => <Badge variant="outline">{row.original.type}</Badge> },
        {
            id: "actions",
            header: () => <div className="text-right">Actions</div>,
            cell: ({ row }) => (
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(row.original)}><Edit className="h-4 w-4" /></Button>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            <Header fixed>
                <TopNav links={topNav} />
                <div className='ms-auto flex items-center space-x-4'>
=======
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { useAccounts, useAddAccount, useUpdateAccount } from "@/features/accounting/api/queries";
import CreateIncomeHeadForm from "../CreateIncomeHead";
import CreateExpenseHeadForm from "../CreateExpenseHead";

type AccountType = "Asset" | "Liability" | "Equity" | "Revenue" | "Expense";

interface Account {
    id: number;
    code: string;
    name: string;
    type: string;
    balance: number;
    is_active: number | boolean;
    parent_id: number | null;
    level: number;
}

export default function ChartOfAccountsPage() {
    const [isOpen, setIsOpen] = useState(false);
    const { data: accountsData, isLoading } = useAccounts({ limit: 1000 });
    const accounts = (accountsData?.data || []) as Account[];
    const [editingAccount, setEditingAccount] = useState<Account | null>(null);

    const addAccount = useAddAccount();
    const updateAccount = useUpdateAccount();

    const [formData, setFormData] = useState({
        name: "",
        code: "",
        type: "" as AccountType | "",
        parent_id: "" as string | undefined,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.code || !formData.type) {
            toast.error("Please fill in all required fields");
            return;
        }

        const parentId = formData.parent_id && formData.parent_id !== "root" ? Number(formData.parent_id) : null;

        try {
            if (editingAccount) {
                await updateAccount.mutateAsync({
                    id: editingAccount.id,
                    data: {
                        name: formData.name,
                        code: formData.code,
                        type: formData.type.toUpperCase(),
                        parent_id: parentId
                    }
                });
                toast.success("Account updated successfully");
            } else {
                await addAccount.mutateAsync({
                    name: formData.name,
                    code: formData.code,
                    type: formData.type.toUpperCase(),
                    parent_id: parentId
                });
                toast.success("Account created successfully");
            }

            setFormData({ name: "", code: "", type: "", parent_id: "" });
            setEditingAccount(null);
            setIsOpen(false);
        } catch (error: any) {
            toast.error(error.message || "Failed to save account");
        }
    };

    const onEdit = (account: Account) => {
        setEditingAccount(account);
        setFormData({
            name: account.name,
            code: account.code,
            type: account.type as AccountType,
            parent_id: "",
        });
        setIsOpen(true);
    };

    return (
        <>
            <Header fixed>
                <TopNav links={topNav} />
                <div className="ms-auto flex items-center space-x-4">
>>>>>>> 7679d0545d77a1d38f37d42b927a31e47b0d1d8b
                    <Search />
                    <ThemeSwitch />
                    <ConfigDrawer />
                    <ProfileDropdown />
                </div>
            </Header>
<<<<<<< HEAD
            <main className='p-6 lg:p-10'>
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Chart of Accounts</h2>
                        <p className="text-muted-foreground">Manage your financial head hierarchy.</p>
                    </div>
                    <div className="flex gap-2">
                        <CreateIncomeHeadForm />
                        <CreateExpenseHeadForm />

                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger onClick={() => {
                                reset();
                                setEditingAccount(null);
                            }} asChild>
                                <Button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-5 py-2.5 font-medium text-white shadow-lg shadow-violet-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-violet-500/40 active:translate-y-0 active:shadow-none">
                                    <Plus className="mr-2 h-4 w-4" />  Add Account
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>{editingAccount ? "Edit Account" : "Add New Account"}</DialogTitle>
                                    <DialogDescription>Create or update an account head.</DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label>Account Name</Label>
                                        <Controller name="name" control={control} rules={{ required: "Account name is required" }} render={({ field }) => <Input {...field} />} />
                                        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label>Code</Label>
                                            <Controller name="code" control={control} rules={{ required: "Code is required" }} render={({ field }) => <Input {...field} />} />
                                            {errors.code && <p className="text-sm text-destructive">{errors.code.message}</p>}
                                        </div>
                                        <div className="grid gap-2">
                                            <Label>Type</Label>
                                            <Controller name="type" control={control} rules={{ required: "Type is required" }} render={({ field }) => (
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="w-full"><SelectValue placeholder="Select type" /></SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="ASSET">Asset</SelectItem>
                                                        <SelectItem value="LIABILITY">Liability</SelectItem>
                                                        <SelectItem value="EQUITY">Equity</SelectItem>
                                                        <SelectItem value="INCOME">Income</SelectItem>
                                                        <SelectItem value="EXPENSE">Expense</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            )} />
                                            {errors.type && <p className="text-sm text-destructive">{errors.type.message}</p>}
=======
            <main className="p-6 lg:p-10">
                <div className="space-y-6">
                    <div className="flex flex-wrap justify-between items-center gap-2">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">Chart of Accounts</h2>
                            <p className="text-muted-foreground">Manage your financial account hierarchy.</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <CreateIncomeHeadForm />
                            <CreateExpenseHeadForm />
                            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                                <DialogTrigger onClick={() => {
                                    setFormData({ name: "", code: "", type: "", parent_id: "" });
                                    setEditingAccount(null);
                                }} asChild>
                                    <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-5 py-2.5 font-medium text-white shadow-lg shadow-violet-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-violet-500/40 active:translate-y-0 active:shadow-none">
                                        <Plus className="mr-2 h-4 w-4" /> Add Account
                                    </button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>{editingAccount ? "Edit Account" : "Add New Account"}</DialogTitle>
                                        <DialogDescription>Create or update an account head.</DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                                        <div className="grid gap-2">
                                            <Label>Account Name</Label>
                                            <Input
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-2">
                                                <Label>Code</Label>
                                                <Input
                                                    value={formData.code}
                                                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label>Type</Label>
                                                <Select
                                                    value={formData.type}
                                                    onValueChange={(value) => setFormData({ ...formData, type: value as AccountType })}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Asset">Asset</SelectItem>
                                                        <SelectItem value="Liability">Liability</SelectItem>
                                                        <SelectItem value="Equity">Equity</SelectItem>
                                                        <SelectItem value="Revenue">Revenue</SelectItem>
                                                        <SelectItem value="Expense">Expense</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
>>>>>>> 7679d0545d77a1d38f37d42b927a31e47b0d1d8b
                                        </div>

                                        {/* PARENT ACCOUNT */}
                                        <div className="grid gap-2">
                                            <Label>Parent Account (Optional)</Label>
<<<<<<< HEAD
                                            <ParentAccountSelect control={control} />
                                        </div>


                                    </div>
                                    <DialogFooter>
                                        <Button type="button" variant="outline" onClick={() => { setIsOpen(false); setEditingAccount(null); }}>Cancel</Button>
                                        <Button type="submit" disabled={isLoading}>{editingAccount ? "Update" : "Create"}</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <Card className="py-6">
                    <CardHeader><CardTitle>Accounts List</CardTitle></CardHeader>
                    <CardContent>
                        <DataTable
                            columns={accountColumns}
                            data={accountsData?.data || []}
                            pageIndex={page - 1}
                            pageSize={limit}
                            // @ts-ignore
                            totalCount={accountsData?.pagination?.total || 0}
                            onPageChange={(newPageIndex) => setPage(newPageIndex + 1)}
                            onSearch={(value) => { setSearch(value); setPage(1); }}
                            isFetching={isFetching}
                        />
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
=======
                                            <Select
                                                value={formData.parent_id || "root"}
                                                onValueChange={(value) => setFormData({ ...formData, parent_id: value === "root" ? "" : value })}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Root account" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="root">Root account</SelectItem>
                                                    {accounts.map((account) => (
                                                        <SelectItem key={account.id} value={String(account.id)}>
                                                            {account.code} — {account.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <DialogFooter>
                                            <Button type="button" variant="outline" onClick={() => { setIsOpen(false); setEditingAccount(null); }}>Cancel</Button>
                                            <Button type="submit">{editingAccount ? "Update" : "Create"}</Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>

                    <Card className="py-6">
                        <CardHeader><CardTitle>Accounts List</CardTitle></CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Code</TableHead>
                                        <TableHead>Account Name</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead className="text-right">Balance</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {isLoading ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-10">Loading accounts...</TableCell>
                                        </TableRow>
                                    ) : accounts.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-10">No accounts found. Add your first account to get started.</TableCell>
                                        </TableRow>
                                    ) : accounts.map((account) => (
                                        <TableRow key={account.id}>
                                            <TableCell className="font-mono text-xs text-muted-foreground">{account.code}</TableCell>
                                            <TableCell className="font-semibold">
                                                <div className="flex items-center" style={{ marginLeft: `${(account.level || 0) * 32}px` }}>
                                                    {(account.level || 0) > 0 && (
                                                        <span className="mr-3 text-muted-foreground/40 font-mono text-lg">
                                                            {account.level > 1 ? "│  ".repeat(account.level - 1) : ""}└─
                                                        </span>
                                                    )}
                                                    <span className={(account.level || 0) === 0 ? "font-bold text-primary" : "text-foreground"}>
                                                        {account.name}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell><Badge variant="outline">{account.type}</Badge></TableCell>
                                            <TableCell className="text-right font-medium">${(account.balance || 0).toLocaleString()}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon" onClick={() => onEdit(account)}>
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </>
    );
}

export const Route = createFileRoute('/_authenticated/accounting/accounts/')({
    component: ChartOfAccountsPage,
})
>>>>>>> 7679d0545d77a1d38f37d42b927a31e47b0d1d8b
