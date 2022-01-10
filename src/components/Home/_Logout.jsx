import { useEffect } from "react"
import Env from "../Env"
import checkAuth from "../../module/checkauth"
import cookies from "../../module/cookies"

const Logout = () => {

    useEffect(() => {

        fetch(Env.BackEnd + "logout", checkAuth()).then(b => b.json()).then((r) => {
            if (r.success) {
                cookies.deleteCookie("USER_TOKEN")
                window.location.href = "/"
            }
            console.log(r);
        })

    }, [])

    return (
        <>
        <div class="main-content bg-default g-sidenav-show g-sidenav-pinned">
                <div class="header bg-gradient-primary py-7 py-lg-8 pt-lg-9">
                    <div class="container">
                        <div class="header-body text-center mb-5">
                            <div class="row justify-content-center">
                                <div class="col-xl-5 col-lg-6 col-md-8 px-5">
                                    <h1 class="text-white display-3">Logout...</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="separator separator-bottom separator-skew zindex-100">
                        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
                        </svg>
                    </div>
                </div>

                <div class="container mt--8 pb-5">
                    <div class="row justify-content-center">
                        
                    </div>
                </div>
            </div>
        </>
    )

}

export default Logout