import React, { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import Header from "../header/Header";
import axios from "axios";

const UserBuying: React.FC = () => {
    const [pageCount, setPageCount] = useState("");
    const [totalPrice, setTotalPrice] = useState<number | null>(null);
    const toast = useRef<Toast>(null);
    const handlePageCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const count = e.target.value;
        setPageCount(count);

        const parsedCount = parseInt(count, 10);
        if (!isNaN(parsedCount)) {
            setTotalPrice(parsedCount * 500);
        } else {
            setTotalPrice(null);
        }
    };

    return (
        <main
            style={{
                flex: 1,
                padding: "40px",
                backgroundColor: "#E6F3FF",
                height: "100%",
            }}
        >
            <div className="userPrintingTitle">
                <Header title="Mua giấy in" />
            </div>

            <div
                style={{
                    backgroundColor: "#fff",
                    padding: "2rem",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    color: "#1E90FF",
                    fontWeight: "bold",
                    fontSize: "24px",
                    textAlign: "left",
                }}
            >
                <div
                    className="form-group"
                    style={{
                        display: "flex",
                        gap: "2rem",
                        marginBottom: "1rem",
                        justifyContent: "space-between",
                        padding: "5px 10px",
                    }}
                >
                    <div
                        style={{
                            flex: "1 1",
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                        }}
                    >
                        <label htmlFor="pageCount">Chọn số trang mua</label>
                        <InputText
                            id="pageCount"
                            value={pageCount}
                            onChange={handlePageCountChange}
                            placeholder="Chọn số trang để mua"
                            style={{ backgroundColor: "#E6F3FF" }}
                        />
                    </div>
                </div>

                {totalPrice !== null && (
                    <div
                        style={{ marginBottom: "1rem", fontSize: "20px", color: "black" }}
                    >
                        {" "}
                        Giá tiền: {totalPrice.toLocaleString()} đ{" "}
                    </div>
                )}

                <Button
                    label="Mua hàng"
                    onClick={() => {
                        axios.post("http://localhost:8000/buy_pages", {
                            pages: parseInt(pageCount),
                        }, {
                            headers: {
                                Authorization: localStorage.getItem("authorization"),
                            },
                        }).then((res) => {
                            alert("Mua hàng thành công");
                        }).catch((err) => {
                            alert("Mua hàng thất bại" + err);
                        })
                    }}
                    className="p-button-primary"
                    style={{
                        width: "100%",
                    }}
                />
            </div>
        </main>
    );
};

export default UserBuying;
