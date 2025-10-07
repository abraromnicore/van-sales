import { Dialog } from 'primereact/dialog';
import * as React from 'react';

type DialogOptions = {
  onHide: () => void;
  children?: React.ReactNode;
  visible: boolean;
}

export const DialogCard = (props: DialogOptions) => {
  const { onHide, visible, children } = props;
  const CardContent = () => (
    <div
      className="max-w-sm rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      {children}
    </div>
  );
  return (
    <Dialog visible={visible} onHide={onHide} modal={true} content={<CardContent />} />
  );
};