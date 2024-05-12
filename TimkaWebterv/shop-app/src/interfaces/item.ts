export interface Item {
    id: number;
    name: string;
    price: number;
    description?: string;
    amount?: number;
    discountPercent?: number;
    picture?: string;
}
