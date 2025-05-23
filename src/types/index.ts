export interface Product {
    id: number;
    imageURL: string;
    name: string;
    type: string;
    price: number;
    currency: string;
    color: string;
    gender: string;
    quantity: number;
}

export interface CartItem extends Product {
    quantityTotalCart: number;
    subtotal: number;
}

export type FilterValues = {
    color: string[];
    gender: string[];
    price: string[];
    type: string[];
};

export type FilterType = keyof FilterValues; 