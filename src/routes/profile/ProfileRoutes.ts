export const ProfileRoutes = [
  {
    path: '/profile',
    lazy: {
      Component: async () =>
        (await import('@pages/profile/ProfilePage')).ProfilePage,
    },
  },
];
