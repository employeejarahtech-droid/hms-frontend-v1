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
const bloodGroupSchema = z.object({
    aboGroup: z.string().min(1, { message: "Required" }),
    rhFactor: z.string().min(1, { message: "Required" }),
    comments: z.string().optional(),
});
 
type BloodGroupFormValues = z.infer<typeof bloodGroupSchema>;
 
interface BloodGroupFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}
 
export function EditBloodGroupForm({ open, setOpen }: BloodGroupFormProps) {
    const form = useForm<BloodGroupFormValues>({
        resolver: zodResolver(bloodGroupSchema),
        defaultValues: {
            aboGroup: "",
            rhFactor: "",
            comments: "",
        },
    });
 
    function onSubmit(values: BloodGroupFormValues) {
        console.log("Blood Group Report:", values);
        setOpen(false);
    }
 
    const handlePrint = () => alert("Print triggered.");
    const handleView = () => alert("View triggered.");
 
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent className="max-w-[450px] w-full overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Edit Blood Group</SheetTitle>
                </SheetHeader>
 
                <PatientInvoiceInfo
                    invoiceInfo={{
                        invoiceNo: "RPT-1008",
                        patientName: "Jahid Hasan",
                        age: "25 Years",
                        gender: "Male",
                    }}
                />
 
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6 mt-4 p-4"
                    >
 
                        {/* ABO Group */}
                        <FormField
                            control={form.control}
                            name="aboGroup"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ABO Group</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., A, B, AB, O" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
 
                        {/* Rh Factor */}
                        <FormField
                            control={form.control}
                            name="rhFactor"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rh Factor</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Positive / Negative" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
 
                        {/* Comments / Remarks */}
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