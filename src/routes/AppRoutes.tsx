import { AppLoader } from '@components/AppLoader.tsx';
import { routeGuardLoader } from '@/guards/route-guard.loader.ts';
import { Navigate } from 'react-router-dom';
import * as React from 'react';
import { DEFAULT_ROUTE } from '@utils/constant/app-route.constants.ts';
import { UmRoutes } from '@routes/um/UmRoutes.ts';
import { VanRepRoutes } from '@routes/van-rep/VanRepRoutes.ts';
import { ProfileRoutes } from '@routes/profile/ProfileRoutes.ts';
import { LoadReqRoutes } from '@routes/load-req/LoadReqRoutes.ts';
import { AuthRoutes } from '@routes/auth/AuthRoutes.ts';

export const appRoutes: any = [
  {
    path: '',
    HydrateFallback: AppLoader,
    children: [
      {
        index: true,
        element: React.createElement(Navigate, {
          to: DEFAULT_ROUTE,
          replace: true,
        }),
      },
      ...AuthRoutes,
      {
        path: '',
        lazy: {
          Component: async () => (await import('@layouts/AppLayout')).AppLayout,
        },
        loader: routeGuardLoader,
        children: [
          {
            path: '/dashboard',
            lazy: {
              Component: async () =>
                (await import('@pages/dashboard/DashboardPage.tsx'))
                  .DashboardPage,
            },
          },
          ...ProfileRoutes,
          ...UmRoutes,
          ...LoadReqRoutes,
          ...VanRepRoutes,
        ],
      },
      {
        path: '/unauthorized',
        lazy: {
          Component: async () =>
            (await import('@pages/common/UnAuthorizedPage.tsx')).UnAuthorizedPage,
        },
      },
    ],
  },
];