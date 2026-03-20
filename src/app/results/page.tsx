"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Trophy, Award, Star } from "lucide-react";

// This will be dynamic from database
const defaultResults = [
  {
    id: 1,
    student_name: "Ankita Jagtap",
    percentage: "92%",
    year: "2013",
    description: "First topper in 10th board exam. Now a Doctor!",
    image_url: null,
  },
];

type Result = {
  id: number;
  student_name: string;
  percentage: string;
  year: string;
  description: string | null;
  image_url: string | null;
};

export default function ResultsPage() {
  const [results, setResults] = useState<Result[]>(defaultResults);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch("/api/results", { cache: "no-store" });
        const data = (await response.json()) as { results?: Result[] };
        if (data.results && data.results.length > 0) {
          setResults(data.results);
        }
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    void load();
  }, []);

  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Results</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Celebrating the achievements of our talented students. Our toppers make us proud!
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            <div>
              <p className="text-4xl font-bold">92%</p>
              <p className="text-white/80">Highest Score</p>
            </div>
            <div>
              <p className="text-4xl font-bold">100%</p>
              <p className="text-white/80">Pass Rate</p>
            </div>
            <div>
              <p className="text-4xl font-bold">50+</p>
              <p className="text-white/80">Distinction Holders</p>
            </div>
            <div>
              <p className="text-4xl font-bold">12+</p>
              <p className="text-white/80">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Toppers Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
              <Trophy className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold">Our Achievers</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Toppers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Students who have excelled in their board examinations and made us proud.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((result, index) => (
              <div
                key={result.id || index}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
              >
                {result.image_url ? (
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={result.image_url}
                      alt={result.student_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <Award className="w-24 h-24 text-primary" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-2xl font-bold text-primary">{result.percentage}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{result.student_name}</h3>
                  <p className="text-gray-500 text-sm mb-2">Batch {result.year}</p>
                  {result.description && (
                    <p className="text-gray-600 text-sm">{result.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pamphlets Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Result Pamphlets</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              View our annual result pamphlets showcasing our students' achievements.
            </p>
          </div>
          
          <div className="text-center py-12 bg-white rounded-xl">
            <Award className="w-16 h-16 text-primary mx-auto mb-4" />
            <p className="text-gray-600">Result pamphlets will be uploaded by admin.</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
