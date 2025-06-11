export const queryKeys = {
  getStoreKey: (id: number) => ['store', id],
  getAllStoresKey: () => ['stores'],
  getLocationsKey: () => ['locations'],
  getStoreBrandsKey: (id: number) => ['brands', id],
  getStoreHoursKey: (id: number) => ['hours', id],
  getStatementsKey: () => ['statements'],
};
