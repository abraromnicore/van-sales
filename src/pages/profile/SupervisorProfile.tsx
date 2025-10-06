import PageLayout from '@pages/layout/pageLayout';

// src/pages/SupervisorProfile.tsx
interface Supervisor {
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  avatar: string;
  bio: string;
}

const SupervisorProfile: React.FC = () => {
  const supervisor: Supervisor = {
    name: 'John Doe',
    role: 'Senior Supervisor',
    department: 'Operations',
    email: 'john.doe@example.com',
    phone: '+1 234 567 890',
    avatar: 'https://i.pravatar.cc/150?img=12',
    bio: 'Oversees daily operations, manages a team of 25 staff members, and ensures compliance with company policies.',
  };

  return (
    <div className="p-4">
      <PageLayout
        title="Supervisor Profile"
        description="View and manage supervisor details, contact information, and recent activity."
      >
        {/* Profile Card */}
        <div className="mx-auto bg-white rounded-2xl overflow-hidden">
          <div className="flex items-center p-6 border-b">
            <img
              src={supervisor.avatar}
              alt={supervisor.name}
              className="w-24 h-24 rounded-full object-cover mr-6 border"
            />
            <div>
              <h2 className="text-2xl font-bold">{supervisor.name}</h2>
              <p className="text-gray-600">{supervisor.role}</p>
              <p className="text-gray-500 text-sm">{supervisor.department}</p>
            </div>
          </div>

          {/* Info Section */}
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Contact Info</h3>
              <p className="text-gray-700">
                <span className="font-medium">Email:</span> {supervisor.email}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Phone:</span> {supervisor.phone}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <p className="text-gray-700">{supervisor.bio}</p>
            </div>
          </div>

          {/* Responsibilities / Activity Section */}
          <div className="p-6 border-t">
            <h3 className="text-lg font-semibold mb-3">Recent Activity</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Reviewed weekly performance reports</li>
              <li>Scheduled vans for different routes</li>
              <li>Approved Load requests</li>
            </ul>
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default SupervisorProfile;
