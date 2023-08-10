import React from "react";

export interface NavTypes {
    label: string;
    route?: string;
    icon: React.ReactNode;
}

export interface MedicineType {
    batchno: string;
    name: string;
    spefication?: number;
    price: number;
    expiry: string
}

export interface TransactionTypes {
    id: number;
    product: string;
    stock: number;
    price: number;
    quantity: number;
    total: number;
}