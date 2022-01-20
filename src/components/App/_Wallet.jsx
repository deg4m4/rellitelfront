import { useState } from "react"
import Footer from "./_Footer"
import Env from "../Env"

const Wallet = () => {

    document.title = "Wallet - " + Env.AppName

    const [getPOM, setPOM] = useState("paypal")

    const payOutSel = (e) => {
        const pol = document.getElementById("pol_logo")
        switch (e.target.id) {
            case "pos_p_l":
                setPOM("paypal")
                pol.src = "/assets/img/pol/paypal.svg"
                break;
            case "pos_p_r":
                setPOM("payoneer")
                pol.src = "/assets/img/pol/payoneer.svg"
                break;
            case "pos_u_i":
                setPOM("upi")
                pol.src = "/assets/img/pol/upi.svg"
                break;
            case "pos_g_e":
                setPOM("google")
                pol.src = "/assets/img/pol/google.svg"
                break;
            case "pos_a_n":
                setPOM("amazon")
                pol.src = "/assets/img/pol/amazon.svg"
                break;
            case "pos_p_e":
                setPOM("phonepe")
                pol.src = "/assets/img/pol/phonepe.svg"
                break;
            default:
                setPOM("paypal")
                pol.src = "/assets/img/pol/paypal.svg"
                break;
        }
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
                                                    <span class="display-2 h1 font-weight-bold mb-0">$</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-6 p-0 pb-3">
                                            <div class="row">
                                                <div class="col">
                                                    <h5 class="card-title text-uppercase text-muted mb-0">Pending Withdraw</h5>
                                                    <span class="display-2 h1 font-weight-bold mb-0">$</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mt--4 p-0">
                                <div className="card-body ">
                                    <h5 class="card-title text-uppercase text-muted mb-2 p-0">WITHDRAW</h5>
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

                                            <div className="row p-0">
                                                <div className="col-12 col-lg-4 py-4">
                                                    <img id="pol_logo" src="/assets/img/pol/paypal.svg" class="w-100" />
                                                </div>
                                                <div className="col-12 p-0 col-lg-8">
                                                    <div className="col-lg-12">
                                                        <div className="form-group">
                                                            <label className="form-control-label" for="input-first-name">paypal registred email</label>
                                                            <input type="text" id="input-first-name" className="u-email-i form-control" placeholder="Paypal Registred Email" name="uemail" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div class="form-group">
                                                            <label for="example-number-input" class="form-control-label">Amount in Doller</label>
                                                            <input class="form-control" type="number" id="example-number-input" placeholder="minimum $1" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div class="form-group d-flex">
                                                            <button class="btn btn-primary ml-auto">
                                                                Withdraw
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
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