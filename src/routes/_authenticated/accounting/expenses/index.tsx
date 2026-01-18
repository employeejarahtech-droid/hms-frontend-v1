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
import { Check, ChevronDown, FileText, CreditCard, TrendingDown, CornerDownRight } from "lucide-react";
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
import { useAccounts, useCreateHeadWiseTransaction, useExpenseHeads } from "@/features/accounting/api/queries";

export const Route = createFileRoute('/_authenticated/accounting/expenses/')({
    component: AddExpensePage,
})

/* ------------------ ZOD SCHEMA ------------------ */
const expenseSchema = z.object({
    title: z.string().min(1, "Required"),
    expense_date: z.string().min(1, "Required"),
    debit_head_id: z.number().min(1, "Required"),
    description: z.string().optional(),
    amount: z.number().min(0.01, "Amount must be greater than 0"),
    paid_via_id: z.number().min(1, "Required"),
    reference: z.string().optional(),
});

type ExpenseFormValues = z.infer<typeof expenseSchema>;

/* ------------------ PAGE ------------------ */
export default function AddExpensePage() {
    const [openDebitHead, setOpenDebitHead] = useState(false);
    const [openPaidVia, setOpenPaidVia] = useState(false);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<ExpenseFormValues>({
        resolver: zodResolver(expenseSchema),
        defaultValues: {
            title: "",
            expense_date: format(new Date(), "yyyy-MM-dd"),
            debit_head_id: 0,
            description: "",
            amount: 0,
            paid_via_id: 0,
            reference: "",
        },
    });

    const { control, handleSubmit, reset } = form;

    const { data: accountsData } = useAccounts({ limit: 1000 });
    const { data: expenseHeads = [] } = useExpenseHeads();
    const allAccounts = accountsData?.data || [];

    const debitHeads = expenseHeads;
    const assetAccounts = allAccounts.filter((acc: any) => acc.type === "ASSET" || acc.type === "Asset");
    const currency = "BDT";

    const createTransaction = useCreateHeadWiseTransaction();

    const onSubmit: SubmitHandler<ExpenseFormValues> = async (values) => {
        setIsLoading(true);
        try {
            await createTransaction.mutateAsync({
                type: 'EXPENSE',
                title: values.title,
                amount: values.amount,
                date: values.expense_date,
                head_id: values.debit_head_id,
                payment_method: values.paid_via_id,
                description: values.description,
                reference_number: values.reference
            });

            toast.success("Expense added successfully");
            reset({
                ...form.getValues(),
                title: "",
                amount: 0,
                description: "",
                reference: ""
            });
            navigate({ to: "/accounting/reports/journal" });
        } catch (error: any) {
            toast.error(error.message || "Failed to add expense");
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
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-400 bg-clip-text text-transparent">
                                Add Expense
                            </h1>
                            <p className="text-muted-foreground mt-2">Record a new expense transaction</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* BASIC INFO */}
                        <Card className="overflow-hidden border-2 transition-all duration-300 hover:border-red-200 hover:shadow-lg pt-0">
                            <CardHeader className="bg-gradient-to-r from-red-50 via-orange-50 to-red-50 dark:from-red-950/30 dark:via-orange-950/30 dark:to-red-950/30 border-b border-red-100 dark:border-red-900 py-3 gap-0">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-gradient-to-br from-red-600 to-orange-500 rounded-xl shadow-lg shadow-red-500/30">
                                        <FileText className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <CardTitle className="text-xl font-bold text-gray-800 dark:text-gray-100">Basic Information</CardTitle>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">Expense title, category, and description</p>
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
                                            <Input placeholder="Expense Title" {...field} />
                                            <FieldError>{fieldState.error?.message}</FieldError>
                                        </Field>
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name="debit_head_id"
                                    render={({ field, fieldState }) => {
                                        const selected = debitHeads?.find(
                                            (item: any) => Number(item.id) === Number(field.value)
                                        );

                                        return (
                                            <Field>
                                                <FieldLabel>Expense Head</FieldLabel>

                                                <Popover open={openDebitHead} onOpenChange={setOpenDebitHead}>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            aria-expanded={openDebitHead}
                                                            className="w-full justify-between"
                                                        >
                                                            {selected ? (selected as any).name : "Select expense head..."}
                                                            <ChevronDown className="opacity-50 h-4 w-4" />
                                                        </Button>
                                                    </PopoverTrigger>

                                                    <PopoverContent className="w-[450px] p-0" align="start">
                                                        <Command>
                                                            <CommandInput
                                                                placeholder="Search expense head..."
                                                                className="h-9"
                                                                value={search}
                                                                onValueChange={setSearch}
                                                            />

                                                            <CommandList className="max-h-[300px] overflow-y-auto overflow-x-hidden">
                                                                <CommandEmpty>No expense head found.</CommandEmpty>

                                                                <CommandGroup>
                                                                    {debitHeads?.map((acc: any) => {
                                                                        const level = acc.parent_id ? 1 : 0;
                                                                        return (
                                                                            <CommandItem
                                                                                key={acc.id}
                                                                                value={`${acc.name}-${acc.id}`}
                                                                                onSelect={() => {
                                                                                    field.onChange(acc.id);
                                                                                    setOpenDebitHead(false);
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
                                                                                                {acc.name}
                                                                                            </span>
                                                                                            <span className="text-[10px] text-muted-foreground/70">{acc.code}</span>
                                                                                        </div>
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
                                        name="expense_date"
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
                                                    placeholder="Describe expense..."
                                                    {...field}
                                                />
                                                <FieldError>{fieldState.error?.message}</FieldError>
                                            </Field>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* PAYMENT DETAILS */}
                        <Card className="overflow-hidden border-2 transition-all duration-300 hover:border-red-200 hover:shadow-lg pt-0">
                            <CardHeader className="bg-gradient-to-r from-red-50 via-orange-50 to-red-50 dark:from-red-950/30 dark:via-orange-950/30 dark:to-red-950/30 border-b border-red-100 dark:border-red-900 py-3 gap-0">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-gradient-to-br from-red-600 to-orange-500 rounded-xl shadow-lg shadow-red-500/30">
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

                                {/* PAID VIA */}
                                <Controller
                                    control={control}
                                    name="paid_via_id"
                                    render={({ field, fieldState }) => {
                                        const selected = assetAccounts?.find(
                                            (item: any) => Number(item.id) === Number(field.value)
                                        );

                                        return (
                                            <Field>
                                                <FieldLabel>Paid Via</FieldLabel>

                                                <Popover open={openPaidVia} onOpenChange={setOpenPaidVia}>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            aria-expanded={openPaidVia}
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
                                                                                setOpenPaidVia(false);
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
                                            <Input placeholder="Bill #, Txn ID, etc." {...field} />
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
                                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 px-8 py-3 font-semibold text-white shadow-lg shadow-red-500/40 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-500/50 active:translate-y-0 active:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Saving...</span>
                                    </>
                                ) : (
                                    <>
                                        <TrendingDown className="w-5 h-5" />
                                        <span>Save Expense</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}
