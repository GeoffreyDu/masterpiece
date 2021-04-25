import getAccessToken from "./getAccessToken";
// Method to indictaes if user is logged or not with content of local storage
export default function IsLogged() {
    let logged = null;
    const accessToken = getAccessToken("access_token");

    accessToken ? logged = true : logged = false;

    return logged;
}