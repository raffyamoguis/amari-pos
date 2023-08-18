import axios from "axios";
import { API_HOST } from "../config";

export async function updateOtherSupply(id: string | undefined, othersupply: any) {
    console.log(othersupply);
    try {
        await axios.put(`${API_HOST}/othersupply/${id}`, othersupply);
        return true;
    }catch (error) {
        console.log("An error occured on updateOtherSupply func: ",error);
        throw error;
    }
}

export async function fetchOtherSupplies(offset: number, search: string) {
    try {
        if (!!search) {
            const result = await axios.get(`${API_HOST}/othersupply/search?name=${encodeURIComponent(search)}&offset=${offset}`);
            return result.data;
        }else {
            const result = await axios.get(`${API_HOST}/othersupply?offset=${offset}`);
            return result.data;
        }
    }catch(error) {
        console.log("An error occured on fetchOthersupplies func: ",error);
        throw error;
    }
}

export async function getOtherSupply(id: string | undefined) {
    try {
        const result = await axios.get(`${API_HOST}/othersupply/view/${encodeURIComponent(parseInt(typeof id === "string" ? id : ""))}`);
        return result.data;
    }catch (error) {
        console.log("An error occured on getOtherSupply func: ",error);
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