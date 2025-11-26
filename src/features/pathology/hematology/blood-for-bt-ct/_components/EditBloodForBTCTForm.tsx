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
const btctSchema = z.object({
    bt: z.string().min(1, { message: "Required" }), // Bleeding Time
    ct: z.string().min(1, { message: "Required" }), // Clotting Time
});
 
type BTCTFormValues = z.infer<typeof btctSchema>;
 
interface BTCTFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}
 
export function EditBloodForBTCTForm({ open, setOpen }: BTCTFormProps) {
    const form = useForm<BTCTFormValues>({
        resolver: zodResolver(btctSchema),
        defaultValues: {
            bt: "",
            ct: "",
        },
    });
 
    function onSubmit(values: BTCTFormValues) {
        console.log("BT & CT Report:", values);
        setOpen(false);
    }
 
    const handlePrint = () => alert("Print triggered.");
    const handleView = () => alert("View triggered.");
 
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent className="max-w-[450px] w-full overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Edit BT & CT Report</SheetTitle>
                </SheetHeader>
 
               <div className="px-4">
                 <PatientInvoiceInfo
                    invoiceInfo={{
                        invoiceNo: "RPT-1004",
                        patientName: "Nur Mohammad",
                        age: "32 Years",
                        gender: "Male",
                    }}
                />
               </div>
 
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6 mt-4 p-4"
                    >
 
                        {/* BT Field */}
                        <FormField
                            control={form.control}
                            name="bt"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bleeding Time (BT)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter BT (minutes)" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
 
                        {/* CT Field */}
                        <FormField
                            control={form.control}
                            name="ct"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Clotting Time (CT)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter CT (minutes)" {...field} />
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