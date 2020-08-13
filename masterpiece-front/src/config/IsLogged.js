import getWithExpiry from "./getWithExpiry";

export default function IsLogged() {
    let logged = null;
    const accessToken = getWithExpiry("access_token");

    accessToken ? logged = true : logged = false;

    return logged;
}