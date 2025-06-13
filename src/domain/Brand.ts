export type Brand = {
  id: number;
  name: string;
  label?: string;
  storeId?: number;
};

export type UpdateBrand = {
  name: string;
};

export type addBrand = {
  id: number;
  name: string;
};

export type brandResult = {
  result: string;
};

export type deleteBrandReult = {
  message?: string;
  rowAffected?: number;
};
