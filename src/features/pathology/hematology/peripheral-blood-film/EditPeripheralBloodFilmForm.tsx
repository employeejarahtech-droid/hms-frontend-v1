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
const pbfSchema = z.object({
    rbcMorphology: z.string().min(1, { message: "Required" }),
    wbcMorphology: z.string().min(1, { message: "Required" }),
    platelet: z.string().min(1, { message: "Required" }),
    comments: z.string().optional(),
});
 
type PBFFormValues = z.infer<typeof pbfSchema>;
 
interface PeripheralBloodFilmFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}
 
export function EditPeripheralBloodFilmForm({ open, setOpen }: PeripheralBloodFilmFormProps) {
    const form = useForm<PBFFormValues>({
        resolver: zodResolver(pbfSchema),
        defaultValues: {
            rbcMorphology: "",
            wbcMorphology: "",
            platelet: "",
            comments: "",
        },
    });
 
    function onSubmit(values: PBFFormValues) {
        console.log("Peripheral Blood Film Report:", values);
        setOpen(false);
    }
 
    const handlePrint = () => alert("Print triggered.");
    const handleView = () => alert("View triggered.");
 
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent className="max-w-[450px] w-full overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Edit Peripheral Blood Film (PBF)</SheetTitle>
                </SheetHeader>
 
                <PatientInvoiceInfo
                    invoiceInfo={{
                        invoiceNo: "RPT-1006",
                        patientName: "Sabbir Hossain",
                        age: "27 Years",
                        gender: "Male",
                    }}
                />
 
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6 mt-4 p-4"
                    >
 
                        {/* RBC Morphology */}
                        <FormField
                            control={form.control}
                            name="rbcMorphology"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>RBC Morphology</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Normocytic, Microcytic, Hypochromic" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
 
                        {/* WBC Morphology */}
                        <FormField
                            control={form.control}
                            name="wbcMorphology"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>WBC Morphology</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Neutrophilia, Lymphocytosis" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
 
                        {/* Platelet Count / Morphology */}
                        <FormField
                            control={form.control}
                            name="platelet"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Platelet Count / Morphology</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Adequate, Decreased" {...field} />
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
                                    <FormLabel>Comments / Impression (Optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter additional notes..." {...field} />
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