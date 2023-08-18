import axios from "axios";
import { API_HOST } from "../config";

export async function addMedicine(medicine : any) {
  try {
    await axios.post(`${API_HOST}/medicine`, medicine);
    return true; // Return true if the query is successful
  } catch (error) {
    console.log("An error occurred in addMedicine function:", error);
    return false; // Return false if the query is unsuccessful
  }
}

export async function getMedicine(id : string | undefined) {
  try {
    const result = await axios.get(`${API_HOST}/medicine/${parseInt(typeof id === "string" ? id : "")}`);
    return result?.data;
  } catch (error) {
    console.log("An error occurred in addMedicine function:", error);
    return false; // Return false if the query is unsuccessful
  }
}

export async function updateMedicine(id: string | undefined, medicine : any) {
  try {
    await axios.put(`${API_HOST}/medicine/${id}`, {
      batchno: medicine.batchno,
      name: medicine.name,
      specification: medicine.specification,
      price: medicine.price,
      expiry: medicine.expiry
    });
    return true; // Return true if the query is successful
  } catch (error) {
    console.log("An error occurred in updateMedicine function:", error);
    throw error;// Return false if the query is unsuccessful
  }
}

export async function fetchMedicines(offset: number){
    try {
        const result = await axios.get(`${API_HOST}/medicine?offset=${offset}`);
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

export async function checkMedicine(name: string) {
    try {
        const result = await axios.get(`${API_HOST}/searchRedundant/${encodeURIComponent(name)}`);
        return result.data;
    }catch (error) {
        console.log("An error occured on checkMedicine func: ",error);
        throw error;
    }
}

export async function deleteMedicine(id: number | undefined) {
    try {
        await axios.delete(`${API_HOST}/medicine/${id}`);
        return true;
    }catch (error) {
        console.log("An error occurred in deleteMedicine function:", error);
        return false; // Return false if the query is unsuccessful
  }
}