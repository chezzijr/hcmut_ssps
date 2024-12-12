import axios from '../../axios';

const handleGetPrinter = () => {
    return axios.get("/printer");
}

const handleGetSystem = () => {
    return axios.get("/system");
}

const handleUpdatePrinter = (printer_id: any) => {
    return axios.post(`printer/update/${printer_id}`);
}

const handleDeletePrinter = (printer_id: any) => {
    return axios.post(`printer/delete/${printer_id}`);
}

export { handleGetPrinter, handleGetSystem, handleUpdatePrinter, handleDeletePrinter };
