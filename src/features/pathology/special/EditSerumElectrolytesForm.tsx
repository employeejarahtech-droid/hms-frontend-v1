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
const serumElectrolytesSchema = z.object({
    sodium: z.string().min(1, { message: "Required" }),
    potassium: z.string().min(1, { message: "Required" }),
    chloride: z.string().min(1, { message: "Required" }),
    bicarbonate: z.string().min(1, { message: "Required" }),
    comments: z.string().optional(),
});
 
type SerumElectrolytesFormValues = z.infer<typeof serumElectrolytesSchema>;
 
interface SerumElectrolytesFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}
 
export function EditSerumElectrolytesForm({ open, setOpen }: SerumElectrolytesFormProps) {
    const form = useForm<SerumElectrolytesFormValues>({
        resolver: zodResolver(serumElectrolytesSchema),
        defaultValues: {
            sodium: "",
            potassium: "",
            chloride: "",
            bicarbonate: "",
            comments: "",
        },
    });
 
    function onSubmit(values: SerumElectrolytesFormValues) {
        console.log("Serum Electrolytes Report:", values);
        setOpen(false);
    }
 
    const handlePrint = () => alert("Print triggered.");
    const handleView = () => alert("View triggered.");
 
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent className="max-w-[450px] w-full overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Edit Serum Electrolytes Test</SheetTitle>
                </SheetHeader>
 
                <PatientInvoiceInfo
                    invoiceInfo={{
                        invoiceNo: "RPT-1016",
                        patientName: "Farhana Akter",
                        age: "42 Years",
                        gender: "Female",
                    }}
                />
 
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6 mt-4 p-4"
                    >
 
                        {/* Sodium */}
                        <FormField
                            control={form.control}
                            name="sodium"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sodium (Na⁺) (mEq/L)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter value" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
 
                        {/* Potassium */}
                        <FormField
                            control={form.control}
                            name="potassium"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Potassium (K⁺) (mEq/L)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter value" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
 
                        {/* Chloride */}
                        <FormField
                            control={form.control}
                            name="chloride"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Chloride (Cl⁻) (mEq/L)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter value" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
 
                        {/* Bicarbonate */}
                        <FormField
                            control={form.control}
                            name="bicarbonate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bicarbonate (HCO₃⁻) (mEq/L)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter value" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
 
                        {/* Comments */}
                        <FormField
                            control={form.control}
                            name="comments"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Comments / Remarks (Optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Additional notes..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
 
                        {/* Buttons */}
                        <div className="flex justify-center gap-2 pt-4">
                            <Button
                                type="submit"
                                variant="success"
                                disabled={form.formState.isSubmitting}
                            >
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
 