import { useState } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "./dialog";
import * as React from "react";

interface Student {
    _id?: string;
    studentId?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    gender?: string;
    profilePic?: {
        url?: string;
    };
    userId?: {
        _id?: string;
        email?: string;
        status?: string;
    };
}

interface ViewOtherDetailsDialogProps {
    student?: Student;
    onClose?: () => void;
    setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
    showDetails?: boolean;
}

const ViewOtherDetailsDialog: React.FC<ViewOtherDetailsDialogProps> = ({
    student,
    onClose,
    setShowDetails,
    showDetails
}) => {
    const [isOpen, setIsOpen] = useState(showDetails ? true : false);
    const [serverError, setServerError] = useState("");

    const handleDialogClose = (open: boolean) => {
        setShowDetails(false);
        setIsOpen(open);
        onClose?.();
        if (!open) {
            setServerError("");
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getStatusColor = (status?: string) => {
        switch (status?.toLowerCase()) {
            case 'active':
                return 'text-green-600 bg-green-50 border-green-200';
            case 'inactive':
                return 'text-red-600 bg-red-50 border-red-200';
            case 'pending':
                return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            default:
                return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                    onClick={() => setIsOpen(true)}
                >
                    View Details
                </button>
            </DialogTrigger>

            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl">
                <div className="space-y-6 p-6">
                    <div className="border-b border-gray-200 pb-4">
                        <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
                            User Details
                        </DialogTitle>
                        <DialogDescription className="text-gray-600">
                            Complete information about the selected user
                        </DialogDescription>
                    </div>

                    {/* Student Information */}
                    <div className="space-y-6">
                        {/* Profile Section */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                            <div className="flex items-center space-x-6">
                                <div className="flex-shrink-0">
                                    {student?.profilePic?.url ? (
                                        <img
                                            src={student.profilePic.url}
                                            alt={`${student.firstName} ${student.lastName}`}
                                            className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
                                        />
                                    ) : (
                                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                                            {student?.firstName?.[0]}{student?.lastName?.[0]}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                                        {student?.firstName} {student?.lastName}
                                    </h3>
                                    <p className="text-blue-600 font-medium mb-2">
                                        Student ID: {student?.studentId || "N/A"}
                                    </p>
                                    {student?.userId?.status && (
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(student.userId.status)}`}>
                                            <span className={`w-2 h-2 rounded-full mr-2 ${student.userId.status === 'active' ? 'bg-green-500' : student.userId.status === 'inactive' ? 'bg-red-500' : 'bg-yellow-500'}`}></span>
                                            {student.userId.status.charAt(0).toUpperCase() + student.userId.status.slice(1)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Personal Information */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Personal Information
                                </h4>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                            First Name
                                        </label>
                                        <p className="text-gray-900 font-medium text-lg">
                                            {student?.firstName || "N/A"}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                            Last Name
                                        </label>
                                        <p className="text-gray-900 font-medium text-lg">
                                            {student?.lastName || "N/A"}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                            Date of Birth
                                        </label>
                                        <p className="text-gray-900 font-medium text-lg">
                                            {formatDate(student?.dateOfBirth)}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                            Gender
                                        </label>
                                        <p className="text-gray-900 font-medium text-lg capitalize">
                                            {student?.gender || "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Account Information */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Account Information
                                </h4>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                            User ID
                                        </label>
                                        <p className="text-gray-900 font-medium text-lg font-mono bg-gray-50 px-3 py-2 rounded-lg">
                                            {student?.userId?._id || "N/A"}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                                            Email Address
                                        </label>
                                        <div className="flex items-center space-x-3">
                                            <p className="text-gray-900 font-medium text-lg">
                                                {student?.userId?.email || "N/A"}
                                            </p>
                                            {student?.userId?.email && (
                                                <a 
                                                    href={`mailto:${student.userId.email}`}
                                                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Error Display */}
                    {serverError && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-red-800 font-medium">{serverError}</p>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ViewOtherDetailsDialog;