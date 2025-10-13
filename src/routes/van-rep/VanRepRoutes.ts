export const VanRepRoutes = [
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
  {
    path: '/load-req',
    children: [
      {
        path: 'view/:reqId',
        lazy: {
          Component: async () =>
            (await import('@pages/load-req/LoadReqDetail')).LoadReqDetail,
        },
      },
    ],
  },
];