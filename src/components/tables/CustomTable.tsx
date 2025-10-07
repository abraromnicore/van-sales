import { useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TieredMenu } from 'primereact/tieredmenu';
import type { MenuItem } from 'primereact/menuitem';
import { EllipsisVertical } from 'lucide-react';
import * as React from 'react';

export type ColumMeta = {
  field: string;
  header: string;
}

type TableProps = {
  columns: ColumMeta[];
  data: any[];
  menuModel?: MenuItem[]; // optional: tiered menu items passed in by consumer
}

export const CustomTable = (props: TableProps) => {
  const { columns, data, menuModel } = props;
  const menuRef = useRef<TieredMenu>(null);

  const handleMenuToggle = (event: React.MouseEvent) => {
    menuRef.current?.toggle(event);
  };

  return (
    <div className="card">
      {menuModel && (
        <TieredMenu ref={menuRef} model={menuModel} popup />
      )}
      <DataTable value={data} tableStyle={{ minWidth: '50rem' }} paginator rows={10} rowsPerPageOptions={[ 10, 25, 50]}>
        {columns.map((col: ColumMeta) => (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            headerClassName="px-4 py-2"
            bodyClassName="px-4 py-2"
          />
        ))}
        <Column
          header=""
          alignFrozen="right"
          body={() => (
            <button
              type="button"
              className="p-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
              onClick={(e) => handleMenuToggle(e)}
              aria-label="Row actions"
            >
              <EllipsisVertical className="w-5 h-5 text-gray-600" />
            </button>
          )}
          headerClassName="px-2 py-2"
          bodyClassName="px-2 py-2 text-right"
        />
      </DataTable>
    </div>
  );
};