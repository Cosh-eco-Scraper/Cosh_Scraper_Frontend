export type Store = {
  id: number;
  name: string;
  description?: string;
  retour: string;
  street: string;
  number: string;
  postalCode: string;
  city: string;
  country: string;
  locationId: number;
};

export type UpdateStore = {
  name: string;
  description?: string;
  retour: string;
};

export type CreateStore = {
  name: string;
  url: string;
  location: string;
};
