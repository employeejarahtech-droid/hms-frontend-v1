import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import PatientInvoiceInfo from '@/components/pathology/PatientInvoiceInfo'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import z from 'zod'

export const Route = createFileRoute('/_authenticated/tests/create/')({
  component: CreateTest,
})

const topNav = [
  {
    title: 'Overview',
    href: 'dashboard/overview',
    isActive: true,
    disabled: false,
  },
  {
    title: 'Customers',
    href: 'dashboard/customers',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Products',
    href: 'dashboard/products',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Settings',
    href: 'dashboard/settings',
    isActive: false,
    disabled: true,
  },
]

const testSchema = z.object({
  name: z.string().min(1, "Required"),
  category: z.string().min(1, "Required"),
  status: z.string().min(1, "Required"),
  score: z
    .any()                           // accept anything (string, number, null, etc.)
    .transform((val) => Number(val))  // force convert using Number()
    .refine((val) => !isNaN(val), {
      message: "Score must be a valid number",
    })
    .refine((val) => val >= 0 && val <= 100, {
      message: "Score must be between 0 and 100",
    }),

})

type TestValues = {
  name: string
  category: string
  status: string
  score: number
}

function CreateTest() {

  const form = useForm<TestValues>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      name: "",
      category: "",
      status: "pending",
      score: 0,
    },
  })

  const onSubmit = (data: TestValues) => {
    console.log(data)
    showSubmittedData(data)
  }
  return <>
        {/* Header */}
        <Header>
          <TopNav links={topNav} />
          <div className="ms-auto flex items-center space-x-4">
            <Search />
            <ThemeSwitch />
            <ConfigDrawer />
            <ProfileDropdown />
          </div>
        </Header>

    <Main>
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardContent>
            <h3 className='text-2xl font-semibold mb-4 text-center'>Patient Information</h3>
            <PatientInvoiceInfo invoiceInfo={{ invoiceNo: "RPT-1001", patientName: "Maksudul Haque", age: "40 Years", gender: "Male" }} />

          </CardContent>
        </Card>
        {/* <CreateTestForm /> */}
        <Card>
          <CardContent>
            <div className="">
              <h3 className='text-2xl font-semibold mb-4 text-center'>Test Form</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                  {/* Test Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Test Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter value" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Category */}
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className='w-full'>
                              <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hematology">Hematology</SelectItem>
                              <SelectItem value="cardiology">Cardiology</SelectItem>
                              <SelectItem value="biochemistry">Biochemistry</SelectItem>
                              <SelectItem value="endocrinology">Endocrinology</SelectItem>
                              <SelectItem value="pathology">Pathology</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Status */}
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className='w-full'>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="passed">Passed</SelectItem>
                              <SelectItem value="failed">Failed</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Numeric Value */}
                  <FormField
                    control={form.control}
                    name="score"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Score</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0–100" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-center">
                    <Button type="submit">Create Test</Button>
                  </div>

                </form>
              </Form>
            </div>

          </CardContent>
        </Card>
      </div>
    </Main>
  </>
}

