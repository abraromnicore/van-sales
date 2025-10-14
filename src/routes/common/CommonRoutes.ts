export const CommonRoutes = [
  {
    path: '/unauthorized',
    lazy: {
      Component: async () =>
        (await import('@pages/common/UnAuthorizedPage.tsx')).UnAuthorizedPage,
    },
  },
];
