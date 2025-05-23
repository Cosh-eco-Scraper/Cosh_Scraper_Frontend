export type Location = {
  street: string;
  number: string;
  postalCode: string;
  city: string;
  country: string;
  id: number;
};

export type CreateLocation = Omit<Location, 'id'>;
