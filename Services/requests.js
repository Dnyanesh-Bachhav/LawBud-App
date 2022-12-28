import axios from "axios";
async function getLawyersData(){
    const response = await axios.get("https://lawbud-backend.onrender.com/user");
    return response.data;
}
export { getLawyersData };