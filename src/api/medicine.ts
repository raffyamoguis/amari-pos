import axios from "axios";
import { API_HOST } from "../config";

export async function addMedicine(medicine : any) {
  try {
    await axios.post(`${API_HOST}/api/medicine`, medicine);
    return true; // Return true if the query is successful
  } catch (error) {
    console.log("An error occurred in addMedicine function:", error);
    return false; // Return false if the query is unsuccessful
  }
}

export async function getMedicine(id : string | undefined) {
  try {
    const result = await axios.get(`${API_HOST}/api/medicine/${parseInt(typeof id === "string" ? id : "")}`);
    return result?.data;
  } catch (error) {
    console.log("An error occurred in addMedicine function:", error);
    return false; // Return false if the query is unsuccessful
  }
}

export async function updateMedicine(id: string | undefined, medicine : any) {
  try {
    await axios.put(`${API_HOST}/api/medicine/${id}`, {
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

export async function fetchMedicines(offset: number, search: string){
    try {
      if (search !== "") {
        const result = await axios.get(`${API_HOST}/api/medicine/search/find?name=${encodeURIComponent(search)}&offset=${encodeURIComponent(offset)}`);
        return result.data;
      }else {
        const result = await axios.get(`${API_HOST}/api/medicine?offset=${offset}`);
        return result.data;
      }
        
    }catch (error) {
        console.log("An error occured on getMedicine func: ",error);
        throw error;
    }
}

export async function searchMedicine(query: string) {
    if (!!query) {
        try {
            const result = await axios.get(`${API_HOST}/api/products?name=${encodeURIComponent(query)}`);
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
            const result = await axios.get(`${API_HOST}/api/products/${encodeURIComponent(item)}`);
            return result.data;
        }catch (error) {
            console.log("An error occured on fetchItemInfo func: ",error);
            throw error;
        }
    }
}

export async function checkMedicine(name: string) {
    try {
        const result = await axios.get(`${API_HOST}/api/searchRedundant/${encodeURIComponent(name)}`);
        return result.data;
    }catch (error) {
        console.log("An error occured on checkMedicine func: ",error);
        throw error;
    }
}

export async function deleteMedicine(id: number | undefined) {
    try {
        const result = await axios.delete(`${API_HOST}/api/medicine/${id}`);
        return result.data;
    }catch (error) {
        console.log("An error occurred in deleteMedicine function:", error);
        throw error; // Return false if the query is unsuccessful
  }
}

export async function deleteMedicineByName(name: string) {
  try {
    const result = await axios.delete(`${API_HOST}/api/medicine/delete/${encodeURIComponent(name)}`);
    return result.data;
  }catch (error) {
    console.log("An error occurred in deleteMedicineByName function:", error);
    throw error;
  }
}