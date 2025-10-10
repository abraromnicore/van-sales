import { confirmDialog } from 'primereact/confirmdialog';

type UseConfirmationDialogProps = {
  onConfirm: () => void;
  message: string;
  header: string;
  icon?: string;
};

export const useConfirmationDialog = () => {
  const showConfirmation = (
    { onConfirm, message, header, icon = 'pi pi-exclamation-triangle', }:
    UseConfirmationDialogProps) => {
    confirmDialog({
      message,
      header,
      icon,
      defaultFocus: 'accept',
      accept: onConfirm,
    });
  };

  return { showConfirmation };
};