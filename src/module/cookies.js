import Env from "../components/Env"

const setCookie = (cname, cvalue, exdays) => {

    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();

    if (exdays !== null) {
        //document.cookie = cname + "=" + cvalue + ";" + expires + ";domain=" + Env.cookie[1] + ";path=/";
        document.cookie = cname + "=" + cvalue + ";" + expires + ";domain=" + Env.cookie[0] + ";path=/";
    } else {
        //document.cookie = cname + "=" + cvalue + ";domain=" + Env.cookie[1] + ";path=/";
        document.cookie = cname + "=" + cvalue + ";domain=" + Env.cookie[0] + ";path=/";
    }

}

const getCookie = (cname) => {

    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;

}

const deleteCookie = (cname) => {

    document.cookie = cname + "=" + "; expires=Thu, 01 Jan 1970 00:00:00;" + "domain=" + Env.cookie[0] + ";path=/";
    //document.cookie = cname + "=" + "; expires=Thu, 01 Jan 1970 00:00:00;" + "domain=" + Env.cookie[1] + ";path=/";

}

export default { setCookie, getCookie, deleteCookie }