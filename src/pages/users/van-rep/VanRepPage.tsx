import * as React from 'react';
import {
  type ColumMeta,
  CustomTable,
} from '@components/tables/CustomTable.tsx';
import type { MenuItem } from 'primereact/menuitem';
import { useDriversList } from '@hooks/drivers/useDriversList.ts';

export const VanRepPage = () => {
  const { drivers } = useDriversList(true);
  // const [showCreateUser, setShowCreateUser] = React.useState(false);

  const [selectedItem, setSelectedItem] = React.useState();
  const tieredMenu: MenuItem[] = [
    // {
    //   label: 'View',
    //   icon: <Eye />,
    //   command: () => onView(),
    // },
  ];
  const columns: ColumMeta[] = [
    {
      field: 'driverId',
      header: 'Driver ID',
    },
    {
      field: 'firstName',
      header: 'First Name',
    },
    {
      field: 'lastName',
      header: 'Last Name',
    },
    {
      field: 'dateOfBirth',
      header: 'Date of Birth',
    },
    {
      field: 'gender',
      header: 'Gender',
    },
  ];

  // const onCreate = () => {
  //   setShowCreateUser(true);
  // };

  return (
    <>
      <CustomTable
        setSelectedItem={setSelectedItem}
        columns={columns}
        data={drivers}
        menuModel={tieredMenu}
      />

      {/* <DialogCard
        onHide={() => setShowCreateUser(false)}
        visible={showCreateUser}
      >
        <DialogHeader
          onHide={() => setShowCreateUser(false)}
          title={'Create Driver'}
        />
        <CardBody>
          <p className="text-sm leading-6 text-neutral-600 dark:text-neutral-300">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
            et iure quos similique sit. Animi blanditiis eius mollitia obcaecati
            saepe.
          </p>
        </CardBody>
        <CardFooter>
          <Link
            to={'/'}
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Details
          </Link>
          <span className="text-neutral-500 dark:text-neutral-400">
            Secondary text
          </span>
        </CardFooter>
      </DialogCard> */}
    </>
  );
};
