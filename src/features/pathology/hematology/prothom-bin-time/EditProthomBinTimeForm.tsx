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
const ptSchema = z.object({
    pt: z.string().min(1, { message: "Required" }),           // Prothrombin Time
    control: z.string().min(1, { message: "Required" }),      // Control Time
    inr: z.string().min(1, { message: "Required" }),          // INR value
});
 
type ProthrombinFormValues = z.infer<typeof ptSchema>;
 
interface ProthrombinTimeFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}
 
export function EditProthrombinTimeForm({ open, setOpen }: ProthrombinTimeFormProps) {
    const form = useForm<ProthrombinFormValues>({
        resolver: zodResolver(ptSchema),
        defaultValues: {
            pt: "",
            control: "",
            inr: "",
        },
    });
 
    function onSubmit(values: ProthrombinFormValues) {
        console.log("Prothrombin Time Report:", values);
        setOpen(false);
    }
 
    const handlePrint = () => alert("Print triggered.");
    const handleView = () => alert("View triggered.");
 
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent className="max-w-[450px] w-full overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Edit Prothrombin Time (PT)</SheetTitle>
                </SheetHeader>
 
                <PatientInvoiceInfo
                    invoiceInfo={{
                        invoiceNo: "RPT-1005",
                        patientName: "Hasina Khatun",
                        age: "45 Years",
                        gender: "Female",
                    }}
                />
 
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6 mt-4 p-4"
                    >
 
                        {/* PT Field */}
                        <FormField
                            control={form.control}
                            name="pt"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prothrombin Time (PT) — seconds</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter PT value" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
 
                        {/* Control Field */}
                        <FormField
                            control={form.control}
                            name="control"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Control Value — seconds</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter control value" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
 
                        {/* INR Field */}
                        <FormField
                            control={form.control}
                            name="inr"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>INR</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter INR value" {...field} />
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
 