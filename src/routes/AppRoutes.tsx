import { AppLoader } from '@components/AppLoader.tsx';
import { routeGuardLoader } from '@/guards/route-guard.loader.ts';
import { Navigate } from 'react-router-dom';
import * as React from 'react';
import { DEFAULT_ROUTE } from '@utils/constant/app-route.constants.ts';
import { UmRoutes } from '@routes/um/UmRoutes.ts';
import { VanRepRoutes } from '@routes/van-rep/VanRepRoutes.ts';

export const appRoutes = [
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
      {
        path: '/login',
        index: true,
        lazy: {
          Component: async () => (await import('@pages/LoginPage')).LoginPage,
        },
      },
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
          {
            path: '/van-rep',
            lazy: {
              Component: async () =>
                (await import('@pages/users/van-rep/VanRepPage')).VanRepPage,
            },
          },
          {
            path: '/profile',
            lazy: {
              Component: async () =>
                (await import('@pages/profile/ProfilePage')).ProfilePage,
            },
          },
          ...UmRoutes,
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