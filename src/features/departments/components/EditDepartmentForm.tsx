"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function EditDepartmentForm({ onCreate, open, setOpen }: { onCreate?: (values: any) => void; open: boolean; setOpen: (open: boolean) => void }) {

    // form state
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("pending");
    const [score, setScore] = useState(0);

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
            {/* <SheetTrigger asChild>
                <Button onClick={() => setOpen(true)}>Create Department</Button>
            </SheetTrigger> */}

            <SheetContent side="right" className="w-[400px] sm:w-[450px] overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Update Deparment</SheetTitle>
                </SheetHeader>

                <div className="space-y-6 mt-6 p-4">

                    {/* Test Name */}
                    <div className="space-y-2">
                        <Label>Department Name</Label>
                        <Input
                            placeholder="Enter test name"
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
                            Update
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
