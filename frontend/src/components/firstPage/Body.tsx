import React from "react";
import "./Body.css";
import BlueButton from "./BlueButton";

const Body: React.FC = () => {
  return (
    <div className="BODY">
      <div className="content">
        <div className="info">
          <div className="line1">In ấn Chuyên nghiệp</div>
          <div className="line2">
            Chất lượng cao - Giao hàng nhanh - Giá cả hợp lý
          </div>
        </div>
        <BlueButton text="Bắt đầu ngay" className="blueButton" to="./login" />
      </div>
    </div>
  );
};

export default Body;
