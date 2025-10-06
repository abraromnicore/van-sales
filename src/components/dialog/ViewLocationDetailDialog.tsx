import { useState } from "react";

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "./dialog";

import MapView from "../MapView"; // Adjust the import path as needed
import * as React from "react";

interface Location {
    _id?: string;
    name?: string;
    address?: string;
    latitude?: number;
    longitude?: number;
    description?: string;
}

interface ViewLocationDetailDialogProps {
    onClose?: () => void;
    setShowLocation:React.Dispatch<React.SetStateAction<boolean>>;
    showLocation?: boolean;

}

const ViewLocationDetailDialog: React.FC<ViewLocationDetailDialogProps> = ({
    onClose,
    setShowLocation,
    showLocation
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(showLocation ? true : false);
    const [serverError, setServerError] = useState<string>("");

    //   if (!location) return <div className="hidden" />;

    const handleDialogClose = (open: boolean) => {
        setShowLocation(false);
        setIsOpen(open);
        onClose?.();
        if (!open) {
            setServerError("");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
                <button
                    onClick={() => setIsOpen(true)}
                >
                    View Location
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl bg-white text-black p-6 rounded-xl">
                <DialogTitle>
                    <DialogDescription />
                </DialogTitle>

                <div className="bg-white rounded-2xl px-2  space-y-6">
                    {/* Location Information */}
                    <div className="grid grid-cols-1 gap-6">
                        {/* Map View */}
                        <div>
                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                                <MapView />
                            </div>
                        </div>
                    </div>

                    {/* Error Display */}
                    {serverError && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-sm text-red-600">{serverError}</p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ViewLocationDetailDialog;