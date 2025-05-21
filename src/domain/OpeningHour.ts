export type OpeningHour = {
  id: number;
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  openingAt: string;
  closingAt: string;
  storeId: number;
};
