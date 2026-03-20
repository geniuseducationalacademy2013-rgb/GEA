import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShoppingBag, BookOpen, Shirt, Briefcase } from "lucide-react";

const notes = [
  {
    name: "Physics",
    image: "/content/Merchandise/notes/physics/physics.jpeg",
    description: "Comprehensive physics notes for all standards"
  },
  {
    name: "Chemistry",
    image: "/content/Merchandise/notes/chemistry/chemistry.jpeg",
    description: "Detailed chemistry notes with practical examples"
  },
  {
    name: "Biology",
    image: "/content/Merchandise/notes/biology/biology.jpeg",
    description: "Complete biology notes with diagrams"
  },
  {
    name: "Mathematics and Statistics – I",
    image: "/content/Merchandise/notes/Mathematics and Statistics – I/Mathematics and Statistics – I.jpeg",
    description: "Mathematics and Statistics notes for Part I"
  },
  {
    name: "Mathematics and Statistics – II",
    image: "/content/Merchandise/notes/Mathematics and Statistics – II/Mathematics and Statistics – II.jpeg",
    description: "Mathematics and Statistics notes for Part II"
  }
];

export default function MerchandisePage() {
  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Merchandise</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get personalized study materials, bags, and uniforms exclusively designed for Genius Educational Academy students.
          </p>
        </div>
      </section>

      {/* Personalized Notes Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold">Study Materials</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Personalized Notes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Subject-wise comprehensive notes prepared by our expert faculty for better understanding and exam preparation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {notes.map((note, index) => (
              <div key={index} className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="overflow-hidden bg-white">
                  <img
                    src={note.image}
                    alt={note.name}
                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">{note.name}</h3>
                  <p className="text-gray-600 text-sm">{note.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personalized Bags Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
              <Briefcase className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold">Accessories</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Personalized Bags</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              High-quality bags with Genius Educational Academy branding. Perfect for carrying your books and study materials.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-8 text-center">
            <div className="max-w-md mx-auto mb-6">
              <img
                src="/content/Merchandise/bags/bags.png"
                alt="Personalized Bags"
                className="w-full h-auto object-contain"
              />
            </div>
            <p className="text-gray-600">
              Premium quality bags with the Genius Educational Academy logo. Available in various sizes and designs.
            </p>
          </div>
        </div>
      </section>

      {/* Personalized Uniforms Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
              <Shirt className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold">Apparel</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Personalized Uniforms</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <img
                src="/content/Merchandise/uniform_image.png"
                alt="Genius Educational Academy Uniform"
                className="w-full rounded-xl shadow-lg"
              />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Smart & Professional</h3>
              <p className="text-gray-600 mb-4">
                Our personalized uniforms are designed to create a sense of belonging and professionalism among students. 
                Made with high-quality fabric for comfort throughout the day.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  High-quality breathable fabric
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Genius Educational Academy branding
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Available in all sizes
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Durable and long-lasting
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Interested in Our Merchandise?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Contact us to order personalized notes, bags, or uniforms for your child.
          </p>
          <a
            href="/contact-us"
            className="inline-block bg-white text-primary font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
