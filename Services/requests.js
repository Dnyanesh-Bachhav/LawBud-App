import axios from "axios";
async function getLawyersData(){
    const response = await axios.get("https://lawbud-backend.onrender.com/user");
    // console.log("Data: "+ response.data);
    const data = response.data;
    return data;
}
export { getLawyersData };