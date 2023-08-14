import axios from "axios";
import { API_HOST } from "../config";

export async function fetchMedicines(){
    try {
        const result = await axios.get(`${API_HOST}/medicine`);
        return result.data;
    }catch (error) {
        console.log("An error occured on getMedicine func: ",error);
        throw error;
    }
}

export async function searchMedicine(query: string) {
    if (!!query) {
        try {
            const result = await axios.get(`${API_HOST}/products?name=${encodeURIComponent(query)}`);
            return result.data;
        }catch (error) {
            console.log("An error occured on searchMedicine func: ",error);
            throw error;
        }
    }
}

export async function fetchItemInfo(item: string) {
    if (!!item) {
        try {
            const result = await axios.get(`${API_HOST}/products/${encodeURIComponent(item)}`);
            return result.data;
        }catch (error) {
            console.log("An error occured on fetchItemInfo func: ",error);
            throw error;
        }
    }
}