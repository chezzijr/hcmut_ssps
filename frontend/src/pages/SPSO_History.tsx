import { Card } from "primereact/card";
import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button"; // Import PrimeReact Button
import { Toast } from "primereact/toast"; // Import Toast để hiển thị thông báo
import { InputText } from "primereact/inputtext"; // Import InputText để tạo ô tìm kiếm

interface History {
  id: number;
  username: string;
  time: string; // Sử dụng kiểu string cho thời gian
  fileName: string;
}

const SPSO_History = () => {
  const [history, setHistory] = useState<History[]>([
    {
      id: 1,
      username: "Người dùng A",
      time: "2024-12-01 10:30:00",
      fileName: "File1.pdf",
    },
    {
      id: 2,
      username: "Người dùng B",
      time: "2024-12-02 12:45:00",
      fileName: "File2.pdf",
    },
    {
      id: 3,
      username: "Người dùng C",
      time: "2024-12-03 15:00:00",
      fileName: "File3.pdf",
    },
  ]);

  const [toast, setToast] = useState<any>(null);
  const [searchText, setSearchText] = useState<string>("");

  // Hàm lọc theo tên người dùng
  const filteredHistory = history.filter((entry) =>
    entry.username.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div
      className="spso-history"
      style={{
        padding: "20px",
        width: "100%",
        height: "100vh",
        boxSizing: "border-box",
      }}
    >
      {/* Card cho Header */}
      <Card
        style={{
          width: "100%",
          maxWidth: "1200px", // Giới hạn chiều rộng tối đa
          borderRadius: "12px",
          marginBottom: "2rem",
          boxSizing: "border-box",
        }}
      >
        <h3 style={{ margin: 0, textAlign: "left" }}>Lịch sử hoạt động</h3>
      </Card>

      {/* DataTable hiển thị lịch sử */}
      <Card
        style={{
          width: "100%",
          maxWidth: "1200px",
          borderRadius: "12px",
          padding: "1rem",
          backgroundColor: "#fff",
        }}
      >
        {/* Tìm kiếm */}
        <div
          style={{ marginBottom: "1rem", width: "100%", maxWidth: "1200px" }}
        >
          <InputText
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Nhập tên người dùng..."
            style={{ width: "50%" }}
          />
        </div>
        <DataTable
          value={filteredHistory}
          responsiveLayout="scroll"
          className="p-datatable-bordered p-datatable-striped" // Thêm lớp CSS để tạo đường viền cho bảng
          style={{
            border: "2px solid #ccc", // Đường viền cho bảng
            borderRadius: "8px", // Bo góc bảng
          }}
        >
          <Column
            field="username"
            header="Tên người dùng"
            sortable // Thêm thuộc tính sortable để sắp xếp theo tên người dùng
          />
          <Column
            field="time"
            header="Thời gian"
            sortable // Sắp xếp theo thời gian
          />
          <Column
            field="fileName"
            header="Tên file"
            sortable // Thêm thuộc tính sortable để sắp xếp theo tên file
          />

          <Column
            body={(rowData) => (
              <Button
                label="Xem"
                icon="pi pi-eye"
                onClick={() =>
                  toast?.current?.show({
                    severity: "info",
                    summary: "Thông tin",
                    detail: `Đang xem file: ${rowData.fileName}`,
                    life: 3000,
                  })
                }
                className="p-button-info"
              />
            )}
            header="Hành động"
          />
        </DataTable>
      </Card>
    </div>
  );
};

export default SPSO_History;
