import { useMetadata } from '@hooks/common/useMetadata.ts';
import { DASHBOARD_ROUTE, EDIT_VAN_REP_HIERARCHY_ROUTE } from '@utils/constant/app-route.constants.ts';
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from 'styled-components';
import { PageLayout } from '@layouts/Pagelayout.tsx';
import { Button } from '@components/button/Button.tsx';
import truckImage1 from '@assets/images/images.jpg';
import truckImage2 from '@assets/images/truck-loader.jpg';
import routeImage1 from '@assets/images/roote.png';
import routeImage2 from '@assets/images/root image.png';
import { Card } from '@components/app-cards/card/Card.tsx';
import { CardBody } from '@components/app-cards/card/CardBody.tsx';

const orgChartData = [
  {
    role: 'Van Representative',
    label: 'Ali Khan',
    expanded: true,
    data: 'van_rep_ali_khan',
    children: [
      {
        role: 'Van',
        label: 'Van-12',
        expanded: true,
        data: 'van_12',
        children: [
          {
            role: 'Route',
            label: 'North Zone Route A',
            data: 'route_north_zone_a',
          },
          {
            role: 'Route',
            label: 'North Zone Route B',
            data: 'route_north_zone_b',
          },
        ],
      },
      {
        role: 'Van',
        label: 'Van-14',
        expanded: true,
        data: 'van_14',
        children: [
          {
            role: 'Route',
            label: 'South Zone Route A',
            data: 'route_south_zone_a',
          },
        ],
      },
    ],
  },
  {
    role: 'Van Representative',
    label: 'Ahmed Khan',
    expanded: true,
    data: 'van_rep_ahmed_khan',
    children: [
      {
        role: 'Van',
        label: 'Van-15',
        expanded: true,
        data: 'van_15',
        children: [
          {
            role: 'Route',
            label: 'East Zone Route A',
            data: 'route_east_zone_a',
          },
          {
            role: 'Route',
            label: 'East Zone Route B',
            data: 'route_east_zone_b',
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

const VanCard = ({ label, role }: { role: any, label: any }) => {
  // Select truck image based on van number or use alternating pattern
  const getTruckImage: any = () => {
    if (role === 'Van') {
      // Use different truck images for different vans
      const vanNumber = label.match(/\d+/)?.[0];
      return vanNumber && parseInt(vanNumber) % 2 === 0 ? truckImage2 : truckImage1;
    }
    return null;
  };

  // Select route image based on route name or use alternating pattern
  const getRouteImage: any = () => {
    if (role === 'Route') {
      // Use different route images for different routes
      const routeLetter = label.charAt(0); // Get first letter of route name
      return routeLetter === 'N' || routeLetter === 'E' ? routeImage1 : routeImage2;
    }
    return null;
  };

  return (
    <CardNode>
      <div
        className="w-full p-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center">
          {role === 'Van' ? (
            <img
              className="w-24 h-24 mb-3 rounded-lg shadow-lg object-cover"
              src={getTruckImage()}
              alt={label}
            />
          ) : role === 'Van Representative' ? (
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover"
              src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
              alt={label}
            />
          ) : role === 'Route' ? (
            <img
              className="w-24 h-24 mb-3 rounded-lg shadow-lg object-cover"
              src={getRouteImage()}
              alt={label}
            />
          ) : (
            <div
              className="w-24 h-24 mb-3 rounded-full shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                {label.split(' ').map((n: any) => n[0]).join('')}
              </span>
            </div>
          )}
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{label}</h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">{role}</span>
        </div>
      </div>
    </CardNode>
  );
};

// Recursive function to render TreeNodes
const renderTreeNodes = (node: any) => {
  const { role, label, children, data } = node;
  // Base case: if no children, return just a single TreeNode
  if (!children || children.length === 0) {
    return <TreeNode key={data} label={<VanCard label={label} role={role} />} />;
  }

  // Recursive case: render children
  return (
    <TreeNode key={data} label={<VanCard label={label} role={role} />}>
      {children.map((child: any) => renderTreeNodes(child))}
    </TreeNode>
  );
};

// Main component
const OrgChart = ({ data }: { data: any }) => {
  if (!data || data.length === 0) return null;

  return (
    <TreeContainer>
      {data.map((rootNode: any, index: any) => (
        <div key={rootNode.data} className={index > 0 ? 'mt-8' : ''}>
          <Tree
            lineWidth={'2px'}
            lineColor={'blue'}
            lineBorderRadius={'10px'}
            label={<VanCard label={rootNode.label} role={rootNode.role} />}
          >
            {rootNode.children?.map((child: any) => renderTreeNodes(child))}
          </Tree>
        </div>
      ))}
    </TreeContainer>
  );
};

const HeaderActions = () => {
  return (
    <Button btnType={'link'} to={EDIT_VAN_REP_HIERARCHY_ROUTE.replace('{id}', '123')} label={'Edit Van Assignment'}
            variant={'primary'} />
  );
};

export const ViewVanRepHierarchyPage = () => {
  useMetadata({
    pageTitle: 'View Van Assignment Hierarchy',
    breadcrumbs: [
      {
        label: 'Dashboard',
        route: DASHBOARD_ROUTE,
      },
      {
        label: 'Van Representative',
        route: '',
      },
      {
        label: 'Van Assignment Hierarchy',
        route: '',
        active: true,
      },
    ],
  });

  return (
    <PageLayout headerActions={<HeaderActions />}>
      <Card>
        <CardBody>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Van Assignment Hierarchy</h2>
          </div>
          <OrgChart data={orgChartData} />
        </CardBody>
      </Card>
    </PageLayout>
  );
};