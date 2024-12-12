import axios from '../../axios';

const handleGetPrinter = () => {
    return axios.get("/printer");
}

const handleGetSystem = () => {
    return axios.get("/system");
}

export { handleGetPrinter, handleGetSystem };
