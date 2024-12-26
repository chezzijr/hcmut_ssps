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
    document.title = "Lịch sử in";
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
                </DataTable>
            )}
        </div>
    )
}
