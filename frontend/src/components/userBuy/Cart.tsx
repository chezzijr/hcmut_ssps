import React from "react";
import { DataView } from "primereact/dataview";
import { Button } from "primereact/button";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface CartProps {
  items: Product[];
  onRemove: (id: string) => void;
}
const Cart: React.FC<CartProps> = ({ items, onRemove }) => {
  const renderCartItem = (product: Product) => {
    return (
      <div className="p-grid p-justify-between p-align-center">
        <div className="p-col">{product.name}</div>
        <div className="p-col p-text-right">
          <h4>{product.price.toLocaleString()}đ</h4>
          <Button
            icon="pi pi-times"
            className="p-button-danger p-button-rounded"
            onClick={() => onRemove(product.id)}
          />
        </div>
      </div>
    );
  };
  return (
    <div>
      <h2>Giỏ hàng</h2>
      <DataView value={items} layout="list" itemTemplate={renderCartItem} />
    </div>
  );
};
export default Cart;
