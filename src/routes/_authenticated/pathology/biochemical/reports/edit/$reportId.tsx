import PatientInvoiceInfo from '@/components/pathology/PatientInvoiceInfo'
import { createFileRoute } from '@tanstack/react-router'
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { Main } from '@/components/layout/main';
import { Header } from '@/components/layout/header';
import { TopNav } from '@/components/layout/top-nav';
import { Search } from '@/components/search';
import { ThemeSwitch } from '@/components/theme-switch';
import { ConfigDrawer } from '@/components/config-drawer';
import { ProfileDropdown } from '@/components/profile-dropdown';

export const Route = createFileRoute(
  '/_authenticated/pathology/biochemical/reports/edit/$reportId',
)({
  component: EditReport,
})

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

// --- Schema ---
const thyroidFunctionSchema = z.object({
  t3: z.string().min(1, { message: "Required" }),
  t4: z.string().min(1, { message: "Required" }),
  tsh: z.string().min(1, { message: "Required" }),
  comments: z.string().optional(),
});

type ThyroidFunctionFormValues = z.infer<typeof thyroidFunctionSchema>;

function EditReport() {
  //const { reportId } = Route.useParams();

  const form = useForm<ThyroidFunctionFormValues>({
    resolver: zodResolver(thyroidFunctionSchema),
    defaultValues: {
      t3: "",
      t4: "",
      tsh: "",
      comments: "",
    },
  });

  const onSubmit = (values: ThyroidFunctionFormValues) => {
    console.log("Thyroid Function Test Report:", values);
  };

  const handlePrint = () => alert("Print triggered.");
  const handleView = () => alert("View triggered.");

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

      {/* Main */}
      <Main className="px-6 py-8 max-w-4xl mx-auto">

        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Edit Thyroid Function Report</h1>
        </div>

        {/* ======================= */}
        {/* Row 1 — Invoice Details */}
        {/* ======================= */}
        <div className="bg-white shadow rounded-xl p-6 border mb-8">
          <PatientInvoiceInfo
            invoiceInfo={{
              invoiceNo: "RPT-1017",
              patientName: "Sadia Hossain",
              age: "37 Years",
              gender: "Female",
            }}
          />
        </div>

        {/* ======================= */}
        {/* Row 2 — Tests Form */}
        {/* ======================= */}
        <div className="bg-white shadow rounded-xl p-6 border">
          <h2 className="text-xl font-semibold mb-4">Test Results</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              {/* T3 */}
              <FormField
                control={form.control}
                name="t3"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>T3 (Triiodothyronine) (ng/dL)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter T3 value" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* T4 */}
              <FormField
                control={form.control}
                name="t4"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>T4 (Thyroxine) (µg/dL)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter T4 value" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* TSH */}
              <FormField
                control={form.control}
                name="tsh"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>TSH (µIU/mL)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter TSH value" {...field} />
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
                    <FormLabel>Comments / Remarks</FormLabel>
                    <FormControl>
                      <Input placeholder="Additional notes..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Buttons */}
              <div className="flex justify-between gap-3 pt-4">
                <Button type="submit" variant="success" className="flex-1">
                  {form.formState.isSubmitting ? "Saving..." : "Save Report"}
                </Button>

                <Button type="button" variant="warning" className="flex-1" onClick={handlePrint}>
                  Print
                </Button>

                <Button type="button" variant="info" className="flex-1" onClick={handleView}>
                  View
                </Button>
              </div>

            </form>
          </Form>
        </div>

      </Main>
    </>
  );
}


