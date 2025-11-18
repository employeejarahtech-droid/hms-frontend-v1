import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type EditLipidProfileFormProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function EditLipidProfileForm({ open, setOpen }: EditLipidProfileFormProps) {
    // Example fields (replace later with real lipid profile fields)
    const [cholesterol, setCholesterol] = useState("");
    const [ldl, setLdl] = useState("");
    const [hdl, setHdl] = useState("");
    const [triglycerides, setTriglycerides] = useState("");

    const handleSubmit = () => {
        console.log("Form submitted:", { cholesterol, ldl, hdl, triglycerides });

        setOpen(false); // close drawer
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent side="right" className="max-w-[400px] sm:max-w-[450px] w-full overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Edit Lipid Profile</SheetTitle>
                </SheetHeader>

                <div className="space-y-4 mt-4 p-4">

                    {/* Cholesterol */}
                    <div className="space-y-2">
                        <Label>Total Cholesterol</Label>
                        <Input
                            placeholder="Enter value"
                            value={cholesterol}
                            onChange={(e) => setCholesterol(e.target.value)}
                        />
                    </div>

                    {/* LDL */}
                    <div className="space-y-2">
                        <Label>LDL</Label>
                        <Input
                            placeholder="Enter value"
                            value={ldl}
                            onChange={(e) => setLdl(e.target.value)}
                        />
                    </div>

                    {/* HDL */}
                    <div className="space-y-2">
                        <Label>HDL</Label>
                        <Input
                            placeholder="Enter value"
                            value={hdl}
                            onChange={(e) => setHdl(e.target.value)}
                        />
                    </div>

                    {/* Triglycerides */}
                    <div className="space-y-2">
                        <Label>Triglycerides</Label>
                        <Input
                            placeholder="Enter value"
                            value={triglycerides}
                            onChange={(e) => setTriglycerides(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-center gap-2">
                        <Button variant="success" onClick={handleSubmit}>
                            Save
                        </Button>
                        <Button variant="warning" onClick={() => alert("Print")}>
                            Print
                        </Button>
                        <Button variant="info" onClick={() => alert("View")}>
                            View
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
