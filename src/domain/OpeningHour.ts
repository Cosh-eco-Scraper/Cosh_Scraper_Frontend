export type OpeningHour = {
  id: number;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  openingAt: string;
  closingAt: string;
  openingAtAfterNoon?: string | null;
  closingAtAfterNoon?: string | null;
  storeId?: number;
};

export type CreateOpeningHour = Omit<OpeningHour, 'id'>;
export type OpeningHourDetail = Omit<OpeningHour, 'id' | 'storeId'>;
