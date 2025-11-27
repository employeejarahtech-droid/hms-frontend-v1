import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getCookie } from '@/lib/cookies'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
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
  price: z
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
  price: number
}


type Category = {
  id: string
  name: string
  department_id: number
  department_name: string
}

function CreateTest() {

  const [page] = useState(1);
  const limit = 10;

  const navigate = useNavigate();

  const token = getCookie('accessToken');

  const { data: categories } = useQuery({
    queryKey: ["category", page],

    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/test-category?page=${page}&limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    },

    enabled: !!token,

    placeholderData: (prev) =>
      prev
        ? prev
        : {
          data: {
            items: [],
            meta: {
              page,
              limit,
              total: 0,
            },
          },
        },
  });

 // console.log('categories', categories);

  const form = useForm<TestValues>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      name: "",
      category: undefined,   // string
      status: "pending",
      price: 0,
    },
  })

  //POST api call

  const createTestMutation = useMutation({
    mutationFn: async (payload: TestValues) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tests/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: payload.name,
          category_id: Number(payload.category),
          status: payload.status,
          price: payload.price,
        }),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to create test");
      }

      return res.json();
    },

    onSuccess: (data) => {
      toast.success("Test created successfully!");
      console.log("API Response:", data);
      navigate({ to: "/tests" });
      // optional:
      // form.reset();
      // queryClient.invalidateQueries(["tests"]);
    },

    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
  });


  const onSubmit = (data: TestValues) => {
    console.log(data)
    createTestMutation.mutate(data);
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
                          <Select
                            value={field.value}   // undefined if not selected
                            onValueChange={(value: string) => field.onChange(value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>

                            {categories?.data?.items?.length > 0 && (
                              <SelectContent>
                                {categories.data.items.map((category: Category) => (
                                  <SelectItem key={category.id} value={String(category.id)}>
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            )}
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
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="0–100" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-center">
                    <Button type="submit" disabled={createTestMutation.isPending}>
                      {createTestMutation.isPending ? "Creating..." : "Create Test"}
                    </Button>
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

