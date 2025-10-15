import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';

// TypeScript interface for component props
interface OverlayPanelBoxProps {
  children?: React.ReactNode;
  header?: string | React.ReactNode;
  showCloseIcon?: boolean;
  dismissable?: boolean;
  closeOnEscape?: boolean;
  style?: React.CSSProperties;
  className?: string;
  onShow?: () => void;
  onHide?: () => void;
  appendTo?: any;
  [key: string]: any; // For other OverlayPanel props
}

// TypeScript interface for ref methods
export interface OverlayPanelBoxRef {
  toggle: (event: React.SyntheticEvent) => void;
  show: (event: React.SyntheticEvent) => void;
  hide: () => void;
  isVisible: () => boolean;
}

export const OverlayPanelBox = forwardRef<OverlayPanelBoxRef, OverlayPanelBoxProps>(({ children, header, showCloseIcon = true, dismissable = true, closeOnEscape = true, style = {}, className = '', onShow, onHide, appendTo = null, ...otherProps
                                                                                             }, ref) => {
  const overlayRef = useRef<any>(null);

  // Expose methods to parent via ref
  useImperativeHandle(ref, () => ({
    toggle: (event) => {
      overlayRef.current?.toggle(event);
    },
    show: (event) => {
      overlayRef.current?.show(event);
    },
    hide: () => {
      overlayRef.current?.hide();
    },
    isVisible: () => {
      return overlayRef.current?.isVisible() ?? false;
    }
  }));

  const handleShow = () => {
    onShow?.();
  };

  const handleHide = () => {
    onHide?.();
  };

  return (
    <>
      <style>{`
        .reusable-overlay .p-overlaypanel-close {
          background-color: #f3f4f6;
          border-radius: 50%;
          width: 2rem;
          height: 2rem;
          color: #6b7280;
          transition: all 0.2s;
        }

        .reusable-overlay .p-overlaypanel-close:hover {
          background-color: #e5e7eb;
          color: #374151;
        }
      `}</style>


    <OverlayPanel
      ref={overlayRef}
      showCloseIcon={showCloseIcon}
      dismissable={dismissable}
      closeOnEscape={closeOnEscape}
      onShow={handleShow}
      onHide={handleHide}
      style={style}
      className={`reusable-overlay ${className}`}
      appendTo={appendTo}
      {...otherProps}
    >
      {header && (
        <div className="mb-3 pb-2 border-bottom-1 surface-border">
          {typeof header === 'string' ? (
            <h3 className="m-0 text-xl font-semibold text-900">{header}</h3>
          ) : (
            header
          )}
        </div>
      )}
      <div className="reusable-overlay-content">
        {children}
      </div>
    </OverlayPanel>
    </>
  );
});
