import { Dialog } from 'primereact/dialog';
import * as React from 'react';
import styled from 'styled-components';

// ✅ Styled container handles width + layout
const DialogContentContainer = styled.div`
    &.min-w-sm { min-width: 384px; }
    &.min-w-md { min-width: 448px; }
    &.min-w-lg { min-width: 672px; }
    &.min-w-xl { min-width: 896px; }

    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    overflow: hidden;
    background-color: white;
    border: 1px solid #e5e7eb;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    /* ✅ Default dialogs (non-full) */
    max-height: calc(100vh - 32px);

    /* ✅ Scrollable only when needed */
    overflow: hidden;

    /* ✅ Fullscreen special case */
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

type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

type DialogOptions = {
  onHide: () => void;
  children?: React.ReactNode;
  visible: boolean;
  size?: DialogSize;
};

export const CustomDialog = ({ onHide, visible, children, size = 'md' }: DialogOptions) => {
  // ✅ Tailwind-style size mapping
  const sizeClasses: Record<DialogSize, string> = {
    sm: 'min-w-sm',
    md: 'min-w-md',
    lg: 'min-w-lg',
    xl: 'min-w-xl',
    full: 'full-screen', // special class handled above
  };

  // ✅ Automatically pass size prop to body/header/footer
  const enhancedChildren = React.Children.map(children, (child) => {
    if (
      React.isValidElement(child) &&
      ['CustomDialogBody', 'CustomDialogHeader', 'CustomDialogFooter'].includes(
        (child.type as any)?.name
      )
    ) {
      return React.cloneElement(child, { size });
    }
    return child;
  });

  const CardContent = () => (
    <DialogContentContainer
      className={`w-full mx-auto ${sizeClasses[size]} dark:border-neutral-800 dark:bg-neutral-900`}
    >
      {enhancedChildren}
    </DialogContentContainer>
  );

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      modal
      dismissableMask
      closable={false}
      className={`!bg-transparent ${size === 'full' ? '!m-0 !p-0' : ''}`}
      content={<CardContent />}
    />
  );
};