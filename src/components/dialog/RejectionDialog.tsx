
import * as React from 'react';
import { CustomDialog } from '@components/dialog/CustomDialog';
import { CustomDialogBody } from '@components/dialog/CustomDialogBody';
import { InputControl } from '@components/forms/InputControl';
import { Button } from '@components/button/Button';
import { useForm } from 'react-hook-form';

type RejectionDialogProps = {
  visible: boolean;
  onHide: () => void;
  onSubmit: (reason: string) => void;
  title?: string;
  label?: string;
  placeholder?: string;
};

export const RejectionDialog: React.FC<RejectionDialogProps> = (
  { visible, onHide, onSubmit, label = 'Rejection Reason', placeholder = 'Write a Reason of Rejection',
                                                                }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      reasonOfRejection: '',
    },
  });

  const handleClose = () => {
    reset();
    onHide();
  };

  const handleFormSubmit = (data: { reasonOfRejection: string }) => {
    onSubmit(data.reasonOfRejection);
    reset();
    onHide();
  };

  return (
    <CustomDialog size="sm" onHide={handleClose} visible={visible}>
      <CustomDialogBody>
        <InputControl
          control={control}
          label={label}
          name="reasonOfRejection"
          placeholder={placeholder}
          type="text"
          disabled={false}
          className="py-2"
        />
      </CustomDialogBody>
      <CustomDialogBody>
        <div className="flex flex-row gap-4">
          <Button label="Close" onClick={handleClose} />
          <Button label="Submit" onClick={handleSubmit(handleFormSubmit)} />
        </div>
      </CustomDialogBody>
    </CustomDialog>
  );
};