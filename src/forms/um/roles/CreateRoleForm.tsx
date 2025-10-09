import { SwitchControl } from '@components/forms/SwitchControl.tsx';
import { InputControl } from '@components/forms/InputControl.tsx';
import { PERMISSIONS } from '@utils/constant/app.constant.ts';
import { AccordionTab } from 'primereact/accordion';
import { CustomAccordion } from '@components/accordion/CustomAccordion.tsx';
import { useAppToast } from '@hooks/common/useAppToast.ts';
import { confirmDialog } from 'primereact/confirmdialog';
import { useNavigate } from 'react-router-dom';
import { ROLES_ROUTE } from '@utils/constant/app-route.constants.ts';
import { Button } from '@components/button/Button.tsx';

type UpdateRoleFormProps = {
  control: any;
  submitHandler: (e) => void;
  isValid: boolean;
}

export const CreateRoleForm = (props: UpdateRoleFormProps) => {
  const navigate = useNavigate();
  const { control, submitHandler, isValid } = props;
  const { showError } = useAppToast();

  const onSubmit = (e: any) => {
    if (!isValid) showError('Create Role', 'Please enter a valid name and select at least 1 permission');
    submitHandler(e);
  };

  const acceptClose = () => {
    navigate(ROLES_ROUTE);
  };

  const confirmCancel = () => {
    confirmDialog({
      message: 'Your Changes will be lost.',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'accept',
      accept: acceptClose,
    });
  };

  return (
    <>
      <div className="flex flex-col space-y-6">
        <div>
          <InputControl
            label={'Role Name'}
            control={control}
            name={'roleName'}
            placeholder={'Enter Role Name'}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Permissions</h3>
          <div className="space-y-8">
            <CustomAccordion activeIndex={0}>
              {PERMISSIONS.map((category, index) => (
                <AccordionTab key={index} header={category.label}>
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-3 font-medium text-gray-700 w-1/3">
                        Permission
                      </th>
                      <th className="text-left p-3 font-medium text-gray-700 w-2/3">
                        Description
                      </th>
                      <th className="text-center p-3 font-medium text-gray-700 w-24">
                        Enabled
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    {category.children.map((perm) => (
                      <tr
                        key={perm.id}
                        className="border-b hover:bg-gray-50 transition"
                      >
                        <td className="p-3 text-gray-800 font-medium">
                          {perm.label}
                        </td>
                        <td className="p-3 text-gray-600">{perm.description}</td>
                        <td className="p-3 text-center">
                          <SwitchControl
                            control={control}
                            name={`permissions.${perm.key}`}
                          />
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </AccordionTab>
              ))}
            </CustomAccordion>
          </div>
        </div>
      </div>
      <div className="flex gap-3 justify-end">
        <Button type={'button'}
                variant={'secondary'}
                label={'Cancel'}
                onClick={confirmCancel} />
        <Button type={'button'}
                variant={'primary'}
                label={'Save Changes'}
                onClick={onSubmit} />
      </div>

    </>
  );
};