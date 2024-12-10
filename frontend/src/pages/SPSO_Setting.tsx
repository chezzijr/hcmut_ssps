import React, { useState } from "react";
import { Card } from "primereact/card";
import { InputNumber } from "primereact/inputnumber";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const SPSO_Setting: React.FC = () => {
  const [selectedPageCount, setSelectedPageCount] = useState(1);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [pricePerPage, setPricePerPage] = useState<number>(0);

  const formats = [
    { label: ".docx", value: "docx" },
    { label: ".pdf", value: "pdf" },
    { label: ".png", value: "png" },
    { label: ".pptx", value: "pptx" },
    { label: ".xls", value: "xls" },
  ];

  return (
    <div className="spso-setting" style={{ padding: "20px", textAlign: "left"}}>
      {/* Header Card */}
      <Card
        style={{
          backgroundColor: "#fff",
          width: "100%",
          maxWidth: "1200px", // Giới hạn chiều rộng tối đa để không bị quá rộng
          borderRadius: "12px",
          marginBottom: "2rem",
          boxSizing: "border-box",
        }}
      >
        <h3 style={{ margin: 0, textAlign: "left" }}>Cài đặt máy in</h3>
      </Card>

      {/* Settings Card */}
      <Card
        style={{
          width: "100%",
          maxWidth: "1200px", // Giới hạn chiều rộng tối đa để không bị quá rộng
          borderRadius: "12px",
          padding: "1rem",
          backgroundColor: "#fff",
        }}
      >
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
              onValueChange={(e) => setSelectedPageCount(e.value)}
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

        {/* Giá mỗi trang in */}
        <div className="p-mb-4">
          <div
            className="p-d-flex p-jc-between p-ai-center"
            style={{ marginBottom: "1rem" }}
          >
            <label
              htmlFor="pricePerPage"
              style={{
                fontWeight: "bold",
                marginRight: "10px",
                flexShrink: 0,
              }}
            >
              Giá mỗi trang in (VND)
            </label>
            <InputNumber
              id="pricePerPage"
              value={pricePerPage}
              onValueChange={(e) => setPricePerPage(e.value)}
              min={0}
              className="p-d-block"
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
        />
      </Card>
    </div>
  );
};

export default SPSO_Setting;
