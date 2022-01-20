import Footer from "./_Footer"
import Env from "../Env"

const Support = () => {

    document.title = "Support - " + Env.AppName

    return (
        <>

            <div className="header mt--6 d-flex align-items-center background-cover" >
                <span className="mask bg-gradient-default opacity-7"></span>
                <div className="container-fluid d-flex align-items-center">
                    <div className="col-lg-7 md-10">
                        <h1 className="display-2 text-white">Support</h1>
                    </div>
                </div>
            </div>

            <div className="container-fluid mt--7">
                <div className="row">
                    <div className="col-xl-12 order-xl-1">
                        <div className="card">
                            <div className="card-header">
                                <div className="row align-items-center">
                                    <div className="col-8">
                                        <h3 className="mb-0">Contact from telegram</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">

                                <a href="" className="btn" target="_blank">
                                    <img width="250px" src="/assets/img/telegram-logo-11.png" />
                                </a>
                                <div className="mt-5">
                                    <a href="" target="_blank">Click</a> to go Telegram.
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

export default Support