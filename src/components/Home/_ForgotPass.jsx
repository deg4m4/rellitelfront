import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import Env from "../Env";
import checkAuth from "../../module/checkauth"

const ForgotPass = () => {

    document.title = "Forgot Password - " + Env.AppName

    const [uEmail, setEmail] = useState("")

    useEffect(() => {

        //checklogin
        fetch(Env.BackEnd, checkAuth()).then(r => r.json()).then((res) => {

            if (res.user_auth) {
                window.location.href = "/dashboard"
            }

        }).catch((e) => console.log(e))


    }, []);

    const editEmail = (e) => {
        setEmail(e.target.value)
        if (e.target.value == "") {
            document.getElementById("sub_btn").setAttribute("disabled", "")
        } else {
            document.getElementById("sub_btn").removeAttribute("disabled")
        }
    }

    const sendResetLink = (e) => {
        e.preventDefault()
        var boolX = false
        document.getElementById("email_error").classList.add("hide")
        document.getElementById("pass_error").classList.add("hide")
        document.getElementById("pass_succe").classList.add("hide")
        document.getElementById("sub_btn").setAttribute("disabled", "")
        document.getElementById("email_i").setAttribute("disabled", "")

        setTimeout(() => {
            var re2 = /\S+@\S+\.\S+/;
            if (!re2.test(uEmail)) {
                document.getElementById("email_error").classList.remove("hide")
                document.getElementById("sub_btn").removeAttribute("disabled")
                document.getElementById("email_i").removeAttribute("disabled")
                var boolX = false
            } else {
                var boolX = true
            }
            
            if (boolX) {
                //console.log(uEmail);
                fetch(Env.BackEnd + "forgot", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ "browser_code": Env.BrwserCode, "user_email": uEmail })
                }).then(b => b.json()).then(res => {
        
                    if (res.success) {
                        document.getElementById("pass_succe").classList.remove("hide")
                        document.getElementById("fp_form").classList.add("hide")
                    } else {
                        document.getElementById("pass_error").classList.remove("hide")
                        document.getElementById("fp_form").classList.add("hide")
                    }
        
                }).catch(() => {
                    alert("Sorry...")
                })
            }

        }, 500);

    }

    return (
        <>
            <div class="main-content bg-default g-sidenav-show g-sidenav-pinned">
                <div class="header bg-gradient-primary py-7 py-lg-8 pt-lg-9">
                    <div class="container">
                        <div class="header-body text-center mb-5">
                            <div class="row justify-content-center">
                                <div class="col-xl-5 col-lg-6 col-md-8 px-5">
                                    <h1 class="text-white display-3">Forgot Your Password?</h1>
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
                                    <div id="email_error" class="alert hide alert-danger alert-dismissible fade show" role="alert">
                                        <span class="alert-text r-form-error" >
                                            Invalid Email Address.
                                        </span>
                                    </div>
                                    <div id="pass_error" class="alert hide alert-danger alert-dismissible fade show" role="alert">
                                        <span class="alert-text r-form-error" >
                                            Error, Please <Link class="text-white" to="/contact">Contact</Link> Admin.
                                        </span>
                                    </div>
                                    <div id="pass_succe" class="alert hide alert-success alert-dismissible fade show" role="alert">
                                        <span class="alert-text r-form-error" >
                                            If You Are {Env.AppName} Member than Password Reset Link Send Succesfull, Check Your Mail Inbox.
                                        </span>
                                    </div>
                                    <form role="form" onSubmit={sendResetLink} id="fp_form">
                                        <div class="form-group">
                                            <div class="input-group input-group-merge mb-3">
                                                <input onChange={editEmail} class="form-control log-uoe" id="email_i" placeholder="Email" type="text" />
                                            </div>
                                        </div>
                                        <div class="text-center">
                                            <button type="submit" id="sub_btn" disabled class="btn log-btn btn-primary my-4">Login</button>
                                        </div>
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

export default ForgotPass