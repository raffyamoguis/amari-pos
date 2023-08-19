import axios from "axios";
import { API_HOST } from "../config";

export async function getAddedToday() {
    try {
        const result = await axios.get(`${API_HOST}/items/count/today`);
        return result.data;
    }catch (error) {
        console.log("getAddedToday: ", error);
        throw error;
    }
}

export async function getSalesToday() {
    try {
        const result = await axios.get(`${API_HOST}/transactions/total/today`);
        return result.data;
    }catch (error) {
        console.log("getSalesToday: ", error);
        throw error;
    }
}

export async function getAllTotal() {
    try {
        const result = await axios.get(`${API_HOST}/total/all`);
        return result.data;
    }catch (error) {
        console.log("getSalesToday: ", error);
        throw error;
    }
}

export async function fetchFilteredStocks() {
    try {
        const result = await axios.get(`${API_HOST}/stocks/filtered`);
        return result.data;
    }catch (error) {
        console.log("fetchFilteredStocks: ", error);
        throw error;
    }
}