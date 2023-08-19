import {create} from "zustand";

type State = {
    activePage: number;
    offset: number;
    search: string;
    filter: string | null;
}

type Actions = {
    setActivePage: (number: number) => void;
    setSearch: (search: string) => void;
    setFilter: (filter: string|null) => void;
}

const initialState: State = {
    activePage: 1,
    offset: 0,
    search: "",
    filter: ""
}

export const useStockListStore = create<State & Actions>((set) => ({
    ...initialState,
    setActivePage: (number: number) => {
        set({activePage: number});
        set({offset: number !== 1 ? (number - 1) * 15 : 0});
    },
    setSearch: (search: string) => set({search: search}),
    setFilter: (filter: string | null) => set({filter: filter}),
}));