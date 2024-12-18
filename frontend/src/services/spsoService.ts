import axios from '../../axios';

const handleGetPrinter = () => {
    return axios.get("/printer", {
        headers: {
            Authorization: localStorage.getItem("authorization"),
        }
    });
}

const handleGetSystem = () => {
    return axios.get("/system", {
        headers: {
            //Authorization: localStorage.getItem("authorization"),
        }
    });
}

const handleUpdatePrinter = (printer: any) => {
    return axios.post(`printer/update`, printer, {
        headers: {
            Authorization: localStorage.getItem("authorization"),
        }
    });
}

const handleDeletePrinter = (printer_id: any) => {
    return axios.delete(`printer/delete/${printer_id}`);
}

export { handleGetPrinter, handleGetSystem, handleUpdatePrinter, handleDeletePrinter };
