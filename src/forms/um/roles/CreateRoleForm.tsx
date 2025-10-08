import { useCreateRole } from '@hooks/um/roles/useCreateRole.ts';
import { SwitchControl } from '@components/forms/SwitchControl.tsx';
import { CardBody } from '@components/card/CardBody.tsx';
import { CardFooter } from '@components/card/CardFooter.tsx';
import { InputControl } from '@components/forms/InputControl.tsx';
import { PERMISSIONS } from '@utils/constant/app.constant.ts';

type UpdateRoleFormProps = {
  id?: string | undefined
}

export const CreateRoleForm = (props: UpdateRoleFormProps) => {
  const { control, submitHandler } = useCreateRole();
  const { id } = props;

  return (
    <>
      <CardBody>
        <div className="flex flex-col space-y-6">
          {/* Role Selector */}
          <div>
            <InputControl
              label={'Role Name'}
              control={control}
              name={'roleName'}
              placeholder={'Enter Role Name'}
            />
          </div>

          {/* Permissions Grid */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Permissions</h3>
            <div className="space-y-8">
              {PERMISSIONS.map((category) => (
                <div
                  key={category.id}
                  className="border rounded-lg shadow-sm bg-white overflow-hidden"
                >
                  <div className="bg-gray-100 px-4 py-3 border-b">
                    <h4 className="text-base font-semibold text-gray-800 flex items-center">
                      {category.label}
                    </h4>
                  </div>

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
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardBody>
      <CardFooter>
        {/* Save Button */}
        <button type={'button'}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
                onClick={() => submitHandler()}>
          Save Changes
        </button>
      </CardFooter>
    </>
  );
};