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