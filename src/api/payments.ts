import axios from "axios";
import { API_HOST } from "../config";

export async function fetchPayments() {
    try {
        const result = await axios.get(`${API_HOST}/payment`);
        return result.data;
    }catch (error) {
        console.log("An error occured on getMedicine func: ",error);
        throw error;
    }
}