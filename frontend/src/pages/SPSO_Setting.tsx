import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { InputNumber } from "primereact/inputnumber";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
import axios from "axios";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const SPSO_Setting: React.FC = () => {
  const [pagePrice, setPagePrice] = useState<number>(0); // Giá tiền mỗi trang
  const [selectedPageCount, setSelectedPageCount] = useState<number>(20); // Số trang mặc định
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]); // Định dạng file được phép

  const formats = [
    { label: ".docx", value: "docx" },
    { label: ".pdf", value: "pdf" },
    { label: ".png", value: "png" },
    { label: ".pptx", value: "pptx" },
    { label: ".xls", value: "xls" },
    { label: ".txt", value: "txt" },
    { label: ".doc", value: "doc" },
  ];

  // Fetch dữ liệu từ API
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get("http://localhost:8000/system");
        const data = response.data;
        setSelectedPageCount(data.default_num_pages_per_sem);
        setPagePrice(data.prices_per_page);
        setSelectedFormats(data.allowed_file_types);
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
      }
    };

    fetchSettings();
  }, []);

  // Cập nhật dữ liệu lên API
  const handleSaveSettings = async () => {
    const updatedData = {
      default_num_pages_per_sem: selectedPageCount,
      prices_per_page: pagePrice,
      allowed_file_types: selectedFormats,
    };

    try {
      await axios.post("http://localhost:8000/system/update", updatedData);
      alert("Cập nhật cài đặt thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật dữ liệu:", error);
      alert("Cập nhật cài đặt thất bại!");
    }
  };

  return (
    <div
      className="spso-setting"
      style={{
        height: "100vh",
        width: "100%",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      {/* Header Card */}
      <Card
        style={{
          width: "100%",
          maxWidth: "1200px",
          borderRadius: "12px",
          marginBottom: "2rem",
          boxSizing: "border-box",
        }}
      >
        <h3 style={{ margin: 0, textAlign: "left", fontSize: "30px" }}>Cài đặt hệ thống</h3>
      </Card>

      {/* Settings Card */}
      <Card
        style={{
          width: "100%",
          maxWidth: "1200px",
          borderRadius: "12px",
          padding: "1rem",
          backgroundColor: "#fff",
        }}
      >
        {/* Nhập giá tiền mỗi trang in */}
        <div className="p-mb-4">
          <div
            className="p-d-flex p-jc-between p-ai-center"
            style={{ marginBottom: "1rem" }}
          >
            <label
              htmlFor="pagePrice"
              style={{
                fontWeight: "bold",
                marginRight: "10px",
                flexShrink: 0,
              }}
            >
              Giá tiền mỗi trang in (VNĐ)
            </label>
            <InputNumber
              id="pagePrice"
              value={pagePrice}
              onValueChange={(e) => setPagePrice(e.value || 0)}
              min={0}
              max={100000}
              className="p-d-block"
              style={{ width: "20%" }}
            />
          </div>
        </div>

        {/* Số trang in mặc định */}
        <div className="p-mb-4">
          <div
            className="p-d-flex p-jc-between p-ai-center"
            style={{ marginBottom: "1rem" }}
          >
            <label
              htmlFor="pageCount"
              style={{
                fontWeight: "bold",
                marginRight: "10px",
                flexShrink: 0,
              }}
            >
              Số trang in mặc định
            </label>
            <InputNumber
              id="pageCount"
              value={selectedPageCount}
              onValueChange={(e) => setSelectedPageCount(e.value || 1)}
              min={1}
              max={1000}
              className="p-d-block"
              style={{ width: "20%" }}
            />
          </div>
        </div>

        {/* Các định dạng file được cho phép */}
        <div className="p-mb-4">
          <div
            className="p-d-flex p-jc-between p-ai-center"
            style={{ marginBottom: "1rem" }}
          >
            <label
              htmlFor="formats"
              style={{
                fontWeight: "bold",
                marginRight: "10px",
                flexShrink: 0,
              }}
            >
              Các định dạng file được cho phép
            </label>
            <MultiSelect
              id="formats"
              value={selectedFormats}
              options={formats}
              onChange={(e) => setSelectedFormats(e.value)}
              optionLabel="label"
              placeholder="Chọn định dạng file"
              className="p-d-block"
              display="chip"
              style={{ width: "20%" }}
            />
          </div>
        </div>

        {/* Save Settings Button */}
        <Button
          label="Lưu cài đặt"
          icon="pi pi-save"
          className="p-button-success p-mt-3"
          style={{ width: "20%" }}
          onClick={handleSaveSettings}
        />
      </Card>
    </div>
  );
};

export default SPSO_Setting;