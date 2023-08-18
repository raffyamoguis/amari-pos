import axios from "axios";
import { API_HOST } from "../config";

export async function fetchOtherSupplies(offset: number) {
    try {
        const result = await axios.get(`${API_HOST}/othersupply?offset=${offset}`);
        return result.data;
    }catch(error) {
        console.log("An error occured on fetchOthersupplies func: ",error);
        throw error;
    }
}

export async function deleteOtherSupply(id: number) {
    try {
        const result = await axios.delete(`${API_HOST}/othersupply/${encodeURIComponent(id)}`);
        return result.data;
    }catch (error) {
        console.log("An error occured on deleteOtherSupply func: ",error);
        throw error;
    }
}