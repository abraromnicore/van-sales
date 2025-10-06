
interface SubmitButtonProps {
  isSubmitting: boolean;
  isEditMode: boolean;
  disabled?: boolean;
  className?: string;
  type?: 'submit' | 'button' | 'reset';
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isSubmitting,
  isEditMode,
  disabled = false,
  className = '',
  type = 'submit'
}) => {
  return (
    <button
      type={type}
      disabled={disabled || isSubmitting}
      className={`px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isSubmitting ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          {isEditMode ? 'Updating...' : 'Creating...'}
        </div>
      ) : (
        isEditMode ? 'Update' : 'Create'
      )}
    </button>
  );
};

export default SubmitButton;