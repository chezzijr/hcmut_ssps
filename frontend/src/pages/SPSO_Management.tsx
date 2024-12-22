import { Card } from "primereact/card";
import React, { useEffect, useState,useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { InputText as PrimeInputText } from "primereact/inputtext";
import axios from "axios";
import { handleGetSystem, handleDeletePrinter, handleGetPrinter, handleUpdatePrinter } from "../services/spsoService";
import { CgEnter } from "react-icons/cg";

interface Printer {
  id: number;
  name?: string;
  model: string;
  brand: string;
  description: string
  is_running: boolean; // "Đang in" hoặc "Không đang in"
  status: boolean; // true: Kích hoạt, false: Vô hiệu hóa
}

const SPSO_Management = () => {
const [showConfirmDialog, setShowConfirmDialog] = useState(false);
const [selectedPrinterId, setSelectedPrinterId] = useState<number | null>(null);

  const [printers, setPrinters] = useState<Printer[]>([]);
 /*  const [toast, setToast] = useState<any>(null); */
  const [searchText, setSearchText] = useState<string>("");
  const [showAddPrinterDialog, setShowAddPrinterDialog] = useState(false);
  const [newPrinter, setNewPrinter] = useState({
    brand: "",
    model: "",
    description: "",
    status: 1,
    is_running: false,
  });
  const toast = useRef<Toast>(null); // Sử dụng useRef cho Toast
  useEffect(() => {
    const fetchPrinters = async () => {
      try {
        const response = await handleGetPrinter();
        const formattedData = ((response.data) as
          {
            map: any, id: number, brand: string,
            model: string, description: string,
            status: number, is_running: boolean
          }).map((item: any) => ({
            id: item.id,
            name: "" + item.id,
            model: item.model,
            brand: item.brand,
            description: item.description,
            status: item.status,
            is_running: item.is_running
          }))

        setPrinters(formattedData);
      } catch (e) {
        console.log(`Lỗi load máy in: ${e}`);
      }
    };

    fetchPrinters();
  }, []);
  const confirmDeletePrinter = (printerId: number) => {
    setSelectedPrinterId(printerId); // Lưu lại ID máy in
    setShowConfirmDialog(true); // Hiển thị Dialog
  };
  const handleConfirmDelete = async () => {
    if (selectedPrinterId !== null) {
      await deletePrinter(selectedPrinterId); // Xóa máy in
      setShowConfirmDialog(false); // Đóng Dialog
      setSelectedPrinterId(null); // Reset ID
    }
  };
  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
    setSelectedPrinterId(null);
  };
    
  //Hàm thay đổi trạng thái hoạt động của máy in
  const togglePrinterStatus = (printerId: number) => {
    setPrinters((prevPrinters) =>
      prevPrinters.map((printer) =>
        printer.id === printerId
          ? {
            ...printer,
            status:
              printer.status === true ? false : true,
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
  const togglePrinterActivation = async (printerId: number) => {
    setPrinters((prevPrinters) =>
      prevPrinters.map((printer) => {
        if (printer.id === printerId) {
          if (printer.is_running) {
            toast?.current?.show({
              severity: "error",
              summary: "Không thành công",
              detail: "Không thể vô hiệu hóa khi máy in đang in.",
              life: 3000,
            });
            return printer; // Không thay đổi trạng thái
          }
          return { ...printer, status: !printer.status }; // Cập nhật trạng thái
        }
        return printer;
      })
    );
  };

  //Hàm update máy in 
  const updatePrinter = async (printerId: number) => {
    await togglePrinterActivation(printerId);

    let printer = printers.find((printer) => printer.id === printerId)
    if (printer) {
      const name = printer.name;
      printer.name = undefined;
      printer.status = !printer.status

      await handleUpdatePrinter(printer);

      printer.name = name; // Khôi phục lại name
    }
  };

  // Hàm xóa máy in
  const deletePrinter = async (printerId: number) => {
    try {
      await handleDeletePrinter(printerId); // Xóa trên server
      setPrinters((prevPrinters) =>
        prevPrinters.filter((printer) => printer.id !== printerId)
      );
  
      toast?.current?.show({
        severity: "success",
        summary: "Đã xóa",
        detail: `Máy in với ID ${printerId} đã được xóa.`,
        life: 3000,
      });
    } catch (error) {
      toast?.current?.show({
        severity: "error",
        summary: "Lỗi",
        detail: "Xóa máy in thất bại.",
        life: 3000,
      });
    }
  };
  // Hàm lọc theo tên máy in
  const filteredPrinters = printers.filter((printer) =>
    printer.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  // Add printer
  const handleAddPrinter = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/printer/add",
        newPrinter, {
        headers: {
          Authorization: localStorage.getItem("authorization"),
        }
      }
      );
      alert("Thêm máy in thành công!");
      setShowAddPrinterDialog(false);
      setPrinters((prevPrinters) => [
        ...prevPrinters,
        {
          id: response.data.id,
          model: response.data.model,
          brand: response.data.brand,
          description: response.data.description,
          name: ` ${response.data.id}`,
          status: true,
          is_running: false,
        },
      ]);
    } catch (error) {
      console.error("Lỗi khi thêm máy in:", error);
      alert("Thêm máy in thất bại!");
    }
  };

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
      <Toast ref={toast} />
      <Card
        style={{
          width: "100%",
          maxWidth: "1200px",
          borderRadius: "12px",
          marginBottom: "2rem",
          boxSizing: "border-box",
        }}
      >
        <h3 style={{ margin: 0, textAlign: "left", fontSize: "30px" }}>
          Quản lý máy in
        </h3>
      </Card>

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
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <InputText
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Nhập ID máy in..."
            style={{ width: "25%" }}
          />
          <Button
            label="Thêm máy in"
            icon="pi pi-plus"
            onClick={() => setShowAddPrinterDialog(true)}
            className="p-button-success"
          />
        </div>

        <DataTable
          value={filteredPrinters}
          responsiveLayout="scroll"
          className="p-datatable-bordered p-datatable-striped"
          style={{
            border: "2px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <Column field="name" header="ID" sortable />
          <Column
            header="Trạng thái"
            body={(rowData) => (rowData.is_running ? "Đang in" : "Không đang in")}
          />
          <Column
            body={(rowData) => (
              <Button
                label={rowData.status ? "Vô hiệu hóa" : "Kích hoạt"}
                icon={rowData.status ? "pi pi-times" : "pi pi-check"}
                className={`p-button-${rowData.status ? "danger" : "success"}`}
                onClick={() => updatePrinter(rowData.id)}
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
                onClick={() => confirmDeletePrinter(rowData.id)} // Gọi hàm mở Dialog
                className="p-button-danger"
              />
            )}
            header="Hành động"
          />

        </DataTable>
      </Card>

      <Dialog
        header="Thêm máy in mới"
        visible={showAddPrinterDialog}
        style={{ width: "50vw" }}
        modal
        onHide={() => setShowAddPrinterDialog(false)}
      >
        <div>
          <div className="p-field">
            <label htmlFor="brand">Thương hiệu:</label>
            <PrimeInputText
              id="brand"
              value={newPrinter.brand}
              onChange={(e) =>
                setNewPrinter({ ...newPrinter, brand: e.target.value })
              }
              style={{ width: "100%" }}
            />
          </div>
          <div className="p-field">
            <label htmlFor="model">Mẫu:</label>
            <PrimeInputText
              id="model"
              value={newPrinter.model}
              onChange={(e) =>
                setNewPrinter({ ...newPrinter, model: e.target.value })
              }
              style={{ width: "100%" }}
            />
          </div>
          <div className="p-field">
            <label htmlFor="description">Mô tả:</label>
            <PrimeInputText
              id="description"
              value={newPrinter.description}
              onChange={(e) =>
                setNewPrinter({ ...newPrinter, description: e.target.value })
              }
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <div style={{ textAlign: "right", marginTop: "1rem" }}>
          <Button
            label="Hủy"
            icon="pi pi-times"
            className="p-button-secondary"
            onClick={() => setShowAddPrinterDialog(false)}
          />
          <Button
            label="Thêm"
            icon="pi pi-check"
            className="p-button-success"
            onClick={handleAddPrinter}
            style={{ marginLeft: "1rem" }}
          />
        </div>
      </Dialog>
      <Dialog
        header={<div style={{ textAlign: "center", fontWeight: "bold" }}>Xác nhận xóa</div>}
        visible={showConfirmDialog}
        style={{
          width: "35vw",
          borderRadius: "8px",
          padding: "20px",
          
        }}
        modal
        onHide={handleCancelDelete}
        className="confirmation-dialog"
      >
        <div style={{ textAlign: "center", padding: "20px 10px" }}>
          <i
            className="pi pi-exclamation-triangle"
            style={{ fontSize: "2rem", color: "#FFC107", marginBottom: "15px" }}
          ></i>
          <p style={{ fontSize: "1.2rem", fontWeight: "500", color: "#333" }}>
            Bạn có chắc chắn muốn xóa máy in không?
          </p>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
          <Button
            label="Hủy"
            icon="pi pi-times"
            className="p-button-secondary"
            onClick={handleCancelDelete}
            style={{ marginRight: "10px", padding: "10px 20px" }}
          />
          <Button
            label="Đồng ý"
            icon="pi pi-check"
            className="p-button-danger"
            onClick={handleConfirmDelete}
            style={{ padding: "10px 20px" }}
          />
        </div>
      </Dialog>

    </div>
  );
};

export default SPSO_Management;