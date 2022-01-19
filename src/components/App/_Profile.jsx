import { useEffect, useState } from "react"
import Footer from "./_Footer"
import checkAuth from "../../module/checkauth"
import Env from "../Env"
import cookies from "../../module/cookies"
import 'react-image-crop/dist/ReactCrop.css';

const Profile = () => {

    var [userInfo, setUserInfo] = useState({ useremail: "exe@email.com", userfullname: "Jhon Hitman", userphone: "Phone No." })

    var [r1Info, setR1Info] = useState({
        uname: "",
        uemail: "",
        uphone: ""
    })

    var [r2Info, setR2Info] = useState({
        cpass: "",
        npass: "",
        rnpass: ""
    })

    const changeUserInfo = (e) => {

        const name = e.target.name;
        const value = e.target.value;
        r1Info[name] = value

        if (r1Info.uname != "" || r1Info.uemail != "" || r1Info.uphone != "") {
            document.getElementsByClassName("u-i-btn")[0].removeAttribute("disabled")
        } else {
            document.getElementsByClassName("u-i-btn")[0].setAttribute("disabled", "")
        }

    }

    const changePassInfo = (e) => {

        const name = e.target.name;
        const value = e.target.value;
        r2Info[name] = value

        if (r2Info.cpass != "" && r2Info.npass != "" && r2Info.rnpass != "") {
            document.getElementsByClassName("n-p-btn")[0].removeAttribute("disabled")
        } else {
            document.getElementsByClassName("n-p-btn")[0].setAttribute("disabled", "")
        }

    }

    const updateUserInfo = (e) => {
        e.preventDefault()

        var eC = true;
        var pC = true;

        document.getElementsByClassName("u-info-error")[0].innerHTML = ""
        if (r1Info.uemail != "") {
            var re2 = /\S+@\S+\.\S+/;
            if (!re2.test(r1Info.uemail)) {
                eC = false;
                document.getElementsByClassName("u-info-error")[0].innerHTML += "<strong>Email</strong> Is Not Valid<br>"
            }
        }

        if (r1Info.uphone != "") {
            var re3 = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
            if (!re3.test(r1Info.uphone)) {
                pC = false;
                document.getElementsByClassName("u-info-error")[0].innerHTML += "<strong>Phone No.</strong> Is Not Valid<br>"
            }
        }

        if (eC && pC) {

            document.getElementsByClassName("u-i-error")[0].classList.add("hide")
            document.getElementsByClassName("u-full-i")[0].setAttribute("disabled", "")
            document.getElementsByClassName("u-phone-i")[0].setAttribute("disabled", "")
            document.getElementsByClassName("u-email-i")[0].setAttribute("disabled", "")
            document.getElementsByClassName("u-i-btn")[0].setAttribute("disabled", "")

            setTimeout(() => {

                let user_token = cookies.getCookie("USER_TOKEN")

                if (user_token === null) {
                    user_token = "________"
                }

                fetch(Env.BackEnd + "profile/update", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ "browser_code": Env.BrwserCode, "token": user_token, "user_new_info": r1Info })
                }).then(b => b.json()).then(res => {

                    if (res.error_code == 200) {

                        if (res.success) {
                            window.location.href = "/dashboard/profile"
                        } else if (res.user_info.user_email) {
                            document.getElementsByClassName("u-info-error")[0].innerHTML = "<strong>Email</strong> Is Already Exiest Please Enter Another email<br>"
                            document.getElementsByClassName("u-i-error")[0].classList.remove("hide")

                            document.getElementsByClassName("u-full-i")[0].removeAttribute("disabled")
                            document.getElementsByClassName("u-phone-i")[0].removeAttribute("disabled")
                            document.getElementsByClassName("u-email-i")[0].removeAttribute("disabled")
                            document.getElementsByClassName("u-i-btn")[0].removeAttribute("disabled")

                        } else {
                            alert("Sorry...")
                        }

                    } else {
                        window.location.href = "/"
                    }

                }).catch(() => {
                    alert("Sorry...")
                })

            }, 500)

        } else {

            document.getElementsByClassName("u-i-error")[0].classList.remove("hide")

        }

    }

    const setNewPass = (e) => {
        e.preventDefault()
        document.getElementsByClassName("n-p-error")[0].classList.add("hide")

        document.getElementsByClassName("np-info-error")[0].innerHTML = ""
        var r3 = /^[a-zA-Z0-9 !@#$%^&*]{8,20}$/;
        if (!r3.test(r2Info.npass)) {
            document.getElementsByClassName("np-info-error")[0].innerHTML += "<strong>Password</strong> Contains 8 to 20 Char Allow a-z, A-Z, 0-9, Space or !@#$%^&*<br>"
        }
        if (r2Info.npass != r2Info.rnpass) {
            document.getElementsByClassName("np-info-error")[0].innerHTML += "New <strong>Re-Enter New Password</strong> Not match.<br>"
        }

        if (r3.test(r2Info.npass) && r2Info.npass == r2Info.rnpass) {

            document.getElementsByClassName("c-p-in")[0].setAttribute("disabled", "")
            document.getElementsByClassName("n-p-in")[0].setAttribute("disabled", "")
            document.getElementsByClassName("rn-p-in")[0].setAttribute("disabled", "")
            document.getElementsByClassName("n-p-btn")[0].setAttribute("disabled", "")

            setTimeout(() => {
                let user_token = cookies.getCookie("USER_TOKEN")

                if (user_token === null) {
                    user_token = "________"
                }

                fetch(Env.BackEnd + "profile/password", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "browser_code": Env.BrwserCode, "token": user_token, "user_pass": {
                            cureent_pass: r2Info.cpass,
                            new_pass: r2Info.npass
                        }
                    })
                }).then(b => b.json()).then(res => {

                    if (res.success) {

                        alert("Password Change Success Full...")
                        window.location.href = "/dashboard/profile"

                    } else if (res.pass_error.user_pass) {
                        document.getElementsByClassName("np-info-error")[0].innerHTML = ""
                        document.getElementsByClassName("np-info-error")[0].innerHTML += "Current <strong>Password</strong> Is Incorrect.<br>"
                        document.getElementsByClassName("n-p-error")[0].classList.remove("hide")

                        document.getElementsByClassName("c-p-in")[0].removeAttribute("disabled")
                        document.getElementsByClassName("n-p-in")[0].removeAttribute("disabled")
                        document.getElementsByClassName("rn-p-in")[0].removeAttribute("disabled")

                    } else {
                        alert("Sorry...")
                    }

                }).catch((e) => {
                    alert("Sorry...");
                })

            }, 500)

        } else {
            document.getElementsByClassName("n-p-error")[0].classList.remove("hide")
        }

    }


    var userphoto = "/assets/img/theme/rakhi.jpg";

    useEffect(() => {

        fetch(Env.BackEnd + "profile", checkAuth()).then(b => b.json()).then(res => {


            if (res.user_info.user_photo != "") {
                userphoto = res.user_info.user_photo
            }

            if (res.user_info.user_phone == "") {
                res.user_info.user_phone = "Phone No."
            }

            setUserInfo({ username: res.user_info.user_name, userfullname: res.user_info.user_fullname, useremail: res.user_info.user_email, userphone: res.user_info.user_phone, userphoto: userphoto, userver: res.user_info.user_verify })

            document.getElementsByClassName("u-full-i")[0].removeAttribute("disabled")
            document.getElementsByClassName("u-phone-i")[0].removeAttribute("disabled")
            document.getElementsByClassName("u-email-i")[0].removeAttribute("disabled")

            //console.log(res);

            
        }).catch((e) => {

            alert("Sorry")

        })

    }, [])

    const sendVerification = (e) => {
        e.preventDefault()

        document.getElementById("ver_alert").style.opacity = .5;

        let user_token = cookies.getCookie("USER_TOKEN")

        if (user_token === null) {
            user_token = "________"
        }


        fetch(Env.BackEnd + "profile/verify", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "browser_code": Env.BrwserCode, "token": user_token
            })
        }).then(b => b.json()).then(res => {

            if (res.error_code == 200 && res.success) {
                document.getElementById("ver_alert").style.opacity = 1;
                document.getElementById("ver_alert").innerHTML = "Link Send Successfull"
            } else {
                alert("Sorry, link send error, Plese Try Again...")
                document.getElementById("ver_alert").style.opacity = 1;
            }
        }).catch((e) => {
            alert("Sorry...");
        })
    }

    return (
        <>



            <div className="header mt--6 d-flex align-items-center background-cover" >
                <span className="mask bg-gradient-default opacity-7"></span>
                <div className="container-fluid d-flex align-items-center">
                    <div className="col-lg-7 md-10">
                        <h1 className="display-2 text-white">Hello, {(
                            () => {
                                return userInfo.userfullname.split(" ")[0]
                            }
                        )()}!</h1>
                    </div>
                </div>
            </div>
            <div className="container-fluid mt--7">
                <div className="row">
                    <div className="col-xl-4 order-xl-2">
                        <div className="card card-profile">
                            <img src="../assets/img/theme/img-1-1000x600.jpg" alt="Image placeholder" className="card-img-top" />
                            <div className="row justify-content-center">
                                <div className="col-lg-3 order-lg-2">
                                    <div className="card-profile-image">
                                        <a data-toggle="modal" data-target="#profileSelecter">
                                        <img src={"https://ui-avatars.com/api/?bold=true&size=256&background=random&name=" + userInfo.userfullname} alt={userInfo.userfullname} className="rounded-circle userimage" />
                                           {/*  <img src={"https://ui-avatars.com/api/?bold=true&size=256&background=random&name=" + userInfo.userfullname} alt={userInfo.userfullname} className="rounded-circle userimage" /> */}
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                <div className="d-flex justify-content-between">
                                </div>
                            </div>
                            <div className="card-body pt-0">
                                <div className="mt-5 text-center">
                                    <h5 className="h3">
                                        {userInfo.userfullname}
                                    </h5>
                                    <h5 className="h4 font-weight-300">
                                        {userInfo.username}
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-8 order-xl-1">
                        <div className="card">

                            <div className="card-body">

                                {(() => {
                                    if (userInfo.userver == 0) {
                                        return (
                                            <div class="alert alert-warning" role="alert" id="ver_alert">
                                                please verify your email address, <strong><a class="text-white" href="" onClick={sendVerification}>click to send</a></strong> verification link in your inbox
                                            </div>
                                        )
                                    }
                                })()}

                                <form onSubmit={updateUserInfo}>
                                    <h6 className="heading-small text-muted mb-4">Update information</h6>
                                    <div className="pl-lg-4">
                                        <div class="alert u-i-error hide alert-danger alert-dismissible fade show" role="alert">
                                            <span class="alert-text u-info-error" >

                                            </span>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label className="form-control-label" for="input-email">Full Name</label>
                                                    <input onChange={changeUserInfo} disabled type="text" id="input-email" className="u-full-i form-control" placeholder={userInfo.userfullname} name="uname" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label className="form-control-label" for="input-username">Username</label>
                                                    <input disabled type="text" id="input-username" className="form-control" placeholder="Username" value={userInfo.username} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label className="form-control-label" for="input-first-name">Email</label>
                                                    <input onChange={changeUserInfo} disabled type="text" id="input-first-name" className="u-email-i form-control" placeholder={userInfo.useremail} name="uemail" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label className="form-control-label" for="input-last-name">Phone No</label>
                                                    <input onChange={changeUserInfo} disabled type="text" id="input-last-name" className="u-phone-i form-control" placeholder={userInfo.userphone} name="uphone" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row align-items-center">
                                        <div className="col-8">

                                        </div>
                                        <div className="col-4 text-right">
                                            <button disabled className="u-i-btn btn btn-primary">Update</button>
                                        </div>
                                    </div>
                                </form>
                                <hr className="my-4" />
                                <form onSubmit={setNewPass}>
                                    <h6 className="heading-small text-muted mb-4">Chenge Password</h6>
                                    <div className="pl-lg-4">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div class="alert n-p-error hide alert-danger alert-dismissible fade show" role="alert">
                                                    <span class="alert-text np-info-error" >

                                                    </span>
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-control-label" for="input-address">Current Password</label>
                                                    <input onChange={changePassInfo} className="form-control c-p-in" placeholder="Current Password" type="password" name="cpass" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-control-label" for="input-address">New Password</label>
                                                    <input onChange={changePassInfo} className="form-control n-p-in" placeholder="New Password" type="password" name="npass" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-control-label" for="input-address">Re-Enter New Password</label>
                                                    <input onChange={changePassInfo} className="form-control rn-p-in" placeholder="Re-Enter New Password" type="password" name="rnpass" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row align-items-center">
                                        <div className="col-8">

                                        </div>
                                        <div className="col-4 text-right">
                                            <button disabled className="btn n-p-btn btn-primary n-p-btn">Change</button>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        </>
    )

}

export default Profile