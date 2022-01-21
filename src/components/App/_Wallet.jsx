import { useState, useEffect } from "react"
import Footer from "./_Footer"
import Env from "../Env"
import checkAuth from "../../module/checkauth"
import cookies from "../../module/cookies"

const Wallet = () => {

    document.title = "Wallet - " + Env.AppName

    const [getPOM, setPOM] = useState({ pm: "paypal", mpr: 3, dExp: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, dTyp: "email" })
    const [getUBAL, setUBAL] = useState(0)
    const [getWITHT, setWITHT] = useState([[], 0])

    const payOutSel = (e) => {
        const pol = document.getElementById("pol_logo")
        switch (e.target.id) {
            case "pos_p_l":
                setPOM({ pm: "paypal", mpr: 3, dExp: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, dTyp: "email" })
                pol.src = "/assets/img/pol/paypal.svg"
                document.getElementById("p_m_l").innerHTML = "paypal registred email"
                document.getElementById("p_m_i").placeholder = "paypal registred email"
                document.getElementById("a_n_i").placeholder = "Minimum $" + 3;
                document.getElementById("a_n_i").min = 3;
                break;
            case "pos_p_r":
                setPOM({ pm: "payoneer", mpr: 60, dExp: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, dTyp: "email" })
                pol.src = "/assets/img/pol/payoneer.svg"
                document.getElementById("p_m_l").innerHTML = "payoneer registred email";
                document.getElementById("p_m_i").placeholder = "payoneer registred email";
                document.getElementById("a_n_i").placeholder = "Minimum $" + 60;
                document.getElementById("a_n_i").min = 60;
                break;
            case "pos_u_i":
                setPOM({ pm: "upi", mpr: 3, dExp: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)+$/, dTyp: "UPI" })
                pol.src = "/assets/img/pol/upi.svg"
                document.getElementById("p_m_l").innerHTML = "UPI ID";
                document.getElementById("p_m_i").placeholder = "UPI ID";
                document.getElementById("a_n_i").placeholder = "Minimum $" + 3;
                document.getElementById("a_n_i").min = 3;
                break;
            case "pos_g_e":
                setPOM({ pm: "google", mpr: 5, dExp: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, dTyp: "email" })
                pol.src = "/assets/img/pol/google.svg"
                document.getElementById("p_m_l").innerHTML = "Email";
                document.getElementById("p_m_i").placeholder = "Email";
                document.getElementById("a_n_i").placeholder = "Minimum $" + 5;
                document.getElementById("a_n_i").min = 5;
                break;
            case "pos_a_n":
                setPOM({ pm: "amazon", mpr: 5, dExp: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, dTyp: "email" })
                pol.src = "/assets/img/pol/amazon.svg"
                document.getElementById("p_m_l").innerHTML = "Email";
                document.getElementById("p_m_i").placeholder = "Email";
                document.getElementById("a_n_i").placeholder = "Minimum $" + 5;
                document.getElementById("a_n_i").min = 5;
                break;
            case "pos_p_e":
                setPOM({ pm: "phonepe", mpr: 5, dExp: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im, dTyp: "phone no" })
                pol.src = "/assets/img/pol/phonepe.svg"
                document.getElementById("p_m_l").innerHTML = "PhonePe registred phone no";
                document.getElementById("p_m_i").placeholder = "PhonePe registred phone no";
                document.getElementById("a_n_i").placeholder = "Minimum $" + 5;
                document.getElementById("a_n_i").min = 5;
                break;
            default:
                setPOM({ pm: "paypal", mpr: 3, dExp: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, dTyp: "email" })
                pol.src = "/assets/img/pol/paypal.svg"
                document.getElementById("p_m_l").innerHTML = "paypal registred email";
                document.getElementById("p_m_i").placeholder = "paypal registred email";
                document.getElementById("a_n_i").placeholder = "Minimum $" + 3;
                document.getElementById("a_n_i").min = 3;
                break;
        }
    }

    useEffect(() => {

        fetch(Env.BackEnd + "walletb", checkAuth()).then(b => b.json()).then(res => {
            if (res.error_code === 200) {
                setUBAL(res.user_balance.toFixed(2))
                setWITHT([res.user_withtable, res.user_withcon])
                document.getElementById("u_b_f").innerHTML = "$" + res.user_balance.toFixed(2);
                document.getElementById("u_p_f").innerHTML = "$" + res.user_panding.toFixed(2);
                document.getElementById("a_n_i").max = res.user_balance.toFixed(2);
            } else {
                alert("Sorry...")
            }
        }).catch(() => {
            alert("Sorry...")
        })

    }, [])

    const uWithDrow = (e) => {
        e.preventDefault()

        document.getElementById("w_alert").innerHTML = ""
        document.getElementById("w_alert").classList.add("hide")
        document.getElementById("p_m_i").setAttribute("disabled", "")
        document.getElementById("a_n_i").setAttribute("disabled", "")
        document.getElementById("w_f_s").setAttribute("disabled", "")

        setTimeout(() => {
            if (getPOM.dExp.test(document.getElementById("p_m_i").value)) {

                if (document.getElementById("a_n_i").value < getPOM.mpr) {
                    document.getElementById("w_alert").innerHTML = "minimum withdrawal amount is " + getPOM.mpr
                    document.getElementById("w_alert").classList.remove("hide")
                    document.getElementById("p_m_i").removeAttribute("disabled")
                    document.getElementById("a_n_i").removeAttribute("disabled")
                    document.getElementById("w_f_s").removeAttribute("disabled")
                } else {

                    if (parseInt(document.getElementById("a_n_i").value) > parseFloat(getUBAL).toFixed(2)) {
                        document.getElementById("w_alert").innerHTML = "no $" + document.getElementById("a_n_i").value + " amount in your wallet"
                        document.getElementById("w_alert").classList.remove("hide")
                        document.getElementById("p_m_i").removeAttribute("disabled")
                        document.getElementById("a_n_i").removeAttribute("disabled")
                        document.getElementById("w_f_s").removeAttribute("disabled")
                    } else {

                        let user_token = cookies.getCookie("USER_TOKEN")

                        if (user_token === null) {
                            user_token = "________"
                        }

                        fetch(Env.BackEnd + "withdraw", {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                "browser_code": Env.BrwserCode, "token": user_token, "wdamount": parseInt(document.getElementById("a_n_i").value), paya: document.getElementById("p_m_i").value, paym: getPOM.pm
                            })
                        }).then(b => b.json()).then(res => {

                            if (res.error_code == 200) {

                                if (res.success) {
                                    document.getElementById("withdraw_secc").classList.add("hide")
                                    document.getElementById("withdraw_suss").classList.remove("hide")
                                } else {
                                    document.getElementById("withdraw_secc").classList.add("hide")
                                    document.getElementById("withdraw_erro").classList.remove("hide")
                                }

                            } else {
                                alert("Sorry...")
                            }

                        }).catch(() => {
                            alert("Sorry...")
                        })

                    }
                }

            } else {
                document.getElementById("w_alert").innerHTML = "invalid " + getPOM.dTyp
                document.getElementById("w_alert").classList.remove("hide")
                document.getElementById("p_m_i").removeAttribute("disabled")
                document.getElementById("a_n_i").removeAttribute("disabled")
                document.getElementById("w_f_s").removeAttribute("disabled")
            }
        }, 500);


    }

    function tConvert(time) {
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) {
            time = time.slice(1);
            time[5] = +time[0] < 12 ? 'AM' : 'PM';
            time[0] = +time[0] % 12 || 12;
        }
        return time.join(''); // return adjusted time or original string
    }

    return (
        <>

            <div className="header mt--6 d-flex align-items-center background-cover" >
                <span className="mask bg-gradient-default opacity-7"></span>
                <div className="container-fluid d-flex align-items-center">
                    <div className="col-lg-7 md-10">
                        <h1 className="display-2 text-white">Wallet</h1>
                    </div>
                </div>
            </div>

            <div className="container-fluid mt--7">
                <div className="row">
                    <div className="col-12 order-xl-1">
                        <div class="card">
                            <div className="col-12">
                                <div class="card-body mt-2">
                                    <div class="row">
                                        <div className="col-12 col-lg-6 p-0 pb-3">
                                            <div class="row">
                                                <div class="col">
                                                    <h5 class="card-title text-uppercase text-muted mb-0">TOTAL BALANCE</h5>
                                                    <span id="u_b_f" class="display-2 h1 font-weight-bold mb-0">$</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6 p-0 pb-3">
                                            <div class="row">
                                                <div class="col">
                                                    <h5 class="card-title text-uppercase text-muted mb-0">Pending Withdraw</h5>
                                                    <span id="u_p_f" class="display-2 h1 font-weight-bold mb-0">$0.00</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mt--4 p-0">
                                <div className="card-body" >
                                    <h5 class="card-title text-uppercase text-muted mb-2 p-0">WITHDRAW</h5>
                                    <div className="div" id="withdraw_secc">

                                        <div class="nav-wrapper">
                                            <ul class="nav nav-pills nav-fill flex-column flex-md-row" id="tabs-icons-text" role="tablist">
                                                <li class="nav-item hide">
                                                    <a class="nav-link mb-sm-3 mb-md-0" data-toggle="tab" href="#tabs-icons-text-1" role="tab" >PayPal</a>
                                                </li>
                                                <li class="nav-item">
                                                    <a class="nav-link mb-sm-3 mb-md-0 active" onClick={payOutSel} id="pos_p_l" data-toggle="tab" href="#tabs-icons-text-2" role="tab">PayPal</a>
                                                </li>
                                                <li class="nav-item">
                                                    <a class="nav-link mb-sm-3 mb-md-0" onClick={payOutSel} id="pos_p_r" data-toggle="tab" href="#tabs-icons-text-3" role="tab">Payoneer</a>
                                                </li>
                                                <li class="nav-item">
                                                    <a class="nav-link mb-sm-3 mb-md-0" onClick={payOutSel} id="pos_u_i" data-toggle="tab" href="#tabs-icons-text-4" role="tab">UPI (india)</a>
                                                </li>
                                                <li class="nav-item">
                                                    <a class="nav-link mb-sm-3 mb-md-0" onClick={payOutSel} id="pos_g_e" data-toggle="tab" href="#tabs-icons-text-5" role="tab">google redeem code</a>
                                                </li>
                                                <li class="nav-item">
                                                    <a class="nav-link mb-sm-3 mb-md-0" onClick={payOutSel} id="pos_a_n" data-toggle="tab" href="#tabs-icons-text-6" role="tab">amazon gift card</a>
                                                </li>
                                                <li class="nav-item">
                                                    <a class="nav-link mb-sm-3 mb-md-0" onClick={payOutSel} id="pos_p_e" data-toggle="tab" href="#tabs-icons-text-6" role="tab">PhonePe</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="tab-content" id="myTabContent">
                                            <div class="tab-pane fade show active" id="tabs-icons-text-1" role="tabpanel" aria-labelledby="tabs-icons-text-1-tab">
                                                <div id="w_alert" className="hide alert alert-danger">

                                                </div>
                                                <form action="" onSubmit={uWithDrow}>
                                                    <div className="row p-0">
                                                        <div className="col-12 col-lg-4 py-4">
                                                            <img id="pol_logo" src="/assets/img/pol/paypal.svg" class="w-100" />
                                                        </div>
                                                        <div className="col-12 p-0 col-lg-8">
                                                            <div className="col-lg-12">
                                                                <div className="form-group">
                                                                    <label id="p_m_l" className="form-control-label" for="input-first-name">paypal registred email</label>
                                                                    <input id="p_m_i" required type="text" className="u-email-i form-control" placeholder="Paypal Registred Email" name="uemail" />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div class="form-group">
                                                                    <label for="example-number-input" class="form-control-label">Amount in Doller</label>
                                                                    <input id="a_n_i" required class="form-control" min="3" type="number" placeholder="Minimum $3" />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div class="form-group d-flex">
                                                                    <button id="w_f_s" class="btn btn-primary ml-auto">
                                                                        Withdraw
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="withdraw_suss" class="hide">
                                        <h2>Withdraw Successfull</h2>
                                        <h2><a href="/dashboard/wallet">Please Reload This Page</a></h2>
                                    </div>
                                    <div id="withdraw_erro" class="hide">
                                        <h2>Withdraw Error</h2>
                                        <h2>Please Try Agein</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mt--4 p-0">
                                <div className="card-body" >
                                    <h5 class="card-title text-uppercase text-muted mb-2 p-0">WITHDRAW history</h5>
                                    <div class="table-responsive">
                                        <table class="table align-items-center table-flush">
                                            <thead class="thead-light">
                                                <tr>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">withdraw amount</th>
                                                    <th scope="col">Withdrawal Method</th>
                                                    <th scope="col">Withdrawal Account</th>
                                                    <th scope="col">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {getWITHT[0].map((e) => {
                                                    if (e.date !== "") {
                                                        return (
                                                            <tr>
                                                                <th scope="row">
                                                                    {(() => {
                                                                        var timex = e.date.split(" ")[1].split(":")
                                                                        var datex = e.date.split(" ")[0].split("-")
                                                                        return (
                                                                            [<i class='far fa-calendar-alt'></i>, " " + parseInt(datex[1]) + "/" + parseInt(datex[2]) + "/" + datex[0] + " ", <i class='far fa-clock'></i>, " " + tConvert(timex[0] + ":" + timex[1])]
                                                                        )
                                                                    })()}
                                                                </th>
                                                                <td>
                                                                    ${e.por}
                                                                </td>
                                                                <td>
                                                                    {e.pom}
                                                                </td>
                                                                <td>
                                                                    {e.poa}
                                                                </td>
                                                                <td>
                                                                    {(() => {
                                                                        if (e.status === "1") {
                                                                            return (
                                                                                <>
                                                                                    <i class="fas fa-circle text-orange"></i> Pending
                                                                                </>
                                                                            )
                                                                        } else if (e.status === "0") {
                                                                            return (
                                                                                <>
                                                                                    <i class="fas fa-circle text-green"></i> complete
                                                                                </>
                                                                            )
                                                                        } else if (e.status === "2") {
                                                                            return (
                                                                                <>
                                                                                    <i class="fas fa-circle text-red"></i> cancel
                                                                                </>
                                                                            )
                                                                        }
                                                                    })()}
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                })}

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <Footer />
            </div>

        </>
    )

}

export default Wallet