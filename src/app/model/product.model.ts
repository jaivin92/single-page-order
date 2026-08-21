

// export class ProductModel {
//   Id? :number;
//   Name?: string;
//   Price?: number;
//   CategoryName?: string;
//   Icon?: string;
//   Stock?: 'in' | 'low';
// }
export interface Product {
  id: number;
  name: string;
  price: number;
  cat: string;
  icon: string;
  stock: 'in' | 'low';
}
