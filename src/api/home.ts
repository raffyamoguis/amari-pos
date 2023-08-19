import axios from "axios";
import { API_HOST } from "../config";

export async function getAddedToday() {
    try {
        const result = await axios.get(`${API_HOST}/api/items/count/today`);
        return result.data;
    }catch (error) {
        console.log("getAddedToday: ", error);
        throw error;
    }
}

export async function getSalesToday() {
    try {
        const result = await axios.get(`${API_HOST}/api/transactions/total/today`);
        return result.data;
    }catch (error) {
        console.log("getSalesToday: ", error);
        throw error;
    }
}

export async function getAllTotal() {
    try {
        const result = await axios.get(`${API_HOST}/api/total/all`);
        return result.data;
    }catch (error) {
        console.log("getSalesToday: ", error);
        throw error;
    }
}

export async function fetchFilteredStocks() {
    try {
        const result = await axios.get(`${API_HOST}/api/stocks/filtered`);
        return result.data;
    }catch (error) {
        console.log("fetchFilteredStocks: ", error);
        throw error;
    }
}

export async function updateAccount(values: any) {
    try{
        const { data } = await axios.put(`${API_HOST}/login`, values);
        return data;
    }catch (error) {
        console.log("updateAccount: ", error);
        throw error;
    }
}