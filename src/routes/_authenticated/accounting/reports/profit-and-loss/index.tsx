<<<<<<< HEAD

"use client";

import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { createFileRoute } from '@tanstack/react-router';
import { DateRange } from "react-day-picker";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Skeleton } from "@/components/ui/skeleton";

import { useGetProfitLossQuery } from "@/features/accounting/accountingQueries";
import { TopNav } from "@/components/layout/top-nav";
import { topNav } from "@/data/data";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { ConfigDrawer } from "@/components/config-drawer";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Header } from "@/components/layout/header";
=======
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { topNav } from '@/data/data'
import { cn } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
>>>>>>> 7679d0545d77a1d38f37d42b927a31e47b0d1d8b

export const Route = createFileRoute('/_authenticated/accounting/reports/profit-and-loss/')({
    component: ProfitAndLoss,
})

<<<<<<< HEAD
function ProfitAndLoss() {
    const [dateRange, setDateRange] = useState<DateRange | undefined>();

    const { data: reportData, isLoading } = useGetProfitLossQuery({
        from: dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : undefined,
        to: dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined,
    });

    const income = reportData?.income || [];
    const expense = reportData?.expense || [];
    // @ts-ignore
    const totalIncome = reportData?.total_income || 0;
    // @ts-ignore
    const totalExpense = reportData?.total_expense || 0;
    const netProfit = totalIncome - totalExpense;

    return (
        <div className="space-y-6">
=======
// Dummy Data
const incomeData = [
    { name: 'Sales Account', amount: 15000.0 },
    { name: 'Consulting Fees', amount: 5000.0 },
    { name: 'Interest Income', amount: 250.0 },
]

const expenseData = [
    { name: 'Office Rent', amount: 2000.0 },
    { name: 'Salaries & Wages', amount: 8000.0 },
    { name: 'Utilities', amount: 500.0 },
    { name: 'Travel Expenses', amount: 1200.0 },
]

export default function ProfitAndLoss() {
    const [date, setDate] = useState<Date | undefined>(new Date())

    const totalIncome = incomeData.reduce((sum, item) => sum + item.amount, 0)
    const totalExpense = expenseData.reduce((sum, item) => sum + item.amount, 0)
    const netProfit = totalIncome - totalExpense

    return (
        <>
>>>>>>> 7679d0545d77a1d38f37d42b927a31e47b0d1d8b
            <Header fixed>
                <TopNav links={topNav} />
                <div className='ms-auto flex items-center space-x-4'>
                    <Search />
                    <ThemeSwitch />
                    <ConfigDrawer />
                    <ProfileDropdown />
                </div>
            </Header>
<<<<<<< HEAD
            <main className='p-6 lg:p-10'>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Profit & Loss</h2>
                        <p className="text-muted-foreground">Financial performance summary.</p>
                    </div>
                    <div className="flex gap-2">
                        <DateRangePicker
                            dateRange={dateRange}
                            onDateRangeChange={setDateRange}
                            placeholder="Select period"
                        />
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* INCOME */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-emerald-600">Income</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Account</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {isLoading ? (
                                        <TableRow><TableCell colSpan={2}><Skeleton className="h-8 w-full" /></TableCell></TableRow>
                                    ) : income.length === 0 ? (
                                        <TableRow><TableCell colSpan={2} className="text-center text-muted-foreground">No income records.</TableCell></TableRow>
                                    ) : (
                                        income.map((item: any, i: number) => (
                                            <TableRow key={i}>
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell className="text-right">{item.amount.toFixed(2)}</TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                    <TableRow className="font-bold bg-muted/50">
                                        <TableCell>Total Income</TableCell>
                                        <TableCell className="text-right text-emerald-600">{totalIncome.toFixed(2)}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* EXPENSE */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-red-600">Expense</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Account</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {isLoading ? (
                                        <TableRow><TableCell colSpan={2}><Skeleton className="h-8 w-full" /></TableCell></TableRow>
                                    ) : expense.length === 0 ? (
                                        <TableRow><TableCell colSpan={2} className="text-center text-muted-foreground">No expense records.</TableCell></TableRow>
                                    ) : (
                                        expense.map((item: any, i: number) => (
                                            <TableRow key={i}>
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell className="text-right">{item.amount.toFixed(2)}</TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                    <TableRow className="font-bold bg-muted/50">
                                        <TableCell>Total Expense</TableCell>
                                        <TableCell className="text-right text-red-600">{totalExpense.toFixed(2)}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                {/* NET PROFIT */}
                <Card className={cn("mt-6 border-l-4", netProfit >= 0 ? "border-l-emerald-500" : "border-l-red-500")}>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold">Net Profit / (Loss)</h3>
                            <div className={cn("text-2xl font-bold", netProfit >= 0 ? "text-emerald-600" : "text-red-600")}>
                                {netProfit >= 0 ? `+ ${netProfit.toFixed(2)}` : `- ${Math.abs(netProfit).toFixed(2)}`}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
=======

            <main className='p-6 lg:p-10'>
                <div className='space-y-6'>
                    <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
                        <div>
                            <h2 className='text-3xl font-bold tracking-tight'>Profit & Loss</h2>
                            <p className='text-muted-foreground'>Income Statement (Revenue vs Expense).</p>
                        </div>

                        <div className='flex items-center gap-2'>
                            <span className='text-sm font-medium'>Period:</span>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={'outline'}
                                        className={cn(
                                            'w-[240px] justify-start text-left font-normal',
                                            !date && 'text-muted-foreground'
                                        )}
                                    >
                                        <CalendarIcon className='mr-2 h-4 w-4' />
                                        {date ? format(date, 'PPP') : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className='w-auto p-0' align='end'>
                                    <Calendar
                                        mode='single'
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>

                    <div className='grid gap-6 md:grid-cols-2'>
                        {/* INCOME COLUMN */}
                        <Card className='border-emerald-200 bg-emerald-50/10 py-6'>
                            <CardHeader>
                                <CardTitle className='text-emerald-700'>Income</CardTitle>
                                <CardDescription>Revenue generated during the period</CardDescription>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                                {incomeData.map((item, idx) => (
                                    <div key={idx} className='flex justify-between items-center text-sm'>
                                        <span>{item.name}</span>
                                        <span className='font-medium'>
                                            {item.amount.toLocaleString(undefined, {
                                                minimumFractionDigits: 2,
                                            })}
                                        </span>
                                    </div>
                                ))}
                                <Separator className='bg-emerald-200' />
                                <div className='flex items-center justify-between text-lg font-bold text-emerald-800'>
                                    <span>Total Income</span>
                                    <span>
                                        {totalIncome.toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                        })}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* EXPENSE COLUMN */}
                        <Card className='border-red-200 bg-red-50/10 py-6'>
                            <CardHeader>
                                <CardTitle className='text-red-700'>Expenses</CardTitle>
                                <CardDescription>Costs incurred during the period</CardDescription>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                                {expenseData.map((item, idx) => (
                                    <div key={idx} className='flex justify-between items-center text-sm'>
                                        <span>{item.name}</span>
                                        <span className='font-medium'>
                                            {item.amount.toLocaleString(undefined, {
                                                minimumFractionDigits: 2,
                                            })}
                                        </span>
                                    </div>
                                ))}
                                <Separator className='bg-red-200' />
                                <div className='flex items-center justify-between text-lg font-bold text-red-800'>
                                    <span>Total Expense</span>
                                    <span>
                                        {totalExpense.toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                        })}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* NET PROFIT SUMMARY */}
                    <Card
                        className={cn(
                            'border-2',
                            netProfit >= 0 ? 'border-emerald-500 bg-emerald-50' : 'border-red-500 bg-red-50'
                        )}
                    >
                        <CardContent className='space-y-2 p-8 text-center'>
                            <h3 className='text-lg font-medium uppercase tracking-widest text-muted-foreground'>
                                Net Profit / (Loss)
                            </h3>
                            <div
                                className={cn(
                                    'text-5xl font-extrabold',
                                    netProfit >= 0 ? 'text-emerald-600' : 'text-red-600'
                                )}
                            >
                                {netProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </div>
                            <p className='pt-2 text-sm text-muted-foreground'>
                                Total Income ({totalIncome.toLocaleString()}) - Total Expense ({totalExpense.toLocaleString()})
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </>
    )
>>>>>>> 7679d0545d77a1d38f37d42b927a31e47b0d1d8b
}
