import Footer from "./_Footer"

const Wallet = () => {



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
                                                <a class="nav-link mb-sm-3 mb-md-0 active" data-toggle="tab" href="#tabs-icons-text-2" role="tab">PayPal</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link mb-sm-3 mb-md-0" data-toggle="tab" href="#tabs-icons-text-3" role="tab">Payoneer</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link mb-sm-3 mb-md-0" data-toggle="tab" href="#tabs-icons-text-4" role="tab">UPI (india)</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link mb-sm-3 mb-md-0 " data-toggle="tab" href="#tabs-icons-text-5" role="tab">google redeem code</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link mb-sm-3 mb-md-0 " data-toggle="tab" href="#tabs-icons-text-6" role="tab">amazon gift card</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link mb-sm-3 mb-md-0 " data-toggle="tab" href="#tabs-icons-text-6" role="tab">PhonePe</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="card shadow">
                                        <div class="card-body">
                                            <div class="tab-content" id="myTabContent">
                                                <div class="tab-pane fade show active" id="tabs-icons-text-1" role="tabpanel" aria-labelledby="tabs-icons-text-1-tab">
                                                    <p class="description">Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth.</p>
                                                    <p class="description">Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse.</p>
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