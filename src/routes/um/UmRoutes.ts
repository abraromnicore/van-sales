export const UmRoutes = [
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
          {
            path: 'hierarchy',
            children: [
              {
                path: 'view/:id',
                lazy: {
                  Component: async () =>
                    (await import('@pages/um/users/user-hierarchy/ViewUserHierarchyPage.tsx'))
                      .ViewUserHierarchyPage,
                },
              },
              {
                path: 'edit/:id',
                lazy: {
                  Component: async () =>
                    (await import('@pages/um/users/user-hierarchy/EditUserHierarchyPage.tsx'))
                      .EditUserHierarchyPage,
                },
              },
            ],
          },
        ],
      },
      {
        path: 'logs',
        children: [
          {
            index: true,
            lazy: {
              Component: async () =>
                (await import('@pages/um/users/UserAuditLogPage')).VanSalesAuditLogPage,
            },
          },
        ]
      },
    ],
  },
];