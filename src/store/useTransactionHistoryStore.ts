import {create} from "zustand";

type State = {
    activePage: number;
    offset: number;
}

type Actions = {
    setActivePage: (number: number) => void;
}

const initialState: State = {
    activePage: 2,
    offset: 0
}

export const useTransactionHistoryStore = create<State & Actions>((set) => ({
    ...initialState,
    setActivePage: (number: number) => {
        set({activePage: number});
        set({offset: number !== 1 ? (number - 1) * 15 : 0});
    }
}));