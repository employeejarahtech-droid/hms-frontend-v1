import { createFileRoute, Link } from '@tanstack/react-router';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Header } from '@/components/layout/header';
import { TopNav } from '@/components/layout/top-nav';
import { Search } from '@/components/search';
import { ThemeSwitch } from '@/components/theme-switch';
import { ConfigDrawer } from '@/components/config-drawer';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Main } from '@/components/layout/main';
import { patientTypes, topNav } from '@/data/data';
import { Card, CardContent } from '@/components/ui/card';


export const Route = createFileRoute('/_authenticated/admission/new-admission/')({
    component: IndoorNewAdmission,
})

const admissionSchema = z.object({
    patientName: z.string().min(1, "Patient name is required"),
    fatherName: z.string().min(1, "Father name is required"),
    age: z.string().min(1, "Age is required"),
    gender: z.string().min(1, "Gender is required"),
    patientType: z.string().min(1, "Patient type is required"),
    mobile_number: z.string().min(11, "Phone number required"),
    address: z.string().min(1, "Address required"),
    underConsultant: z.string().min(1, "Doctor name required"),
    referredBy: z.string(),
    attendingDoctor: z.string(),
    admittedBy: z.string(),
    admissionDate: z.string().min(1, "Admission date required"),
    ward: z.string().min(1, "Ward required"),
    bedNumber: z.string().min(1, "Bed number required"),
    reason: z.string().min(1, "Reason required"),
});



function IndoorNewAdmission() {
    const form = useForm({
        resolver: zodResolver(admissionSchema),
        defaultValues: {
            patientName: "",
            fatherName: "",
            age: "",
            gender: "",
            patientType: "",
            mobile_number: "",
            address: "",
            underConsultant: "",
            referredBy: "",
            attendingDoctor: "",
            admissionDate: "",
            ward: "",
            bedNumber: "",
            reason: "",
        },
    });

    function onSubmit(values: z.infer<typeof admissionSchema>) {
        console.log("Admission Data:", values);
    }

    return <>
        <Header>
            <TopNav links={topNav} />
            <div className='ms-auto flex items-center space-x-4'>
                <Search />
                <ThemeSwitch />
                <ConfigDrawer />
                <ProfileDropdown />
            </div>
        </Header>
        <Main>
            <div className="max-w-3xl mx-auto py-8">
                <Card>
                    <CardContent>
                        <h2 className="text-2xl font-semibold mb-8 text-center">Indoor New Admission Form</h2>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                                {/* Patient Name */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="patientName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Patient Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter patient name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="fatherName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Father / Husband Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter patient name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>


                                {/* Age & Gender */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="age"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Age</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Age" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Gender</FormLabel>
                                                <FormControl>
                                                    <Select value={field.value} onValueChange={field.onChange}>
                                                        <SelectTrigger className='w-full'>
                                                            <SelectValue placeholder="Select gender" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="male">Male</SelectItem>
                                                            <SelectItem value="female">Female</SelectItem>
                                                            <SelectItem value="other">Other</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="patientType"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Patient Type</FormLabel>
                                                <FormControl>
                                                    <Select value={field.value} onValueChange={field.onChange}>
                                                        <SelectTrigger className='w-full'>
                                                            <SelectValue placeholder="Select patient type" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {
                                                                patientTypes.map((type) => (
                                                                    <SelectItem key={type.value} value={type.value}>
                                                                        {type.label}
                                                                    </SelectItem>
                                                                ))
                                                            }
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {/* Contact */}
                                    <FormField
                                        control={form.control}
                                        name="mobile_number"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Mobile Number</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter contact number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Address */}
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Address</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Enter address" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Doctor Name */}
                                    <FormField
                                        control={form.control}
                                        name="underConsultant"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Under Consultant</FormLabel>
                                                <FormControl>
                                                    <Select value={field.value} onValueChange={field.onChange}>
                                                        <SelectTrigger className='w-full'>
                                                            <SelectValue placeholder="Select consultant" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="male">Dr. Maksudul Haque</SelectItem>
                                                            <SelectItem value="female">Dr. Mahmudul Haque</SelectItem>
                                                            <SelectItem value="other">Dr. Ahmed Shaikh</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="referredBy"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Referred By</FormLabel>
                                                <FormControl>
                                                    <Select value={field.value} onValueChange={field.onChange}>
                                                        <SelectTrigger className='w-full'>
                                                            <SelectValue placeholder="Select referrer" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="male">Dr. Maksudul Haque</SelectItem>
                                                            <SelectItem value="female">Dr. Mahmudul Haque</SelectItem>
                                                            <SelectItem value="other">Dr. Ahmed Shaikh</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="attendingDoctor"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Attending Doctor</FormLabel>
                                                <FormControl>
                                                    <Select value={field.value} onValueChange={field.onChange}>
                                                        <SelectTrigger className='w-full'>
                                                            <SelectValue placeholder="Select doctor" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="male">Dr. Maksudul Haque</SelectItem>
                                                            <SelectItem value="female">Dr. Mahmudul Haque</SelectItem>
                                                            <SelectItem value="other">Dr. Ahmed Shaikh</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="admittedBy"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Admitted By</FormLabel>
                                                <FormControl>
                                                    <Select value={field.value} onValueChange={field.onChange}>
                                                        <SelectTrigger className='w-full'>
                                                            <SelectValue placeholder="Select doctor" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="male">Dr. Maksudul Haque</SelectItem>
                                                            <SelectItem value="female">Dr. Mahmudul Haque</SelectItem>
                                                            <SelectItem value="other">Dr. Ahmed Shaikh</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Ward & Bed */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Admission Date */}
                                    <FormField
                                        control={form.control}
                                        name="admissionDate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Admission Date</FormLabel>
                                                <FormControl>
                                                    <Input type="date" {...field} className="block" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="bedNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Bed / Cabin</FormLabel>
                                                <FormControl>
                                                    <Select value={field.value} onValueChange={field.onChange}>
                                                        <SelectTrigger className='w-full'>
                                                            <SelectValue placeholder="Select bed number" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="male">Bed 100</SelectItem>
                                                            <SelectItem value="female">Bed 101</SelectItem>
                                                            <SelectItem value="other">Bed 102</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Reason for Admission */}
                                <FormField
                                    control={form.control}
                                    name="reason"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Reason for Admission</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Describe reason..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex justify-center items-center gap-4">
                                    <Link to="/admission/new-admission">
                                        <Button type="button" variant="info" className="text-lg">
                                            New
                                        </Button>
                                    </Link>
                                    <Button type="button" className="text-lg" variant="outline">
                                        Print
                                    </Button>
                                    <Button type="submit" className="text-lg">
                                        Admit Now
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>

        </Main>
    </>
}
