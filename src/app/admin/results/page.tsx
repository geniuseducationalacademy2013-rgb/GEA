"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, X, Trophy } from "lucide-react";

interface Result {
  id: number;
  student_name: string;
  percentage: string;
  year: string;
  description: string | null;
  image_url: string | null;
}

export default function AdminResultsPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingResult, setEditingResult] = useState<Result | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    student_name: "",
    percentage: "",
    year: "",
    description: "",
    image_url: "",
  });

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await fetch("/api/results");
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchResults();
        setFormData({
          student_name: "",
          percentage: "",
          year: "",
          description: "",
          image_url: "",
        });
        setShowForm(false);
      }
    } catch (error) {
      console.error("Error creating result:", error);
    }
  };

  const handleUpdate = async () => {
    if (!editingResult) return;
    try {
      const response = await fetch(`/api/admin/results/${editingResult.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingResult),
      });

      if (response.ok) {
        fetchResults();
        setEditingResult(null);
      }
    } catch (error) {
      console.error("Error updating result:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this result?")) return;
    try {
      const response = await fetch(`/api/admin/results/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchResults();
      }
    } catch (error) {
      console.error("Error deleting result:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Results</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-500"
        >
          <Plus className="w-4 h-4" />
          Add Topper
        </button>
      </div>

      {/* Add Result Form */}
      {showForm && (
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Topper</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student Name
                </label>
                <input
                  type="text"
                  value={formData.student_name}
                  onChange={(e) =>
                    setFormData({ ...formData, student_name: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Percentage
                </label>
                <input
                  type="text"
                  value={formData.percentage}
                  onChange={(e) =>
                    setFormData({ ...formData, percentage: e.target.value })
                  }
                  required
                  placeholder="e.g., 92%"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year/Batch
                </label>
                <input
                  type="text"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  required
                  placeholder="e.g., 2023"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  value={formData.image_url}
                  onChange={(e) =>
                    setFormData({ ...formData, image_url: e.target.value })
                  }
                  placeholder="Optional"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={2}
                placeholder="e.g., First topper in 10th board exam"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-500"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Results Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result) => (
            <div key={result.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              {editingResult?.id === result.id ? (
                <div className="p-4 space-y-3">
                  <input
                    type="text"
                    value={editingResult.student_name}
                    onChange={(e) =>
                      setEditingResult({ ...editingResult, student_name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  />
                  <input
                    type="text"
                    value={editingResult.percentage}
                    onChange={(e) =>
                      setEditingResult({ ...editingResult, percentage: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  />
                  <input
                    type="text"
                    value={editingResult.year}
                    onChange={(e) =>
                      setEditingResult({ ...editingResult, year: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  />
                  <input
                    type="text"
                    value={editingResult.image_url || ""}
                    onChange={(e) =>
                      setEditingResult({ ...editingResult, image_url: e.target.value })
                    }
                    placeholder="Image URL"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  />
                  <textarea
                    value={editingResult.description || ""}
                    onChange={(e) =>
                      setEditingResult({ ...editingResult, description: e.target.value })
                    }
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdate}
                      className="flex items-center gap-1 bg-primary text-white px-3 py-1 rounded-lg text-sm"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={() => setEditingResult(null)}
                      className="flex items-center gap-1 bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-sm"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {result.image_url ? (
                    <img
                      src={result.image_url}
                      alt={result.student_name}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <Trophy className="w-12 h-12 text-primary" />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold text-primary">
                        {result.percentage}
                      </span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => setEditingResult(result)}
                          className="p-1 text-gray-500 hover:text-primary"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(result.id)}
                          className="p-1 text-gray-500 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-800">{result.student_name}</h3>
                    <p className="text-sm text-gray-500">Batch {result.year}</p>
                    {result.description && (
                      <p className="text-sm text-gray-600 mt-2">{result.description}</p>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}

          {results.length === 0 && (
            <div className="col-span-full text-center py-12 bg-white rounded-xl">
              <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No results yet. Add your first topper!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
