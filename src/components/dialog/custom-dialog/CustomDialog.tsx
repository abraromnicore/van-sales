import { Dialog } from 'primereact/dialog';
import * as React from 'react';
import styled from 'styled-components';

// ========== STYLED COMPONENT ==========
const DialogContentContainer = styled.div`
    &.min-w-sm {
        min-width: 384px;
    }

    &.min-w-md {
        min-width: 448px;
    }

    &.min-w-lg {
        min-width: 672px;
    }

    &.min-w-xl {
        min-width: 896px;
    }

    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    overflow: hidden;
    background-color: white;
    border: 1px solid #e5e7eb;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    max-height: calc(100vh - 32px);

    &.full-screen {
        width: calc(100vw - 32px);
        height: calc(100vh - 32px);
        min-height: calc(100vh - 32px);
        position: relative;
        bottom: calc(32px / 2);
        border-radius: 0;
        border: none;
        display: grid;
        grid-template-rows: auto 1fr auto;
    }
`;

// ========== TYPES ==========
type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface DialogOptions {
  onHide: () => void;
  children?: React.ReactNode;
  visible: boolean;
  size?: DialogSize;
  dismissableMask?: boolean;
}

// ✅ Define the expected props for dialog child sections
interface CustomDialogSectionProps {
  size?: DialogSize;
}

// ========== COMPONENT ==========
export const CustomDialog: React.FC<DialogOptions> = ({
                                                        onHide,
                                                        visible,
                                                        children,
                                                        size = 'md',
                                                        dismissableMask = true,
                                                      }) => {
  const sizeClasses: Record<DialogSize, string> = {
    sm: 'min-w-sm',
    md: 'min-w-md',
    lg: 'min-w-lg',
    xl: 'min-w-xl',
    full: 'full-screen',
  };

  // ✅ Fix: typed cloneElement without "any"
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const childTypeName = (child.type as { name?: string })?.name ?? '';

      if (
        ['CustomDialogBody', 'CustomDialogHeader', 'CustomDialogFooter'].includes(
          childTypeName
        )
      ) {
        return React.cloneElement(
          child as React.ReactElement<CustomDialogSectionProps>,
          { size }
        );
      }
    }
    return child;
  });

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      modal
      dismissableMask={dismissableMask}
      closable={false}
      className={`!bg-transparent ${size === 'full' ? '!m-0 !p-0' : ''}`}
    >
      <DialogContentContainer
        className={`w-full mx-auto ${sizeClasses[size]} dark:border-neutral-800 dark:bg-neutral-900`}
      >
        {enhancedChildren}
      </DialogContentContainer>
    </Dialog>
  );
};