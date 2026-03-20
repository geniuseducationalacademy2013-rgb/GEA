"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Image, Video, Save, X, Activity as ActivityIcon } from "lucide-react";

interface ActivityMedia {
  id: number;
  type: string;
  url: string;
  thumbnail_url: string | null;
}

interface Activity {
  id: number;
  name: string;
  description: string | null;
  media: ActivityMedia[];
}

export default function AdminActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaType, setMediaType] = useState("image");
  const [mediaThumbnail, setMediaThumbnail] = useState("");

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await fetch("/api/activities");
      const data = await response.json();
      setActivities(data.activities || []);
    } catch (error) {
      console.error("Error fetching activities:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/admin/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchActivities();
        setFormData({ name: "", description: "" });
        setShowForm(false);
      }
    } catch (error) {
      console.error("Error creating activity:", error);
    }
  };

  const handleUpdate = async () => {
    if (!editingActivity) return;
    try {
      const response = await fetch(`/api/admin/activities/${editingActivity.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editingActivity.name,
          description: editingActivity.description,
        }),
      });

      if (response.ok) {
        fetchActivities();
        setEditingActivity(null);
      }
    } catch (error) {
      console.error("Error updating activity:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this activity?")) return;
    try {
      const response = await fetch(`/api/admin/activities/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchActivities();
      }
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  const handleAddMedia = async (activityId: number) => {
    if (!mediaUrl) return;
    try {
      const response = await fetch("/api/admin/activities/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activity_id: activityId,
          type: mediaType,
          url: mediaUrl,
          thumbnail_url: mediaThumbnail || null,
        }),
      });

      if (response.ok) {
        fetchActivities();
        setMediaUrl("");
        setMediaThumbnail("");
      }
    } catch (error) {
      console.error("Error adding media:", error);
    }
  };

  const handleDeleteMedia = async (mediaId: number) => {
    try {
      const response = await fetch(`/api/admin/activities/media/${mediaId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchActivities();
      }
    } catch (error) {
      console.error("Error deleting media:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Activities</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-500"
        >
          <Plus className="w-4 h-4" />
          Add Activity
        </button>
      </div>

      {/* Add Activity Form */}
      {showForm && (
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Activity</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Activity Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
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

      {/* Activities List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {activities.map((activity) => (
            <div key={activity.id} className="bg-white rounded-xl p-6 shadow-sm">
              {editingActivity?.id === activity.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editingActivity.name}
                    onChange={(e) =>
                      setEditingActivity({ ...editingActivity, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                  />
                  <textarea
                    value={editingActivity.description || ""}
                    onChange={(e) =>
                      setEditingActivity({ ...editingActivity, description: e.target.value })
                    }
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdate}
                      className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={() => setEditingActivity(null)}
                      className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{activity.name}</h3>
                      {activity.description && (
                        <p className="text-gray-600 mt-1">{activity.description}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingActivity(activity)}
                        className="p-2 text-gray-500 hover:text-primary"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(activity.id)}
                        className="p-2 text-gray-500 hover:text-red-500"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Media Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {activity.media.map((media) => (
                      <div key={media.id} className="relative group">
                        {media.type === "youtube" ? (
                          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                            <Video className="w-8 h-8 text-gray-400" />
                          </div>
                        ) : (
                          <img
                            src={media.url}
                            alt=""
                            className="w-full aspect-video object-cover rounded-lg"
                          />
                        )}
                        <button
                          onClick={() => handleDeleteMedia(media.id)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add Media Form */}
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Add Media</p>
                    <div className="flex flex-wrap gap-2">
                      <select
                        value={mediaType}
                        onChange={(e) => setMediaType(e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      >
                        <option value="image">Image</option>
                        <option value="youtube">YouTube</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Media URL"
                        value={mediaUrl}
                        onChange={(e) => setMediaUrl(e.target.value)}
                        className="flex-1 min-w-[200px] px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      />
                      {mediaType === "youtube" && (
                        <input
                          type="text"
                          placeholder="Thumbnail URL (optional)"
                          value={mediaThumbnail}
                          onChange={(e) => setMediaThumbnail(e.target.value)}
                          className="flex-1 min-w-[200px] px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        />
                      )}
                      <button
                        onClick={() => handleAddMedia(activity.id)}
                        disabled={!mediaUrl}
                        className="flex items-center gap-1 bg-primary text-white px-3 py-2 rounded-lg text-sm disabled:opacity-50"
                      >
                        <Plus className="w-4 h-4" />
                        Add
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}

          {activities.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl">
              <ActivityIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No activities yet. Add your first activity!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
