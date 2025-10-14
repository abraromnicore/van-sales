export const LoadReqRoutes = [
  {
    path: '/load-req',
    children: [
      {
        path: 'view/:reqId',
        lazy: {
          Component: async () =>
            (await import('@pages/load-req/LoadReqDetail')).LoadReqDetail,
        },
      }
    ],
  },
];
