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