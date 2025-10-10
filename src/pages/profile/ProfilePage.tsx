import { Card } from '@components/card/Card';
import { CardBody } from '@components/card/CardBody';
import { CardHeader } from '@components/card/CardHeader';
import { Mail, Phone, MapPin, AlertCircle } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const supervisor: any = {
    personalInfo: {
      id: 'SUP-001',
      employeeId: 'EMP-2024-089',
      firstName: 'Ahmed',
      lastName: 'Hassan',
      fullName: 'Ahmed Hassan',
      profilePicture: 'https://i.pravatar.cc/150?img=33',
      contactInfo: {
        Email: 'ahmed.hassan@company.com',
        Phone: '+92-300-1234567',
        emergencyContact: {
          name: 'Ayesha Hassan',
          relationship: 'Spouse',
          phone: '+92-333-9876543',
        },
      },
      address: {
        city: 'Lahore',
        country: 'Pakistan',
        postalCode: '54000',
      },
    },
    regionAndTerritory: {
      primaryRegion: {
        id: 'RGN-LHR-NORTH',
        name: 'Lahore North',
        code: 'LHR-N',
        headOffice: 'Gulberg Office',
      },
      settings: {
        emailNotifications: true,
        smsNotifications: true,
      },
    },
    userPreferences: {
      appearance: {
        theme: 'light',
        sidebarCollapsed: false,
      },
      localization: {
        language: 'en',
        secondaryLanguage: 'ur',
        timezone: 'Asia/Karachi',
        currency: 'PKR',
        measurementUnit: 'metric',
      },
    },
  };

  // Sample assigned teams data
  const assignedTeams = [
    { id: 'TM-001', name: 'Route A Drivers', members: 8, activeVans: 6 },
    { id: 'TM-002', name: 'Route B Drivers', members: 10, activeVans: 8 },
    { id: 'TM-003', name: 'Maintenance Team', members: 5, activeVans: 0 },
  ];

  return (
    <div>
      <div className="mb-6">
        {/* Profile Section */}
        <Card>
          <CardHeader title="Personal Information" />
          <CardBody>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <img
                src={
                  'https://www.shutterstock.com/image-vector/vector-design-avatar-dummy-sign-600nw-1290556063.jpg'
                }
                alt={supervisor.personalInfo.fullName}
                className="w-24 h-24 rounded-full object-cover"
              />
              {/* Info Section */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">
                  {supervisor.personalInfo.fullName}
                </h2>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {supervisor.personalInfo.employeeId}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Supervisor
                  </span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <Card>
              <CardHeader title="Contact Information" />
              <CardBody>
                <div className="bg-white rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-700">
                      <Mail className="w-5 h-5 mr-3 text-gray-400" />
                      <span>{supervisor.personalInfo.contactInfo.Email}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Phone className="w-5 h-5 mr-3 text-gray-400" />
                      <span>{supervisor.personalInfo.contactInfo.Phone}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                      <span>
                        {supervisor.personalInfo.address.city},{' '}
                        {supervisor.personalInfo.address.country} -{' '}
                        {supervisor.personalInfo.address.postalCode}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2 text-red-500" />
                      Emergency Contact
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">
                          {
                            supervisor.personalInfo.contactInfo.emergencyContact
                              .name
                          }
                        </span>
                        <span className="text-gray-500">
                          {' '}
                          (
                          {
                            supervisor.personalInfo.contactInfo.emergencyContact
                              .relationship
                          }
                          )
                        </span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {
                          supervisor.personalInfo.contactInfo.emergencyContact
                            .phone
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Assigned Teams */}
          <div>
            <Card>
              <CardHeader title="Assign Teams" />
              <CardBody>
                <div className="space-y-3">
                  {assignedTeams.map((team) => (
                    <div key={team.id}>
                      <Card>
                        <CardBody>
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {team.name}
                              </h4>
                              <p className="text-sm text-gray-500 mt-1">
                                Team ID: {team.id}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-600">
                                {team.members} Members
                              </p>
                              <p className="text-sm text-gray-600">
                                {team.activeVans} Active Vans
                              </p>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Region & Territory */}
          <div>
            <Card>
              <CardHeader title="Region & Territory" />
              <CardBody>
                {' '}
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Primary Region</p>
                    <p className="font-semibold text-gray-900">
                      {supervisor.regionAndTerritory.primaryRegion.name}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Code: {supervisor.regionAndTerritory.primaryRegion.code}
                    </p>
                    <p className="text-sm text-gray-600">
                      Office:{' '}
                      {supervisor.regionAndTerritory.primaryRegion.headOffice}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Notification Settings
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Email Notifications
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            supervisor.regionAndTerritory.settings
                              .emailNotifications
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {supervisor.regionAndTerritory.settings
                            .emailNotifications
                            ? 'Enabled'
                            : 'Disabled'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          SMS Notifications
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            supervisor.regionAndTerritory.settings
                              .smsNotifications
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {supervisor.regionAndTerritory.settings
                            .smsNotifications
                            ? 'Enabled'
                            : 'Disabled'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* User Preferences */}
          <div>
            <Card>
              <CardHeader title="Preferences" />
              <CardBody>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Language</span>
                    <span className="text-sm font-medium text-gray-900 uppercase">
                      {supervisor.userPreferences.localization.language}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Timezone</span>
                    <span className="text-sm font-medium text-gray-900">
                      {supervisor.userPreferences.localization.timezone}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Currency</span>
                    <span className="text-sm font-medium text-gray-900">
                      {supervisor.userPreferences.localization.currency}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Theme</span>
                    <span className="text-sm font-medium text-gray-900 capitalize">
                      {supervisor.userPreferences.appearance.theme}
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
