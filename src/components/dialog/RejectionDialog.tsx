
import * as React from 'react';
import { CustomDialog } from '@components/dialog/custom-dialog/CustomDialog.tsx';
import { CustomDialogBody } from '@components/dialog/custom-dialog/CustomDialogBody.tsx';
import { InputControl } from '@components/forms/InputControl';
import { Button } from '@components/button/Button';
import { useForm } from 'react-hook-form';
import { CardHeader } from '@components/app-cards/card/CardHeader.tsx';

type RejectionDialogProps = {
  visible: boolean;
  onHide: () => void;
  onSubmit: (reason: string) => void;
  title?: string;
  label?: string;
  placeholder?: string;
};

export const RejectionDialog: React.FC<RejectionDialogProps> = ({ visible, onHide, onSubmit, label = 'Rejection Reason', placeholder = 'Write a Reason of Rejection',
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
  };

  return (
    <CustomDialog size="md" onHide={handleClose} visible={visible} dismissableMask = {false}>
      <CardHeader title={'Reason of Rejection'} />
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