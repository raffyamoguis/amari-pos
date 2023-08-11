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