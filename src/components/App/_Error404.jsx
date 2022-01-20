import Footer from "./_Footer"
import 'react-image-crop/dist/ReactCrop.css';
import { Link } from "react-router-dom";
import Env from "../Env";

const Error404 = () => {

    document.title = "404! Not Found - " + Env.AppName

    return (
        <>



            <div className="header header-9 d-flex align-items-center background-cover" >
                <span className="mask bg-gradient-default opacity-7"></span>
                <div className="container-fluid d-flex align-items-center">
                    <div className="col-lg-7 md-10">
                        <h1 className="display-2 text-white">404!</h1>
                        <p className="text-white">Opps..., Page Not Found!</p>
                        <Link to="/dashboard" className="text-gray"><u>Click To Dashbord</u></Link>
                    </div>
                </div>
            </div>
            <div className="container-fluid mt--7">
                <div className="row">
                    
                </div>
                <Footer />
            </div>

        </>
    )

}

export default Error404