import React from "react";
import { Card } from "primereact/card";
import { Chart } from "primereact/chart";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../App.css"; // Import CSS của bạn

const SPSO_Dashboard = () => {
  // Dữ liệu cho biểu đồ 1: Số lượng sinh viên sử dụng dịch vụ theo từng tháng
  const studentChartData = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"],
    datasets: [
      {
        label: "Số lượng sinh viên",
        backgroundColor: "#42A5F5",
        data: [120, 150, 200, 170, 190],
      },
    ],
  };

  const studentChartOptions = {
    maintainAspectRatio: false,
    aspectRatio: 1.5,
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
      },
      y: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
      },
    },
  };

  // Dữ liệu cho biểu đồ 2: Số lượng file của mỗi định dạng được in trong tháng
  const fileFormatChartData = {
    labels: [".docx", ".pdf", ".png", ".pptx", ".xls"],
    datasets: [
      {
        label: "Số lượng file",
        backgroundColor: "#FFA726",
        data: [50, 75, 60, 40, 30],
      },
    ],
  };

  const fileFormatChartOptions = {
    maintainAspectRatio: false,
    aspectRatio: 1.5,
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
      },
      y: {
        ticks: {
          color: "#495057",
        },
        grid: {
          color: "#ebedef",
        },
      },
    },
  };

  return (
    <div className="spso-dashboard" style={{ padding: "20px" }}>
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
        <h3 style={{ margin: 0, textAlign: "left" }}>Trang chủ SPSO</h3>
      </Card>

      {/* Card cho Biểu đồ Số lượng sinh viên và Số lượng file */}
      <Card
        style={{
          width: "100%",
          maxWidth: "1200px",
          marginBottom: "2rem",
          padding: "1rem",
          borderRadius: "12px",
        }}
      >
        <div
          className="dashboard-charts"
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {/* Biểu đồ số lượng sinh viên */}
          <div
            style={{
              width: "48%", // Chiếm 48% chiều rộng của Card
              height: "300px", // Đặt chiều cao cho mỗi biểu đồ
              marginBottom: "1rem",
            }}
          >
            <h4>Số lượng sinh viên sử dụng dịch vụ theo từng tháng</h4>
            <Chart
              type="bar"
              data={studentChartData}
              options={studentChartOptions}
            />
          </div>

          {/* Biểu đồ số lượng file */}
          <div
            style={{
              width: "48%", // Chiếm 48% chiều rộng của Card
              height: "300px", // Đặt chiều cao cho mỗi biểu đồ
              marginBottom: "1rem",
            }}
          >
            <h4>Số lượng file của mỗi định dạng được in trong tháng</h4>
            <Chart
              type="bar"
              data={fileFormatChartData}
              options={fileFormatChartOptions}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SPSO_Dashboard;
