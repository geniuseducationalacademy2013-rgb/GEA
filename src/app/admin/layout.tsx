import "@/app/globals.css";

export const metadata = {
  title: 'Admin Panel - Genius Educational Academy',
  description: 'Admin panel for managing website content',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-primary">Admin Panel</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/admin"
                className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium"
              >
                Dashboard
              </a>
              <a
                href="/admin/activities"
                className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium"
              >
                Activities
              </a>
              <a
                href="/admin/results"
                className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium"
              >
                Results
              </a>
              <a
                href="/"
                className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-500"
              >
                View Site
              </a>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
