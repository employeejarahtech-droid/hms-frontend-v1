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
 
// --- Schema ---
const formSchema = z.object({
    tc: z.string().min(1, { message: "Required" }),
    neutrophil: z.string().min(1, { message: "Required" }),
    lymphocyte: z.string().min(1, { message: "Required" }),
    monocyte: z.string().min(1, { message: "Required" }),
    eosinophil: z.string().min(1, { message: "Required" }),
    basophil: z.string().min(1, { message: "Required" }),
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
 
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent className="max-w-[450px] w-full overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Edit Blood for TCDC</SheetTitle>
                </SheetHeader>
 
                <PatientInvoiceInfo invoiceInfo={{ invoiceNo: "RPT-1002", patientName: "Abdul Karim", age: "36 Years", gender: "Male" }} />
 
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
 