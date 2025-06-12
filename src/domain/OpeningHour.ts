export type OpeningHour = {
  id: number;
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  openingAt: string;
  closingAt: string;
  openingAtAfterNoon?: string | null;
  closingAtAfterNoon?: string | null;
  storeId?: number;
};

export type CreateOpeningHour = Omit<OpeningHour, 'id'>;
export type OpeningHourDetail = Omit<OpeningHour, 'id' | 'storeId'>;
