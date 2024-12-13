import { Card } from "primereact/card";
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Paginator } from "primereact/paginator";
import axios from "axios";

interface Document {
  file_id: number;
  file_name: string;
  file_type: string;
  pages: number;
}

interface PrintJob {
  id: number;
  document: Document;
  copies: number;
  page_size: number;
  double_sided: boolean;
  student_id: number;
}

interface LogEntry {
  id: number;
  description: string;
  student_id: number;
  printer_id: number;
  print_job: PrintJob;
  date: string;
}

const SPSO_History = () => {
  const [history, setHistory] = useState<LogEntry[]>([]);
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(5);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  // Fetch dữ liệu từ API
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/log");
        setHistory(response.data);
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
      }
    };

    fetchLogs();
  }, []);

  // Hàm lọc theo mô tả hoặc ID người dùng
  const filteredHistory = history.filter(
    (entry) =>
      entry.description.toLowerCase().includes(searchText.toLowerCase()) ||
      entry.student_id.toString().includes(searchText)
  );

  // Dữ liệu phân trang
  const paginatedHistory = filteredHistory.slice(first, first + rows);

  const handlePageChange = (e: any) => {
    setFirst(e.first);
    setRows(e.rows);
  };

  const handleViewDetails = (log: LogEntry) => {
    setSelectedLog(log);
    setShowDialog(true);
  };

  const renderDialogFooter = () => (
    <div>
      <Button
        label="Đóng"
        icon="pi pi-times"
        onClick={() => setShowDialog(false)}
        className="p-button-text"
      />
    </div>
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
          maxWidth: "1200px",
          borderRadius: "12px",
          marginBottom: "2rem",
          boxSizing: "border-box",
        }}
      >
        <h3 style={{ margin: 0, textAlign: "left", fontSize: "30px" }}>
          Lịch sử hoạt động
        </h3>
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
            placeholder="Nhập MSSV..."
            style={{ width: "30%" }}
          />
        </div>
        <DataTable
          value={paginatedHistory}
          responsiveLayout="scroll"
          className="p-datatable-gridlines p-datatable-striped"
          style={{
            border: "2px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <Column field="id" header="ID" sortable />
          <Column field="description" header="Mô tả" sortable />
          <Column field="student_id" header="MSSV" sortable />
          <Column field="printer_id" header="ID Máy in" sortable />
          <Column
            field="print_job.id"
            header="ID PrintJob"
            body={(rowData) => rowData.print_job?.id}
            sortable
          />
          <Column
            body={(rowData) => (
              <Button
                label="Xem chi tiết"
                icon="pi pi-eye"
                onClick={() => handleViewDetails(rowData)}
                className="p-button-info"
              />
            )}
            header="Hành động"
          />
        </DataTable>

        {/* Paginator */}
        <Paginator
          first={first}
          rows={rows}
          totalRecords={filteredHistory.length}
          onPageChange={handlePageChange}
          template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
        />
      </Card>

      {/* Dialog chi tiết */}
      <Dialog
        header="Chi tiết PrintJob"
        visible={showDialog}
        style={{ width: "50vw" }}
        footer={renderDialogFooter()}
        onHide={() => setShowDialog(false)}
      >
        {selectedLog && (
          <div>
           
            <p>
              <strong>Tên File:</strong>{" "}
              {selectedLog.print_job?.document.file_name}
            </p>
            <p>
              <strong>Loại File:</strong>{" "}
              {selectedLog.print_job?.document.file_type}
            </p>
            <p>
              <strong>Số Trang:</strong> {selectedLog.print_job?.document.pages}
            </p>
            <p>
              <strong>Số Bản In:</strong> {selectedLog.print_job?.copies}
            </p>
            <p>
              <strong>Kích Thước Trang:</strong> {selectedLog.print_job?.page_size}
            </p>
            <p>
              <strong>In Hai Mặt:</strong>{" "}
              {selectedLog.print_job?.double_sided ? "Có" : "Không"}
            </p>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default SPSO_History;
