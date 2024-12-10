import { Card } from "primereact/card";
import React, { useState, useEffect } from "react";
import { handleGetPrinter } from "../services/spsoService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button"; // Import PrimeReact Button
import { Toast } from "primereact/toast"; // Import Toast để hiển thị thông báo
import { InputText } from "primereact/inputtext"; // Import InputText để tạo ô tìm kiếm




interface Printer {
  id: number;
  name: string;
  is_running: boolean; // Trạng thái máy in: "Đang in" hoặc "Không đang in"
  status: number; // Trạng thái hoạt động của máy in
}
const SPSO_Management = () => {
  const [printers, setPrinters] = useState<Printer[]>([]);
  const [toast, setToast] = useState<any>(null);
  const [searchText, setSearchText] = useState<string>("");
  // Hàm thay đổi trạng thái hoạt động của máy in
  const togglePrinteris_running = (printerId: number) => {
    setPrinters((prevPrinters) =>
      prevPrinters.map((printer) =>
        printer.id === printerId
          ? {
            ...printer,
            is_running:
              printer.is_running === true ? false : true,
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
  useEffect(() => {
    const fetchPrinters = async () => {
      try {
        const response = await handleGetPrinter();
        const formattedData: Printer[] = ((response.data) as {
          map: any; id: number, status: number, is_running: boolean
        }).map((item: any) => ({
          id: item.id,
          name: `Máy in ${item.id}`,
          status: item.status,
          is_running: item.is_running
        }));
        setPrinters(formattedData); // Lưu vào state
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.error(`Lỗi load máy in: ${e.message}`);
        } else {
          console.error('Lỗi không xác định khi load máy in.');
        }
      }
    };
    fetchPrinters();
  }, []);
  console.log(printers);
  // Hàm vô hiệu hóa hoặc kích hoạt máy in
  const togglePrinterActivation = (printerId: number) => {
    setPrinters((prevPrinters) =>
      prevPrinters.map((printer) =>
        printer.id === printerId
          ? printer.is_running === true
            ? // Nếu máy in đang in, không thể vô hiệu hóa
            toast?.current?.show({
              severity: "error",
              summary: "Không thành công",
              detail: "Không thể vô hiệu hóa khi máy in đang in.",
              life: 3000,
            })
            : { ...printer, status: !printer.status } // Vô hiệu hóa hoặc kích hoạt máy in
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
    <div className="spso-management" style={{ padding: "20px" }}>
      {/* Card Header */}
      <Card
        style={{
          width: "100%",
          maxWidth: "1200px",
          borderRadius: "12px",
          marginBottom: "2rem",
          boxSizing: "border-box",
        }}
      >
        <h3 style={{ margin: 0, textAlign: "left" }}>Cài đặt máy in</h3>
      </Card>

      {/* DataTable Card */}
      <Card
        style={{
          width: "100%",
          maxWidth: "1200px",
          borderRadius: "12px",
          padding: "1rem",
          backgroundColor: "#fff",
          overflow: "hidden", // Fix layout issues
        }}
      >
        {/* Search Bar */}
        <div style={{ marginBottom: "1rem", width: "100%", maxWidth: "1200px" }}>
          <InputText
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Nhập tên máy in..."
            style={{ width: "25%" }}
          />
        </div>

        {/* DataTable */}
        <DataTable
          value={filteredPrinters}
          scrollable // Enable scrolling
          scrollHeight="400px" // Set table height
          className="p-datatable-bordered p-datatable-striped"
          style={{
            border: "2px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <Column
            field="name"
            header="Tên máy in"
            sortable
          />
          <Column
            field="is_running"
            header="Trạng thái"
          />
          <Column
            body={(rowData) => (
              <Button
                label={rowData.status ? "Vô hiệu hóa" : "Kích hoạt"}
                icon={rowData.status ? "pi pi-times" : "pi pi-check"}
                onClick={() => togglePrinterActivation(rowData.id)}
                className={`p-button-${rowData.status ? "danger" : "success"}`}
                disabled={rowData.is_running === true}
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





