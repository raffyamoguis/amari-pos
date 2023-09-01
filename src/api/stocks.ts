import axios from "axios";
import { API_HOST } from "../config";
import { TransactionTypes } from "../types";
import { notifications } from "@mantine/notifications";

export async function createStock(stockfor: string) {
    try {
    await axios.post(`${API_HOST}/api/stock`, { stockfor: stockfor, quantity: 0});
    return true; // Return true if the query is successful
  } catch (error) {
    console.log("An error occurred in addMedicine function:", error);
    return false; // Return false if the query is unsuccessful
  }
}

export async function fetchStocks(offset: number, search : string, filter: string | null) {
    try {
        if (search !== "") {
            const result = await axios.get(`${API_HOST}/api/stock/search?name=${encodeURIComponent(search)}&offset=${offset}&filter=${filter}`);
            return result.data;
        }else {
            const result = await axios.get(`${API_HOST}/api/stock?offset=${offset}&filter=${filter}`);
            return result.data;
        }
    }catch (error) {
        console.log("An error occured on fetchStocks func: ",error);
        throw error;
    }
}

export async function updateStock(name: string, newName: string) {
    try {
        const result = await axios.put(`${API_HOST}/api/edit/stock/${name}`, { newname: newName });
        return result.data;
    }catch (error) {
        console.log("An error occured on updateStock func: ", error);
        throw error;
    }
}

export async function updateStockQuantity(id: number | string, quantity: number | "") {
    try {
        await axios.put(`${API_HOST}/api/stock/${encodeURIComponent(id)}`, {
            quantity: quantity
        })
        return true;
    }catch (error) {
        console.log("An error occured on updateStockQuantity func: ", error);
        throw error;
    }
}

// Update all batch stocks
export async function updateStocks(transactions: TransactionTypes[]): Promise<boolean> {
    try {
        const updatePromises = transactions.map(async (transaction: TransactionTypes) => {
            const updatedStock = transaction.stock - transaction.quantity;

            try {
                await axios.put(`${API_HOST}/api/reducestock/${encodeURIComponent(transaction.product)}`, {
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

export async function deleteStock(name:string) {
    try {
        const result = await axios.delete(`${API_HOST}/api/stockn/${encodeURIComponent(name)}`);
        return result.data;
    }catch(error) {
        console.log("An error occured while deleting stock: ", error);
        throw error;
    }
}

export async function createPayment(paymentInfo: any): Promise<boolean> {
    

    try {
        await axios.post(`${API_HOST}/api/payment`, {
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
            await axios.post(`${API_HOST}/api/transaction`, {
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

export async function checkType(name: string) {
    try {
        const result = await axios.get(`${API_HOST}/api/check/type/${encodeURIComponent(name)}`);
        return result.data;
    }catch (error) {
        console.error('An error occurred while checking type: ', error);
        throw error;
    }
}




