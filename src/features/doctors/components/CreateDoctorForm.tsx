"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type DoctorItem = {
  id: string;
  name: string;
  title: string;
  qualification: string;
  speciality: string;
  country: string;
  city: string;
  phone: string;
  mobile: string;
  email: string;
  score: number;
};

export function CreateDoctorForm({ onCreate }: { onCreate?: (values: DoctorItem) => void }) {
  const [open, setOpen] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [qualification, setQualification] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [score, setScore] = useState(0);

  const handleSubmit = () => {
    const newDoctor: DoctorItem = {
      id: Date.now().toString(),
      name,
      title,
      qualification,
      speciality,
      country,
      city,
      phone,
      mobile,
      email,
      score: Number(score),
    };

    if (onCreate) onCreate(newDoctor);

    // Close sheet
    setOpen(false);

    // Reset form
    setName("");
    setTitle("");
    setQualification("");
    setSpeciality("");
    setCountry("");
    setCity("");
    setPhone("");
    setMobile("");
    setEmail("");
    setScore(0);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <SheetTrigger asChild>
        <Button onClick={() => setOpen(true)}>Create Doctor</Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[400px] sm:w-[450px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Create New Doctor</SheetTitle>
        </SheetHeader>

        <div className="space-y-4 mt-4 p-4">

          {/* Name */}
          <div className="space-y-2">
            <Label>Doctor's Name</Label>
            <Input placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label>Title</Label>
            <Input placeholder="Dr., Prof., etc." value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          {/* Qualification */}
          <div className="space-y-2">
            <Label>Qualification</Label>
            <Input placeholder="MBBS, MD, etc." value={qualification} onChange={(e) => setQualification(e.target.value)} />
          </div>

          {/* Speciality */}
          <div className="space-y-2">
            <Label>Speciality</Label>
            <Input placeholder="Cardiology, Neurology, etc." value={speciality} onChange={(e) => setSpeciality(e.target.value)} />
          </div>

          {/* Country */}
          <div className="space-y-2">
            <Label>Country</Label>
            <Input placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
          </div>

          {/* City */}
          <div className="space-y-2">
            <Label>City</Label>
            <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          {/* Mobile */}
          <div className="space-y-2">
            <Label>Mobile</Label>
            <Input placeholder="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          {/* Score */}
          <div className="space-y-2">
            <Label>Score</Label>
            <Input type="number" placeholder="0–100" value={score} onChange={(e) => setScore(Number(e.target.value))} />
          </div>

          {/* Submit */}
          <Button className="w-full" onClick={handleSubmit}>Create Doctor</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
