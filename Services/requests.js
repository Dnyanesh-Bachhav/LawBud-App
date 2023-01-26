import axios from "axios";
async function getLawyersData(){
    const response = await axios.get("https://lawbud-backend.onrender.com/user");
    return response.data;
}
async function getLawyersCategories(){
    const response = await axios.get("https://lawbud-backend.onrender.com/category");
    return response.data;
}
export { getLawyersData, getLawyersCategories };