import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import Header from "../header/Header";
import { FaUpload } from "react-icons/fa";

const UserPrinting: React.FC = () => {
  const [preview, setPreview] = useState(false);
  const paperSizes = [
    { label: "A5", value: "A5" },
    { label: "A4", value: "A4" },
    { label: "A3", value: "A3" },
    { label: "A1", value: "A1" },
    { label: "A0", value: "A0" },
    { label: "Ảnh", value: "Ảnh" },
  ];

  const printModes = [
    { label: "Đen trắng - 1 mặt", value: "Đen trắng - 1 mặt" },
    { label: "Đen trắng - 2 mặt", value: "Đen trắng - 1 mặt" },
    { label: "Màu - 1 mặt", value: "Màu - 1 mặt" },
    { label: "Màu - 2 mặt", value: "Màu - 2 mặt" },
  ];

  const printers = [
    { label: "Máy in 1", value: "printer1" },
    { label: "Máy in 2", value: "printer2" },
    { label: "Máy in 3", value: "printer3" },
    { label: "Máy in 4", value: "printer4" },
  ];

  return (
    <main style={{ flex: 1, padding: "2rem", backgroundColor: "#E6F3FF" }}>
      <div className="userPrintingTitle">
        <Header title="In tài liệu" />
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
        }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="upload"
            style={{ display: "block", marginBottom: "0.5rem" }}
          >
            Tải tệp lên
          </label>
          <div
            style={{
              display: "flex",
              border: "2px dashed #ccc",
              padding: "1rem",
              borderRadius: "8px",
              height: "220px",
              color: "black",
              fontWeight: "normal",
              fontSize: "18px",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontSize: "48px",
                color: "#777777",
              }}
            >
              <FaUpload />
            </div>
            Kéo thả file vào đây hoặc chọn từ máy tính
          </div>
        </div>

        <div
          className="form-group"
          style={{
            marginBottom: "1rem",
            display: "flex",
            gap: "2rem",
            justifyContent: "space-between",
            padding: "5px 10px",
          }}
        >
          <div
            style={{
              flex: "1 1 calc(50% - 1rem)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label htmlFor="paperSize">Kích thước giấy</label>
            <Dropdown
              id="paperSize"
              options={paperSizes}
              placeholder="Chọn kích thước giấy in"
              style={{
                backgroundColor: "#E6F3FF",
              }}
            />
          </div>
          <div
            style={{
              flex: "1 1 calc(50% - 1rem)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label htmlFor="startPage">Số bản in</label>
            <InputText
              id="startPage"
              placeholder="Chọn số bản in"
              style={{ backgroundColor: "#E6F3FF" }}
            />
          </div>
        </div>

        <div
          className="form-group"
          style={{
            marginBottom: "1rem",
            display: "flex",
            gap: "2rem",
            justifyContent: "space-between",
            padding: "5px 10px",
          }}
        >
          <div
            style={{
              flex: "1 1 calc(50% - 1rem)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label htmlFor="printMode">Chế độ in</label>
            <Dropdown
              id="printMode"
              options={printModes}
              placeholder="Chọn chế độ in"
              style={{
                backgroundColor: "#E6F3FF",
              }}
            />
          </div>

          <div
            style={{
              flex: "1 1 calc(50% - 1rem)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label htmlFor="printer">Máy in</label>
            <Dropdown
              id="printer"
              options={printers}
              placeholder="Chọn máy in"
              style={{
                backgroundColor: "#E6F3FF",
              }}
            />
          </div>
        </div>

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
              flex: "1 1 calc(50% - 1rem)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label htmlFor="startPage">Bắt đầu</label>
            <InputText
              id="startPage"
              placeholder="Chọn trang bắt đầu in"
              style={{ backgroundColor: "#E6F3FF" }}
            />
          </div>
          <div
            style={{
              flex: "1 1 calc(50% - 1rem)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label htmlFor="endPage">Kết thúc</label>
            <InputText
              id="endPage"
              placeholder="Chọn trang kết thúc in"
              style={{ backgroundColor: "#E6F3FF" }}
            />
          </div>
        </div>

        <div
          className="form-group"
          style={{ marginBottom: "1rem", padding: "0px 10px" }}
        >
          <Checkbox
            inputId="preview"
            checked={preview}
            onChange={(e) => setPreview(e.checked || false)}
          />
          <label
            htmlFor="preview"
            style={{
              marginLeft: "0.5rem",
              color: "black",
              fontWeight: "normal",
              fontSize: "20px",
            }}
          >
            Xem trước khi in
          </label>
        </div>

        <Button
          label="Bắt đầu in"
          className="p-button-primary"
          style={{
            width: "100%",
          }}
        />
      </div>
    </main>
  );
};

export default UserPrinting;
