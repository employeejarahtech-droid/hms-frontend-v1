<<<<<<< HEAD

"use client";

import { useState, useEffect } from "react";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { Search, Loader2, Plus, Trash2, Check, ChevronsUpDown } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { createFileRoute } from '@tanstack/react-router';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
=======
"use client";

import { createFileRoute } from '@tanstack/react-router'
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Filter, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
>>>>>>> 7679d0545d77a1d38f37d42b927a31e47b0d1d8b
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
<<<<<<< HEAD
=======
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
>>>>>>> 7679d0545d77a1d38f37d42b927a31e47b0d1d8b
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
<<<<<<< HEAD

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";

import { useAddJournalEntryMutation, useGetJournalReportQuery, useLazyGetAccountingAccountsQuery } from "@/features/accounting/accountingQueries";
import { toast } from "sonner";
import { ChartOfAccount } from "@/types/accounting.types";

import { TopNav } from "@/components/layout/top-nav";
import { topNav } from "@/data/data";
import { ThemeSwitch } from "@/components/theme-switch";
import { ConfigDrawer } from "@/components/config-drawer";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Header } from "@/components/layout/header";

export const Route = createFileRoute('/_authenticated/accounting/reports/journal/')({
  component: JournalReport,
})

type JournalEntryFormValues = {
  date: string;
  narration: string;
  entries: {
    account_id: string; // Use string for form handling, convert to number on submit
    debit: number;
    credit: number;
  }[];
};

function JournalReport() {
  const [isOpen, setIsOpen] = useState(false);
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [page] = useState(1);
  const [limit] = useState(20);
  const [search] = useState("");
  /* eslint-enable @typescript-eslint/no-unused-vars */

  // Queries
  const { data: journalData, isLoading } = useGetJournalReportQuery({ page, limit, search });
  const { mutateAsync: addJournalEntry, isPending: isAdding } = useAddJournalEntryMutation();

  // Form
  const { control, handleSubmit, reset, watch, formState: { errors } } = useForm<JournalEntryFormValues>({
    defaultValues: {
      date: format(new Date(), "yyyy-MM-dd"),
      narration: "",
      entries: [
        { account_id: "", debit: 0, credit: 0 },
        { account_id: "", debit: 0, credit: 0 },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "entries",
  });

  const watchEntries = watch("entries");
  const totalDebit = watchEntries.reduce((sum, entry) => sum + (Number(entry.debit) || 0), 0);
  const totalCredit = watchEntries.reduce((sum, entry) => sum + (Number(entry.credit) || 0), 0);
  const isBalanced = Math.abs(totalDebit - totalCredit) < 0.01 && totalDebit > 0;

  const onSubmit = async (data: JournalEntryFormValues) => {
    if (!isBalanced) {
      toast.error("Total Debit must equal Total Credit!");
      return;
    }

    const payload = {
      date: data.date,
      narration: data.narration,
      entries: data.entries.map(e => ({
        account_id: Number(e.account_id),
        debit: Number(e.debit),
        credit: Number(e.credit),
      })),
    };

    try {
      await addJournalEntry(payload);
      toast.success("Journal Entry added successfully");
      setIsOpen(false);
      reset({
        date: format(new Date(), "yyyy-MM-dd"),
        narration: "",
        entries: [
          { account_id: "", debit: 0, credit: 0 },
          { account_id: "", debit: 0, credit: 0 },
        ],
      });
    } catch (error) {
      toast.error("Failed to add journal entry");
      console.error(error);
    }
  };

  /* --- ACCOUNT COMBOBOX --- */
  const AccountCombobox = ({ value, onChange, error }: { value: string, onChange: (val: string) => void, error?: string }) => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [accounts, setAccounts] = useState<ChartOfAccount[]>([]);

    const [fetchAccounts, { isLoading: isSearching }] = useLazyGetAccountingAccountsQuery() as any; // Cast because custom lazy hook structure might be simple fn

    useEffect(() => {
      // In my simplified lazy hook, fetchAccounts returns a promise
      const timeOutId = setTimeout(() => {
        fetchAccounts({ search: query, limit: 10 }).then((res: any) => {
          if (res?.data) setAccounts(res.data);
        });
      }, 300);
      return () => clearTimeout(timeOutId);
    }, [query, fetchAccounts]);


    const selectedAccount = accounts.find(acc => String(acc.id) === value);

    return (
      <Popover open={open} onOpenChange={setOpen}>
=======
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronDown, CornerDownRight } from "lucide-react";
import { toast } from "sonner";
import { Header } from "@/components/layout/header";
import { TopNav } from "@/components/layout/top-nav";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { ConfigDrawer } from "@/components/config-drawer";
import { topNav } from "@/data/data";
import {
  useAccounts,
  useJournalReport,
  useCreateJournalEntry
} from "@/features/accounting/api/queries";

export default function JournalReport() {
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // First day of current month
    to: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0), // Last day of current month
  });
  const [isNewEntryOpen, setIsNewEntryOpen] = useState(false);

  const fromStr = dateRange.from ? format(dateRange.from, "yyyy-MM-dd") : undefined;
  const toStr = dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : undefined;

  const { data: accountsData } = useAccounts({ limit: 1000 });
  const accounts = accountsData?.data || [];
  const { data: reportData, isLoading: isReportLoading } = useJournalReport({ from: fromStr, to: toStr });

  const createJournal = useCreateJournalEntry();

  // New Entry Form State
  const [entryDate, setEntryDate] = useState<Date | undefined>(new Date());
  const [narration, setNarration] = useState("");
  const [rows, setRows] = useState<{ account_id: string; debit: number; credit: number }[]>([
    { account_id: "", debit: 0, credit: 0 },
    { account_id: "", debit: 0, credit: 0 },
  ]);

  const handleAddRow = () => {
    setRows([...rows, { account_id: "", debit: 0, credit: 0 }]);
  };

  const handleRemoveRow = (index: number) => {
    if (rows.length > 2) {
      const newRows = [...rows];
      newRows.splice(index, 1);
      setRows(newRows);
    }
  };

  const handleRowChange = (index: number, field: string, value: any) => {
    const newRows = [...rows];
    // @ts-ignore
    newRows[index][field] = value;
    setRows(newRows);
  };

  const AccountCombobox = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
    const [open, setOpen] = useState(false);

    return (
      <Popover open={open} onOpenChange={setOpen} modal={true}>
>>>>>>> 7679d0545d77a1d38f37d42b927a31e47b0d1d8b
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
<<<<<<< HEAD
            className={cn("w-full justify-between", error && "border-red-500")}
          >
            {value
              ? (selectedAccount ? selectedAccount.name : "Account selected")
              : "Select account..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command shouldFilter={false}>
            <CommandInput placeholder="Search account..." value={query} onValueChange={setQuery} />
            <CommandEmpty>{isSearching ? "Searching..." : "No account found."}</CommandEmpty>
            <CommandGroup>
              {accounts.map((account) => (
                <CommandItem
                  key={account.id}
                  value={String(account.id)}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : String(account.id));
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === String(account.id) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {account.code} - {account.name}
                </CommandItem>
              ))}
            </CommandGroup>
=======
            className="w-full justify-between"
          >
            {value
              ? (accounts.find((acc: any) => String(acc.id) === value)?.name || "Unknown")
              : "Select account..."}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[450px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search account..." />
            <CommandList className="max-h-[300px] overflow-y-auto overflow-x-hidden">
              <CommandEmpty>No account found.</CommandEmpty>
              <CommandGroup>
                {accounts.map((acc: any) => {
                  const level = acc.level || 0;

                  return (
                    <CommandItem
                      key={acc.id}
                      value={acc.name}
                      onSelect={() => {
                        onChange(String(acc.id));
                        setOpen(false);
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
                          value === String(acc.id) ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
>>>>>>> 7679d0545d77a1d38f37d42b927a31e47b0d1d8b
          </Command>
        </PopoverContent>
      </Popover>
    );
  };

<<<<<<< HEAD

  return (
    <div className="space-y-6">
      <Header fixed>
        <TopNav links={topNav} />
        <div className='ms-auto flex items-center space-x-4'>
          <div className='hidden md:block'><Search /></div>
=======
  const totalDebit = rows.reduce((sum, row) => sum + Number(row.debit), 0);
  const totalCredit = rows.reduce((sum, row) => sum + Number(row.credit), 0);
  const isBalanced = totalDebit === totalCredit && totalDebit > 0;

  return (
    <>
      <Header fixed>
        <TopNav links={topNav} />
        <div className="ms-auto flex items-center space-x-4">
          <Search />
>>>>>>> 7679d0545d77a1d38f37d42b927a31e47b0d1d8b
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>
<<<<<<< HEAD
      <main className='p-6 lg:p-10'>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Journal Entries</h2>
            <p className="text-muted-foreground">Record and review double-entry bookkeeping records.</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Plus className="mr-2 h-4 w-4" /> New Journal Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>New Journal Entry</DialogTitle>
                <DialogDescription>Create a balanced journal entry.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto px-1">
                  {/* Date & Narration */}
                  <div className="grid gap-2">
                    <Label>Date</Label>
                    <Controller
                      name="date"
                      control={control}
                      rules={{ required: "Date is required" }}
                      render={({ field }) => (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent mode="single" selected={new Date(field.value)} onSelect={(d) => field.onChange(d ? format(d, "yyyy-MM-dd") : "")} initialFocus />
                          </PopoverContent>
                        </Popover>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Narration</Label>
                    <Controller name="narration" control={control} rules={{ required: "Narration is required" }} render={({ field }) => (
                      <Textarea {...field} placeholder="Brief description of the transaction..." />
                    )} />
                    {errors.narration && <p className="text-sm text-red-500">{errors.narration.message}</p>}
                  </div>

                  {/* Entries List */}
                  <div className="space-y-4 border rounded p-3 bg-muted/20">
                    <Label>Entries</Label>
                    {fields.map((field, index) => (
                      <div key={field.id} className="flex gap-2 items-start">
                        <div className="flex-1">
                          <Label className="text-xs text-muted-foreground mb-1 block">Account</Label>
                          <Controller
                            control={control}
                            name={`entries.${index}.account_id`}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <AccountCombobox value={field.value} onChange={field.onChange} error={errors.entries?.[index]?.account_id?.message} />
                            )}
                          />
                        </div>
                        <div className="w-24">
                          <Label className="text-xs text-muted-foreground mb-1 block">Debit</Label>
                          <Input type="number" {...control.register(`entries.${index}.debit`)} onChange={(e) => {
                            control.register(`entries.${index}.debit`).onChange(e);
                            // force re-render for totals calc if not automatic
                          }} min="0" step="0.01" />
                        </div>
                        <div className="w-24">
                          <Label className="text-xs text-muted-foreground mb-1 block">Credit</Label>
                          <Input type="number" {...control.register(`entries.${index}.credit`)} onChange={(e) => {
                            control.register(`entries.${index}.credit`).onChange(e);
                          }} min="0" step="0.01" />
                        </div>
                        <div className="pt-6">
                          {fields.length > 2 && (
                            <Button type="button" variant="ghost" size="icon" className="text-destructive h-8 w-8" onClick={() => remove(index)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => append({ account_id: "", debit: 0, credit: 0 })}>
                      <Plus className="mr-2 h-4 w-4" /> Add Line
                    </Button>
                  </div>

                  {/* Totals */}
                  <div className="flex justify-between items-center text-sm font-medium border-t pt-2">
                    <div className={cn("text-muted-foreground", !isBalanced && "text-destructive")}>
                      {isBalanced ? "Balanced" : "Unbalanced"}
                    </div>
                    <div className="flex gap-8 mr-12">
                      <span>Total Debit: {totalDebit.toFixed(2)}</span>
                      <span>Total Credit: {totalCredit.toFixed(2)}</span>
                    </div>
                  </div>

                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsOpen(false)} type="button">Cancel</Button>
                  <Button type="submit" disabled={isAdding || !isBalanced}>
                    {isAdding ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Save Entry
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* List */}
        <div className="border rounded-lg bg-card mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Narration</TableHead>
                <TableHead>Debit</TableHead>
                <TableHead className="text-right">Credit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={4} className="h-24 text-center">Loading...</TableCell></TableRow>
              ) : (journalData?.data || []).length === 0 ? (
                <TableRow><TableCell colSpan={4} className="h-24 text-center">No journal entries found.</TableCell></TableRow>
              ) : (
                (journalData?.data || []).map((entry: any) => (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.date}</TableCell>
                    <TableCell>
                      <div className="font-medium">{entry.narration}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {entry.details?.map((d: any, i: number) => (
                          <div key={i} className="flex justify-between max-w-sm">
                            <span>{d.account?.name}</span>
                            <span>{d.amount > 0 ? `Dr ${d.amount}` : `Cr ${Math.abs(d.amount)}`}</span>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{entry.total_debit}</TableCell>
                    <TableCell className="text-right">{entry.total_credit}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
=======
      <main className="p-6 lg:p-10">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Journal Report</h2>
              <p className="text-muted-foreground">Chronological record of all financial transactions.</p>
            </div>

            <div className="flex items-center gap-2">
              {/* Add New Entry Button */}
              <Dialog open={isNewEntryOpen} onOpenChange={setIsNewEntryOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Plus className="mr-2 h-4 w-4" /> New Journal Entry
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px]">
                  <DialogHeader>
                    <DialogTitle>Create New Journal Entry</DialogTitle>
                    <DialogDescription>
                      Record a manual journal entry. Ensure Total Debit equals Total Credit.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !entryDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {entryDate ? format(entryDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={entryDate}
                              onSelect={setEntryDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Label>Narration / Reference</Label>
                        <Input
                          placeholder="e.g. Adjustment for depreciation"
                          value={narration}
                          onChange={(e) => setNarration(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="border rounded-md p-4 bg-muted/20 space-y-4">
                      <div className="grid grid-cols-12 gap-2 text-sm font-medium text-muted-foreground mb-2">
                        <div className="col-span-5">Account</div>
                        <div className="col-span-3 text-right">Debit</div>
                        <div className="col-span-3 text-right">Credit</div>
                        <div className="col-span-1"></div>
                      </div>

                      {rows.map((row, index) => (
                        <div key={index} className="grid grid-cols-12 gap-2 items-center">
                          <div className="col-span-5">
                            <AccountCombobox
                              value={row.account_id}
                              onChange={(val) => handleRowChange(index, "account_id", val)}
                            />
                          </div>
                          <div className="col-span-3">
                            <Input
                              type="number"
                              className="text-right"
                              placeholder="0.00"
                              value={row.debit === 0 ? '' : row.debit}
                              onChange={(e) => handleRowChange(index, "debit", Number(e.target.value))}
                            />
                          </div>
                          <div className="col-span-3">
                            <Input
                              type="number"
                              className="text-right"
                              placeholder="0.00"
                              value={row.credit === 0 ? '' : row.credit}
                              onChange={(e) => handleRowChange(index, "credit", Number(e.target.value))}
                            />
                          </div>
                          <div className="col-span-1 flex justify-center">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              onClick={() => handleRemoveRow(index)}
                              disabled={rows.length <= 2}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}

                      <Button variant="outline" size="sm" onClick={handleAddRow} className="mt-2">
                        <Plus className="mr-2 h-3.5 w-3.5" /> Add Row
                      </Button>
                    </div>

                    <div className="flex justify-end gap-6 px-4 font-semibold text-sm">
                      <div className="flex gap-2">
                        <span className="text-muted-foreground">Total Debit:</span>
                        <span>{totalDebit.toFixed(2)}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-muted-foreground">Total Credit:</span>
                        <span>{totalCredit.toFixed(2)}</span>
                      </div>
                      <div className={cn("flex gap-2", isBalanced ? "text-emerald-600" : "text-destructive")}>
                        <span>Difference:</span>
                        <span>{(totalDebit - totalCredit).toFixed(2)}</span>
                      </div>
                    </div>

                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsNewEntryOpen(false)}>Cancel</Button>
                    <Button
                      type="submit"
                      disabled={!isBalanced}
                      onClick={async () => {
                        if (!entryDate || !isBalanced) return;

                        try {
                          await createJournal.mutateAsync({
                            date: format(entryDate, "yyyy-MM-dd"),
                            narration,
                            entries: rows.map(r => ({
                              account_id: Number(r.account_id),
                              debit: r.debit,
                              credit: r.credit
                            }))
                          });

                          toast.success("Journal entry created successfully");
                          setIsNewEntryOpen(false);
                          // Reset form
                          setEntryDate(new Date());
                          setNarration("");
                          setRows([
                            { account_id: "", debit: 0, credit: 0 },
                            { account_id: "", debit: 0, credit: 0 },
                          ]);
                        } catch (error: any) {
                          toast.error(error.message || "Failed to create journal entry");
                        }
                      }}
                    >
                      Save Entry
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Date Filter */}
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[140px] justify-start text-left font-normal",
                        !dateRange.from && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? format(dateRange.from, "PP") : <span>From Date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={dateRange.from}
                      onSelect={(d) => setDateRange(prev => ({ ...prev, from: d }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <span className="text-muted-foreground">-</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[140px] justify-start text-left font-normal",
                        !dateRange.to && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.to ? format(dateRange.to, "PP") : <span>To Date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={dateRange.to}
                      onSelect={(d) => setDateRange(prev => ({ ...prev, to: d }))}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {isReportLoading ? (
              <div className="text-center py-10">Loading journal entries...</div>
            ) : reportData?.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground border-2 border-dashed rounded-xl">
                No journal entries found for this period.
              </div>
            ) : (
              reportData?.map((entry: any) => (
                <Card key={entry.id} className="overflow-hidden border-2 transition-all duration-300 hover:border-emerald-200 hover:shadow-lg py-0">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50 dark:from-emerald-950/30 dark:via-green-950/30 dark:to-emerald-950/30 border-b-1 border-emerald-100 dark:border-emerald-900 py-3 px-6 gap-0">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">{entry.date}</span>
                        <span className="text-lg font-bold text-gray-800 dark:text-gray-100">{entry.narration || "No Narration"}</span>
                      </div>
                      <Badge variant="outline" className="border-emerald-300 text-emerald-700 dark:border-emerald-700 dark:text-emerald-300 font-semibold px-3 py-1">
                        {entry.reference_type} #{entry.id}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/30 hover:bg-muted/30">
                          <TableHead className="w-[50%] py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Account Name</TableHead>
                          <TableHead className="text-right py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Debit</TableHead>
                          <TableHead className="text-right py-4 px-6 font-semibold text-gray-700 dark:text-gray-300">Credit</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {entry.entries.map((row: any) => (
                          <TableRow key={row.id} className="hover:bg-muted/20 transition-colors">
                            <TableCell className="font-medium py-4 px-6">
                              <div className="flex flex-col">
                                <span className="text-gray-900 dark:text-gray-100">{row.account?.name}</span>
                                <span className="text-xs text-muted-foreground mt-0.5">Code: {row.account?.code}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right py-4 px-6 font-mono text-gray-800 dark:text-gray-200">
                              {Number(row.debit) > 0 ? (
                                <span className="text-blue-600 dark:text-blue-400 font-semibold">{Number(row.debit).toFixed(2)}</span>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </TableCell>
                            <TableCell className="text-right py-4 px-6 font-mono text-gray-800 dark:text-gray-200">
                              {Number(row.credit) > 0 ? (
                                <span className="text-green-600 dark:text-green-400 font-semibold">{Number(row.credit).toFixed(2)}</span>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                        {/* Footer for Check */}
                        <TableRow className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/50 dark:to-green-950/50 border-t-2 border-emerald-200 dark:border-emerald-800 font-bold">
                          <TableCell className="py-4 px-6 text-gray-800 dark:text-gray-100">Total</TableCell>
                          <TableCell className="text-right py-4 px-6 font-mono text-blue-700 dark:text-blue-300 text-base">
                            {entry.entries.reduce((sum: number, item: any) => sum + Number(item.debit), 0).toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right py-4 px-6 font-mono text-green-700 dark:text-green-300 text-base">
                            {entry.entries.reduce((sum: number, item: any) => sum + Number(item.credit), 0).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export const Route = createFileRoute('/_authenticated/accounting/reports/journal/')({
  component: JournalReport,
})
>>>>>>> 7679d0545d77a1d38f37d42b927a31e47b0d1d8b
