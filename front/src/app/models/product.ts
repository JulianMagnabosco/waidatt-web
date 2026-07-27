export class Product {
    id: number;
    name: string;
    description: string;
    product_type: string;
    price: number;
    imageUrl?: string;

    constructor(id: number, name: string, description: string, product_type: string, price: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.product_type = product_type;
        this.price = price;
    }
}
