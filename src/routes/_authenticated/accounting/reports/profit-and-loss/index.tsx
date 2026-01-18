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

export const Route = createFileRoute('/_authenticated/accounting/reports/profit-and-loss/')({
    component: ProfitAndLoss,
})

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
}
