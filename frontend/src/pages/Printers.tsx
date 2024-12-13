import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";

type Printer = {
    id: number;
    brand: string;
    model: string;
    description: string; status: number;
    is_running: boolean;
}

export default function Printers() {
    const [printers, setPrinters] = useState<Printer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const token = localStorage.getItem("authorization");
    console.log(token);
    
    useEffect(() => {
        axios.get("http://localhost:8000/printer", {
            headers: {
                Authorization: token,
            }
        })
            .then((response) => {
                setPrinters(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error)
                setError(error);
                setLoading(false);
            })
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            <h1>Printers</h1>
            <DataTable value={printers}>
                <Column field="brand" header="Brand"></Column>
                <Column field="model" header="Model"></Column>
                <Column field="description" header="Description"></Column>
                <Column field="status" header="Status"></Column>
                <Column field="is_running" header="Is Running"></Column>
            </DataTable>
        </div>
    );
}
