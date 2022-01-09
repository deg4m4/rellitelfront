import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import Env from "../Env";
import checkAuth from "../../module/checkauth"

const ResetPass = () => {

    const [uPass, setPass] = useState("")
    const getParam = useParams()

    const editEmail = (e) => {
        setPass(e.target.value)
        if (e.target.value == "") {
            document.getElementById("sub_btn").setAttribute("disabled", "")
        } else {
            document.getElementById("sub_btn").removeAttribute("disabled")
        }
    }

    const sendResetLink = (e) => {
        e.preventDefault()
        var boolX = false
        document.getElementById("pass_error").classList.add("hide")
        document.getElementById("inter_error").classList.add("hide")
        document.getElementById("pass_succe").classList.add("hide")
        document.getElementById("sub_btn").setAttribute("disabled", "")
        document.getElementById("pass_i").setAttribute("disabled", "")

        setTimeout(() => {
            var re2 = /^[a-zA-Z0-9 !@#$%^&*]{8,20}$/;
            if (!re2.test(uPass)) {
                document.getElementById("pass_error").classList.remove("hide")
                document.getElementById("sub_btn").removeAttribute("disabled")
                document.getElementById("pass_i").removeAttribute("disabled")
                boolX = false
            } else {
                boolX = true
            }

            if (boolX) {
                //console.log(uPass);
                fetch(Env.BackEnd + "reset", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ "browser_code": Env.BrwserCode, "user_code": getParam.code, "user_email": getParam.email , "user_pass": uPass })
                }).then(b => b.json()).then(res => {

                    if (res.success) {
                        document.getElementById("pass_succe").classList.remove("hide")
                        document.getElementById("res_form").classList.add("hide")
                    } else {
                        document.getElementById("inter_error").classList.remove("hide")
                        document.getElementById("res_form").classList.add("hide")
                    }

                }).catch(() => {
                    alert("Sorry...")
                })
            }

        }, 500);

    }

    const expireLink = (e) => {
        e.preventDefault()

        fetch(Env.BackEnd + "reset", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "browser_code": Env.BrwserCode, "user_email": getParam.email })
        }).then(b => b.json()).then(res => {
            document.location.href = "/"
        }).catch(() => {
            alert("Sorry...")
        })

    }

    return (
        <>
            <div class="main-content bg-default g-sidenav-show g-sidenav-pinned">
                <div class="header bg-gradient-primary py-7 py-lg-8 pt-lg-9">
                    <div class="container">
                        <div class="header-body text-center mb-5">
                            <div class="row justify-content-center">
                                <div class="col-xl-5 col-lg-6 col-md-8 px-5">
                                    <h1 class="text-white display-3">Reset Password</h1>
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
                                        <small>Forgot Password Form</small>
                                    </div>
                                    <div id="pass_error" class="alert hide alert-danger alert-dismissible fade show" role="alert">
                                        <span class="alert-text r-form-error" >
                                            <strong>Password</strong> Contains 8 to 20 Char Allow a-z, A-Z, 0-9, Space or !@#$%^&*
                                        </span>
                                    </div>
                                    <div id="inter_error" class="alert hide alert-danger alert-dismissible fade show" role="alert">
                                        <span class="alert-text r-form-error" >
                                            This Link is Expired.
                                        </span>
                                    </div>
                                    <div id="pass_succe" class="alert hide alert-success alert-dismissible fade show" role="alert">
                                        <span class="alert-text r-form-error" >
                                            Password Change Successfull, <Link class="text-white" to="/login">Click To go login page</Link>
                                        </span>
                                    </div>
                                    <form role="form" onSubmit={sendResetLink} id="res_form">
                                        <div class="form-group">
                                            <div class="input-group input-group-merge mb-3">
                                                <input onChange={editEmail} class="form-control log-uoe" id="pass_i" placeholder="New Password" type="password" />
                                            </div>
                                        </div>
                                        <div class="text-center">
                                            <button type="submit" id="sub_btn" disabled class="btn log-btn btn-primary my-4">Login</button>
                                        </div>
                                        If You Don't Reset Password Than <a href="#" onClick={expireLink}>Click</a> For Expire This Link.
                                    </form>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-6">
                                    <Link to="/login" class="text-light"><small>Login</small></Link>
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

export default ResetPass