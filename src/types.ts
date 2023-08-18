import React from "react";
import { DateValue } from "@mantine/dates";

export interface NavTypes {
    label: string;
    route?: string;
    icon: React.ReactNode;
}

export interface MedicineType {
    id?: number | undefined;
    batchno: string;
    name: string;
    specification?: string;
    price: number;
    expiry: string;
    updatedAt?: string;
    createdAt?: string
}

export interface OtherSupplyTypes {
    createdAt:string;
    description:string
    expiry:string;
    id: number;
    name:string;
    price: string;
    updatedAt: string;
}

export interface StockTypes {
    id: number;
    createdAt: string;
    quantity: number;
    stockfor: string;
    updatedAt: string;
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

export interface StockTypes {
    createdAt: string;
    id:number
    quantity: number
    stockfor: string;
    updatedAt: string;
}