import getAccessToken from "./getAccessToken";

export default function IsLogged() {
    let logged = null;
    const accessToken = getAccessToken("access_token");

    accessToken ? logged = true : logged = false;

    return logged;
}