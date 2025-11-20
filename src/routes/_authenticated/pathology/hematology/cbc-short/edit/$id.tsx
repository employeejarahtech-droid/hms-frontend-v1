import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
 
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
 
import { Main } from "@/components/layout/main";
import { Header } from "@/components/layout/header";
import { TopNav } from "@/components/layout/top-nav";
import { Search } from "@/components/search";
import { ThemeSwitch } from "@/components/theme-switch";
import { ConfigDrawer } from "@/components/config-drawer";
import { ProfileDropdown } from "@/components/profile-dropdown";
import PatientInvoiceInfo from "@/components/pathology/PatientInvoiceInfo";

export const Route = createFileRoute(
  '/_authenticated/pathology/hematology/cbc-short/edit/$id',
)({
  component: EditCBCShort,
})

// ─────────────────────────────
// TOP NAV (Same as your design)
// ─────────────────────────────
const topNav = [
  {
    title: 'Overview',
    href: 'dashboard/overview',
    isActive: true,
    disabled: false,
  },
  {
    title: 'Customers',
    href: 'dashboard/customers',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Products',
    href: 'dashboard/products',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Settings',
    href: 'dashboard/settings',
    isActive: false,
    disabled: true,
  },
]
 
// ─────────────────────────────
// FORM SCHEMA
// ─────────────────────────────
const cbcSchema = z.object({
  hb: z.string().min(1, "Required"),
  hbPercent: z.string().min(1, "Required"),
  esr: z.string().min(1, "Required"),
  wbc: z.string().min(1, "Required"),
  pbf: z.string().optional(),
 
  neutrophils: z.string().min(1, "Required"),
  lymphocytes: z.string().min(1, "Required"),
  monocytes: z.string().min(1, "Required"),
  eosinophils: z.string().min(1, "Required"),
  basophils: z.string().min(1, "Required"),
  others: z.string().optional(),
});
 
type CBCFormValues = z.infer<typeof cbcSchema>;
 
// ─────────────────────────────
// COMPONENT
// ─────────────────────────────
function EditCBCShort() {
  const form = useForm<CBCFormValues>({
    resolver: zodResolver(cbcSchema),
    defaultValues: {
      hb: "",
      hbPercent: "",
      esr: "",
      wbc: "",
      pbf: "",
      neutrophils: "",
      lymphocytes: "",
      monocytes: "",
      eosinophils: "",
      basophils: "",
      others: "",
    },
  });
 
  const onSubmit = (values: CBCFormValues) => {
    console.log("CBC Report:", values);
  };
 
  return (
    <>
      {/* Header */}
      <Header className="bg-white shadow-sm">
        <TopNav links={topNav} />
        <div className="ms-auto flex items-center space-x-4">
          <Search />
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>
 
      {/* Main Content */}
      <Main className="px-6 py-8 max-w-5xl mx-auto">
       <div className="max-w-[800px] mx-auto">
           <h1 className="text-2xl font-bold mb-6">Edit Blood For CBC Report</h1>
 
        {/* Invoice + Patient Section */}
        <div className="bg-white shadow rounded-xl p-6 border mb-8">
          <PatientInvoiceInfo
            invoiceInfo={{
              invoiceNo: "INV-2002",
              patientName: "Rahim Uddin",
              age: "29 Years",
              gender: "Male",
            }}
          />
        </div>
 
        {/* CBC Form */}
        <div className="bg-white shadow rounded-xl p-6 border">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Group: Basic CBC */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Basic CBC Values</h2>
 
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* HB */}
                  <FormField
                    control={form.control}
                    name="hb"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>HB (g/dL)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter HB" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
 
                  {/* HB % */}
                  <FormField
                    control={form.control}
                    name="hbPercent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>HB (%)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter HB %" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
 
                  {/* ESR */}
                  <FormField
                    control={form.control}
                    name="esr"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ESR (mm)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter ESR" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
 
                  {/* WBC */}
                  <FormField
                    control={form.control}
                    name="wbc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total WBC (/cmm)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter total WBC" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
 
{/* PBF */}
                  <FormField
                    control={form.control}
                    name="pbf"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>PBF (Peripheral Blood Film)</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            placeholder="Enter PBF details..."
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
 
              {/* Group: Differential Count */}
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Differential Count
                </h2>
 
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Neutrophils */}
                  <FormField
                    control={form.control}
                    name="neutrophils"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Neutrophils (%)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter %" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
 
                  {/* Lymphocytes */}
                  <FormField
                    control={form.control}
                    name="lymphocytes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lymphocytes (%)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter %" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
 
                  {/* Monocytes */}
                  <FormField
                    control={form.control}
                    name="monocytes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Monocytes (%)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter %" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
 
                  {/* Eosinophils */}
                  <FormField
                    control={form.control}
                    name="eosinophils"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Eosinophils (%)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter %" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
 
                  {/* Basophils */}
                  <FormField
                    control={form.control}
                    name="basophils"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Basophils (%)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter %" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
 
                  {/* Others */}
                  <FormField
                    control={form.control}
                    name="others"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Others (%)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter %" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
 
              {/* Buttons */}
              <div className="flex justify-between gap-3 pt-4">
                <Button type="submit" variant="success" className="flex-1">
                  Save Report
                </Button>
 
                <Button type="button" variant="warning" className="flex-1">
                  Print
                </Button>
 
                <Button type="button" variant="info" className="flex-1">
                  View
                </Button>
              </div>
            </form>
          </Form>
        </div>
       </div>
      </Main>
    </>
  );
}
  
