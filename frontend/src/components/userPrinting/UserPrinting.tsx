import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import Header from "../header/Header";
import { FaUpload } from "react-icons/fa";
import { uploadFileAPI } from "../../../services/api";
import axios from "axios";

const UserPrinting: React.FC = () => {
    const [preview, setPreview] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadMessage, setUploadMessage] = useState<string>("");
    const [paperSize, setPaperSize] = useState<string>("");
    const [printMode, setPrintMode] = useState<number>(1);
    const [printer, setPrinter] = useState<number>(1);
    const [numCopies, setNumCopies] = useState<number>(1);
    const [document, setDocument] = useState<any>(null);

    const paperSizes = [
        { label: "A5", value: 5 },
        { label: "A4", value: 4 },
        { label: "A3", value: 3 },
        { label: "A2", value: 2 },
        { label: "A1", value: 1 },
        // { label: "A0", value: "A0" },
        // { label: "Ảnh", value: "Ảnh" },
    ];

    const printModes = [
        // { label: "Đen trắng - 1 mặt", value: "Đen trắng - 1 mặt" },
        // { label: "Đen trắng - 2 mặt", value: ["Đen trắng - 1 mặt" },
        // { label: "Màu - 1 mặt", value: "Màu - 1 mặt" },
        // { label: "Màu - 2 mặt", value: "Màu - 2 mặt" },
        { label: "2 mặt", value: 2 },
        { label: "1 mặt", value: 1 },
    ];

    const [printerOptions, setPrinterOptions] = useState<{ label: string, value: number }[]>([]);
    useEffect(() => {
        axios.get("http://localhost:8000/printer", {
            headers: {
                Authorization: localStorage.getItem("authorization"),
            }
        }).then((res) => {
            setPrinterOptions(res.data.map((printer: any) => ({
                label: printer.brand + printer.model,
                value: printer.id,
            })));
        });
    }, []);

    // const handleFileUpload = async () => {
    //     if (!selectedFile) {
    //         setUploadMessage("Vui lòng chọn một tệp để tải lên.");
    //         return;
    //     }

    //     const token = localStorage.getItem("authorization");
    //     if (!token) {
    //         setUploadMessage(
    //             "Không tìm thấy token xác thực. Vui lòng đăng nhập lại."
    //         );
    //         return;
    //     }

    //     try {
    //         const response = await uploadFileAPI(selectedFile, token);
    //         setUploadMessage(`Tải lên thành công: ${response.message}`);
    //     } catch (error: any) {
    //         setUploadMessage(error || "Có lỗi xảy ra khi tải lên tệp.");
    //     }
    // };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
            setUploadMessage("");
        }
    };

    return (
        <main style={{ flex: 1, padding: "2rem", backgroundColor: "#E6F3FF" }}>
            <div className="userPrintingTitle">
                <Header title="In tài liệu" />
            </div>

            <div
                style={{
                    backgroundColor: "#fff",
                    padding: "2rem",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    color: "#1E90FF",
                    fontWeight: "bold",
                    fontSize: "24px",
                    textAlign: "left",
                }}
            >
                <div style={{ marginBottom: "1rem" }}>
                    <label
                        htmlFor="upload"
                        style={{ display: "block", marginBottom: "0.5rem" }}
                    >
                        Tải tệp lên
                    </label>
                    <div
                        style={{
                            display: "flex",
                            border: "2px dashed #ccc",
                            padding: "1rem",
                            borderRadius: "8px",
                            height: "220px",
                            color: "black",
                            fontWeight: "normal",
                            fontSize: "18px",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                        }}
                    >
                        {/* <div
              style={{
                fontSize: "48px",
                color: "#777777",
              }}
            >
              <FaUpload />
            </div>
            Kéo thả file vào đây hoặc chọn từ máy tính */}
                        <input
                            type="file"
                            id="fileInput"
                            onChange={handleFileChange}
                            style={{ marginBottom: "1rem" }}
                        />
                        {/* <Button */}
                        {/*     label="Tải lên" */}
                        {/*     icon={<FaUpload />} */}
                        {/*     className="p-button-primary" */}
                        {/*     onClick={() => { */}
                        {/*         handleFileUpload(); */}
                        {/*     }} */}
                        {/* /> */}
                    </div>
                    {uploadMessage && (
                        <p style={{ color: "red", marginTop: "1rem" }}>{uploadMessage}</p>
                    )}
                </div>

                <div
                    className="form-group"
                    style={{
                        marginBottom: "1rem",
                        display: "flex",
                        gap: "2rem",
                        justifyContent: "space-between",
                        padding: "5px 10px",
                    }}
                >
                    <div
                        style={{
                            flex: "1 1 calc(50% - 1rem)",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <label htmlFor="paperSize">Kích thước giấy</label>
                        <Dropdown
                            id="paperSize"
                            value={paperSize}
                            onChange={(e) => setPaperSize(e.value)}
                            options={paperSizes}
                            placeholder="Chọn kích thước giấy in"
                            style={{
                                backgroundColor: "#E6F3FF",
                            }}
                        />
                    </div>
                    <div
                        style={{
                            flex: "1 1 calc(50% - 1rem)",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <label htmlFor="startPage">Số bản in</label>
                        <InputText
                            id="startPage"
                            value={numCopies.toString()}
                            onChange={(e) => setNumCopies(Number(e.target.value))}
                            placeholder="Chọn số bản in"
                            style={{ backgroundColor: "#E6F3FF" }}
                        />
                    </div>
                </div>

                <div
                    className="form-group"
                    style={{
                        marginBottom: "1rem",
                        display: "flex",
                        gap: "2rem",
                        justifyContent: "space-between",
                        padding: "5px 10px",
                    }}
                >
                    <div
                        style={{
                            flex: "1 1 calc(50% - 1rem)",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <label htmlFor="printMode">Chế độ in</label>
                        <Dropdown
                            id="printMode"
                            value={printMode}
                            onChange={(e) => setPrintMode(e.value)}
                            options={printModes}
                            placeholder="Chọn chế độ in"
                            style={{
                                backgroundColor: "#E6F3FF",
                            }}
                        />
                    </div>

                    <div
                        style={{
                            flex: "1 1 calc(50% - 1rem)",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <label htmlFor="printer">Máy in</label>
                        <Dropdown
                            id="printer"
                            value={printer}
                            onChange={(e) => setPrinter(e.value)}
                            options={printerOptions}
                            placeholder="Chọn máy in"
                            style={{
                                backgroundColor: "#E6F3FF",
                            }}
                        />
                    </div>
                </div>

                {/* <div */}
                {/*     className="form-group" */}
                {/*     style={{ */}
                {/*         display: "flex", */}
                {/*         gap: "2rem", */}
                {/*         marginBottom: "1rem", */}
                {/*         justifyContent: "space-between", */}
                {/*         padding: "5px 10px", */}
                {/*     }} */}
                {/* > */}
                {/*     <div */}
                {/*         style={{ */}
                {/*             flex: "1 1 calc(50% - 1rem)", */}
                {/*             display: "flex", */}
                {/*             flexDirection: "column", */}
                {/*         }} */}
                {/*     > */}
                {/*         <label htmlFor="startPage">Bắt đầu</label> */}
                {/*         <InputText */}
                {/*             id="startPage" */}
                {/*             placeholder="Chọn trang bắt đầu in" */}
                {/*             style={{ backgroundColor: "#E6F3FF" }} */}
                {/*         /> */}
                {/*     </div> */}
                {/*     <div */}
                {/*         style={{ */}
                {/*             flex: "1 1 calc(50% - 1rem)", */}
                {/*             display: "flex", */}
                {/*             flexDirection: "column", */}
                {/*         }} */}
                {/*     > */}
                {/*         <label htmlFor="endPage">Kết thúc</label> */}
                {/*         <InputText */}
                {/*             id="endPage" */}
                {/*             placeholder="Chọn trang kết thúc in" */}
                {/*             style={{ backgroundColor: "#E6F3FF" }} */}
                {/*         /> */}
                {/*     </div> */}
                {/* </div> */}

                <div
                    className="form-group"
                    style={{ marginBottom: "1rem", padding: "0px 10px" }}
                >
                    <Checkbox
                        inputId="preview"
                        checked={preview}
                        onChange={(e) => setPreview(e.checked || false)}
                    />
                    <label
                        htmlFor="preview"
                        style={{
                            marginLeft: "0.5rem",
                            color: "black",
                            fontWeight: "normal",
                            fontSize: "20px",
                        }}
                    >
                        Xem trước khi in
                    </label>
                </div>

                <Button
                    label="Bắt đầu in"
                    className="p-button-primary"
                    style={{
                        width: "100%",
                    }}
                    onClick={async () => {
                        if (!selectedFile) {
                            setUploadMessage("Vui lòng chọn một tệp để tải lên.");
                            return;
                        }

                        const token = localStorage.getItem("authorization");
                        if (!token) {
                            setUploadMessage(
                                "Không tìm thấy token xác thực. Vui lòng đăng nhập lại."
                            );
                            return;
                        }

                        try {
                            const document = await uploadFileAPI(selectedFile, token);
                            const printjob = {
                                copies: numCopies,
                                page_size: paperSize,
                                double_sided: printMode === 2,
                                student_id: 1,
                                document: document,
                            }

                            const response = await axios.post(`http://localhost:8000/printer/${printer}/print`, printjob, {
                                headers: {
                                    Authorization: token,
                                },
                            });
                            setUploadMessage(`Tải lên thành công: ${response.data.message}`);

                        } catch (error: any) {
                            setUploadMessage(error || "Có lỗi xảy ra khi tải lên tệp.");
                        }
                    }}
                />
            </div>
        </main>
    );
};

export default UserPrinting;
