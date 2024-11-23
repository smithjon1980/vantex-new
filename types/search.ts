export interface SearchFormState {
  location: string;
  setLocation: (value: string) => void;
  dates: {
    from: Date | undefined;
    to: Date | undefined;
  };
  setDates: (dates: { from: Date | undefined; to: Date | undefined }) => void;
  guests: {
    adults: number;
    children: number;
    rooms: number;
  };
  setGuests: (guests: { adults: number; children: number; rooms: number }) => void;
  handleSearch: () => void;
}