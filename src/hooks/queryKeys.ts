export const queryKeys = {
  getStoreKey: (id: number) => ['store', id],
  getAllStoresKey: () => ['stores'],
  getLocationsKey: () => ['locations'],
  getAllBrandsKey: () => ['brands'],
  getStoreBrandsKey: (id: number) => ['brands', id],
  getStoreHoursKey: (id: number) => ['hours', id],
  getStoreTypesKey: (id: number) => ['types', id],
};
