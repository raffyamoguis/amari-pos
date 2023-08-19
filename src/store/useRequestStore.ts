import {create} from "zustand";

type State = {
    activePage: number;
    offset: number;
    dateFilter: string | undefined;
}

type Actions = {
    setActivePage: (number: number) => void;
    setDateFilter: (date: string | undefined) => void;
}

const initialState: State = {
    activePage: 1,
    offset: 0,
    dateFilter: "",
}

export const useRequestStore = create<State & Actions>((set) => ({
    ...initialState,
    setActivePage: (number: number) => {
        set({activePage: number});
        set({offset: number !== 1 ? (number - 1) * 15 : 0});
    },
    setDateFilter: (date: string|undefined) => set({dateFilter: date}),
}));