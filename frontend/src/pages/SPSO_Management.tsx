import { Card } from "primereact/card";
import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button"; // Import PrimeReact Button
import { Toast } from "primereact/toast"; // Import Toast để hiển thị thông báo
import { InputText } from "primereact/inputtext"; // Import InputText để tạo ô tìm kiếm
import { handleGetPrinter, handleUpdatePrinter, handleDeletePrinter } from "../services/spsoService";

interface Printer {
  id: number;
  name: string;
  is_running: string; // Trạng thái máy in: "Đang in" hoặc "Không đang in"
  status: boolean; // Trạng thái hoạt động của máy in
}

const SPSO_Management = () => {
  const [printers, setPrinters] = useState<Printer[]>([]);

  useEffect(() => {
    const fetchPrinters = async () => {
      try {
        const response = await handleGetPrinter();
        const formattedData = ((response.data) as
          {
            map: any, id: number, branch: string,
            model: string, des: string,
            status: number, is_running: boolean
          }).map((item: any) => ({
            id: item.id,
            name: "Máy in " + item.id,
            status: item.status,
            is_running: item.is_running == true ? "Đang in" : "Không đang in"
          }))

        setPrinters(formattedData);
      } catch (e) {
        console.log(`Lỗi load máy in: ${e}`);
      }
    };

    fetchPrinters();
  }, []);

  const [toast, setToast] = useState<any>(null);
  const [searchText, setSearchText] = useState<string>("");

  // Hàm thay đổi trạng thái hoạt động của máy in
  // const togglePrinterStatus = (printerId: number) => {
  //   setPrinters((prevPrinters) =>
  //     prevPrinters.map((printer) =>
  //       printer.id === printerId
  //         ? {
  //           ...printer,
  //           status:
  //             printer.status === "Đang in" ? "Không đang in" : "Đang in",
  //         }
  //         : printer
  //     )
  //   );
  //   toast?.current?.show({
  //     severity: "success",
  //     summary: "Thành công",
  //     detail: "Đã thay đổi trạng thái máy in",
  //     life: 3000,
  //   });
  // };

  // Hàm vô hiệu hóa hoặc kích hoạt máy in
  const togglePrinterActivation = async (printerId: number) => {
    setPrinters((prevPrinters) =>
      prevPrinters.map((printer) =>
        printer.id === printerId
          ? printer.is_running === "Đang in"
            ? // Nếu máy in đang in, không thể vô hiệu hóa
            toast?.current?.show({
              severity: "error",
              summary: "Không thành công",
              detail: "Không thể vô hiệu hóa khi máy in đang in.",
              life: 3000,
            })
            : { ...printer, status: !printer.status }
          : printer
      )
    );
    await handleUpdatePrinter(printerId)
  };

  // Hàm xóa máy in
  const deletePrinter = async (printerId: number) => {
    setPrinters((prevPrinters) =>
      prevPrinters.filter((printer) => printer.id !== printerId)
    );
    toast?.current?.show({
      severity: "error",
      summary: "Đã xóa",
      detail: "Máy in đã được xóa",
      life: 3000,
    });

    await handleDeletePrinter(printerId);
  };

  // Hàm lọc theo tên máy in
  const filteredPrinters = printers.filter((printer) =>
    printer.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div
      className="spso-management"
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
          <Column field="is_running" header="Trạng thái" />

          <Column
            body={(rowData) => (
              <Button
                label={rowData.status ? "Vô hiệu hóa" : "Kích hoạt"}
                icon={rowData.status ? "pi pi-times" : "pi pi-check"}
                onClick={() => togglePrinterActivation(rowData.id)}
                className={`p-button-${rowData.status ? "danger" : "success"
                  }`}
                disabled={rowData.is_running === "Đang in"} // Vô hiệu hóa nút nếu máy in đang in
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
