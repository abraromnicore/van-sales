import { Dropdown } from 'primereact/dropdown';
import { ChevronDown } from 'lucide-react';

type Option = {
  label: string;
  value: string;
};

type CustomDropdownProps = {
  value: any;
  onChange: (value: any) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  showClear?: boolean;
  disabled?: boolean;
};

export const CustomDropdown = ({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  className = '',
  showClear = true,
  disabled = false,
}: CustomDropdownProps) => {
  return (
    <Dropdown
      value={value}
      options={options}
      onChange={(e) => onChange(e.value)}
      placeholder={placeholder}
      className={`w-60 border border-gray-300 rounded-lg px-3 py-0 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm ${className}`}
      panelClassName="rounded-lg border border-gray-200 shadow-lg"
      dropdownIcon={<ChevronDown size={20} className="text-gray-500" />}
      showClear={showClear}
      disabled={disabled}
    />
  );
};
