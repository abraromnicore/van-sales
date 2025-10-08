type HeaderProps = {
  title: string
}

export const CardHeader = (props: HeaderProps) => {
  const { title } = props;
  return (
    <div
      className="flex items-center justify-between gap-2 border-b border-neutral-200 p-4 dark:border-neutral-800">
      <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
        {title}
      </h3>
    </div>
  );
};