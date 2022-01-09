import Env from "../components/Env"
import cookies from "./cookies"


const checkAuth = () => {

    let user_token = cookies.getCookie("USER_TOKEN")

    if (user_token === null) {
        user_token = "________"
    }

    return {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "browser_code": Env.BrwserCode, "token": user_token })
    };
    
}

export default checkAuth