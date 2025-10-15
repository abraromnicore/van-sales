import { useRef } from 'react';
import { Button } from '@components/button/Button.tsx';
import { OverlayPanel } from 'primereact/overlaypanel';
import { ListFilter } from 'lucide-react';

export const FilterPanelOverlay = () => {
  const op = useRef<OverlayPanel | null>(null);

  return (
    <>
      <Button label={'Filters'} onClick={(e) => op.current?.toggle(e)} icon={<ListFilter />} />
      <OverlayPanel ref={op}>
        <img src={'https://primefaces.org/cdn/primereact/images/product/bamboo-watch.jpg'} alt="Bamboo Watch"></img>
      </OverlayPanel>
    </>

  );
};