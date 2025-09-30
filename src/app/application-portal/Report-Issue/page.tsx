"use client";

import React, { useState } from "react";

export default function ReportIssue() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issueType: "",
    description: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can send the formData to your backend or database
    console.log("Reported Issue:", formData);
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      issueType: "",
      description: "",
    });
  };

  return (
    <div className="flex justify-center p-6 bg-gray-50 min-h-screen">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
          Report an Issue
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
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
              required
              className="w-full p-2 md:p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">
              Issue Type
            </label>
            <select
              title="Select an issue type"
              name="issueType"
              value={formData.issueType}
              onChange={handleChange}
              required
              className="w-full p-2 md:p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Select an issue type</option>
              <option value="formSubmission">Form Submission</option>
              <option value="payment">Payment Issue</option>
              <option value="login">Login / Account</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the issue you faced"
              required
              rows={4}
              className="w-full p-2 md:p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-2xl shadow hover:bg-red-700 transition-colors duration-200"
          >
            Submit Issue
          </button>
        </form>

        {submitted && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg text-center font-medium">
            Thank you! Your issue has been reported.
          </div>
        )}
      </div>
    </div>
  );
}
