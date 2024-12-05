import { Card } from "primereact/card";
import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button"; // Import PrimeReact Button
import { Toast } from "primereact/toast"; // Import Toast để hiển thị thông báo
import { InputText } from "primereact/inputtext"; // Import InputText để tạo ô tìm kiếm

interface Printer {
  id: number;
  name: string;
  status: string; // Trạng thái máy in: "Đang in" hoặc "Không đang in"
  isActive: boolean; // Trạng thái hoạt động của máy in
}

const SPSO_Management = () => {
  const [printers, setPrinters] = useState<Printer[]>([
    { id: 1, name: "Máy in A", status: "Không đang in", isActive: true },
    { id: 2, name: "Máy in B", status: "Đang in", isActive: true },
    { id: 3, name: "Máy in C", status: "Không đang in", isActive: false },
  ]);

  const [toast, setToast] = useState<any>(null);
  const [searchText, setSearchText] = useState<string>("");

  // Hàm thay đổi trạng thái hoạt động của máy in
  const togglePrinterStatus = (printerId: number) => {
    setPrinters((prevPrinters) =>
      prevPrinters.map((printer) =>
        printer.id === printerId
          ? {
              ...printer,
              status:
                printer.status === "Đang in" ? "Không đang in" : "Đang in",
            }
          : printer
      )
    );
    toast?.current?.show({
      severity: "success",
      summary: "Thành công",
      detail: "Đã thay đổi trạng thái máy in",
      life: 3000,
    });
  };

  // Hàm vô hiệu hóa hoặc kích hoạt máy in
  const togglePrinterActivation = (printerId: number) => {
    setPrinters((prevPrinters) =>
      prevPrinters.map((printer) =>
        printer.id === printerId
          ? printer.status === "Đang in"
            ? // Nếu máy in đang in, không thể vô hiệu hóa
              toast?.current?.show({
                severity: "error",
                summary: "Không thành công",
                detail: "Không thể vô hiệu hóa khi máy in đang in.",
                life: 3000,
              })
            : { ...printer, isActive: !printer.isActive } // Vô hiệu hóa hoặc kích hoạt máy in
          : printer
      )
    );
  };

  // Hàm xóa máy in
  const deletePrinter = (printerId: number) => {
    setPrinters((prevPrinters) =>
      prevPrinters.filter((printer) => printer.id !== printerId)
    );
    toast?.current?.show({
      severity: "error",
      summary: "Đã xóa",
      detail: "Máy in đã được xóa",
      life: 3000,
    });
  };

  // Hàm lọc theo tên máy in
  const filteredPrinters = printers.filter((printer) =>
    printer.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="spso-management">
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
        <h3 style={{ margin: 0, textAlign: "left" }}>Cài đặt máy in</h3>
      </Card>

      {/* Tìm kiếm */}

      {/* DataTable hiển thị máy in */}
      <Card
        style={{
          width: "100%",
          maxWidth: "1200px",
          borderRadius: "12px",
          padding: "1rem",
          backgroundColor: "#fff",
        }}
      >
        <div
          style={{ marginBottom: "1rem", width: "100%", maxWidth: "1200px" }}
        >
          <InputText
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Nhập tên máy in..."
            style={{ width: "25%" }}
          />
        </div>

        <DataTable
          value={filteredPrinters}
          responsiveLayout="scroll"
          className="p-datatable-bordered p-datatable-striped" // Thêm lớp CSS để tạo đường viền cho bảng
          style={{
            border: "2px solid #ccc", // Đường viền cho bảng
            borderRadius: "8px", // Bo góc bảng
          }}
          // Bật tính năng sắp xếp theo tên máy in
        >
          <Column
            field="name"
            header="Tên máy in"
            sortable // Thêm thuộc tính sortable để sắp xếp theo tên máy in
          />
          <Column field="status" header="Trạng thái" />

          <Column
            body={(rowData) => (
              <Button
                label={rowData.isActive ? "Vô hiệu hóa" : "Kích hoạt"}
                icon={rowData.isActive ? "pi pi-times" : "pi pi-check"}
                onClick={() => togglePrinterActivation(rowData.id)}
                className={`p-button-${
                  rowData.isActive ? "danger" : "success"
                }`}
                disabled={rowData.status === "Đang in"} // Vô hiệu hóa nút nếu máy in đang in
              />
            )}
            header="Vô hiệu hóa/Kích hoạt"
          />
          <Column
            body={(rowData) => (
              <Button
                label="Xóa"
                icon="pi pi-trash"
                onClick={() => deletePrinter(rowData.id)}
                className="p-button-danger"
              />
            )}
            header="Hành động"
          />
        </DataTable>
      </Card>
    </div>
  );
};

export default SPSO_Management;
