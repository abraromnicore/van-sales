import type { RoleType } from '@/types/um/roles/role.type.ts';
import { PERMISSIONS } from '@utils/constant/app.constant.ts';
import { AccordionTab } from 'primereact/accordion';
import { SwitchControl } from '@components/forms/SwitchControl.tsx';
import { CustomAccordion } from '@components/accordion/CustomAccordion.tsx';

type ViewRolePageProps = {
  selectedItem: RoleType | undefined;
}

export const ViewRolePage = (props: ViewRolePageProps) => {
  const { selectedItem } = props;

  if (!selectedItem) {
    return <></>;
  }

  return (
    <div className="grid grid-cols-1 grid-rows-1">
      <h2 className={'mb-4 flex flex-col items-start justify-center'}>
        <span className={'font-bold'}>Role Name: </span>
        <span>{selectedItem.roleName}</span>
      </h2>
      <hr className={'py-2'} />
      <div className={'flex flex-col items-start justify-center'}>
        <span className={'font-bold mb-4'}>Role Permissions: </span>
        <CustomAccordion className={'w-full'} multiple={true}
                         activeIndex={PERMISSIONS.map((_, index) => index)}>
          {PERMISSIONS.map((category, index) => (
            <AccordionTab key={index} header={category.label}>
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-3 font-medium text-gray-700 w-1/3">Permission</th>
                  <th className="text-left p-3 font-medium text-gray-700 w-2/3">Description</th>
                  <th className="text-center p-3 font-medium text-gray-700 w-24">Enabled</th>
                </tr>
                </thead>
                <tbody>
                {category.children.map((perm) => {
                  const isEnabled = selectedItem?.permissions?.[perm.key] ?? false;

                  return (
                    <tr
                      key={perm.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="p-3 text-gray-800 font-medium">{perm.label}</td>
                      <td className="p-3 text-gray-600">{perm.description}</td>
                      <td className="p-3 text-center">
                        <SwitchControl
                          name={`permissions.${perm.key}`}
                          value={isEnabled}       // ✅ pass actual permission value here
                          readOnly={true}          // ✅ view-only mode
                        />
                      </td>
                    </tr>
                  );
                })}
                </tbody>
              </table>
            </AccordionTab>
          ))}
        </CustomAccordion>
      </div>
    </div>
  );
};