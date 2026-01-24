import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getCookie } from '@/lib/cookies'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Check, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

export const Route = createFileRoute('/_authenticated/outdoor/master/tests/create/')({
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
  category_id: z.number().min(1, "Required"),
  match_table_name: z.number().min(1, "Required"),
  status: z.string().min(1, "Required"),
  price: z
    .any()                           // accept anything (string, number, null, etc.)
    .transform((val) => Number(val))  // force convert using Number()
    .refine((val) => !isNaN(val), {
      message: "Price must be a valid number",
    })
})

type TestValues = {
  name: string
  category_id: number
  match_table_name: number
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
  const [open, setOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [page] = useState(1);
  const [search, setSearch] = useState("");
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


  const { data: testTables } = useQuery({
    queryKey: ["test-tables", page, search],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/test-tables?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch tests");
      return res.json();
    },
    enabled: !!token,
    placeholderData: (prev) =>
      prev
        ? prev
        : {
          data: {
            items: [],
            total: 0,
          },
        },
  });

  console.log('testTables', testTables);

  const form = useForm<TestValues>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      name: "",
      category_id: undefined,   // string
      match_table_name: undefined,
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
          category_id: Number(payload.category_id),
          match_table_name: payload.match_table_name,
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
      navigate({ to: "/outdoor/master/tests" });
      // optional:
      // form.reset();
      // queryClient.invalidateQueries(["tests"]);
    },

    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
  });


  const onSubmit = (data: TestValues) => {
    console.log('Submitting form data', data);

    // Find the selected table object by its id
    const selectedTable = testTables?.data?.items?.find(
      (table: any) => Number(table.id) === Number(data.match_table_name)
    );

    console.log('Selected Table:', selectedTable);

    if (!selectedTable) {
      toast.error("Please select a valid table");
      return;
    }

    const payload = {
      name: data.name,
      category_id: Number(data.category_id),
      price: Number(data.price),
      match_table_name: selectedTable.table_name || selectedTable.display_name, // send string
      status: data.status
    };

    console.log('Payload Ready:', payload);

    createTestMutation.mutate(payload);
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
                    name="category_id"
                    render={({ field }) => {
                      // Find the currently selected category by id
                      const selectedCategory = categories?.data?.items?.find(
                        (cat: Category) => Number(cat.id) === Number(field.value)
                      );

                      return (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <button
                                  type="button"
                                  className={cn(
                                    "w-full flex justify-between items-center px-3 py-1 border rounded-md h-9",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {selectedCategory?.name || "Select category"}
                                  <ChevronDown className="h-4 w-4 opacity-50" />
                                </button>
                              </FormControl>
                            </PopoverTrigger>

                            <PopoverContent className="w-full p-0">
                              <Command>
                                <CommandInput placeholder="Search category..." />
                                <CommandList>
                                  <CommandEmpty>No category found.</CommandEmpty>
                                  <CommandGroup>
                                    {categories?.data?.items?.map((category: Category) => (
                                      <CommandItem
                                        key={category.id}
                                        onSelect={() => {
                                          field.onChange(Number(category.id));
                                          setCategoryOpen(false); // Close popover after selection
                                        }}
                                      >
                                        {category.name}
                                        <Check
                                          className={cn(
                                            "h-4 w-4 ml-auto",
                                            Number(category.id) === Number(field.value) ? "opacity-100" : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <FormField
                    control={form.control}
                    name="match_table_name"
                    render={({ field }) => {
                      // Find the currently selected table by id
                      const selected = testTables?.data?.items?.find(
                        (table: any) => Number(table.id) === Number(field.value)
                      );

                      return (
                        <FormItem>
                          <FormLabel>Table Name</FormLabel>
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <button
                                  type="button"
                                  className={cn(
                                    "w-full flex justify-between items-center px-3 py-1 border rounded-md h-9",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {/* Show selected table's display_name or placeholder */}
                                  {selected?.display_name || "Select table"}
                                  <ChevronDown className="h-4 w-4 opacity-50" />
                                </button>
                              </FormControl>
                            </PopoverTrigger>

                            <PopoverContent className="w-full p-0">
                              <Command>
                                <CommandInput placeholder="Search table..." value={search} onValueChange={setSearch} />
                                <CommandList>
                                  <CommandEmpty>No table found.</CommandEmpty>
                                  <CommandGroup>
                                    {testTables?.data?.items?.map((item: any) => (
                                      <CommandItem
                                        key={item.id}
                                        onSelect={() => {
                                          field.onChange(item.id); // set selected id
                                          setOpen(false);          // close popover
                                        }}
                                      >
                                        {item.display_name}
                                        <Check
                                          className={cn(
                                            "h-4 w-4 ml-auto",
                                            item.id === field.value ? "opacity-100" : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
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
                          <Input type="number" placeholder="i.e. 100" {...field} />
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

