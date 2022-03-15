export interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  activity: Activity;
}

export interface Activity {
  _id: string;
  name: string;
}

export interface CartItem {
  name: string;
  price: number;
  quantity: number;
  stock: number;
  _id: string;
}

export interface User {
  login: string;
}
