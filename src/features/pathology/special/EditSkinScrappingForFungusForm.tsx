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
const skinScrapingSchema = z.object({
    kOHResult: z.string().min(1, { message: "Required" }),
    fungalElements: z.string().min(1, { message: "Required" }),
    typeOfFungus: z.string().optional(),
    comments: z.string().optional(),
});
 
type SkinScrapingFormValues = z.infer<typeof skinScrapingSchema>;
 
interface SkinScrapingFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}
 
export function EditSkinScrapingForFungalForm({ open, setOpen }: SkinScrapingFormProps) {
    const form = useForm<SkinScrapingFormValues>({
        resolver: zodResolver(skinScrapingSchema),
        defaultValues: {
            kOHResult: "",
            fungalElements: "",
            typeOfFungus: "",
            comments: "",
        },
    });
 
    function onSubmit(values: SkinScrapingFormValues) {
        console.log("Skin Scraping for Fungal Study:", values);
        setOpen(false);
    }
 
    const handlePrint = () => alert("Print triggered.");
    const handleView = () => alert("View triggered.");
 
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent className="max-w-[450px] w-full overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Skin Scraping for Fungal Study</SheetTitle>
                </SheetHeader>
 
                <PatientInvoiceInfo
                    invoiceInfo={{
                        invoiceNo: "RPT-1010",
                        patientName: "Jannatul Ferdous",
                        age: "33 Years",
                        gender: "Female",
                    }}
                />
 
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6 mt-4 p-4"
                    >
 
                        {/* KOH Result */}
                        <FormField
                            control={form.control}
                            name="kOHResult"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>10% KOH Mount Result</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Positive / Negative" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
 
                        {/* Fungal Elements */}
                        <FormField
                            control={form.control}
                            name="fungalElements"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Fungal Elements Seen</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Hyphae, Spores" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
 
                        {/* Type of Fungus */}
                        <FormField
                            control={form.control}
                            name="typeOfFungus"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type of Fungus Identified (Optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Dermatophytes, Candida" {...field} />
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
                                        <Input placeholder="Add clinical notes..." {...field} />
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
 