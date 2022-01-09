import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Env from "../Env"
import checkAuth from "../../module/checkauth"

const Register = () => {

    useEffect(() => {

        //checklogin
        fetch(Env.BackEnd, checkAuth()).then(r => r.json()).then((res) => {

            
            if (res.user_auth) {
                window.location.href = "/dashboard"
            }


        }).catch((e) => console.log(e))


    }, []);

    const [rInfo, setRInfo] = useState({
        username: "",
        email: "",
        pass: "",
        page: "",
        agree: false
    })

    const changeInfo = (e) => {

        const name = e.target.name;
        const value = e.target.value;
        if (name === "agree") {
            rInfo[name] = e.target.checked
        } else {
            rInfo[name] = value
        }

        if (name === "username") {
            rInfo["page"] = value + "'s Page";
            document.getElementById("pagenamex").value = value + "'s Page";
        }

        //console.log(rInfo)

        if (rInfo.username !== "" && rInfo.email !== "" && rInfo.pass !== "" && rInfo.page !== "" && rInfo.agree === true) {
            document.getElementsByClassName("reg-btn")[0].removeAttribute("disabled")
            document.getElementsByClassName("reg-btn")[0].innerHTML = "Create account"
        } else {
            document.getElementsByClassName("reg-btn")[0].setAttribute("disabled", "")
        }

    }

    const newUser = async (rInfoX) => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "browser_code": Env.BrwserCode, "userdata": { "username": rInfoX.username, "email": rInfoX.email, "pass": rInfoX.pass, "page": rInfoX.page } })
        };

        const response = await fetch(Env.BackEnd + "newuser", requestOptions);
        const data = await response.json();
        if (data.error_code !== 200) {
            if (window.location.pathname !== "/connectionloss") {
                window.location.href = "/connectionloss"
            }
        }

        if (data.success === false) {
            setTimeout(() => {
                document.getElementsByClassName("reg-username")[0].removeAttribute("disabled")
                document.getElementsByClassName("reg-email")[0].removeAttribute("disabled")
                document.getElementsByClassName("reg-pass")[0].removeAttribute("disabled")
                document.getElementsByClassName("reg-agree")[0].removeAttribute("disabled")
                document.getElementsByClassName("reg-btn")[0].removeAttribute("disabled")
                document.getElementsByClassName("reg-btn")[0].innerHTML = "Create account"

                document.getElementsByClassName("r-form-error")[0].innerHTML = ""

                //if username is exist
                if (data.already_exiest.username) {
                    document.getElementsByClassName("r-form-error")[0].innerHTML += "<strong>Username</strong> Is Already Exiest Please Enter Another User<br>"
                }
                //if useremail is exist
                if (data.already_exiest.email) {
                    document.getElementsByClassName("r-form-error")[0].innerHTML += "<strong>Email</strong> Is Already Exiest Please Enter Another User<br>"
                }

                if (data.already_exiest.username || data.already_exiest.email) {
                    document.getElementsByClassName("reg-error")[0].classList.remove("hide")
                }

            }, 500)
        } else if (data.success) {

            setTimeout(() => {


                document.getElementsByClassName("success-error")[0].classList.remove("hide")
                document.getElementsByClassName("reg-form-group")[0].classList.add("hide")


            }, 500)

        }
    }

    const rFormSubmit = (e) => {

        e.preventDefault()

        document.getElementsByClassName("success-error")[0].classList.add("hide")

        document.getElementsByClassName("r-form-error")[0].innerHTML = ""

        var re1 = /^[a-zA-Z0-9_]{5,16}$/;
        if (!re1.test(rInfo.username)) {
            document.getElementsByClassName("r-form-error")[0].innerHTML += "<strong>Username</strong> Requires Only Char, Num,  Or _ And It Contains Min 6 And Max 16<br>"
        }

        var re2 = /\S+@\S+\.\S+/;
        if (!re2.test(rInfo.email)) {
            document.getElementsByClassName("r-form-error")[0].innerHTML += "<strong>Email</strong> Is Not Valid<br>"
        }

        var r3 = /^[a-zA-Z0-9 !@#$%^&*]{8,20}$/;
        if (!r3.test(rInfo.pass)) {
            document.getElementsByClassName("r-form-error")[0].innerHTML += "<strong>Password</strong> Contains 8 to 20 Char Allow a-z, A-Z, 0-9, Space or !@#$%^&*<br>"
        }

        if (re1.test(rInfo.username) && re2.test(rInfo.email) && r3.test(rInfo.pass)) {

            document.getElementsByClassName("reg-error")[0].classList.add("hide")

            document.getElementsByClassName("reg-btn")[0].setAttribute("disabled", "")
            document.getElementsByClassName("reg-btn")[0].innerHTML = "Wait"

            document.getElementsByClassName("reg-username")[0].setAttribute("disabled", "")
            document.getElementsByClassName("reg-email")[0].setAttribute("disabled", "")
            document.getElementsByClassName("reg-pass")[0].setAttribute("disabled", "")
            document.getElementsByClassName("reg-agree")[0].setAttribute("disabled", "")

            newUser(rInfo)


        } else {
            document.getElementsByClassName("reg-error")[0].classList.remove("hide")
        }

    }

    return (
        <>
            <div class="main-content bg-default g-sidenav-show g-sidenav-pinned">
                <div class="header bg-gradient-primary py-7 py-lg-8 pt-lg-9">
                    <div class="container">
                        <div class="header-body text-center mb-5">
                            <div class="row justify-content-center">
                                <div class="col-xl-5 col-lg-6 col-md-8 px-5">
                                    <h1 class="text-white display-3">Create an account</h1>
                                    <p class="text-lead text-white">Register And Make Link And Earn Money.</p>
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
                        <div class="col-lg-6 col-md-8">
                            <div class="card bg-secondary border-0">
                                <div class="card-body px-lg-5 py-lg-5">
                                    <div class="text-center text-muted mb-4">
                                        <small>Sign Up</small>
                                    </div>
                                    <form role="form" class="reg-form" onSubmit={rFormSubmit}>
                                        <div class="alert reg-error hide alert-danger alert-dismissible fade show" role="alert">
                                            <span class="alert-text r-form-error" >

                                            </span>
                                        </div>
                                        <div className="alert success-error hide alert-success alert-dismissible fade show" role="alert">
                                            <span class="alert-text" >
                                                Register Successful <Link class="text-white" to="/login">Click To Login</Link>.
                                                <br />
                                                Login Go to Dashboard And Manage Links And Earn Money
                                            </span>
                                        </div>
                                        <div className="reg-form-group">
                                            <div class="form-group">
                                                <div class="input-group input-group-merge mb-3">

                                                    <input class="form-control reg-username" onChange={changeInfo} name="username" placeholder="Username" type="text" />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="input-group input-group-merge mb-3">

                                                    <input class="form-control reg-email" onChange={changeInfo} name="email" placeholder="Email" type="text" />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="input-group input-group-merge">

                                                    <input class="form-control reg-pass" onChange={changeInfo} name="pass" placeholder="Password" type="password" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="input-group input-group-merge">

                                                    <input className="form-control reg-pass" id="pagenamex" onChange={changeInfo}
                                                           name="page" placeholder="Page Name" type="type"/>
                                                </div>
                                            </div>
                                            <div class="row my-4">
                                                <div class="col-12">
                                                    <div class="custom-control custom-control-alternative custom-checkbox">
                                                        <input class="custom-control-input reg-agree" onChange={changeInfo} name="agree" id="customCheckRegister" type="checkbox" />
                                                        <label class="custom-control-label" for="customCheckRegister">
                                                            <span class="text-muted">I agree with the <Link to="/pnp">Privacy Policy</Link></span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="text-center">
                                                <button type="submit" disabled class="btn reg-btn btn-primary mt-4">Create account</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Register