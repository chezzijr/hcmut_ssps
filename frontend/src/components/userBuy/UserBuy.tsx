import React, { useState } from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { DataView } from "primereact/dataview";
import { Panel } from "primereact/panel";
import Cart from "./Cart";
import Header from "../header/Header";
import "./UserBuying.css";
import "./A0.webp";
import "./anh.png";
import "./doublA.jpg";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}
const products: Product[] = [
  {
    id: "1",
    name: "Giấy A5 Double A",
    description: "Định lượng: 80gsm, Số tờ: 10",
    price: 3000,
    image: "./doublA.jpg",
  },
  {
    id: "2",
    name: "Giấy A4 Double A",
    description: "Định lượng: 80gsm, Số tờ: 10",
    price: 5000,
    image: "./doublA.jpg",
  },
  {
    id: "3",
    name: "Giấy A3 Double A",
    description: "Định lượng: 80gsm, Số tờ: 10",
    price: 10000,
    image: "./doublA.jpg",
  },
  {
    id: "4",
    name: "Giấy A1",
    description: "Định lượng: 230gsm, Số tờ: 5",
    price: 11000,
    image: "./A0.webp",
  },
  {
    id: "5",
    name: "Giấy A0",
    description: "Định lượng: 100gsm, Số tờ: 5",
    price: 16000,
    image: "./A0.webp",
  },
  {
    id: "6",
    name: "Giấy in ảnh couche",
    description: "Định lượng: 160gsm, Số tờ: 10",
    price: 12000,
    image: "./anh.png",
  },
];

const UserBuy: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };
  const removeFromCart = (id: string) => {
    setCart(cart.filter((product) => product.id !== id));
  };

  const renderProduct = (product: Product) => {
    return (
      <Card
        title={product.name}
        subTitle={product.description}
        style={{ marginBottom: "2em" }}
      >
        <img src={product.image} alt={product.name} style={{ width: "100%" }} />
        <div className="p-mt-2">
          <h3>{product.price.toLocaleString()}đ</h3>
          <Button
            label="Thêm vào giỏ hàng"
            icon="pi pi-shopping-cart"
            onClick={() => addToCart(product)}
          />
        </div>
      </Card>
    );
  };
  return (
    <div className="UserBuying">
      <Header title="Mua trang in" />
      <div className="userBuyingContent">
        <div className="userBuyingCart">
          <Panel header="Giỏ hàng">
            <Cart items={cart} onRemove={removeFromCart} />
          </Panel>
        </div>
        <div className="userBuyingItems">
          <Panel header="Sản phẩm">
            <DataView
              value={products}
              layout="grid"
              itemTemplate={renderProduct}
            />
          </Panel>
        </div>
      </div>
    </div>
  );
};
export default UserBuy;
