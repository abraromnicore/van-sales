import { useMetadata } from '@hooks/common/useMetadata.ts';
import { DASHBOARD_ROUTE, EDIT_USER_HIERARCHY_ROUTE, USERS_ROUTE } from '@utils/constant/app-route.constants.ts';
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from 'styled-components';
import { PageLayout } from '@layouts/Pagelayout.tsx';
import { Button } from '@components/button/Button.tsx';
import { Card } from '@components/app-cards/card/Card.tsx';
import { CardBody } from '@components/app-cards/card/CardBody.tsx';

const orgChartData = [
  {
    role: 'Supervisor',
    label: 'John Doe',
    expanded: true,
    data: 'supervisor_john_doe',
    children: [
      {
        role: 'Rep',
        label: 'Jane Smith',
        expanded: true,
        data: 'rep_jane_smith',
        children: [
          {
            role: 'Auditor',
            label: 'Mark Taylor',
            data: 'auditor_mark_taylor',
          },
          {
            role: 'Auditor',
            label: 'Lisa Wong',
            data: 'auditor_lisa_wong',
          },
        ],
      },
      {
        role: 'Rep',
        label: 'David Brown',
        expanded: true,
        data: 'rep_david_brown',
        children: [
          {
            role: 'Auditor',
            label: 'Emma Wilson',
            data: 'auditor_emma_wilson',
          },
        ],
      },
    ],
  },
];

const TreeContainer = styled.div`
    width: 100%;
    overflow: auto;
`;

const CardNode = styled.div`
    display: inline-block;
    min-width: 160px;
`;

type UserCardProps = {
  label: string;
  role: string;
}

const UserCard = ({ label, role }: UserCardProps) => (
  <CardNode>
    <div
      className="w-full p-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center">
        <img className="w-24 h-24 mb-3 rounded-full shadow-lg"
             src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
             alt="Bonnie image" />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{label}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">{role}</span>
      </div>
    </div>
  </CardNode>
);

// Recursive function to render TreeNodes
const renderTreeNodes = (node: any) => {
  const { role, label, children, data } = node;
  // Base case: if no children, return just a single TreeNode
  if (!children || children.length === 0) {
    return <TreeNode key={data} label={<UserCard label={label} role={role} />} />;
  }

  // Recursive case: render children
  return (
    <TreeNode key={data} label={<UserCard label={label} role={role} />}>
      {children.map((child: any) => renderTreeNodes(child))}
    </TreeNode>
  );
};

// Main component
const OrgChart = ({ data }: { data: any }) => {
  if (!data || data.length === 0) return null;
  const { role, label, children = [] } = data[0];

  return (
    <TreeContainer>
      <Tree
        lineWidth={'2px'}
        lineColor={'green'}
        lineBorderRadius={'10px'}
        label={<UserCard label={label} role={role} />}
      >
        {children?.map((child: any) => renderTreeNodes(child))}
      </Tree>
    </TreeContainer>
  );
};

const HeaderActions = () => {
  return (
    <Button btnType={'link'} to={EDIT_USER_HIERARCHY_ROUTE.replace('{id}', '123')} label={'Edit User Hierarchy'}
            variant={'primary'} />
  );
};

export const ViewUserHierarchyPage = () => {
  useMetadata({
    pageTitle: 'View User Hierarchy',
    breadcrumbs: [
      {
        label: 'Dashboard',
        route: DASHBOARD_ROUTE,
      },
      {
        label: 'User Management',
        route: '',
      },
      {
        label: 'Users',
        route: USERS_ROUTE,
      },
      {
        label: 'Hierarchy',
        route: '',
      },
      {
        label: 'View',
        route: '',
        active: true,
      },
    ],
  });

  return (
    <PageLayout headerActions={<HeaderActions />}>
      <Card>
        <CardBody>
          <OrgChart data={orgChartData} />
        </CardBody>
      </Card>
    </PageLayout>
  );
};