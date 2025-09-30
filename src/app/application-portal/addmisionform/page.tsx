"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
//import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import "jspdf-autotable";

type FormState = {
  studentName: string;
  fatherName: string;
  guardianName?: string;
  email: string;
  whatsapp: string;
  gender: string;
  dob: string;
  classApplied: string;
  prevSchoolName?: string;
  prevClass?: string;
  prevMarks?: string;
};

const FEE_STRUCTURE: Record<string, { admission: number; monthly: number }> = {
  Playgroup: { admission: 5000, monthly: 2000 },
  Nursery: { admission: 5000, monthly: 2000 },
  KG: { admission: 7000, monthly: 2500 },
  "1": { admission: 8000, monthly: 3000 },
  "2": { admission: 8000, monthly: 3000 },
  "3": { admission: 9000, monthly: 3500 },
  "4": { admission: 9000, monthly: 3500 },
  "5": { admission: 9500, monthly: 4000 },
  "6": { admission: 10000, monthly: 4200 },
  "7": { admission: 10000, monthly: 4200 },
  "8": { admission: 10500, monthly: 4500 },
  "9": { admission: 11000, monthly: 4800 },
  "10": { admission: 12000, monthly: 5000 },
};

export default function ApplicationPortalPage() {
  const [form, setForm] = useState<FormState>({
    studentName: "",
    fatherName: "",
    email: "",
    whatsapp: "",
    gender: "",
    dob: "",
    classApplied: "Playgroup",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [challanBlobUrl, setChallanBlobUrl] = useState<string | null>(null);

  const birthRef = useRef<HTMLInputElement | null>(null);
  const cnicRef = useRef<HTMLInputElement | null>(null);
  const photoRef = useRef<HTMLInputElement | null>(null);
  const paidChallanRef = useRef<HTMLInputElement | null>(null);

  const isPrevRequired =
    form.classApplied !== "Playgroup" && form.classApplied !== "Nursery";

  function handleChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.studentName.trim()) e.studentName = "Student name is required";
    if (!form.fatherName.trim()) e.fatherName = "Father's name is required";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "Valid email is required";
    if (!form.whatsapp.trim() || !/^\+?\d{10,15}$/.test(form.whatsapp))
      e.whatsapp = "Valid WhatsApp number is required (include country code)";
    if (!form.dob) e.dob = "Date of birth is required";
    if (!form.gender) e.gender = "Gender is required";

    if (isPrevRequired && (!form.prevSchoolName || !form.prevSchoolName.trim()))
      e.prevSchoolName = "Previous school required for this class";

    if (!birthRef.current?.files?.[0]) e.birth = "Birth certificate is required";
    if (isPrevRequired && !cnicRef.current?.files?.[0])
      e.cnic = "Student/B-Form or CNIC is required for KG and above";
    if (!photoRef.current?.files?.[0]) e.photo = "Student photo is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function computeFees(classApplied: string) {
    const fees = FEE_STRUCTURE[classApplied] ?? { admission: 8000, monthly: 3000 };
    const total = fees.admission + fees.monthly;
    return { ...fees, total };
  }

  async function generateChallanPdfBlob() {
    const { admission, monthly, total } = computeFees(form.classApplied);
    const doc = new jsPDF({ unit: "pt", format: "a4" });

    doc.setFontSize(18);
    doc.text("Beacon House School", 40, 60);
    doc.setFontSize(11);
    doc.text("Admission Fee Challan", 40, 85);

    doc.setFontSize(10);
    doc.text(`Student Name: ${form.studentName}`, 40, 120);
    doc.text(`Father's Name: ${form.fatherName}`, 40, 140);
    doc.text(`Guardian: ${form.guardianName || "-"}`, 40, 160);
    doc.text(`Email: ${form.email}`, 40, 180);
    doc.text(`WhatsApp: ${form.whatsapp}`, 40, 200);
    doc.text(`Class Applied: ${form.classApplied}`, 40, 220);
    doc.text(`DOB: ${form.dob}`, 40, 240);

    autoTable(doc, {
      startY: 270,
      head: [["Description", "Amount (PKR)"]],
      body: [
        ["Admission Fee", admission.toString()],
        ["First Month Fee", monthly.toString()],
        ["Total", total.toString()],
      ],
      theme: "grid",
    });

    doc.setFontSize(9);
    doc.text(
      "Please pay this challan at any designated bank branch or via bank transfer. Upload the paid challan screenshot after payment.",
      40,
      doc.internal.pageSize.getHeight() - 80,
      { maxWidth: 520 }
    );

    return doc.output("blob");
  }

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    setMessage(null);
    if (!validate()) return;

    setSubmitting(true);
    setMessage("Generating challan...");

    try {
      const pdfBlob = await generateChallanPdfBlob();
      const downloadUrl = URL.createObjectURL(pdfBlob);
      setChallanBlobUrl(downloadUrl);

      const appFd = new FormData();
      appFd.append("data", JSON.stringify(form));
      if (birthRef.current?.files?.[0]) appFd.append("birth", birthRef.current.files[0]);
      if (cnicRef.current?.files?.[0]) appFd.append("cnic", cnicRef.current.files[0]);
      if (photoRef.current?.files?.[0]) appFd.append("photo", photoRef.current.files[0]);

      await fetch("/api/upload-application", { method: "POST", body: appFd });
      setMessage("Application submitted successfully. Download the challan below.");
    } catch (err) {
      console.error(err);
      setMessage("An error occurred while creating challan.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handlePaidChallanUpload(e?: React.FormEvent) {
    e?.preventDefault();
    setMessage(null);

    const screenshot = paidChallanRef.current?.files?.[0];
    if (!screenshot) {
      setMessage("Please choose the paid challan screenshot to upload.");
      return;
    }

    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("studentName", form.studentName);
      fd.append("whatsapp", form.whatsapp);
      fd.append("paidChallan", screenshot);

      const res = await fetch("/api/upload-paid-challan", { method: "POST", body: fd });
      if (!res.ok) setMessage("Upload failed. Please try again.");
      else setMessage("Paid challan uploaded. Our team will verify within 24 hours.");
    } catch (err) {
      console.error(err);
      setMessage("An error occurred during upload.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 px-6 py-16 space-y-10">
      {/* Admission Form */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-8">
        <h1 className="text-2xl text-blue-800 font-bold mb-4">Admission Application</h1>
        <p className="text-sm text-gray-600 mb-6">
          Fill the form carefully. After submission a fee challan PDF will be created.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name / Father */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Student Full Name *</label>
              <input
                title="Enter your full name"
                type="text"
                value={form.studentName}
                onChange={(e) => handleChange("studentName", e.target.value)}
                className="mt-1 block w-full border rounded-md p-2"
              />
              {errors.studentName && <div className="text-xs text-red-600">{errors.studentName}</div>}
            </div>

            <div>
              <label className="block text-sm font-medium">Father's Name *</label>
              <input
                title="Enter your father's name"
                type="text"
                value={form.fatherName}
                onChange={(e) => handleChange("fatherName", e.target.value)}
                className="mt-1 block w-full border rounded-md p-2"
              />
              {errors.fatherName && <div className="text-xs text-red-600">{errors.fatherName}</div>}
            </div>
          </div>

          {/* Guardian / Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Guardian Name (optional)</label>
              <input
                title="Enter your guardian's name"
                type="text"
                value={form.guardianName || ""}
                onChange={(e) => handleChange("guardianName", e.target.value)}
                className="mt-1 block w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email *</label>
              <input
              title="email"
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="mt-1 block w-full border rounded-md p-2"
              />
              {errors.email && <div className="text-xs text-red-600">{errors.email}</div>}
            </div>
          </div>

          {/* WhatsApp / Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">WhatsApp Number *</label>
              <input
                type="tel"
                value={form.whatsapp}
                onChange={(e) => handleChange("whatsapp", e.target.value)}
                className="mt-1 block w-full border rounded-md p-2"
                placeholder="+92300xxxxxxx"
              />
              {errors.whatsapp && <div className="text-xs text-red-600">{errors.whatsapp}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium">Gender *</label>
              <select
              title="gender"
                value={form.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
                className="mt-1 block w-full border rounded-md p-2"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <div className="text-xs text-red-600">{errors.gender}</div>}
            </div>
          </div>

          {/* DOB / Class */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Date of Birth *</label>
              <input
              title="date"
                type="date"
                value={form.dob}
                onChange={(e) => handleChange("dob", e.target.value)}
                className="mt-1 block w-full border rounded-md p-2"
              />
              {errors.dob && <div className="text-xs text-red-600">{errors.dob}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium">Class Applied For *</label>
              <select
              title="class"
                value={form.classApplied}
                onChange={(e) => handleChange("classApplied", e.target.value)}
                className="mt-1 block w-full border rounded-md p-2"
              >
                <option>Playgroup</option>
                <option>Nursery</option>
                <option>KG</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
          </div>

          {/* Previous School (Conditional) */}
          {isPrevRequired && (
            <div>
              <div className="text-sm font-semibold text-gray-700 mb-2">Previous School History</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm">Previous School Name *</label>
                  <input
                  title="text"
                    type="text"
                    value={form.prevSchoolName || ""}
                    onChange={(e) => handleChange("prevSchoolName", e.target.value)}
                    className="mt-1 block w-full border rounded-md p-2"
                  />
                  {errors.prevSchoolName && (
                    <div className="text-xs text-red-600">{errors.prevSchoolName}</div>
                  )}
                </div>
                <div>
                  <label className="block text-sm">Previous Class</label>
                  <input
                    type="text"
                    value={form.prevClass || ""}
                    onChange={(e) => handleChange("prevClass", e.target.value)}
                    className="mt-1 block w-full border rounded-md p-2"
                    placeholder="e.g., Grade 3"
                  />
                </div>
                <div>
                  <label className="block text-sm">Last Obtained Marks / Grade (optional)</label>
                  <input
                    type="text"
                    value={form.prevMarks || ""}
                    onChange={(e) => handleChange("prevMarks", e.target.value)}
                    className="mt-1 block w-full border rounded-md p-2"
                    placeholder="e.g., 78% or A"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex items-center gap-3">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Processing..." : "Submit & Generate Challan"}
            </Button>
          </div>

          {message && <div className="text-sm text-indigo-700 mt-2">{message}</div>}
        </form>
      </div>

      {/* Paid Challan Upload */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold mb-3">Upload Paid Challan</h2>
        <p className="text-sm text-gray-600 mb-4">
          After payment, upload the screenshot or scanned paid challan here for verification.
        </p>
        <form onSubmit={handlePaidChallanUpload} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm">Student Name</label>
              <input
              title="text"
                type="text"
                value={form.studentName}
                onChange={(e) => handleChange("studentName", e.target.value)}
                className="mt-1 block w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm">WhatsApp Number</label>
              <input
              title="text"
                type="text"
                value={form.whatsapp}
                onChange={(e) => handleChange("whatsapp", e.target.value)}
                className="mt-1 block w-full border rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm">Paid Challan Screenshot *</label>
              <input
                title="Upload your paid challan screenshot"
                ref={paidChallanRef}
                type="file"
                accept="image/*,application/pdf"
                className="mt-1 block w-full file:mr-4 file:rounded-full file:border-0 file:bg-blue-600 file:text-white file:px-4 file:py-2 file:text-sm file:font-semibold hover:file:bg-blue-700"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button type="submit" disabled={submitting}>
              Upload Paid Challan
            </Button>
            <div className="text-sm text-gray-500">Our team will verify within 24 hours.</div>
          </div>
        </form>
      </div>

      {/* Challan PDF Modal */}
      {challanBlobUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-11/12 md:w-3/4 lg:w-1/2 rounded-xl shadow-lg p-4 relative">
            <button
              className="absolute top-2 right-2 text-red-600 font-bold text-xl"
              onClick={() => setChallanBlobUrl(null)}
            >
              ×
            </button>
            <iframe
              src={challanBlobUrl}
              className="w-full h-[500px] border"
              title="Admission Fee Challan"
            />
            <a
              href={challanBlobUrl}
              download={`Challan_${form.studentName}.pdf`}
              className="mt-2 inline-block text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Download Challan
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
