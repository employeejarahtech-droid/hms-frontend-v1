"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { showSubmittedData } from "@/lib/show-submitted-data";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";

const categorySchema = z.object({
    department_name: z.string().min(1, {
        message: "Required",
    }),
    category_name: z.string().min(1, {
        message: "Required",
    }),
})

export function CreateCategoryForm() {
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof categorySchema>>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            department_name: "",
            category_name: "",
        },
    });

    const handleSubmit = async (data: z.infer<typeof categorySchema>) => {
        console.log('Submitted Data', data);
        setOpen(false);
        showSubmittedData(data);
        form.reset();
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            {/* Trigger Button */}
            <SheetTrigger asChild>
                <Button onClick={() => setOpen(true)}>
                    <Plus className="h-4 w-4" />
                    Add New
                </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[400px] sm:w-[450px] overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Add New Category</SheetTitle>
                </SheetHeader>

                <div className="mt-6 p-4">

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="department_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Department Name</FormLabel>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a department" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="development">Development</SelectItem>
                                                <SelectItem value="design">Design</SelectItem>
                                                <SelectItem value="marketing">Marketing</SelectItem>
                                                <SelectItem value="sales">Sales</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )} />

                            <FormField
                                control={form.control}
                                name="category_name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category Name</FormLabel>
                                        <Input {...field} placeholder="Enter a category name" />
                                    </FormItem>
                                )} />

                            {/* Submit */}
                            <div className="flex justify-center gap-5">
                                <Button type="button" onClick={() => setOpen(false)} variant="outline">
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    Add
                                </Button>
                            </div>
                        </form>
                    </Form>


                </div>
            </SheetContent>
        </Sheet>
    );
}
