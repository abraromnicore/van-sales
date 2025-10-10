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
                (await import('@pages/profile/profilePage')).ProfilePage,
            },
          },
          {
            path: '/um',
            children: [
              {
                path: 'roles',
                children: [
                  {
                    index: true,
                    lazy: {
                      Component: async () =>
                        (await import('@pages/um/roles/RolesPage')).RolesPage,
                    },
                  },
                  {
                    path: 'create',
                    lazy: {
                      Component: async () =>
                        (await import('@pages/um/roles/CreateRolePage'))
                          .CreateRolePage,
                    },
                  },
                  {
                    path: 'edit/:id',
                    lazy: {
                      Component: async () =>
                        (await import('@pages/um/roles/UpdateRolePage'))
                          .UpdateRolePage,
                    },
                  },
                  {
                    path: 'view/:id',
                    lazy: {
                      Component: async () =>
                        (await import('@pages/um/roles/ViewRolePage'))
                          .ViewRolePage,
                    },
                  },
                ],
              },
                {
                path: 'users',
                children: [
                  {
                    index: true,
                    lazy: {
                      Component: async () =>
                        (await import('@pages/um/users/UsersPage')).UserPage,
                    },
                  },
                  {
                    path: 'create',
                    lazy: {
                      Component: async () =>
                        (await import('@pages/um/users/CreateUserPage'))
                          .CreateUserPage,
                    },
                  },
                  {
                    path: 'edit/:id',
                    lazy: {
                      Component: async () =>
                        (await import('@pages/um/users/UpdateUserPage'))
                          .UpdateUserPage,
                    },
                  },
                  {
                    path: 'view/:id',
                    lazy: {
                      Component: async () =>
                        (await import('@pages/um/users/ViewUserPage'))
                          .ViewUserPage,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
