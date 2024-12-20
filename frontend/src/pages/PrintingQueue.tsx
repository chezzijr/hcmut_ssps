import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import axios from 'axios';

type PrintJob = {
    id: number;
    document: {
        file_id: number;
        file_name: string;
        file_type: string;
        pages: number;
    };
    copies: number;
    page_size: 1 | 2 | 3 | 4 | 5;
    double_sided: boolean;
    student_id: number;
};

export default function PrintingQueue() {
    const [printjobs, setPrintjobs] = useState<PrintJob[]>([]);

    useEffect(() => {
        axios.get("http://localhost:8000/printjob", {
            headers: {
                Authorization: localStorage.getItem("authorization"),
            }
        }).then((res) => {
            setPrintjobs(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <>
            <h1>Hàng đợi in</h1>
            <DataTable value={printjobs}>
                <Column field="id" header="ID" />
                <Column field="document.file_name" header="Tên tài liệu" />
                <Column field="document.pages" header="Số trang" />
                <Column field="copies" header="Số bản" />
                <Column field="page_size" header="Kích thước" />
                <Column field="double_sided" header="In 2 mặt" />
                <Column field="student_id" header="Mã sinh viên" />
            </DataTable>
        </>
    );
}
