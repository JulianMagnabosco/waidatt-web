export interface ImageProduct {
  id: number;
  image: string;  // URL
  image_order: number;
}
export class Product {
    id: number;
    name: string;
    description: string;
    product_type: string;
    price: number;
    images?: ImageProduct[];

    constructor(id: number, name: string, description: string, product_type: string, price: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.product_type = product_type;
        this.price = price;
    }
}
