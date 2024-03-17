import axios from "axios";

const BASE_URL = 'https://4179-213-152-241-52.ngrok-free.app/';
export const axiosInstance = axios.create({ baseURL: BASE_URL });
export const askQuestion = async (user_question: string, ) => {
    const config = {
        timeout: 30000,
        headers: {'Content-Type': 'application/json',}
    }

    const body = JSON.stringify({
        question:user_question,
        paths: ['./data/health_report.txt','./data/Progress Report.txt','./data/misc.txt'],
        collection_name: 'Education_Transcripts'
    });


try {
        const response = await axiosInstance.post('/ask', body, config);
        return response;
    } catch (e) {
        console.log(e);
        return null;
    }
}


