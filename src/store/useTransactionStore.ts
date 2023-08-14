import { create } from "zustand";
import { notifications } from "@mantine/notifications";
import { StockTypes, TransactionTypes } from "../types";
import { fetchItemInfo } from "../api/medicine";

type State = {
    totalAmount: number;
    safeToProceed: boolean;
    amount: number;
    change: number;
    trans: TransactionTypes[];
}

type Actions = {
    setSafe: (value: boolean) => void;
    setAmount: (value: number) => void;
    setChange: (value: number) => void;
    updateTotal: (value: number) => void;
    addTrans: (product: StockTypes) => void;
    deleteTrans: (id: number) => void;
    updateQuantity: (id: number, value: number | "", stock: number) => void;
    reset: () => void;
}

const initialState: State = {
    totalAmount: 0,
    amount: 0,
    change: 0,
    safeToProceed: true,
    trans: [],
}

export const useTransactionStore = create<State & Actions>((set, get) => ({
    ...initialState,
    setSafe: (value: boolean) => set({safeToProceed: value}),
    setAmount: (value: number) => set(() => ({amount: value})),
    setChange: (value:number) => set(() => ({change: value})),
    updateTotal: (value: number) => set({totalAmount: value}),
    addTrans: async (product: StockTypes) => {
        if (product.quantity !== 0) {
            let redundant = false;

            const updatedTransactions = get().trans.map((transaction) => {
                if (transaction.product === product.stockfor) {
                    redundant = true;

                    // Prevent over adding quantity
                    if (product.quantity > transaction.quantity) {
                        transaction.quantity += 1;
                    }

                    // Add quantity instead..
                    return {
                        ...transaction,
                        quantity: transaction.quantity,
                        total: transaction.price * transaction.quantity,
                    };
                }
                return transaction;
            });

            if (redundant) {
                set({trans: updatedTransactions});
                notifications.show({
                    message: `${product.stockfor} updated quantity.`,
                    color: "blue",
                });
            } else {
                try {
                    const item = await fetchItemInfo(product.stockfor); //axios.get(`${API_HOST}/products/${encodeURIComponent(product.stockfor)}`);
                    if(!!item) {
                        const price = parseFloat(item.price);

                        set((state) => ({
                            trans: [
                                ...state.trans,
                                {
                                id: state.trans.length + 1,
                                product: product.stockfor,
                                stock: product.quantity,
                                price: price,
                                quantity: 1,
                                total: price,
                                },
                            ],
                        }));

                        notifications.show({
                            message: `${product.stockfor} added on queue.`,
                            color: "blue",
                        });
                    }else {
                        notifications.show({
                            message: `${product.stockfor} is not available in the inventory.`,
                            color: "red",
                        });
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
    },
    deleteTrans: (id: number) => {
        const updatedTransactions = get().trans.filter((transaction: TransactionTypes) => transaction.id !== id);
        set({trans: updatedTransactions});
    },
    updateQuantity: (id: number, value: number | "", stock: number) => {
        if (value === "") {
        // Handle the case where value is an empty string
        } else {
            // Handle the case where value is a number
            if (stock >= value) {
                const updatedTransactions = get().trans.map((transaction) => {
                if (transaction.id === id) {
                    const newTotal = transaction.price * value;
                    return { ...transaction, quantity: value, total: newTotal };
                }
                return transaction;
                });

                set({trans: updatedTransactions});
            }

        }
    },
    reset: () => {
        set(initialState)
    },
}));