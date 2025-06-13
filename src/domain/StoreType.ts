export type StoreType = {
  id: number;
  name: string;
  description?: string;
};

export type Type = Omit<StoreType, 'description'>;
