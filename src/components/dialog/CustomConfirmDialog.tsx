// CustomConfirmDialog.tsx
import React, { useCallback, useState } from 'react';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { type AppConfirmDialogOptions, ConfirmDialogContext } from '@context/ConfirmDialogContext';
import styled from 'styled-components';
import { Button } from '@components/button/Button.tsx';

const DialogContentContainer = styled.div`
    width: 360px;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
    padding: 16px;
    border-radius: 16px;
    background-color: #fff;

    .dialog-card-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 24px;
        
        .icon-container {
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background-color: #00000010;
            
            svg {
                width: 24px;
                height: 24px;
            }
            
        }

        .header-title {
            font-size: 20px;
            font-weight: 500;
        }

    }

    .dialog-card-body {
        
        p {
            font-size: 14px;
            line-height: 24px;
            text-align: center;
        }
        
    }

    .dialog-card-footer {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
        width: 100%;
    }

`;

const CustomDialogContentUI = (props: any) => {
  const { headerRef, dialogOptions, contentRef, footerRef, onAccept, onReject } = props;
  return (
    <DialogContentContainer>
      <div className="dialog-card-header">
        <div className="icon-container">
          {dialogOptions?.icon}
        </div>
        <div className="header-title" ref={headerRef}>
          {dialogOptions?.header ?? 'Confirmation'}
        </div>
      </div>
      <div className="dialog-card-body">
        <p className="mb-0" ref={contentRef as React.RefObject<HTMLParagraphElement>}>
          {dialogOptions?.message}
        </p>
      </div>
      <div className="dialog-card-footer" ref={footerRef as React.RefObject<HTMLDivElement>}>
        <Button
          label={dialogOptions?.rejectLabel ?? 'Cancel'}
          variant={'ghost'}
          onClick={onReject}
          className="w-8rem"
        />
        <Button variant={'warning'} label={dialogOptions?.acceptLabel ?? 'Accept'} onClick={onAccept}
                className="w-8rem" />
      </div>
    </DialogContentContainer>
  );
};

export const CustomConfirmDialog = ({ children }: { children: React.ReactNode }) => {
  const [dialogOptions, setDialogOptions] = useState<AppConfirmDialogOptions | null>(null);

  const confirm = useCallback((options: AppConfirmDialogOptions) => {
    setDialogOptions({
      ...options,
      visible: true,
    });
  }, []);

  const hideDialog = () => {
    setDialogOptions((prev) => (prev ? { ...prev, visible: false } : prev));
  };

  const onAccept = () => {
    dialogOptions?.accept?.();
    hideDialog();
  };

  const onReject = () => {
    dialogOptions?.reject?.();
    hideDialog();
  };

  return (
    <ConfirmDialogContext.Provider value={{ confirm }}>
      {children}

      <ConfirmDialog
        visible={!!dialogOptions?.visible}
        onHide={hideDialog}
        message={dialogOptions?.message}
        header={dialogOptions?.header ?? 'Confirmation'}
        acceptLabel={dialogOptions?.acceptLabel ?? 'Accept'}
        rejectLabel={dialogOptions?.rejectLabel ?? 'Cancel'}
        accept={onAccept}
        reject={onReject}
        defaultFocus={dialogOptions?.defaultFocus ?? 'accept'}
        content={({ headerRef, contentRef, footerRef }) =>
          <CustomDialogContentUI
            headerRef={headerRef}
            dialogOptions={dialogOptions}
            contentRef={contentRef}
            footerRef={footerRef}
            onAccept={onAccept}
            onReject={onReject} />}
      />
    </ConfirmDialogContext.Provider>
  );
};