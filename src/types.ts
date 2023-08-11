import React from "react";

export interface NavTypes {
    label: string;
    route?: string;
    icon: React.ReactNode;
}

export interface MedicineType {
    id: number;
    batchno: string;
    name: string;
    spefication?: number;
    price: number;
    expiry: string;
    updatedAt?: string;
    createdAt?: string
}

export interface TransactionTypes {
    id: number;
    product: string;
    stock: number;
    price: number;
    quantity: number;
    total: number;
}

export interface PaymentTypes {
    id: number;
    amount: number;
    change: number;
    overalltotal: number;
    orderdate: string;
}