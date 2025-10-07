import * as React from 'react';
import { useState } from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import { FaRegEye } from 'react-icons/fa';
import { RxAvatar } from 'react-icons/rx';
import { Calendar as CalendarIcon, Mail, Mars, Pencil, Trash2, User, UserCheck, UserX, Venus } from 'lucide-react';
import type { UserData } from '../../../components/dialog/CreateUserDialog';
import { DataTable } from '@components/tables/data-table.tsx';

// Types
interface UserId {
  _id: string;
  email: string;
  status: 'active' | 'inactive';
}

interface ProfilePic {
  url: string;
}

export interface Student {
  _id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | string;
  profilePic?: ProfilePic;
  userId: UserId;
}

// Header formatting utility
const headerFormatting = (title: string) => (
  <div className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
    {title}
  </div>
);

// Student columns definition
export const columns: ColumnDef<UserData>[] = [
  {
    accessorKey: 'profilePic',
    header: () => headerFormatting('Avatar'),
    cell: ({ row }) => {
      const url = row.original.profilePic?.url;
      return url ? (
        <img
          src={url}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <RxAvatar className="w-10 h-10 text-neutral-400" />
      );
    },
  },
  {
    accessorKey: 'loaderId',
    header: () => headerFormatting('ID'),
    cell: ({ getValue }) => (
      <span className="font-semibold text-blue-700">{getValue() as string || '-'}</span>
    ),
  },
  {
    accessorKey: 'name', // or 'fullName'
    header: () => headerFormatting('Name'),
    cell: ({ row }) => {
      const firstName = row.original.firstName || '';
      const lastName = row.original.lastName || '';
      const fullName = `${firstName} ${lastName}`.trim();

      return (
        <span className="font-semibold text-gray-800">
        {fullName || '-'}
      </span>
      );
    },
  },
  {
    accessorKey: 'userId.email',
    id: 'email',
    header: () => headerFormatting('Email'),
    cell: ({ row }) => (
      <span className="flex items-center gap-2 text-blue-600 font-medium">
        <Mail className="w-4 h-4" />
        {row.original.userId?.email || '-'}
      </span>
    ),
  },
  {
    accessorKey: 'dateOfBirth',
    id: 'dateOfBirth',
    header: () => headerFormatting('Date of Birth'),
    cell: ({ getValue }) => {
      const value = getValue() as string;
      if (!value) return '-';
      const date = new Date(value);
      return (
        <span className="flex items-center gap-2 text-gray-700">
          <CalendarIcon className="w-4 h-4 text-blue-400" />
          {date.toLocaleDateString()}
        </span>
      );
    },
  },
  {
    accessorKey: 'userId.status',
    id: 'status',
    header: () => headerFormatting('Status'),
    cell: ({ row }) => {
      const status = row.original.userId?.status;
      if (status === 'active') {
        return (
          <span
            className="bg-green-100 text-green-700 px-2 py-1 rounded capitalize text-xs font-semibold flex items-center gap-1 w-fit">
            <UserCheck className="w-3 h-3" /> Active
          </span>
        );
      } else if (status === 'inactive') {
        return (
          <span
            className="bg-red-100 text-red-700 px-2 py-1 rounded capitalize text-xs font-semibold flex items-center gap-1 w-fit">
            <UserX className="w-3 h-3" /> Inactive
          </span>
        );
      } else {
        return <span className="capitalize">-</span>;
      }
    },
  },
  {
    accessorKey: 'gender',
    id: 'gender',
    header: () => headerFormatting('Gender'),
    cell: ({ getValue }) => {
      const value = (getValue() as string || '').toLowerCase();
      if (value === 'male') {
        return (
          <span
            className="bg-blue-100 text-blue-700 px-2 py-1 rounded capitalize text-xs font-semibold flex items-center gap-1 w-fit">
            <Mars className="w-3 h-3" /> Male
          </span>
        );
      } else if (value === 'female') {
        return (
          <span
            className="bg-pink-100 text-pink-700 px-2 py-1 rounded capitalize text-xs font-semibold flex items-center gap-1 w-fit">
            <Venus className="w-3 h-3" /> Female
          </span>
        );
      } else {
        return (
          <span
            className="bg-gray-100 text-gray-700 px-2 py-1 rounded capitalize text-xs font-semibold flex items-center gap-1 w-fit">
            <User className="w-3 h-3" />
            {value ? value.charAt(0).toUpperCase() + value.slice(1) : '-'}
          </span>
        );
      }
    },
  },
  {
    id: 'actions',
    header: () => headerFormatting('Actions'),
    cell: ({ row }) => {
      const [showDetails, setShowDetails] = useState(false);
      const [editLoader, setEditLoader] = useState<UserData | null>(null);

      const handleViewLoader = () => {
        setShowDetails(true);
        // Handle view student logic
      };

      const handleEditLoader = () => {
        setEditLoader(row.original);
        // Handle edit student logic
      };

      const handleDeleteLoader = () => {
        if (confirm(`Delete ${row.original.firstName} ${row.original.lastName}?`)) {
          console.log('Delete:', row.original);
          // Handle delete student logic
        }
      };

      return (
        <div className="flex items-center gap-2">
          <button
            onClick={handleViewLoader}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="View Details"
          >
            <FaRegEye size={16} className="w-4 h-4 text-gray-500" />
          </button>
          {
            showDetails && <ViewOtherDetailsDialog student={{
              _id: '1',
              studentId: 'DLB001',
              firstName: 'John',
              lastName: 'Doe',
              dateOfBirth: '2005-05-15',
              gender: 'male',

              profilePic: {
                url: 'https://api.dicebear.com/7.x/initials/svg?seed=John+Doe',
              },
              userId: {
                _id: 'user1',
                email: 'john.doe@school.edu',
                status: 'active',
              },
            }} showDetails={showDetails} setShowDetails={setShowDetails} />
          }

          <button
            onClick={handleEditLoader}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Edit Loader"
          >
            <Pencil className="w-4 h-4 text-gray-500" />
          </button>

          {
            editLoader && <CreateUserDialog userType="loader" user={editLoader} onClose={() => setEditLoader(null)}
                                            onSuccess={() => setEditLoader(null)} />
          }

          <button
            onClick={handleDeleteLoader}
            className="p-2 hover:bg-red-100 rounded-full transition-colors"
            title="Delete Student"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      );
    },
  },
];

// Filtered columns for different views
export const teacherColumns = columns.filter(
  (column) =>
    column.id !== 'actions' && column.id !== 'status' && column.id !== 'email',
);

export const pointColumns = columns.filter(
  (column) =>
    column.id !== 'actions' &&
    column.id !== 'status' &&
    column.id !== 'gender' &&
    column.id !== 'dateOfBirth',
);

// Example usage component
interface StudentTableProps {
  students: UserData[];
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  limit: number;
  setLimit: (limit: number) => void;
}

export const StudentTable: React.FC<StudentTableProps> = ({
                                                            students,
                                                            page,
                                                            setPage,
                                                            totalPages,
                                                            limit,
                                                            setLimit,
                                                          }) => {
  return (
    <DataTable
      columns={columns}
      data={students}
      page={page}
      setPage={setPage}
      totalPages={totalPages}
      limit={limit}
      setLimit={setLimit}
    />
  );
};

