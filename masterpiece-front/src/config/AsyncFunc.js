import axios from "axios";
import setWithExpiry from "./setWithExpiry";
import errorType from "../error-type/errorType"

export async function login(mail, password) {
    const clientId = process.env.REACT_APP_CLIENT_ID
    const grantType = process.env.REACT_APP_GRANT_TYPE
    
    try {
        const response = await axios.post(`http://localhost:8081/oauth/token?grant_type=${grantType}&username=${mail}&password=${password}&client_id=${clientId}`, {headers:{"Content-Type":"application/x-www-form-urlencoded"}})

        const accessToken = response.data.access_token
        let expires_in = response.data.expires_in
        localStorage.setItem("user_id", response.data.userId);
        setWithExpiry("access_token", accessToken, expires_in)
        return true;
    } catch (error) {
        console.log(error.response);
        let errMessage = errorType(error.response)
        return [errMessage];
    }
}