"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileSearch, MessageCircle, Phone, School } from "lucide-react";
import { motion } from "framer-motion";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function StudentPortalHomepage() {
  const [appId, setAppId] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const sliderRef = useRef<Slider>(null);

  const handleLogin = () => {
    alert("Login functionality is disabled in this demo.");
  };

  const handleCheckStatus = async () => {
    if (!appId.trim()) return setStatus("Please enter an Application ID");
    setStatus("Checking...");
    setTimeout(() => {
      setStatus(appId === "12345" ? "✅ Accepted" : "⏳ Under Review");
    }, 600);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    fade: true,
  };

  const schoolImages = [
    "/images/hero.jpg",
    "/images/prog-arts.jpeg",
    "/images/prog-it.jpeg",
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (sliderRef.current) {
        sliderRef.current.slickNext();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* HERO FULL BACKGROUND SLIDER */}
      <section className="relative w-full h-[90vh] overflow-hidden">
        <Slider ref={sliderRef} {...sliderSettings} className="h-full">
          {schoolImages.map((src, idx) => (
            <div key={idx} className="relative w-full h-[90vh]">
              <Image
                src={src}
                alt={`School Slide ${idx + 1}`}
                fill
                priority={idx === 0}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          ))}
        </Slider>

        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
              Transform Your School Into a Digital-First Institution
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-200 drop-shadow">
              Showcase real success, simplify admissions, and guide every
              student from application to career—on one platform.
            </p>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-800"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Trusted by Students, Backed by Results
          </motion.h2>
          <motion.p
            className="mt-4 text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join thousands of learners who have already transformed their future
            with us. Our track record proves we’re more than just an institution
            — we’re a launchpad for success.
          </motion.p>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Students Enrolled", value: "10,000+" },
              { label: "Growth in Admissions", value: "65%" },
              { label: "Academic Partners", value: "25+" },
              { label: "Less Processing Time", value: "80%" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-2xl shadow p-6"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl font-extrabold text-indigo-600">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm font-medium text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE ARE SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-700">
              Who We Are
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              We’re dedicated to helping schools and colleges showcase their
              strengths online. Our platform blends modern design with powerful
              admission tools, making education more accessible and efficient
              for students, parents, and institutions alike.
            </p>
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Uncover More →
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative w-full h-80 md:h-[400px] rounded-2xl overflow-hidden shadow-lg"
          >
            <Image
              src="/images/download.jpg"
              alt="Who We Are"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* PATHWAY TO SUCCESS SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-indigo-700"
          >
            Your Pathway to Success
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 text-gray-600 max-w-2xl mx-auto"
          >
            Choose from school-level programs designed to guide you step by step —
            from classroom learning to future opportunities.
          </motion.p>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Science & Technology", img: "/images/prog-it.jpeg" },
              { title: "Business & Commerce", img: "/images/prog-biz.jpeg" },
              { title: "Arts & Creativity", img: "/images/prog-arts.jpeg" },
              { title: "Engineering Basics", img: "/images/prog-eng.jpeg" },
            ].map((program, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="relative w-full h-56 md:h-64 rounded-xl overflow-hidden shadow-lg group"
              >
                <Image
                  src={program.img}
                  alt={program.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-lg md:text-xl font-bold text-white drop-shadow-lg">
                    {program.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VIEW ROADMAP BUTTON */}
      <div className="mt-12 flex justify-center">
        <motion.a
          href="#roadmap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="px-8 py-3 rounded-full bg-indigo-600 text-white font-semibold 
                     shadow-md hover:bg-indigo-700 transition-colors"
        >
          View Roadmap
        </motion.a>
      </div>

      {/* HEAR FROM OUR STUDENTS SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-indigo-700"
          >
            Hear From Our Students
          </motion.h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Our alumni and students share how our programs shaped their careers 
            and opened new opportunities.
          </p>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Mohammad Salman Faiz",
                quote:
                  "The admission process was smooth, and I quickly found an internship through campus connections.",
                img: "/images/testimonial-2.jpeg",
              },
              {
                name: "Danny Millis",
                quote:
                  "The interactive roadmaps helped me plan my career path step by step — super easy to follow.",
                img: "/images/testimonial-1.jpeg",
              },
              {
                name: "Hamza Malik",
                quote:
                  "I showcased my final year project in the portfolio and got noticed by industry recruiters.",
                img: "/images/testimonial-3.jpeg",
              },
            ].map((student, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="relative h-80 rounded-xl overflow-hidden shadow-lg group"
              >
                <Image
                  src={student.img}
                  alt={student.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                  <h3 className="text-lg md:text-xl font-bold text-white drop-shadow-lg">
                    {student.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-200 italic max-w-xs">
                    "{student.quote}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT MAKES US DIFFERENT SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-700">
              What Makes Us Different
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We go beyond just building websites — we create digital platforms that
              simplify admissions, guide students, and showcase achievements.
            </p>
            <ul className="space-y-3">
              {[
                "Start Your Application",
                "Fast & Easy Admissions",
                "Career Guidance Tools",
                "Affordable & Scalable",
              ].map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-gray-700 font-medium"
                >
                  <span className="h-6 w-6 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-bold text-sm">
                    ✓
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              "/images/different-1.jpg",
              "/images/different-2.webp",
              "/images/different-3.jpg",
              "/images/different-4.jpg",
            ].map((src, idx) => (
              <div
                key={idx}
                className="relative w-full h-40 md:h-48 rounded-xl overflow-hidden shadow-md group"
              >
                <Image
                  src={src}
                  alt={`Different ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TAKE THE FIRST STEP SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden shadow-lg"
          >
            <Image
              src="/images/admissions.jpeg"
              alt="Admissions Open"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6 text-center md:text-left"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-700">
              Take the First Step Towards Success
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-md">
              Don’t wait — admissions are open. Apply now and begin your journey with us.
            </p>
            <Button
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 shadow-md transition"
            >
              Apply Now
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
