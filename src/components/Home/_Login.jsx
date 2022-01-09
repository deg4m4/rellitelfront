import { useState } from "react"
import { Link } from "react-router-dom"
import Env from "../Env"
import cookies from "../../module/cookies"
import checkAuth from "../../module/checkauth"

const Login = () => {

    const [lInfo, setLInfo] = useState({
        uoe: "",
        pass: "",
        rm: false
    })

    const changeInfo = (e) => {

        const name = e.target.name;
        const value = e.target.value;
        if (name === "rm") {
            lInfo[name] = e.target.checked
        } else {
            lInfo[name] = value
        }

        if (lInfo.uoe !== "" && lInfo.pass !== "") {
            document.getElementsByClassName("log-btn")[0].removeAttribute("disabled")
            document.getElementsByClassName("log-btn")[0].innerHTML = "Login"
        } else {
            document.getElementsByClassName("log-btn")[0].setAttribute("disabled", "")
        }

    }

    //checklogin
        fetch(Env.BackEnd, checkAuth()).then(r => r.json()).then((res) => {

            if (res.user_auth) {
                window.location.href = "/dashboard"
            }


        }).catch((e) => console.log(e))

    const authUser = async (rInfoX) => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "browser_code": Env.BrwserCode, "userdata": { "uoe": rInfoX.uoe, "pass": rInfoX.pass } })
        };

        const response = await fetch(Env.BackEnd + "authuser", requestOptions);
        const data = await response.json();
        if (data.error_code !== 200) {
            if (window.location.pathname !== "/connectionloss") {
                window.location.href = "/connectionloss"
            }
        } else {

            setTimeout(() => {

                if (data.success) {

                    if (lInfo.rm) {
                        cookies.setCookie("USER_TOKEN", data.token, "7")
                    } else {
                        cookies.setCookie("USER_TOKEN", data.token)
                    }

                    window.location.href = "/dashboard"

                } else {

                    document.getElementsByClassName("reg-error")[0].classList.remove("hide")
                    lInfo.pass = ""
                    document.getElementsByClassName("log-pass")[0].value = ""

                    document.getElementsByClassName("log-btn")[0].innerHTML = "Login"

                    document.getElementsByClassName("log-uoe")[0].removeAttribute("disabled")
                    document.getElementsByClassName("log-pass")[0].removeAttribute("disabled")
                    document.getElementsByClassName("log-rm")[0].removeAttribute("disabled")

                }

            }, 500)

        }

    }

    const rFormSubmit = (e) => {

        e.preventDefault()

        document.getElementsByClassName("reg-error")[0].classList.add("hide")

        document.getElementsByClassName("log-btn")[0].setAttribute("disabled", "")
        document.getElementsByClassName("log-btn")[0].innerHTML = "Wait"

        document.getElementsByClassName("log-uoe")[0].setAttribute("disabled", "")
        document.getElementsByClassName("log-pass")[0].setAttribute("disabled", "")
        document.getElementsByClassName("log-rm")[0].setAttribute("disabled", "")

        authUser(lInfo)

    }

    return (
        <>
            <div class="main-content bg-default g-sidenav-show g-sidenav-pinned">
                <div class="header bg-gradient-primary py-7 py-lg-8 pt-lg-9">
                    <div class="container">
                        <div class="header-body text-center mb-5">
                            <div class="row justify-content-center">
                                <div class="col-xl-5 col-lg-6 col-md-8 px-5">
                                    <h1 class="text-white display-3">Go to a Dashbord</h1>
                                    <p class="text-lead text-white">Login to Dashboard And Manage Links.</p>
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
                                    <div class="text-center text-muted mb-4">
                                        <small>Sign In</small>
                                    </div>
                                    <div class="alert reg-error hide alert-danger alert-dismissible fade show" role="alert">
                                        <span class="alert-text r-form-error" >
                                            Invalid Username/Email Or Password.
                                        </span>
                                    </div>
                                    <form onSubmit={rFormSubmit} role="form">
                                        <div class="form-group">
                                            <div class="input-group input-group-merge mb-3">

                                                <input class="form-control log-uoe" onChange={changeInfo} name="uoe" placeholder="Username Or Email" type="text" />
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <div class="input-group input-group-merge">

                                                <input class="form-control log-pass" name="pass" onChange={changeInfo} placeholder="Password" type="password" />
                                            </div>
                                        </div>
                                        <div class="custom-control custom-control-alternative custom-checkbox">
                                            <input class="custom-control-input log-rm" id=" customCheckLogin" onChange={changeInfo} name="rm" type="checkbox" />
                                            <label class="custom-control-label" for=" customCheckLogin">
                                                <span class="text-muted">Remember me</span>
                                            </label>
                                        </div>
                                        <div class="text-center">
                                            <button type="submit" disabled class="btn log-btn btn-primary my-4">Login</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-6">
                                    <Link to="/fp" class="text-light"><small>Forgot password?</small></Link>
                                </div>
                                <div class="col-6 text-right">
                                    <Link to="/register" class="text-light"><small>Create new account</small></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )

}

export default Login