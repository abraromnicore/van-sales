// ConfirmDialogContext.tsx
import { createContext, useContext } from 'react';

export interface AppConfirmDialogOptions {
  visible?: boolean;
  message: string;
  header?: string;
  icon?: React.ReactNode;
  accept?: () => void;
  reject?: () => void;
  acceptLabel?: string;
  rejectLabel?: string;
  defaultFocus?: 'accept' | 'reject' | 'none';
}

export interface ConfirmDialogContextType {
  confirm: (options: AppConfirmDialogOptions) => void;
}

export const ConfirmDialogContext = createContext<ConfirmDialogContextType>({
  confirm: () => {
    throw new Error('ConfirmDialogContext used outside of provider');
  },
});

export const useConfirmDialog = (): ConfirmDialogContextType['confirm'] => {
  const context = useContext(ConfirmDialogContext);
  return context.confirm;
};