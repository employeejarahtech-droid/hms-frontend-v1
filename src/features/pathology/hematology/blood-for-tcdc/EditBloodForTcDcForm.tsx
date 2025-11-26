import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import PatientInvoiceInfo from "@/components/pathology/PatientInvoiceInfo";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// --- Schema ---
const formSchema = z.object({
    tc: z.string().min(1, { message: "Required" }),
    neutrophil: z.string().min(1, { message: "Required" }),
    lymphocyte: z.string().min(1, { message: "Required" }),
    monocyte: z.string().min(1, { message: "Required" }),
    eosinophil: z.string().min(1, { message: "Required" }),
    basophil: z.string().min(1, { message: "Required" }),
    testCarriedOutBy: z.string().min(1, "Select a machine"),
});

type TCDCFormValues = z.infer<typeof formSchema>;

interface BloodForTCDCFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export function EditBloodForTcDcForm({ open, setOpen }: BloodForTCDCFormProps) {
    const form = useForm<TCDCFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tc: "",
            neutrophil: "",
            lymphocyte: "",
            monocyte: "",
            eosinophil: "",
            basophil: "",
        },
    });

    function onSubmit(values: TCDCFormValues) {
        console.log("TCDC Data:", values);
        setOpen(false);
    }

    const handlePrint = () => alert("Print action triggered.");
    const handleView = () => alert("View action triggered.");

    const machineList = [
        "Sysmex XN-1000",
        "Sysmex XP-300",
        "Mindray BC-20",
        "Abbott CELL-DYN Ruby",
        "Nihon Kohden MEK-9100",
    ];



    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent className="max-w-[450px] w-full overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Edit Blood for TCDC</SheetTitle>
                </SheetHeader>

                <div className="px-4">
                    <PatientInvoiceInfo invoiceInfo={{ invoiceNo: "RPT-1002", patientName: "Abdul Karim", age: "36 Years", gender: "Male" }} />
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4 p-4">

                        {/* Fields */}
                        {[
                            { name: "tc", label: "Total Count (TC)" },
                            { name: "neutrophil", label: "Neutrophil (%)" },
                            { name: "lymphocyte", label: "Lymphocyte (%)" },
                            { name: "monocyte", label: "Monocyte (%)" },
                            { name: "eosinophil", label: "Eosinophil (%)" },
                            { name: "basophil", label: "Basophil (%)" },
                        ].map((f) => (
                            <FormField
                                key={f.name}
                                control={form.control}
                                name={f.name as keyof TCDCFormValues}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{f.label}</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter value" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}



                        {/* TEST CARRIED OUT BY */}
                        <FormField
                            control={form.control}
                            name="testCarriedOutBy"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Test carried out by</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select lab technician" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {machineList.map((machine) => (
                                                    <SelectItem key={machine} value={machine}>
                                                        {machine}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        {/* Buttons */}
                        <div className="flex justify-center gap-2 pt-4">
                            <Button type="submit" variant="success" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? "Saving..." : "Save"}
                            </Button>

                            <Button type="button" variant="warning" onClick={handlePrint}>
                                Print
                            </Button>

                            <Button type="button" variant="info" onClick={handleView}>
                                View
                            </Button>
                        </div>

                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    );
}
