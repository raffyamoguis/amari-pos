import axios from "axios";
import { API_HOST } from "../config";

export async function addOtherSupply(othersupply : any) {
  try {
    await axios.post(`${API_HOST}/api/othersupply`, othersupply);
    return true; // Return true if the query is successful
  } catch (error) {
    console.log("An error occurred in addOtherSupply function:", error);
    return false; // Return false if the query is unsuccessful
  }
}

export async function updateOtherSupply(id: string | undefined, othersupply: any) {
    console.log(othersupply);
    try {
        await axios.put(`${API_HOST}/api/othersupply/${id}`, othersupply);
        return true;
    }catch (error) {
        console.log("An error occured on updateOtherSupply func: ",error);
        throw error;
    }
}

export async function fetchOtherSupplies(offset: number, search: string) {
    try {
        if (!!search) {
            const result = await axios.get(`${API_HOST}/api/othersupply/search?name=${encodeURIComponent(search)}&offset=${offset}`);
            return result.data;
        }else {
            const result = await axios.get(`${API_HOST}/api/othersupply?offset=${offset}`);
            return result.data;
        }
    }catch(error) {
        console.log("An error occured on fetchOthersupplies func: ",error);
        throw error;
    }
}

export async function getOtherSupply(id: string | undefined) {
    try {
        const result = await axios.get(`${API_HOST}/api/othersupply/view/${encodeURIComponent(parseInt(typeof id === "string" ? id : ""))}`);
        return result.data;
    }catch (error) {
        console.log("An error occured on getOtherSupply func: ",error);
        throw error;
    }
}

export async function checkOtherSupply(name: string) {
    try {
        const result = await axios.get(`${API_HOST}/api/othersupply/check/${encodeURIComponent(name)}`);
        return result.data;
    }catch (error) {
        console.log("An error occured on checkMedicine func: ",error);
        throw error;
    }
}

export async function deleteOtherSupply(id: number) {
    try {
        const result = await axios.delete(`${API_HOST}/api/othersupply/${encodeURIComponent(id)}`);
        return result.data;
    }catch (error) {
        console.log("An error occured on deleteOtherSupply func: ",error);
        throw error;
    }
}