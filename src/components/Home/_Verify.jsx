import { Link, useParams } from "react-router-dom"
import Env from "../Env"

const Verify = () => {

    document.title = "Verify Email - " + Env.AppName

    const getParams = useParams()

    fetch(Env.BackEnd + "verify", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "browser_code": Env.BrwserCode, "user_email": getParams.email, "user_code": getParams.code
        })
    }).then(b => b.json()).then(res => {

        if (res.error_code == 200) {
            setTimeout(() => {
                if (res.success) {
                    document.getElementById("email_suc").classList.remove("hide")
                    document.getElementById("user_t").classList.add("hide")
                } else {
                    document.getElementById("email_err").classList.remove("hide")
                    document.getElementById("user_t").classList.add("hide")
                }
            }, 500)
        } else {
            alert("Sorry...");
        }

    }).catch((e) => {
        alert("Sorry...");
    })

    return (
        <>
            <div class="main-content bg-default g-sidenav-show g-sidenav-pinned">
                <div class="header bg-gradient-primary py-7 py-lg-8 pt-lg-9">
                    <div class="container">
                        <div class="header-body text-center mb-5">
                            <div class="row justify-content-center">
                                <div class="col-xl-5 col-lg-6 col-md-8 px-5">
                                    <h1 class="text-white display-3">Email Verification...</h1>
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
                        <div class="col-lg-5 col-md-7">
                            <div class="card bg-secondary border-0 mb-0">
                                <div class="card-body px-lg-5 py-lg-5">

                                    <div class="alert hide alert-danger alert-dismissible fade show" id="email_err" role="alert">
                                        <span class="alert-text r-form-error" >
                                            Email Verification Error.
                                        </span>
                                    </div>
                                    <div class="alert hide alert-success alert-dismissible fade show" id="email_suc" role="alert">
                                        <span class="alert-text r-form-error" >
                                            Email Verification Successfull.
                                        </span>
                                    </div>
                                    <center id="user_t">
                                        <h2>Please Wait</h2>
                                        processing for email ({getParams.email}) verification
                                    </center>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )

}

export default Verify