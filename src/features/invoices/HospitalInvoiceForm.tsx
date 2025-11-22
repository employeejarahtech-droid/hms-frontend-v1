import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

export default function HospitalInvoiceForm() {
  const [deliveryDate, setDeliveryDate] = useState(new Date());

  return (
    <div className="w-full min-h-screen">
      <Card className="w-full max-w-6xl shadow-xl p-6 rounded-2xl bg-white">
        <h2 className="text-2xl font-bold text-center mb-6">Outdoor: New Invoice</h2>

        {/* Patient Info */}
        <Card className="p-4 mb-6">
          <CardContent className="grid grid-cols-3 gap-4">
            <div>
              <Label>Patient ID</Label>
              <Input value="14086" readOnly className="bg-gray-100" />
            </div>
            <div>
              <Label>Date</Label>
              <Input type="date" />
            </div>
            <div>
              <Label>Sex</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select sex..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Patient Name</Label>
              <Input />
            </div>
            <div>
              <Label>Age</Label>
              <Input type="number" />
            </div>
            <div>
              <Label>Phone</Label>
              <Input />
            </div>

            <div>
              <Label>Ref. Dr.</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select doctor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dr1">Dr. A</SelectItem>
                  <SelectItem value="dr2">Dr. B</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Test Info */}
        <Card className="p-4 mb-6">
          <CardContent className="grid grid-cols-3 gap-4 items-end">
            <div>
              <Label>Test Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bio">Biochemical Test</SelectItem>
                  <SelectItem value="path">Pathology</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Test Name</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select test..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="test1">Test 1</SelectItem>
                  <SelectItem value="test2">Test 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Delivery Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full">
                    {format(deliveryDate, "dd/MM/yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar mode="single" selected={deliveryDate} onSelect={setDeliveryDate} required />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>

        {/* Billing Summary */}
        <Card className="p-4 mb-6">
          <CardContent className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Total Charge</span>
                <span>= 0</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <Input className="w-24" />
              </div>
              <div className="flex justify-between">
                <span>Discounted Amount</span>
                <span>= 0</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Paid</span>
                <Input className="w-24" />
              </div>
              <div className="flex justify-between">
                <span>Due Amount</span>
                <span>= 0</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <Button variant="default" className="px-10 py-6 text-lg">New</Button>
              <Button variant="default" className="px-10 py-6 text-lg">Save</Button>
              <Button variant="destructive" className="px-10 py-6 text-lg">Close</Button>
            </div>
          </CardContent>
        </Card>
      </Card>
    </div>
  );
}
