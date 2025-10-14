export const VanRepRoutes = [
  {
    path: '/van-rep',
    children: [
      {
        path: 'list',
        lazy: {
          Component: async () =>
            (await import('@pages/van-rep/VanRepListPage')).VanRepListPage,
        },
      },
      {
        path: 'hierarchy',
        lazy: {
          Component: async () =>
            (await import('@pages/van-rep/ViewVanRepHierarchyPage')).ViewVanRepHierarchyPage,
        },
      },
      {
        path: 'hierarchy/edit/:id',
        lazy: {
          Component: async () =>
            (await import('@pages/van-rep/EditVanRepHierarchyPage')).EditVanRepHierarchyPage,
        },
      },
    ],
  },
  {
    path: '/van-reps',
    children: [
      {
        path: 'view/:repId',
        lazy: {
          Component: async () =>
            (await import('@pages/van-rep/VanRepDetailPage')).VanRepDetailPage,
        },
      },
    ],
  },
];