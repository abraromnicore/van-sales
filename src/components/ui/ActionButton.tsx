import { Plus, Pencil } from "lucide-react";

interface ActionButtonProps {
  isEditMode?: boolean;
  onClick: () => void;
  className?: string;
  label?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  isEditMode = false,
  onClick,
  className = "",
  label = "Button",
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${!isEditMode ? "bg-blue-500 text-white" : "text-gray-500"} px-4 py-2 text-sm rounded-lg flex items-center ${!isEditMode && "gap-2"} disabled:opacity-50 ${className}`}
    >
      {isEditMode ? (
        <Pencil className="w-4 h-4" />
      ) : (
        <Plus className="w-4 h-4" />
      )}
      <span>{isEditMode ? `` : `${label}`}</span>
    </button>
  );
};

export default ActionButton;