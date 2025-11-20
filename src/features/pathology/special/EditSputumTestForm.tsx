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
const sputumTestSchema = z.object({
    appearance: z.string().min(1, { message: "Required" }),
    consistency: z.string().min(1, { message: "Required" }),
    remarks: z.string().optional(),
});
 
type SputumTestFormValues = z.infer<typeof sputumTestSchema>;
 
interface SputumTestFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}
 
export function EditSputumTestForm({ open, setOpen }: SputumTestFormProps) {
    const form = useForm<SputumTestFormValues>({
        resolver: zodResolver(sputumTestSchema),
        defaultValues: {
            appearance: "",
            consistency: "",
            remarks: "",
        },
    });
 
    function onSubmit(values: SputumTestFormValues) {
        console.log("Sputum Test Report:", values);
        setOpen(false);
    }
 
    const handlePrint = () => alert("Print triggered.");
    const handleView = () => alert("View triggered.");
 
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent className="max-w-[450px] w-full overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Edit Sputum Test</SheetTitle>
                </SheetHeader>
 
                <PatientInvoiceInfo
                    invoiceInfo={{
                        invoiceNo: "RPT-1015",
                        patientName: "Arif Rahman",
                        age: "35 Years",
                        gender: "Male",
                    }}
                />
 
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6 mt-4 p-4"
                    >
 
                        {/* Appearance */}
                        <FormField
                            control={form.control}
                            name="appearance"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Appearance / Color</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Clear / Yellow / Green / Blood-stained" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
 
                        {/* Consistency */}
                        <FormField
                            control={form.control}
                            name="consistency"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Consistency</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Mucoid / Mucopurulent / Purulent" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
 
                        {/* Remarks */}
                        <FormField
                            control={form.control}
                            name="remarks"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Microscopic Findings / Remarks (Optional)</FormLabel>
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