import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import axios from 'axios';

type Log = {
    id: number;
    description: string;
    student_id: number;
    printer_id: number;
    date: string;
    print_job: {
        copies: number;
        page_size: number;
        double_sided: boolean;
        student_id: number;
        document: {
            file_id: number;
            file_name: string;
            file_type: string;
            pages: number;
        }
    }
}

export default function PrintingHistory() {
    const [logs, setLogs] = useState<Log[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8000/log", {
            headers: {
                Authorization: localStorage.getItem("authorization"),
            }
        }).then((res) => {
            setLogs(res.data);
            setLoading(false);
        }).catch((err) => {
            setError(true);
            setLoading(false);
        });
    }, [])

    return (
        <div>
            <h1>Lịch sử in</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error</p>}
            {!loading && !error && (
                <DataTable value={logs}>
                    {/* <Column field="id" header="ID" /> */}
                    <Column field="student_id" header="ID sinh viên" />
                    <Column field="printer_id" header="ID máy in" />
                    <Column field="description" header="Mô tả" />
                    <Column field="date" header="Ngày"  />
                    {/* <Column field="print_job.copies" header="Số bản in" /> */}
                    {/* <Column field="print_job.page_size" header="Kích thước trang" /> */}
                    {/* <Column field="print_job.double_sided" header="In 2 mặt" /> */}
                    {/* <Column field="print_job.student_id" header="ID sinh viên" /> */}
                    {/* <Column field="print_job.document.file_id" header="ID tài liệu" /> */}
                    {/* <Column field="print_job.document.file_name" header="Tên tài liệu" /> */}
                    {/* <Column field="print_job.document.file_type" header="Loại tài liệu" /> */}
                    {/* <Column field="print_job.document.pages" header="Số trang" /> */}
                </DataTable>
            )}
        </div>
    )
}
