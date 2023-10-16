import axios from "axios";
import apiClient from "../utils/apiClient";

const uploadPdf = async (formdata: FormData) => {
    const { data } = await axios.post('http://localhost:3001/upload-pdf', formdata);

    return data;
};

const sendMessage = async (message: string) => {
    const { data } = await axios.post('http://localhost:3001/chatbot', {
        message
    });

    return data;
};

export {
    uploadPdf,
    sendMessage
}