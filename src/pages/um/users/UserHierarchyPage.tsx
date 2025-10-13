import { useMetadata } from '@hooks/common/useMetadata.ts';
import { DASHBOARD_ROUTE, USERS_ROUTE } from '@utils/constant/app-route.constants.ts';
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from 'styled-components';

const orgChartData = [
  {
    label: 'Supervisor - John Doe',
    expanded: true,
    data: 'supervisor_john_doe',
    children: [
      {
        label: 'Rep - Jane Smith',
        expanded: true,
        data: 'rep_jane_smith',
        children: [
          {
            label: 'Auditor - Mark Taylor',
            data: 'auditor_mark_taylor',
          },
          {
            label: 'Auditor - Lisa Wong',
            data: 'auditor_lisa_wong',
          },
        ],
      },
      {
        label: 'Rep - David Brown',
        expanded: true,
        data: 'rep_david_brown',
        children: [
          {
            label: 'Auditor - Emma Wilson',
            data: 'auditor_emma_wilson',
          },
        ],
      },
    ],
  },
];

const StyledNode = styled.div`
      padding: 5px;
      border-radius: 8px;
      display: inline-block;
      border: 1px solid red;
  `;

const TreeContainer = styled.div`
      width: 100%;
      overflow: auto;
  `;

const CardNode = styled.div`
      display: inline-block;
      min-width: 160px;
  `;


export const UserHierarchyPage = () => {
  useMetadata({
    pageTitle: 'User Hierarchy',
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
        active: true,
      },
    ],
  });

  const UserCard = () => (
    <CardNode>
      <div
        className="w-full p-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center">
          <img className="w-24 h-24 mb-3 rounded-full shadow-lg"
               src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
               alt="Bonnie image" />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
        </div>
      </div>
    </CardNode>
  );

  const StyledTreeExample = () => (
    <TreeContainer>
      <Tree
        lineWidth={'2px'}
        lineColor={'green'}
        lineBorderRadius={'10px'}
        label={<UserCard />}
      >
        <TreeNode label={<UserCard />}>
          <TreeNode label={<UserCard />} />
        </TreeNode>
        <TreeNode label={<UserCard />}>
          <TreeNode label={<UserCard />}>
            <TreeNode label={<UserCard />} />
            <TreeNode label={<UserCard />} />
          </TreeNode>
        </TreeNode>
        <TreeNode label={<UserCard />}>
          <TreeNode label={<UserCard />} />
          <TreeNode label={<UserCard />} />
        </TreeNode>
        <TreeNode label={<UserCard />}>
          <TreeNode label={<UserCard />} />
          <TreeNode label={<UserCard />} />
        </TreeNode>
        <TreeNode label={<UserCard />}>
          <TreeNode label={<UserCard />} />
          <TreeNode label={<UserCard />} />
        </TreeNode>
      </Tree>
    </TreeContainer>
  );

  return (
    <StyledTreeExample />
  );
};