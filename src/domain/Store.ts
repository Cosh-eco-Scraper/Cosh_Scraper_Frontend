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
  url: string;
  location: string;
  clientId: string;
};
