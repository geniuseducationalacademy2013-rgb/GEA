"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Award, Users, BookOpen, Monitor, Wind, Video, UserCheck, FileText, Users2, Clock, MapPin, GraduationCap } from "lucide-react";

const features = [
  { icon: Monitor, title: "Digital Class Room", description: "Modern digital learning experience" },
  { icon: Users, title: "Highly Qualified Teachers", description: "Expert faculty for all subjects" },
  { icon: Wind, title: "AC Class Rooms", description: "Comfortable learning environment" },
  { icon: Video, title: "Under CCTV Security", description: "Safe and secure premises" },
  { icon: UserCheck, title: "Only 25 Students Per Batch", description: "Personal attention to each student" },
  { icon: FileText, title: "Weekly Test", description: "Regular assessment for improvement" },
  { icon: Users2, title: "Monthly Parents Meeting", description: "Regular parent-teacher interaction" },
  { icon: Clock, title: "Extra Study Hours", description: "Additional time for doubt clearing" },
];

function AboutUsPageContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const section = searchParams.get("section");
    if (section) {
      setTimeout(() => {
        const element = document.getElementById(section.toLowerCase().replace(/\s+/g, "-"));
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [searchParams]);

  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">About Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the journey of Genius Educational Academy - from humble beginnings to becoming a leading educational institution.
          </p>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about-us" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img
                src="/content/about_us_image/lifecycle_of_geniusClasses.jpeg"
                alt="Lifecycle of Genius Classes"
                className="w-full rounded-xl shadow-lg"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong className="text-gray-800">Genius Educational Academy</strong> was officially established in 2013, 
                  but our journey began in 2011 with just 5 students in a home setting.
                </p>
                <p>
                  As our teaching methods proved impressive, we grew year after year. We got our first topper in 10th board 
                  exam with <strong className="text-primary">92%</strong> - Ankita Jagtap, who is now a Doctor!
                </p>
                <p>
                  In 2013, we decided to enhance and explore Genius Educational Academy in a true manner. Today, we have:
                </p>
                <ul className="list-none space-y-2">
                  <li className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary" />
                    <span>Nearly <strong>200 students</strong></span>
                  </li>
                  <li className="flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    <span><strong>15 well-qualified teachers</strong></span>
                  </li>
                  <li className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <span>From <strong>std 6th to 12th Science</strong></span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-primary" />
                    <span><strong>All subjects under one roof</strong></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide the best learning environment with modern facilities and dedicated faculty.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
                <feature.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section id="founder" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Founder</h2>
          </div>
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 to-white rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-48 h-48 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                <img
                  src="/content/Founder/founder_img.jpeg"
                  alt="Founder - Jyoti Sandeep Labde"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Jyoti Sandeep Labde</h3>
                <p className="text-primary font-semibold mb-4">M.Sc. B.Ed</p>
                <div className="space-y-3 text-gray-600">
                  <p><strong className="text-gray-800">19 years</strong> of experience in the teaching field</p>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Subjects:</p>
                    <p><strong>School Section:</strong> Maths, Science</p>
                    <p><strong>College Section:</strong> Biology, Chemistry, Geography, EVS</p>
                  </div>
                  <p className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    <span><strong>Best Science Teacher Award</strong> in K.E.C.T.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Locations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Two convenient locations in Kamothe, Navi Mumbai for easy accessibility.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Address 1 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="h-64 bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.5!2d73.1!3d19.03!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDAxJzQ4LjAiTiA3M8KwMDYnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg text-gray-800 mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Address 1
                </h3>
                <p className="text-gray-600">
                  Shop No.1, Tulsi Avenue, Plot No.68, Sector-34, Kamothe, Navi Mumbai - 410209
                </p>
              </div>
            </div>

            {/* Address 2 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="h-64 bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.5!2d73.1!3d19.03!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDAxJzQ4LjAiTiA3M8KwMDYnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg text-gray-800 mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Address 2
                </h3>
                <p className="text-gray-600">
                  Shop No.5, Sai Pooja CHS, Plot No.36, Sector-34, Kamothe, Navi Mumbai - 410209
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function AboutUsPage() {
  return (
    <Suspense>
      <AboutUsPageContent />
    </Suspense>
  );
}
