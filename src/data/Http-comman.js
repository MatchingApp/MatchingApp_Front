import axios from 'axios'
export default axios.create({
    baseURL: "https://localhost:44317",
    headers: {
        "Content-type": "application/json"
    }
});