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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCookie } from '@/lib/cookies'
import { useEffect } from 'react'
import { toast } from 'sonner'

export const Route = createFileRoute('/_authenticated/tests/edit/$id/')({
    component: EditTest,
})

const testSchema = z.object({
    name: z.string().min(1, "Test name is required"),
    category_id: z.number().int().positive("Category is required"),
    price: z.number().positive("Price must be positive").optional(),
})

type TestValues = z.infer<typeof testSchema>

function EditTest() {
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
    })

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

   // console.log(categoriesData)

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
            navigate({ to: "/tests" });
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to update test");
        },
    })

    // Populate form when data is loaded
    useEffect(() => {
        if (testData) {
            form.reset({
                name: testData.name || "",
                category_id: testData.category_id || 0,
                price: testData.price ? parseFloat(testData.price) : 0,
            })
        }
    }, [testData, form])

    const onSubmit = (data: TestValues) => {
        updateMutation.mutate(data)
    }

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
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Category</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        value={field.value?.toString()}
                                                        onValueChange={(value) => field.onChange(parseInt(value))}
                                                    >
                                                        <SelectTrigger className='w-full'>
                                                            <SelectValue placeholder="Select Category" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {categoriesData?.items?.map((cat: any) => (
                                                                <SelectItem key={cat.id} value={cat.id.toString()}>
                                                                    {cat.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
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
                                            onClick={() => navigate({ to: "/tests" })}
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
