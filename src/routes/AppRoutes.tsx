import { AppLoader } from '@components/AppLoader.tsx';
import { authLoader } from '@/guards/auth.loader.ts';
import { Navigate } from 'react-router-dom';
import * as React from 'react';
import { DEFAULT_ROUTE } from '@utils/constant/app-route.constants.ts';

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
        loader: authLoader,
        children: [
          {
            path: '/drivers',
            lazy: {
              Component: async () => (await import('@pages/users/drivers/DriversUsers')).DriverUsers,
            },
          },
          {
            path: '/dashboard',
            lazy: {
              Component: async () => (await import('@pages/dashboard/DashboardPage.tsx')).DashboardPage,
            },
          },
        ],
      },
    ],
  },
];
