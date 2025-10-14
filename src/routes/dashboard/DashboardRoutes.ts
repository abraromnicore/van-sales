export const DashboardRoutes = [
  {
    path: '/dashboard',
    lazy: {
      Component: async () =>
        (await import('@pages/dashboard/DashboardPage.tsx'))
          .DashboardPage,
    },
  },
];
