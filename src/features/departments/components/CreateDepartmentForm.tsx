"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { showSubmittedData } from "@/lib/show-submitted-data";
import { Form } from "@/components/ui/form";

const departmentSchema = z.object({
    name: z.string().min(1, {
        message: "Required",
    }),
});

type data = z.infer<typeof departmentSchema>;

export function CreateDepartmentForm() {
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof departmentSchema>>({
        resolver: zodResolver(departmentSchema),
        defaultValues: {
            name: "",
        },
    });

    async function handleSubmit(data: data) {
        console.log('Submitted Data', data);
        setOpen(false);
        showSubmittedData(data);
        form.reset();
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            {/* Trigger Button */}
            <SheetTrigger asChild>
                <Button onClick={() => setOpen(true)}>
                    <Plus size={18} />
                    Add New
                </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[400px] sm:w-[450px] overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Add New Deparment</SheetTitle>
                </SheetHeader>

                <div className="space-y-6 mt-6 p-4">

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
                            <div className="space-y-2">
                                <Label>Department Name</Label>
                                <Input
                                    placeholder="Enter department name"
                                    {...form.register("name")}
                                />
                            </div>
                            <div className="flex justify-center gap-5">
                                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
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
