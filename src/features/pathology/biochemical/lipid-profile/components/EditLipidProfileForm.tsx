import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"; // Adjust import path as needed
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"; // Adjust import path as needed
import { Input } from "@/components/ui/input"; // Adjust import path as needed
import { Button } from "@/components/ui/button"; // Assuming Button is available

// --- 1. Define the Schema using Zod ---
// This schema defines the shape and validation rules for your form data.
const formSchema = z.object({
    // Use .string().regex() for number-only input or .coerce.number() for actual numbers
    cholesterol: z.string().min(1, { message: "Required" }),
    ldl: z.string().min(1, { message: "Required" }),
    hdl: z.string().min(1, { message: "Required" }),
    triglycerides: z.string().min(1, { message: "Required" }),
});

// Infer the TypeScript type from the Zod schema
type LipidProfileFormValues = z.infer<typeof formSchema>;

// Define the component props
interface EditLipidProfileFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    // Optionally, you might pass initial data here:
    // initialData?: LipidProfileFormValues;
}

export function EditLipidProfileForm({ open, setOpen }: EditLipidProfileFormProps) {
    // --- 2. Initialize the form using useForm ---
    const form = useForm<LipidProfileFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cholesterol: "",
            ldl: "",
            hdl: "",
            triglycerides: "",
        },
        // You could set initial data here if passed via props
        // values: initialData,
    });

    // --- 3. Define the submission handler ---
    function onSubmit(values: LipidProfileFormValues) {
        // The 'values' object is guaranteed to be validated against formSchema
        console.log("Form submitted with validated data:", values);

        // TODO: Implement your actual API call here (e.g., fetch('/api/lipid-profile', { method: 'POST', body: JSON.stringify(values) }))

        setOpen(false); // close drawer on successful submission
    }

    // Helper to handle the other button actions
    const handlePrint = () => alert("Print action triggered.");
    const handleView = () => alert("View action triggered.");

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent side="right" className="max-w-[400px] sm:max-w-[450px] w-full overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Edit Lipid Profile</SheetTitle>
                </SheetHeader>

                <div className="bg-white w-full px-4 rounded-xl mx-auto">

                    <div className="text-center text-lg font-semibold mb-5">
                        Invoice Details
                    </div>

                    <div className="flex gap-4 mb-4">
                        <div className="flex-1">
                            <div className="text-sm text-gray-600 mb-1">Invoice No</div>
                            <div className="bg-gray-50 p-2 rounded-md border border-gray-200 text-sm">RPT-1001</div>
                        </div>

                        <div className="flex-1">
                            <div className="text-sm text-gray-600 mb-1">Patient Name</div>
                            <div className="bg-gray-50 p-2 rounded-md border border-gray-200 text-sm">Maksudul Haque</div>
                        </div>
                    </div>

                    <div className="flex gap-4 mb-4">
                        <div className="flex-1">
                            <div className="text-sm text-gray-600 mb-1">Age</div>
                            <div className="bg-gray-50 p-2 rounded-md border border-gray-200 text-sm">40 Years</div>
                        </div>

                        <div className="flex-1">
                            <div className="text-sm text-gray-600 mb-1">Gender</div>
                            <div className="bg-gray-50 p-2 rounded-md border border-gray-200 text-sm">Male</div>
                        </div>
                    </div>

                </div>

                {/* --- 4. Wrap the form content with the <Form> component --- */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4 p-4">

                        {/* --- Cholesterol Field --- */}
                        <FormField
                            control={form.control}
                            name="cholesterol"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Total Cholesterol (mg/dL)</FormLabel>
                                    <FormControl>
                                        {/* The {...field} spreads value, onChange, onBlur */}
                                        <Input placeholder="Enter value" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* --- LDL Field --- */}
                        <FormField
                            control={form.control}
                            name="ldl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>LDL Cholesterol (mg/dL)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter value" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* --- HDL Field --- */}
                        <FormField
                            control={form.control}
                            name="hdl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>HDL Cholesterol (mg/dL)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter value" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* --- Triglycerides Field --- */}
                        <FormField
                            control={form.control}
                            name="triglycerides"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Triglycerides (mg/dL)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter value" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* --- Action Buttons --- */}
                        <div className="flex justify-center gap-2 pt-4">
                            {/* This button triggers form.handleSubmit(onSubmit) */}
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