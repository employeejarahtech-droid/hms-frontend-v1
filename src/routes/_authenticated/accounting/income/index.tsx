<<<<<<< HEAD
"use client";

import { useState } from "react";
import { createFileRoute } from '@tanstack/react-router';
import { ColumnDef } from "@tanstack/react-table";
import { Plus, DollarSign, TrendingUp, CreditCard } from "lucide-react";

import { useGetIncomesQuery } from "@/features/accounting/accountingQueries";
import { Income } from "@/types/accounting.types";
import { DataTable } from "@/components/dashboard/components/DataTable";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AddIncomeModal } from "../components/AddIncomeModal";

// Layout
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { topNav } from '@/data/data'

export const Route = createFileRoute('/_authenticated/accounting/income/')({
  component: IncomesPage,
})

function IncomesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const limit = 10;
  const currency = '৳';

  const {
    data: fetchedData,
    isFetching,
    isError,
  } = useGetIncomesQuery({
    page,
    limit,
    search,
    date,
  });

  // @ts-ignore
  const incomes: Income[] = fetchedData?.data || [];

  // Stats
  const { data: allIncomesData } = useGetIncomesQuery({ limit: 1000 });
  // @ts-ignore
  const allIncomes = allIncomesData?.data || [];

  const totalIncome = allIncomes.reduce((sum: number, item: any) => sum + Number(item.amount), 0);
  const totalTransactions = allIncomes.length;
  const avgTransaction = totalTransactions > 0 ? totalIncome / totalTransactions : 0;

  const stats = [
    {
      label: "Total Income",
      value: `${currency} ${totalIncome.toLocaleString()}`,
      gradient: "from-emerald-600 to-emerald-400",
      shadow: "shadow-emerald-500/30",
      icon: <DollarSign className="w-6 h-6 text-white" />,
    },
    {
      label: "Total Transactions",
      value: totalTransactions,
      gradient: "from-blue-600 to-blue-400",
      shadow: "shadow-blue-500/30",
      icon: <TrendingUp className="w-6 h-6 text-white" />,
    },
    {
      label: "Avg. Transaction",
      value: `${currency} ${avgTransaction.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
      gradient: "from-violet-600 to-violet-400",
      shadow: "shadow-violet-500/30",
      icon: <CreditCard className="w-6 h-6 text-white" />,
    },
  ];

  const incomeColumns: ColumnDef<Income>[] = [
    {
      accessorKey: "id",
      header: "ID",
      meta: { className: "md:sticky md:left-0 z-20 bg-background min-w-[60px]" } as any
    },
    {
      accessorKey: "title",
      header: "Title",
      meta: { className: "md:sticky md:left-[60px] z-20 bg-background md:shadow-[4px_0px_5px_-2px_rgba(0,0,0,0.1)]" } as any
    },
    { accessorKey: "description", header: "Description" },
    {
      accessorKey: "creditHead",
      header: "Category",
      cell: ({ row }: { row: any }) => {
        const creditHead = row?.original?.creditHead?.name;
        return <span className="font-medium">{creditHead}</span>;
      },
    },
    {
      accessorKey: "amount",
      header: () => (
        <div className="text-right">Amount ({currency})</div>
      ),
      cell: ({ row }: { row: any }) => (
        <div className="text-right">{Number(row.getValue("amount")).toFixed(2)}</div>
      ),
    },
    { accessorKey: "income_date", header: "Date" },
    { accessorKey: "payment_method", header: "Payment Method" },
    { accessorKey: "reference_number", header: "Reference" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: { row: any }) => {
        const status = (row.getValue("status") as string) || "pending";
        let className = "capitalize ";
        if (status.toLowerCase() === "paid" || status.toLowerCase() === "received") {
          className += "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200";
        } else if (status.toLowerCase() === "pending") {
          className += "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200";
        } else {
          className += "bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-200";
        }
        return <Badge variant="outline" className={className}>{status}</Badge>;
      },
    },
  ];

  if (isError) return <div className="p-8 text-center text-red-500">Error loading incomes</div>;

  return (
    <div className="">
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold">All Income</h2>
          <div className="flex gap-2 items-center w-full sm:w-auto">
            <Input
              type="date"
              className="w-auto"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setPage(1);
              }}
            />
            <AddIncomeModal>
              <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-5 py-2.5 font-medium text-white shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-emerald-500/40 active:translate-y-0 active:shadow-none whitespace-nowrap">
                <Plus size={18} /> Add Income
              </button>
            </AddIncomeModal>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
                    {item.value}
                  </h3>
                </div>
                <div className="rounded-xl bg-white/20 p-2.5 backdrop-blur-sm">
                  {item.icon}
                </div>
              </div>

              {/* Progress/Indicator line (optional visual flair) */}
              <div className="mt-4 h-1 w-full rounded-full bg-black/10">
                <div className="h-full w-2/3 rounded-full bg-white/40" />
              </div>
            </div>
          ))}
        </div>

        <DataTable
          columns={incomeColumns}
          data={incomes}
          pageIndex={page - 1}
          pageSize={limit}
          // @ts-ignore
          totalCount={fetchedData?.pagination?.total || 0}
          onPageChange={setPage}
          onSearch={(val) => {
            setSearch(val);
            setPage(1);
          }}
          isFetching={isFetching}
        />
      </main>
    </div>
  );
=======
import { createFileRoute } from '@tanstack/react-router'
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { format } from "date-fns";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronDown, FileText, CreditCard, TrendingUp, CornerDownRight } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Header } from "@/components/layout/header";
import { TopNav } from "@/components/layout/top-nav";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { ConfigDrawer } from "@/components/config-drawer";
import { topNav } from "@/data/data";
import { useAccounts, useCreateHeadWiseTransaction, useIncomeHeads } from "@/features/accounting/api/queries";

export const Route = createFileRoute('/_authenticated/accounting/income/')({
    component: AddIncomePage,
})

/* ------------------ ZOD SCHEMA ------------------ */
const incomeSchema = z.object({
    title: z.string().min(1, "Required"),
    income_date: z.string().min(1, "Required"),
    credit_head_id: z.number().min(1, "Required"),
    description: z.string().optional(),
    amount: z.number().min(0.01, "Amount must be greater than 0"),
    received_via_id: z.number().min(1, "Required"),
    reference: z.string().optional(),
});

type IncomeFormValues = z.infer<typeof incomeSchema>;

/* ------------------ PAGE ------------------ */
export default function AddIncomePage() {
    const [openCreditHead, setOpenCreditHead] = useState(false);
    const [openReceivedVia, setOpenReceivedVia] = useState(false);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<IncomeFormValues>({
        resolver: zodResolver(incomeSchema),
        defaultValues: {
            title: "",
            income_date: format(new Date(), "yyyy-MM-dd"),
            credit_head_id: 0,
            description: "",
            amount: 0,
            received_via_id: 0,
            reference: "",
        },
    });

    const { control, handleSubmit, reset } = form;

    const { data: accountsData } = useAccounts({ limit: 1000 });
    const { data: incomeHeads = [] } = useIncomeHeads();
    const allAccounts = accountsData?.data || [];

    const creditHeads = incomeHeads;
    const assetAccounts = allAccounts.filter((acc: any) => acc.type === "ASSET" || acc.type === "Asset");
    const currency = "BDT";

    const createTransaction = useCreateHeadWiseTransaction();

    const onSubmit: SubmitHandler<IncomeFormValues> = async (values) => {
        setIsLoading(true);
        try {
            await createTransaction.mutateAsync({
                type: 'INCOME',
                title: values.title,
                amount: values.amount,
                date: values.income_date,
                head_id: values.credit_head_id,
                payment_method: values.received_via_id,
                description: values.description,
                reference_number: values.reference
            });

            toast.success("Income added successfully");
            reset({
                ...form.getValues(),
                title: "",
                amount: 0,
                description: "",
                reference: ""
            });
            navigate({ to: "/accounting/reports/journal" });
        } catch (error: any) {
            toast.error(error.message || "Failed to add income");
        } finally {
            setIsLoading(false);
        }
    };

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
                <div className="space-y-6 max-w-5xl mx-auto">
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                                Add Income
                            </h1>
                            <p className="text-muted-foreground mt-2">Record a new income transaction</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* BASIC INFO */}
                        <Card className="overflow-hidden border-2 transition-all duration-300 hover:border-green-200 hover:shadow-lg pt-0">
                            <CardHeader className="bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 dark:from-green-950/30 dark:via-emerald-950/30 dark:to-green-950/30 border-b-1 border-green-100 dark:border-green-900 py-3 gap-0">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-gradient-to-br from-green-600 to-green-500 rounded-xl shadow-lg shadow-green-500/30">
                                        <FileText className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">Basic Information</CardTitle>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">Income title, category, and description</p>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="grid gap-4 md:grid-cols-2 pb-6">
                                {/* TITLE */}
                                <Controller
                                    control={control}
                                    name="title"
                                    render={({ field, fieldState }) => (
                                        <Field>
                                            <FieldLabel>Title</FieldLabel>
                                            <Input placeholder="Income Title" {...field} />
                                            <FieldError>{fieldState.error?.message}</FieldError>
                                        </Field>
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name="credit_head_id"
                                    render={({ field, fieldState }) => {
                                        const selected = creditHeads?.find(
                                            (item: any) => Number(item.id) === Number(field.value)
                                        );

                                        return (
                                            <Field>
                                                <FieldLabel>Income Head</FieldLabel>

                                                <Popover open={openCreditHead} onOpenChange={setOpenCreditHead} modal={true}>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            aria-expanded={openCreditHead}
                                                            className="w-full justify-between"
                                                        >
                                                            {selected ? selected.name : "Select income head..."}
                                                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </PopoverTrigger>

                                                    <PopoverContent className="w-[450px] p-0" align="start">
                                                        <Command>
                                                            <CommandInput
                                                                placeholder="Search income head..."
                                                                className="h-9"
                                                                value={search}
                                                                onValueChange={setSearch}
                                                            />

                                                            <CommandList className="max-h-[300px] overflow-y-auto overflow-x-hidden">
                                                                <CommandEmpty>No income head found.</CommandEmpty>

                                                                <CommandGroup>
                                                                    {creditHeads?.map((item: any) => {
                                                                        const level = item.parent_id ? 1 : 0;

                                                                        return (
                                                                            <CommandItem
                                                                                key={item.id}
                                                                                value={`${item.name}-${item.id}`}
                                                                                onSelect={() => {
                                                                                    field.onChange(item.id);
                                                                                    setOpenCreditHead(false);
                                                                                }}
                                                                                className="flex items-center gap-2"
                                                                                style={{ paddingLeft: `${level === 0 ? 12 : (level * 20) + 12}px` }}
                                                                            >
                                                                                <div className="flex items-center flex-1 gap-2">
                                                                                    <div className="flex items-center gap-1">
                                                                                        {level > 0 && (
                                                                                            <CornerDownRight className="h-3 w-3 text-muted-foreground stroke-[1.5]" />
                                                                                        )}

                                                                                        <div className="flex flex-col">
                                                                                            <span className={cn(
                                                                                                level === 0 ? "font-semibold text-foreground" : "text-muted-foreground"
                                                                                            )}>
                                                                                                {item.name}
                                                                                            </span>
                                                                                            <span className="text-[10px] text-muted-foreground/70">{item.code}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                                <Check
                                                                                    className={cn(
                                                                                        "ml-auto h-4 w-4",
                                                                                        Number(field.value) === Number(item.id)
                                                                                            ? "opacity-100"
                                                                                            : "opacity-0"
                                                                                    )}
                                                                                />
                                                                            </CommandItem>
                                                                        );
                                                                    })}
                                                                </CommandGroup>
                                                            </CommandList>
                                                        </Command>
                                                    </PopoverContent>
                                                </Popover>

                                                {fieldState.error && (
                                                    <p className="text-red-500 text-sm mt-1">
                                                        {fieldState.error.message}
                                                    </p>
                                                )}
                                            </Field>
                                        );
                                    }}
                                />
                                {/* DATE */}
                                <div className="md:col-span-2">
                                    <Controller
                                        control={control}
                                        name="income_date"
                                        render={({ field, fieldState }) => (
                                            <Field>
                                                <FieldLabel>Date</FieldLabel>
                                                <Input type="date" {...field} className="block" />
                                                <FieldError>{fieldState.error?.message}</FieldError>
                                            </Field>
                                        )}
                                    />
                                </div>

                                {/* DESCRIPTION */}
                                <div className="md:col-span-2">
                                    <Controller
                                        control={control}
                                        name="description"
                                        render={({ field, fieldState }) => (
                                            <Field>
                                                <FieldLabel>Description</FieldLabel>
                                                <Textarea
                                                    rows={4}
                                                    placeholder="Describe income..."
                                                    {...field}
                                                />
                                                <FieldError>{fieldState.error?.message}</FieldError>
                                            </Field>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* PAYMENT INFO */}
                        <Card className="overflow-hidden border-2 transition-all duration-300 hover:border-green-200 hover:shadow-lg pt-0">
                            <CardHeader className="bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 dark:from-green-950/30 dark:via-emerald-950/30 dark:to-green-950/30 border-b-1 border-green-100 dark:border-green-900 py-3 gap-0">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-gradient-to-br from-green-600 to-green-500 rounded-xl shadow-lg shadow-green-500/30">
                                        <CreditCard className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">Payment Details</CardTitle>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">Amount, payment method, and reference</p>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="grid gap-4 md:grid-cols-2 pb-6">
                                {/* AMOUNT */}
                                <Controller
                                    control={control}
                                    name="amount"
                                    render={({ field, fieldState }) => (
                                        <Field>
                                            <FieldLabel>Amount ({currency})</FieldLabel>
                                            <Input
                                                type="number"
                                                value={field.value ?? ""}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.value === "" ? "" : Number(e.target.value)
                                                    )
                                                }
                                            />
                                            <FieldError>{fieldState.error?.message}</FieldError>
                                        </Field>
                                    )}
                                />

                                {/* RECEIVED VIA */}
                                <Controller
                                    control={control}
                                    name="received_via_id"
                                    render={({ field, fieldState }) => {
                                        const selected = assetAccounts?.find(
                                            (item: any) => Number(item.id) === Number(field.value)
                                        );

                                        return (
                                            <Field>
                                                <FieldLabel>Received Via</FieldLabel>

                                                <Popover open={openReceivedVia} onOpenChange={setOpenReceivedVia}>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            aria-expanded={openReceivedVia}
                                                            className="w-full justify-between"
                                                        >
                                                            {selected ? selected.name : "Select payment account..."}
                                                            <ChevronDown className="opacity-50 h-4 w-4" />
                                                        </Button>
                                                    </PopoverTrigger>

                                                    <PopoverContent className="w-[450px] p-0" align="start">
                                                        <Command>
                                                            <CommandInput
                                                                placeholder="Search payment account..."
                                                                className="h-9"
                                                            />
                                                            <CommandList className="max-h-[300px] overflow-y-auto overflow-x-hidden">
                                                                <CommandEmpty>No account found.</CommandEmpty>
                                                                <CommandGroup>
                                                                    {assetAccounts?.map((acc: any) => (
                                                                        <CommandItem
                                                                            key={acc.id}
                                                                            value={`${acc.name}-${acc.id}`}
                                                                            onSelect={() => {
                                                                                field.onChange(acc.id);
                                                                                setOpenReceivedVia(false);
                                                                            }}
                                                                            className="flex items-center gap-2"
                                                                        >
                                                                            <div className="flex items-center flex-1 gap-2">
                                                                                <div className="flex flex-col">
                                                                                    <span className="font-semibold text-foreground">
                                                                                        {acc.name}
                                                                                    </span>
                                                                                    <span className="text-[10px] text-muted-foreground/70">{acc.code}</span>
                                                                                </div>
                                                                            </div>
                                                                            <Check
                                                                                className={cn(
                                                                                    "ml-auto h-4 w-4",
                                                                                    Number(field.value) === Number(acc.id)
                                                                                        ? "opacity-100"
                                                                                        : "opacity-0"
                                                                                )}
                                                                            />
                                                                        </CommandItem>
                                                                    ))}
                                                                </CommandGroup>
                                                            </CommandList>
                                                        </Command>
                                                    </PopoverContent>
                                                </Popover>
                                                <FieldError>{fieldState.error?.message}</FieldError>
                                            </Field>
                                        );
                                    }}
                                />

                                {/* REFERENCE */}
                                <Controller
                                    control={control}
                                    name="reference"
                                    render={({ field, fieldState }) => (
                                        <Field>
                                            <FieldLabel>Reference</FieldLabel>
                                            <Input placeholder="Invoice #, Txn ID, etc." {...field} />
                                            <FieldError>{fieldState.error?.message}</FieldError>
                                        </Field>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        {/* SUBMIT BUTTON */}
                        <div className="flex justify-end gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-green-500 px-8 py-3 font-semibold text-white shadow-lg shadow-green-500/40 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-500/50 active:translate-y-0 active:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Saving...</span>
                                    </>
                                ) : (
                                    <>
                                        <TrendingUp className="w-5 h-5" />
                                        <span>Save Income</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
>>>>>>> 7679d0545d77a1d38f37d42b927a31e47b0d1d8b
}
