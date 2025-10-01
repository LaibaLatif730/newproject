"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaGraduationCap, FaUsers, FaAward, FaChalkboardTeacher } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Data
const timelineData = [
  { year: "2010", title: "School Founded", description: "Opened its doors, welcoming the first batch of students.", img: "/images/hero.jpg" },
  { year: "2015", title: "First Graduating Class", description: "Our first students graduated successfully, setting the standard for excellence.", img: "/images/roadmap-3.jpeg" },
  { year: "2018", title: "New Science Lab", description: "State-of-the-art science labs were inaugurated to enhance practical learning.", img: "/images/science-lab.jpg" },
  { year: "2023", title: "Digital Learning Platform", description: "Introduced our school admission portal and e-learning tools for students.", img: "/images/prog-it.jpeg" },
];

const statsData = [
  { icon: <FaUsers size={40} />, number: "1200+", label: "Students Enrolled" },
  { icon: <FaGraduationCap size={40} />, number: "95%", label: "Graduation Success Rate" },
  { icon: <FaAward size={40} />, number: "50+", label: "Awards Won" },
  { icon: <FaChalkboardTeacher size={40} />, number: "80+", label: "Qualified Teachers" },
];

const testimonials = [
  { name: "Ali Khan", role: "Software Engineer", feedback: "The school prepared me exceptionally for my career. The guidance and encouragement I received were unmatched.", img: "/images/success1.jpg" },
  { name: "Sara Ahmed", role: "Doctor", feedback: "I cherish the experiences and teachers who shaped my ambitions. A place that truly nurtures potential.", img: "/images/success3.jpg" },
  { name: "Hassan Raza", role: "Entrepreneur", feedback: "The school's emphasis on creativity and leadership has been instrumental in my success.", img: "/images/success2.jpg" },
];

export default function HomePage() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 2, // show 2 timeline cards at once
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    autoplaySpeed: 3500,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  const heroSliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 3500,
  };

  return (
    <main className="overflow-hidden bg-white">
      {/* HERO */}
      <section className="relative h-[90vh] bg-gradient-to-r from-blue-900 via-purple-800 to-pink-700 text-white flex items-center">
        <div className="container mx-auto flex flex-col md:flex-row items-center px-6 gap-12">
          <motion.div
            className="md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
              Transforming <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-400">Education</span> Into Excellence
            </h1>
            <p className="mt-6 text-lg text-gray-200">
              Where innovation meets tradition to shape the leaders of tomorrow.
            </p>
          </motion.div>
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <Slider {...heroSliderSettings}>
              {timelineData.map((item, i) => (
                <div key={i} className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
                  <Image src={item.img} alt={item.title} fill className="object-cover" />
                  <div className="absolute bottom-0 inset-x-0 bg-black/50 p-4">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-sm">{item.year}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </motion.div>
        </div>
      </section>

      {/* TIMELINE WITH MILESTONES */}
<section className="py-24 bg-white relative">
  <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-900">
    Our Journey of <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Milestones</span>
  </h2>

  <div className="relative px-6">
    {/* Central Connecting Line */}
    <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-0"></div>

    <Slider {...sliderSettings}>
      {timelineData.map((item, i) => (
        <motion.div
          key={i}
          className="relative flex flex-col items-center z-10 px-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          viewport={{ once: true }}
        >
          {/* Year + Milestone Dot */}
          <div className="flex flex-col items-center mb-4">
            <span className="text-lg font-bold text-blue-700 mb-2">{item.year}</span>
            <div className="relative">
              {/* Outer Glow Pulse */}
              <span className="absolute inset-0 w-8 h-8 rounded-full bg-blue-400 opacity-40 animate-ping"></span>
              <div className="w-6 h-6 bg-white border-4 border-blue-600 rounded-full shadow-md relative z-10"></div>
            </div>
          </div>

          {/* Timeline Card */}
          <div className="mt-8 bg-gradient-to-br from-white to-blue-50 shadow-xl rounded-2xl p-6 w-80 border border-gray-200 hover:shadow-2xl transition-all">
            {/* Image (fixed aspect ratio, no cut-off) */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Title & Description */}
            <div className="mt-5 text-center">
              <h3 className="text-xl font-bold text-blue-800">{item.title}</h3>
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </Slider>
  </div>
</section>




      {/* STATS */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-purple-800 text-white">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">
          {statsData.map((stat, i) => (
            <motion.div
              key={i}
              className="bg-white/10 p-8 rounded-xl text-center backdrop-blur-lg shadow-xl hover:scale-110 transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-yellow-300 mb-4">{stat.icon}</div>
              <h3 className="text-3xl font-bold">{stat.number}</h3>
              <p className="text-gray-200">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-blue-50 to-purple-50 relative">
  <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-900">
    Voices of Success
  </h2>

  <Slider {...heroSliderSettings}>
    {testimonials.map((t, i) => (
      <motion.div
        key={i}
        className="flex justify-center px-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="relative bg-white p-8 max-w-xl rounded-2xl shadow-xl text-center hover:shadow-2xl transition transform hover:scale-105 flex flex-col items-center">

          {/* Profile Image */}
          <Image
            src={t.img}
            alt={t.name}
            width={140}
            height={140}
            className="rounded-full border-4 border-blue-600 shadow-md mb-6"
          />

          {/* Feedback */}
          <p className="italic text-gray-700 text-lg leading-relaxed px-4">
            “{t.feedback}”
          </p>

          {/* Name + Role */}
          <h3 className="mt-6 font-bold text-xl text-blue-800">{t.name}</h3>
          <p className="text-gray-500">{t.role}</p>

          {/* Decorative Stars */}
          <div className="flex justify-center gap-1 mt-3 text-yellow-400">
            ★★★★☆
          </div>
        </div>
      </motion.div>
    ))}
  </Slider>
</section>

     {/* FUTURE VISION */}
<section className="py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative">
  <div className="text-center mb-16">
    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
      Future <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Visions</span> & Goals
    </h2>
    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
      Shaping tomorrow’s leaders with innovation, inclusivity, and academic brilliance.
    </p>
  </div>

  <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
    {[
      { 
        icon: <FaGraduationCap size={40} />, 
        title: "Excellence in Education", 
        text: "Continuously improving curriculum, teaching standards, and academic opportunities to set new benchmarks." 
      },
      { 
        icon: <FaUsers size={40} />, 
        title: "Inclusive Community", 
        text: "Fostering a diverse and welcoming environment where every student feels supported and valued." 
      },
      { 
        icon: <FaAward size={40} />, 
        title: "Innovation & Leadership", 
        text: "Encouraging creativity, critical thinking, and leadership skills to empower global citizens of tomorrow." 
      },
    ].map((goal, i) => (
      <motion.div
        key={i}
        className="relative bg-gradient-to-br from-white to-blue-50 border border-gray-200 rounded-2xl p-10 shadow-xl hover:shadow-2xl transition-all text-center"
        whileHover={{ y: -12, scale: 1.05 }}
      >
        {/* Icon with Gradient Glow */}
        <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg mb-6">
          {goal.icon}
        </div>

        {/* Title */}
        <h3 className="font-bold text-xl text-blue-800">{goal.title}</h3>
        <p className="text-gray-600 mt-3 leading-relaxed">{goal.text}</p>

        {/* Glow hover effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/10 to-purple-400/10 opacity-0 hover:opacity-100 transition"></div>
      </motion.div>
    ))}
  </div>
</section>

    </main>
  );
}
