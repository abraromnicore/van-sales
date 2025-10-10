import { ConfirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';

type ConfirmDialogProps = {
  accept: (e) => void;
  reject: (e) => void;
}

export const CustomConfirmDialog = (props: ConfirmDialogProps) => {

  return (
    <>
      <ConfirmDialog
        group="headless"
        content={({ headerRef, contentRef, footerRef, hide, message }) => (
          <div className="flex flex-column align-items-center p-5 surface-overlay border-round">
            <div
              className="border-circle bg-primary inline-flex justify-content-center align-items-center h-6rem w-6rem -mt-8">
              <i className="pi pi-question text-5xl"></i>
            </div>
            <span className="font-bold text-2xl block mb-2 mt-4" ref={headerRef}>
              {message.header}
            </span>
            <p className="mb-0" ref={contentRef}>
              {message.message}
            </p>
            <div className="flex align-items-center gap-2 mt-4" ref={footerRef}>
              <Button
                label="Save"
                onClick={(event) => {
                  hide(event);
                }}
                className="w-8rem"
              ></Button>
              <Button
                label="Cancel"
                outlined
                onClick={(event) => {
                  hide(event);
                }}
                className="w-8rem"
              ></Button>
            </div>
          </div>
        )}
      />
    </>
  );
};