import axios from "axios";
import { API_HOST } from "../config";

export async function fetchPayments(offset: number, dateFilter?: string) {
    try {
        if (!!dateFilter) { 
            const result = await axios.get(`${API_HOST}/request/payment/${encodeURIComponent(dateFilter)}?offset=${offset}`)
            return result.data
        }else {
            const result = await axios.get(`${API_HOST}/payment?offset=${offset}`);
            return result.data;
        }
    }catch (error) {
        console.log("An error occured on fetchPayments func: ",error);
        throw error;
    }
}

export async function viewTransactionInfo(date: string | undefined) {
    try {
        const result = await axios.get(`${API_HOST}/viewtransaction/${encodeURIComponent(!!date && date)}`);
        return result.data;
    }catch (error) {
        console.log("An error occured on viewTransaction func: ", error);
        throw error;
    }
}

export async function getTotalTransactionToday() {
    try {
        const result = await axios.get(`${API_HOST}/payment/total`);
        return result.data;
    }catch (error) {
        console.log("An error occured on getTotalTransactionToday func: ", error);
        throw error;
    }

}