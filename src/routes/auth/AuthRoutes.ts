export const AuthRoutes = [
  {
    path: '/login',
    index: true,
    lazy: {
      Component: async () => (await import('@pages/LoginPage')).LoginPage,
    },
  },
];
