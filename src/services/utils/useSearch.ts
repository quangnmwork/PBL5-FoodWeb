import create, { GetState, SetState } from 'zustand';

interface SearchState {
  searchInput: string;
  category: string;
  setSearchInput: (input: string) => void;
  setCategory: (category: string) => void;
}
export const useSearch = create<SearchState>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (set: SetState<SearchState>, _get: GetState<SearchState>) => ({
    searchInput: '',
    category: '',
    setSearchInput: (input: string) => {
      set({ searchInput: input });
    },
    setCategory: (category: string) => {
      set({ category: category });
    }
  })
);
