"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export function CreateCategoryForm({ onCreate }: { onCreate?: (values: any) => void }) {
    const [open, setOpen] = useState(false);

    // form state
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("pending");
    const [score, setScore] = useState(0);
    const [department, setDepartment] = useState("");

    const handleSubmit = () => {
        const newTest = {
            id: Date.now().toString(),
            name,
            category,
            status,
            score: Number(score),
        };

        if (onCreate) onCreate(newTest);

        // close sheet
        setOpen(false);

        // reset form
        setName("");
        setCategory("");
        setStatus("pending");
        setScore(0);
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            {/* Trigger Button */}
            <SheetTrigger asChild>
                <Button onClick={() => setOpen(true)}>Create Category</Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[400px] sm:w-[450px] overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Create New Category</SheetTitle>
                </SheetHeader>

                <div className="space-y-6 mt-6 p-4">

                    {/* Test Name */}
                    <div className="space-y-2">
                        <Label>Department Name</Label>
                        <Select
                            value={department}
                            onValueChange={setDepartment}
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
                    </div>
                      <div className="space-y-2">
                        <Label>Category Name</Label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Submit */}
                    <div className="flex justify-center gap-5">
                        <Button onClick={handleSubmit} variant="outline">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit}>
                            Create
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
