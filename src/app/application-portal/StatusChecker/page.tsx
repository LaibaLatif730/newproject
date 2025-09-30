"use client";

import React, { useState } from "react";

export default function AdmissionStatus() {
  const [formData, setFormData] = useState({
    applicationId: "",
    email: "",
  });

  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Dummy logic for demonstration
    if (formData.applicationId === "12345" || formData.email === "student@example.com") {
      setStatus("Your application is under review.");
    } else if (formData.applicationId && formData.email) {
      setStatus("Application submitted. Waiting for verification.");
    } else {
      setStatus("No application found. Please check your details.");
    }
  };

  return (
    <div className="flex justify-center p-6 bg-gray-50 min-h-screen">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
          Check Admission Status
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">
              Application ID
            </label>
            <input
              type="text"
              name="applicationId"
              value={formData.applicationId}
              onChange={handleChange}
              placeholder="Enter your application ID"
              className="w-full p-2 md:p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-2 md:p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-2xl shadow hover:bg-green-700 transition-colors duration-200"
          >
            Check Status
          </button>
        </form>

        {status && (
          <div className="mt-6 p-4 bg-yellow-100 text-yellow-800 rounded-lg text-center font-medium">
            {status}
          </div>
        )}
      </div>
    </div>
  );
}
