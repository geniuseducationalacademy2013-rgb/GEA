"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Send, CheckCircle, GraduationCap } from "lucide-react";

export default function AdmissionPage() {
  const [formData, setFormData] = useState({
    name: "",
    contact_details: "",
    subject: "",
    standard: "",
    board: "",
    location: "",
    school_name: "",
    last_year_percentage: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const buildWhatsAppMessage = () => {
    const lines = [
      "Admission Form",
      "",
      `Name: ${formData.name}`,
      `Phone: ${formData.contact_details}`,
      `Standard: ${formData.standard}`,
      `Board: ${formData.board}`,
      formData.subject ? `Subject: ${formData.subject}` : null,
      formData.location ? `Location: ${formData.location}` : null,
      formData.school_name ? `School Name: ${formData.school_name}` : null,
      formData.last_year_percentage ? `Last Year Percentage: ${formData.last_year_percentage}` : null,
    ].filter(Boolean);

    return lines.join("\n");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);

        const message = buildWhatsAppMessage();
        const waUrl = `https://wa.me/917045332855?text=${encodeURIComponent(message)}`;
        window.location.href = waUrl;

        setFormData({
          name: "",
          contact_details: "",
          subject: "",
          standard: "",
          board: "",
          location: "",
          school_name: "",
          last_year_percentage: "",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Admission</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join Genius Educational Academy and embark on your journey towards academic excellence.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-6">
              <GraduationCap className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">Expert Faculty</h3>
              <p className="text-gray-600 text-sm">15+ qualified teachers with years of experience</p>
            </div>
            <div className="p-6">
              <GraduationCap className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">All Subjects</h3>
              <p className="text-gray-600 text-sm">From 6th to 12th Science under one roof</p>
            </div>
            <div className="p-6">
              <GraduationCap className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">Personal Attention</h3>
              <p className="text-gray-600 text-sm">Only 25 students per batch</p>
            </div>
          </div>
        </div>
      </section>

      {/* Admission Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Admission Form</h2>
            
            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Application Submitted!</h3>
                <p className="text-gray-600">Thank you for your interest. We will contact you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors"
                      placeholder="Student Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="contact_details"
                      value={formData.contact_details}
                      onChange={handleChange}
                      required
                      pattern="[0-9]{10}"
                      maxLength={10}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors"
                      placeholder="Enter Phone Number"
                      title="Please enter a valid 10-digit phone number"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Standard *</label>
                    <select
                      name="standard"
                      value={formData.standard}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors"
                    >
                      <option value="">Select Standard</option>
                      {[6, 7, 8, 9, 10, 11, 12].map((std) => (
                        <option key={std} value={std}>{std}th</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Board *</label>
                    <select
                      name="board"
                      value={formData.board}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors"
                    >
                      <option value="">Select Board</option>
                      <option value="SSC">SSC</option>
                      <option value="CBSE">CBSE</option>
                      <option value="ICSE">ICSE</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors"
                      placeholder="Subjects interested in"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors"
                      placeholder="Enter your location"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">School Name</label>
                    <input
                      type="text"
                      name="school_name"
                      value={formData.school_name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors"
                      placeholder="Current School"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Year Percentage</label>
                    <input
                      type="text"
                      name="last_year_percentage"
                      value={formData.last_year_percentage}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors"
                      placeholder="e.g., 85%"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary-500 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
