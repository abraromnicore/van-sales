export const Subject = {
  User: 'User',
  Order: 'Order',
  Product: 'Product',
  Report: 'Report',
} as const;

export type Subject = typeof Subject[keyof typeof Subject];