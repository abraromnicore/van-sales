import { X } from 'lucide-react';

type HeaderProps = {
  onHide: () => void;
  title: string
}

export const CustomDialogHeader = (props: HeaderProps) => {
  const { onHide, title } = props;
  return (
    <div
      className="flex items-center justify-between gap-2 border-b border-neutral-200 p-4 dark:border-neutral-800">
      <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
        {title}
      </h3>
      <button
        onClick={onHide}
        className="inline-flex items-center justify-center rounded-full p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};