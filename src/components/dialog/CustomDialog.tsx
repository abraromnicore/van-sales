import { Dialog } from 'primereact/dialog';

export const CustomDialog = (props) => {
  const { onHide, children } = props;
  return (
    <Dialog onHide={onHide} modal={true} content={children} />
  );
};