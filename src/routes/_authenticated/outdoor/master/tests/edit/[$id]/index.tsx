import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from "@/components/ui/button";
import { Main } from '@/components/layout/main';
import { Header } from '@/components/layout/header';
import { Search } from '@/components/search';
import { ThemeSwitch } from '@/components/theme-switch';
import { ConfigDrawer } from '@/components/config-drawer';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCookie } from '@/lib/cookies'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';

export const Route = createFileRoute('/_authenticated/outdoor/master/tests/edit/$id/')({
    component: EditTest,
})

const testSchema = z.object({
    name: z.string().min(1, "Test name is required"),
    category_id: z.number().int().positive("Category is required"),
    match_table_name: z.number(),
    price: z.number().positive("Price must be positive").optional(),
})

type TestValues = z.infer<typeof testSchema>

function EditTest() {
    const [open, setOpen] = useState(false);
    const [catOpen, setCatOpen] = useState(false);
    const [page] = useState(1);
    const [search, setSearch] = useState("");
    const limit = 10;
    const { id } = Route.useParams()
    const navigate = useNavigate()
    const token = getCookie('accessToken')
    const queryClient = useQueryClient()


    const form = useForm<TestValues>({
        resolver: zodResolver(testSchema),
        defaultValues: {
            name: "",
            category_id: 0,
            price: 0,
            match_table_name: 0,
        },
    })

    // Fetch existing test data
    const { data: testData, isLoading, error } = useQuery({
        queryKey: ["test", id],
        queryFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/tests/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (!res.ok) throw new Error("Failed to fetch test");
            const result = await res.json();
            return result.data;
        },
        enabled: !!token && !!id,
    });

    console.log('testData', testData)


    // Fetch test categories
    const { data: categoriesData } = useQuery({
        queryKey: ["test-category"],
        queryFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/test-category`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (!res.ok) throw new Error("Failed to fetch categories");
            const result = await res.json();
            return result.data?.rows || result.data || [];
        },
        enabled: !!token,
    })

    console.log('categoriesData', categoriesData);

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

    //console.log('testTables', testTables);


    // Populate form when data is loaded
    useEffect(() => {
        if (!testData) return;

        const categoryId = Number(
            categoriesData?.items?.find(
                (c: any) => c.name === testData?.category?.name
            )?.id
        );

        form.reset({
            name: testData.name,
            category_id: categoryId, // NUMBER
            price: Number(testData.price),
            match_table_name: Number(
                testTables?.data?.items?.find(
                    (t: any) => t.table_name === testData.match_table_name
                )?.id
            ),
        });
    }, [testData, testTables, form]);

    // Update mutation
    const updateMutation = useMutation({
        mutationFn: async (data: TestValues) => {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/tests/${id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(data),
                }
            );
            if (!res.ok) throw new Error("Failed to update test");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tests"] });
            queryClient.invalidateQueries({ queryKey: ["test", id] });
            toast.success("Test updated successfully");
            navigate({ to: "/outdoor/master/tests" });
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to update test");
        },
    })

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
            match_table_name: selectedTable.table_name || selectedTable.display_name // send string
        };

        console.log('Payload Ready:', payload);

        updateMutation.mutate(payload);
    };


    if (isLoading) {
        return (
            <>
                <Header>
                    <Search />
                    <div className='ms-auto flex items-center space-x-4'>
                        <ThemeSwitch />
                        <ConfigDrawer />
                        <ProfileDropdown />
                    </div>
                </Header>
                <Main>
                    <div className="flex items-center justify-center h-64">
                        <p>Loading test data...</p>
                    </div>
                </Main>
            </>
        )
    }

    if (error) {
        return (
            <>
                <Header>
                    <Search />
                    <div className='ms-auto flex items-center space-x-4'>
                        <ThemeSwitch />
                        <ConfigDrawer />
                        <ProfileDropdown />
                    </div>
                </Header>
                <Main>
                    <div className="flex items-center justify-center h-64">
                        <p className="text-red-500">Error loading test data</p>
                    </div>
                </Main>
            </>
        )
    }

    return (
        <>
            <Header>
                <Search />
                <div className='ms-auto flex items-center space-x-4'>
                    <ThemeSwitch />
                    <ConfigDrawer />
                    <ProfileDropdown />
                </div>
            </Header>

            <Main>
                <div className="max-w-2xl mx-auto space-y-6">
                    <Card>
                        <CardContent className="pt-6">
                            <h3 className='text-2xl font-semibold mb-6 text-center'>Edit Test</h3>
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
                                                    <Input placeholder="Enter test name" {...field} />
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
                                            // Find the currently selected table by id
                                            const selected = categoriesData?.items?.find(
                                                (cat: any) => Number(cat.id) === Number(field.value)
                                            );

                                            return (
                                                <FormItem>
                                                    <FormLabel>Category</FormLabel>
                                                    <Popover open={catOpen} onOpenChange={setCatOpen}>
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
                                                                    {selected?.name || "Select category"}
                                                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                                                </button>
                                                            </FormControl>
                                                        </PopoverTrigger>

                                                        <PopoverContent className="w-full p-0">
                                                            <Command>
                                                                <CommandInput placeholder="Search table..." value={search} onValueChange={setSearch} />
                                                                <CommandList>
                                                                    <CommandEmpty>No category found.</CommandEmpty>
                                                                    <CommandGroup>
                                                                        {categoriesData?.items?.map((item: any) => (
                                                                            <CommandItem
                                                                                key={item.id}
                                                                                onSelect={() => {
                                                                                    field.onChange(item.id); // set selected id
                                                                                    setCatOpen(false);          // close popover
                                                                                }}
                                                                            >
                                                                                {item?.name}
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


                                    {/* Price */}
                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Price (৳)</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        step="0.01"
                                                        placeholder="Enter price"
                                                        {...field}
                                                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="flex gap-4 justify-center">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => navigate({ to: "/outdoor/master/tests" })}
                                            disabled={updateMutation.isPending}
                                        >
                                            Cancel
                                        </Button>
                                        <Button type="submit" disabled={updateMutation.isPending}>
                                            {updateMutation.isPending ? "Updating..." : "Update Test"}
                                        </Button>
                                    </div>

                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </Main>
        </>
    );
}
