import * as React from 'react';
import { useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TieredMenu } from 'primereact/tieredmenu';
import type { MenuItem } from 'primereact/menuitem';
import { EllipsisVertical } from 'lucide-react';

export type ColumMeta = {
  field: string;
  header: string;
  body?: (rowData: any) => React.ReactNode;
  style?: React.CSSProperties;
}

type TableProps = {
  columns: ColumMeta[];
  data: any[];
  menuModel?: MenuItem[];
  setSelectedItem: (selectedItem: any) => void;
}

export const CustomTable = (props: TableProps) => {
  const { columns, data, menuModel, setSelectedItem } = props;
  const menuRef = useRef<TieredMenu>(null);

  const handleMenuToggle = (event: React.MouseEvent, row) => {
    menuRef.current?.toggle(event);
    setSelectedItem(row);
  };

  return (
    <div className="card">
      {menuModel && (
        <TieredMenu ref={menuRef} model={menuModel} popup />
      )}
      <DataTable value={data} tableStyle={{ minWidth: '50rem' }} paginator rows={10} rowsPerPageOptions={[10, 25, 50]}>
        {columns.map((col: ColumMeta) => (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            body={col.body}
            headerClassName="px-4 py-2"
            bodyClassName="px-4 py-2"
            style={col.style}
          />
        ))}
        {(menuModel && menuModel?.length > 0) && (<Column
          header=""
          alignFrozen="right"
          body={(row) => (
            <button
              type="button"
              className="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
              onClick={(e) => handleMenuToggle(e, row)}
              aria-label="Row actions"
            >
              <EllipsisVertical className="w-5 h-5 text-gray-600" />
            </button>
          )}
          headerClassName="px-2 py-2"
          bodyClassName="px-2 py-2 text-right"
        />)}
      </DataTable>
    </div>
  );
};