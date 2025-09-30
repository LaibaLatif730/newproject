"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function StudentDashboard() {
  // Example dummy data
  const stats = [
    { title: "Applications Submitted", value: 3 },
    { title: "Pending Documents", value: 2 },
    { title: "Scholarship Eligibility", value: "75%" },
    { title: "Notifications", value: 1 },
  ];

  const activities = [
    "Uploaded transcript",
    "Submitted admission form",
    "Checked scholarship status",
    "Updated profile info",
  ];

  const notifications = [
    "Upload remaining documents before Oct 10",
    "Application under review",
    "Scholarship updated",
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Sidebar */}
      <aside className="w-52 md:w-48 bg-white shadow-md flex flex-col rounded-2xl overflow-hidden sticky top-6 h-[calc(100vh-3rem)]">
        <div className="p-6 border-b">
          <h2 className="text-xl md:text-2xl font-bold text-blue-600">Student Portal</h2>
        </div>
        <nav className="flex-1 p-4 space-y-3 overflow-y-auto">
          {[
            { href: "/application-portal/StatusChecker", label: "Admission Status" },
            { href: "/application-portal/Scholarship-criteria", label: "Scholarship Criteria" },
            { href: "/application-portal/addmisionform", label: "Admission Form" }, // updated
            { href: "/application-portal/Report-Issue", label: "Report Issue" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block p-2 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-sm md:text-base"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 space-y-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[300px] md:h-[360px] lg:h-[400px] rounded-2xl overflow-hidden shadow-lg"
        >
          <Image
            src="/images/student-dashboard.jpg"
            alt="Student Portal"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center p-4 md:p-6">
            <motion.h1
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4"
            >
              Welcome, <span className="text-blue-400">Student!</span>
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 max-w-xl md:max-w-2xl"
            >
              Manage your applications, check admission status, calculate scholarships, and submit forms — all in one place.
            </motion.p>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-white rounded-2xl p-4 shadow hover:shadow-lg transition-shadow duration-200"
            >
              <p className="text-sm md:text-base text-gray-500">{stat.title}</p>
              <p className="text-xl md:text-2xl font-bold text-gray-800 mt-2">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl p-4 shadow space-y-2">
          <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">
            Recent Activities
          </h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {activities.map((act, index) => (
              <li key={index}>{act}</li>
            ))}
          </ul>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl p-4 shadow space-y-2">
          <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">
            Notifications
          </h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {notifications.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <Link
            href="/application-portal/addmisionform" // updated
            className="bg-blue-600 text-white px-6 py-3 rounded-2xl shadow hover:bg-blue-700 transition-colors duration-200"
          >
            Apply Now
          </Link>
          <Link
            href="/application-portal/StatusChecker"
            className="bg-green-600 text-white px-6 py-3 rounded-2xl shadow hover:bg-green-700 transition-colors duration-200"
          >
            Check Status
          </Link>
          <Link
            href="/application-portal/Scholarship-criteria"
            className="bg-purple-600 text-white px-6 py-3 rounded-2xl shadow hover:bg-purple-700 transition-colors duration-200"
          >
            Calculate Scholarship
          </Link>
          <Link
            href="/application-portal/Report-Issue"
            className="bg-red-600 text-white px-6 py-3 rounded-2xl shadow hover:bg-red-700 transition-colors duration-200"
          >
            Report Issue
          </Link>
        </div>
      </main>
    </div>
  );
}
