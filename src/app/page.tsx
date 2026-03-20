import Link from "next/link";
import { ArrowRight, Users, Award, BookOpen, MapPin, Trophy, ShoppingBag, CalendarCheck, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
import YouTubePlayer from "@/components/YouTubePlayer";
import QuickNeedsBanner from "@/components/QuickNeedsBanner";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="pt-20">
        <QuickNeedsBanner />
        <div className="mt-2">
          <HeroSlider />
        </div>
      </div>

      {/* Class Moments Video Section */}
      <section className="pt-8 pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Class Moments</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Experience the vibrant atmosphere of Genius Educational Academy</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <YouTubePlayer
              url="https://youtu.be/jzHvX4bTPNk"
              title="Class Moments"
              className="aspect-video"
            />
          </div>
        </div>
      </section>

      {/* About Summary */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">About Genius Educational Academy</h2>
              <p className="text-gray-600 mb-4">
                Established in 2013, Genius Educational Academy has been nurturing young minds from std 6th to 12th Science. 
                All subjects are provided under one roof with highly qualified teachers.
              </p>
              <p className="text-gray-600 mb-6">
                Starting with just 5 students in 2011, we now have nearly 200 students and 15 well-qualified teachers. 
                Our first topper, Ankita Jagtap, scored 92% in 10th board exams and is now a doctor!
              </p>
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-500 text-white font-semibold px-6 py-3 rounded-full transition-colors"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/10 p-6 rounded-xl text-center">
                <Users className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="text-3xl font-bold text-gray-800">200+</h3>
                <p className="text-gray-600 text-sm">Students</p>
              </div>
              <div className="bg-primary/10 p-6 rounded-xl text-center">
                <Award className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="text-3xl font-bold text-gray-800">15+</h3>
                <p className="text-gray-600 text-sm">Qualified Teachers</p>
              </div>
              <div className="bg-primary/10 p-6 rounded-xl text-center">
                <BookOpen className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="text-3xl font-bold text-gray-800">6th-12th</h3>
                <p className="text-gray-600 text-sm">Science</p>
              </div>
              <div className="bg-primary/10 p-6 rounded-xl text-center">
                <Trophy className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="text-3xl font-bold text-gray-800">12+</h3>
                <p className="text-gray-600 text-sm">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8 md:mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-start">
            {/* Video on Left */}
            <div className="flex justify-center">
              <div className="w-full max-w-xs md:max-w-sm">
                <YouTubePlayer
                  url="https://youtube.com/shorts/wPM77tbr_Hg"
                  title="Why Choose Genius"
                  className="aspect-[9/16]"
                />
              </div>
            </div>
            {/* Images on Right */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
              {[
                {
                  image: "/content/home_images/didgitalscreenandcctv.png",
                  title: "Digital Class Room & Under CCTV Security",
                },
                { image: "/content/home_images/highqualifiedteacher.png", title: "Highly Qualified Teachers" },
                { image: "/content/home_images/ac.png", title: "AC Class Rooms" },
                { image: "/content/home_images/25students.png", title: "Only 25 Students Per Batch" },
                { image: "/content/home_images/weeklytests.png", title: "Weekly Test" },
                { image: "/content/home_images/ptm.jpg", title: "Monthly Parents Meeting" },
                { image: "/content/home_images/extrahours.png", title: "Extra Study Hours" },
              ].map((feature, index) => (
                <div key={index} className="text-center flex flex-col items-center">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-16 h-16 sm:w-24 sm:h-24 md:w-36 md:h-36 object-contain"
                  />
                  <h3 className="mt-2 text-[11px] sm:text-sm font-semibold text-gray-800 leading-tight">{feature.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">Explore More</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Link href="/merchandise" className="group bg-gradient-to-br from-primary to-primary-500 p-6 rounded-xl text-white hover:shadow-lg transition-all">
              <ShoppingBag className="w-10 h-10 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Merchandise</h3>
              <p className="text-white/80 text-sm">Personalized Bags, Notes, Uniforms</p>
            </Link>
            <Link href="/activities" className="group bg-gradient-to-br from-primary to-primary-500 p-6 rounded-xl text-white hover:shadow-lg transition-all">
              <CalendarCheck className="w-10 h-10 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Activities</h3>
              <p className="text-white/80 text-sm">Picnics, Events, Celebrations</p>
            </Link>
            <Link href="/results" className="group bg-gradient-to-br from-primary to-primary-500 p-6 rounded-xl text-white hover:shadow-lg transition-all">
              <Trophy className="w-10 h-10 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Results</h3>
              <p className="text-white/80 text-sm">Our Toppers & Achievements</p>
            </Link>
            <Link href="/admission" className="group bg-gradient-to-br from-primary to-primary-500 p-6 rounded-xl text-white hover:shadow-lg transition-all">
              <FileText className="w-10 h-10 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Admission</h3>
              <p className="text-white/80 text-sm">Join Genius Academy Today</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Location Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Locations</h2>
            <p className="text-gray-600">Two convenient locations in Kamothe, Navi Mumbai</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Address 1</h3>
              <p className="text-gray-600">Shop No.1, Tulsi Avenue, Plot No.68, Sector-34, Kamothe, Navi Mumbai - 410209</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <MapPin className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Address 2</h3>
              <p className="text-gray-600">Shop No.5, Sai Pooja CHS, Plot No.36, Sector-34, Kamothe, Navi Mumbai - 410209</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
