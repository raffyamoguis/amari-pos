import axios from "axios";
import { API_HOST } from "../config";
import { TransactionTypes } from "../types";
import { notifications } from "@mantine/notifications";

export async function updateStock(transactions: TransactionTypes[]): Promise<boolean> {
    try {
        const updatePromises = transactions.map(async (transaction: TransactionTypes) => {
            const updatedStock = transaction.stock - transaction.quantity;

            try {
                await axios.put(`${API_HOST}/reducestock/${encodeURIComponent(transaction.product)}`, {
                    q: updatedStock
                });
                return true; // Return true if update is successful for this transaction
            } catch (error) {
                console.error(`Failed to update stock for transaction ${transaction.product}:`, error);
                return false; // Return false if update fails for this transaction
            }
        });

        // Wait for all promises to complete
        const results = await Promise.all(updatePromises);

        const allSuccessful = results.every(result => result);
        console.log(`Stock update ${allSuccessful ? 'successful' : 'failed'} for all transactions.`);

        return allSuccessful;
    } catch (error) {
        console.error('An error occurred while updating stock:', error);
        throw error; // Re-throw the error after logging
    }
}

export async function createPayment(paymentInfo: any): Promise<boolean> {
    

    try {
        await axios.post(`${API_HOST}/payment`, {
            overalltotal: paymentInfo.overalltotal,
            amount: paymentInfo.amount,
            change: paymentInfo.change,
            orderdate: paymentInfo.currdate
        });

        console.log('Payment record created successfully.');
        return true; // Return true if creation is successful
    } catch (error) {
        console.error('An error occurred while creating the payment record:', error);
        return false; // Return false if an error occurs during the creation
    }
}

export async function createTransactions(transactions: TransactionTypes[], currdate: string) {
    try {
        const promises = transactions.map(async (transaction) => {
            await axios.post('http://localhost:3001/api/transaction', {
                paymentid: currdate,
                product: transaction.product,
                stock: transaction.stock,
                price: transaction.price,
                quantity: transaction.quantity,
                total: transaction.total
            });
        });

        await Promise.all(promises);

        return true; // All requests were successful
    } catch (error) {
        console.error('An error occurred while creating transactions:', error);

        notifications.show({message: 'An error occured while creating transactions.',color: "red",});

        // Handle error display or reporting here if needed
        return false; // An error occurred during requests
    }
}




