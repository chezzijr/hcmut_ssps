import { Card } from "primereact/card";
import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { InputText as PrimeInputText } from "primereact/inputtext";
import axios from "axios";
import { handleGetSystem, handleDeletePrinter, handleGetPrinter, handleUpdatePrinter } from "../services/spsoService";

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
  const [printers, setPrinters] = useState<Printer[]>([]);
  const [toast, setToast] = useState<any>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [showAddPrinterDialog, setShowAddPrinterDialog] = useState(false);
  const [newPrinter, setNewPrinter] = useState({
    brand: "",
    model: "",
    description: "",
    status: 1,
    is_running: false,
  });

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
            name: "Máy in " + item.id,
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
            : { ...printer, status: !printer.status }
          : printer
      )
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
    printer.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  // Add printer
  const handleAddPrinter = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/printer/add",
        newPrinter
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
          name: `Máy in ${response.data.id}`,
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
            placeholder="Nhập tên máy in..."
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
          <Column field="name" header="Tên máy in" sortable />
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
                onClick={() => deletePrinter(rowData.id)}
                className="p-button-danger"
                disabled={rowData.is_running === true}
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
    </div>
  );
};

export default SPSO_Management;
