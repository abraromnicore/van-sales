type HeaderProps = {
  onHide: () => void;
  title: string
}

export const DialogHeader = (props: HeaderProps) => {
  const { onHide, title } = props;
  return (
    <div
      className="flex items-center justify-between gap-2 border-b border-neutral-200 p-4 dark:border-neutral-800">
      <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
        {title}
      </h3>
      <button
        onClick={onHide}
        className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Close
      </button>
    </div>
  );
};