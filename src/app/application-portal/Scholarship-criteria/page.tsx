"use client";

import React, { useState } from "react";

export default function ScholarshipCriteria() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    course: "",
    marks: "",
    familyIncome: "",
  });

  const [eligibility, setEligibility] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Example eligibility calculation
    const marks = parseFloat(formData.marks);
    const income = parseFloat(formData.familyIncome);

    if (marks >= 85 && income <= 50000) {
      setEligibility("You are eligible for the scholarship!");
    } else if (marks >= 70 && income <= 30000) {
      setEligibility("You may be eligible for partial scholarship.");
    } else {
      setEligibility("Sorry, you are not eligible for the scholarship.");
    }
  };

  return (
    <div className="flex justify-center p-6 bg-gray-50 min-h-screen">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
          Scholarship Criteria
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              title="Enter your full name"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full p-2 md:p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              title="Enter your email address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 md:p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">
              Course
            </label>
            <input
              title="Enter the course name"
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
              className="w-full p-2 md:p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">
              Marks (%) 
            </label>
            <input
              title="Enter your marks"
              type="number"
              name="marks"
              value={formData.marks}
              onChange={handleChange}
              min={0}
              max={100}
              required
              className="w-full p-2 md:p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">
              Family Income (PKR)
            </label>
            <input
              title="Enter your family income"
              type="number"
              name="familyIncome"
              value={formData.familyIncome}
              onChange={handleChange}
              required
              className="w-full p-2 md:p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-2xl shadow hover:bg-blue-700 transition-colors duration-200"
          >
            Check Eligibility
          </button>
        </form>

        {eligibility && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg text-center font-medium">
            {eligibility}
          </div>
        )}
      </div>
    </div>
  );
}
