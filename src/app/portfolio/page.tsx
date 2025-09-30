"use client";

import { useRef } from "react";
import Image from "next/image";
import { FaGraduationCap, FaUsers, FaAward, FaChalkboardTeacher } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Timeline data
const timelineData = [
  { year: "2010", title: "School Founded", description: "Opened its doors, welcoming the first batch of students.", img: "/images/hero.jpg" },
  { year: "2015", title: "First Graduating Class", description: "Our first students graduated successfully, setting the standard for excellence.", img: "/images/roadmap-3.jpeg" },
  { year: "2018", title: "New Science Lab", description: "State-of-the-art science labs were inaugurated to enhance practical learning.", img: "/images/science-lab.jpg" },
  { year: "2023", title: "Digital Learning Platform", description: "Introduced our school admission portal and e-learning tools for students.", img: "/images/prog-it.jpeg" },
];

// Achievements / Statistics data
const statsData = [
  { icon: <FaUsers size={40} className="text-blue-700" />, number: "1200+", label: "Students Enrolled" },
  { icon: <FaGraduationCap size={40} className="text-blue-700" />, number: "95%", label: "Graduation Success Rate" },
  { icon: <FaAward size={40} className="text-blue-700" />, number: "50+", label: "Awards Won" },
  { icon: <FaChalkboardTeacher size={40} className="text-blue-700" />, number: "80+", label: "Qualified Teachers" },
];

// Educational Events images
const eventsImages = ["/images/event-1.jpeg", "/images/event-2.jpeg", "/images/event-3.jpeg"];

// Voices of Success data
const testimonials = [
  { name: "Ali Khan", role: "Software Engineer", feedback: "The school prepared me exceptionally for my career. The guidance and encouragement I received were unmatched.", img: "/images/success1.jpg" },
  { name: "Sara Ahmed", role: "Doctor", feedback: "I cherish the experiences and teachers who shaped my ambitions. A place that truly nurtures potential.", img: "/images/success3.jpg" },
  { name: "Hassan Raza", role: "Entrepreneur", feedback: "The school's emphasis on creativity and leadership has been instrumental in my success.", img: "/images/success2.jpg" },
];

export default function HomePage() {
  const sliderMain = useRef<Slider | null>(null);
  const sliderNav = useRef<Slider | null>(null);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative w-full h-[80vh]">
        <Image src="/images/class.jpg" alt="School Hero" fill className="object-cover" priority />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.7)]">
            Your Journey to Excellence Begins Here
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-white drop-shadow-[1px_1px_3px_rgba(0,0,0,0.6)]">
            Shaping young minds for a brighter future
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Education Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
            <div className="space-y-12">
              {timelineData.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center md:justify-between ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="absolute left-1/2 transform -translate-x-1/2 bg-blue-700 text-white font-bold w-12 h-12 rounded-full flex items-center justify-center z-20 shadow-lg">{item.year}</div>
                  <div className="w-full md:w-1/3 h-48 relative rounded-lg overflow-hidden shadow-lg z-10 mt-6 md:mt-0">
                    <Image src={item.img} alt={item.title} fill className="object-cover" priority />
                  </div>
                  <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-lg mt-4 md:mt-0">
                    <h3 className="mt-2 text-xl font-bold">{item.title}</h3>
                    <p className="mt-1 text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements / Statistics Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Achievements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <div key={index} className="flex flex-col items-center justify-center bg-gray-50 rounded-lg shadow-lg p-6 text-center hover:scale-105 transform transition duration-300">
                <div className="mb-4">{stat.icon}</div>
                <h3 className="text-2xl font-bold text-blue-700">{stat.number}</h3>
                <p className="mt-2 text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Events Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 w-full">
              <Slider {...sliderSettings}>
                {eventsImages.map((img, index) => (
                  <div key={index} className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
                    <Image src={img} alt={`Event ${index + 1}`} fill className="object-cover rounded-lg" />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="md:w-1/2 w-full">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-700">Educational Events</h2>
              <p className="text-black text-lg md:text-xl">
                Participating in events such as science fairs, art exhibitions, and sports days
                helps students develop creativity, teamwork, and leadership skills. These
                experiences enrich their learning journey and shape well-rounded individuals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Voices of Success Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700 text-center mb-12">
            Voices of Success
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Left: Text Slider */}
            <div className="md:w-1/2 w-full">
              <Slider
                asNavFor={sliderNav.current ?? undefined}
                ref={(slider) => { sliderMain.current = slider ?? null; }}
                {...sliderSettings}
              >
                {testimonials.map((t, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-lg">
                    <p className="text-blue-600 italic mb-4">"{t.feedback}"</p>
                    <h3 className="font-bold text-blue-700">{t.name}</h3>
                    <p className="text-gray-500">{t.role}</p>
                  </div>
                ))}
              </Slider>
            </div>

            {/* Right: Image Slider */}
            <div className="md:w-1/2 w-full">
              <Slider
                asNavFor={sliderMain.current ?? undefined}
                ref={(slider) => { sliderNav.current = slider ?? null; }}
                {...sliderSettings}
              >
                {testimonials.map((t, index) => (
                  <div key={index} className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
                    <Image src={t.img} alt={t.name} fill className="object-cover rounded-lg" />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
      {/* Future Visions & Goals Section */}
<section className="py-20 bg-gray-50">
  <div className="container mx-auto px-6">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-700 text-center mb-12">
      Our Future Visions & Goals
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Goal 1 */}
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center hover:scale-105 transform transition duration-300">
        <FaGraduationCap size={50} className="text-blue-700 mb-4" />
        <h3 className="text-xl font-bold mb-2">Excellence in Education</h3>
        <p className="text-gray-600">
          Continuously improve our curriculum and teaching methods to ensure students achieve academic excellence.
        </p>
      </div>

      {/* Goal 2 */}
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center hover:scale-105 transform transition duration-300">
        <FaUsers size={50} className="text-blue-700 mb-4" />
        <h3 className="text-xl font-bold mb-2">Inclusive Community</h3>
        <p className="text-gray-600">
          Foster a supportive and inclusive environment where every student feels valued and empowered.
        </p>
      </div>

      {/* Goal 3 */}
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center hover:scale-105 transform transition duration-300">
        <FaAward size={50} className="text-blue-700 mb-4" />
        <h3 className="text-xl font-bold mb-2">Innovation & Leadership</h3>
        <p className="text-gray-600">
          Encourage creativity, critical thinking, and leadership to prepare students for future challenges.
        </p>
      </div>
    </div>
  </div>
</section>

    </main>
  );
}
