import axios from "axios";

const baseURL = 'http://127.0.0.1:5000'

const api = {
    call : () => {
        return axios.create({
            baseURL
        })
    }
}


export default api;