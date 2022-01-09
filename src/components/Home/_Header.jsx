import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"
import checkAuth from "../../module/checkauth";
import Env from "../Env"

const hideNavX = () => {
    var CloseX = document.getElementsByClassName("nav-linkx");
    for (var i = 0; i < CloseX.length; i++) {
        CloseX[i].addEventListener('click', () => {
            document.getElementsByClassName("navbarx")[0].classList.remove("show")
        })
    }
}
const Header = () => {

    const [appState, setAppState] = useState({

    });
    useEffect(() => {

        //checklogin
        fetch(Env.BackEnd, checkAuth()).then(r => r.json()).then((res) => {


            setAppState({ "auth": res.user_auth });
            hideNavX()

        }).catch((e) => console.log(e))


    }, []);

    return (
        <>

            
            <nav id="navbar-main" class="navbar navbar-horizontal navbar-transparent navbar-main navbar-expand-lg navbar-light">
                <div class="container">
                    <a class="navbar-brand" href="/">
                        <img src="/assets/img/brand/g60.png" />
                    </a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-collapse" aria-controls="navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="navbar-collapse navbarx navbar-custom-collapse collapse" id="navbar-collapse">
                        <div class="navbar-collapse-header">
                            <div class="row">
                                <div class="col-6 collapse-brand">
                                    <a href="dashboard.html">
                                        <img src="../assets/img/brand/g61.png" />
                                    </a>
                                </div>
                                <div class="col-6 collapse-close">
                                    <button type="button" class="navbar-toggler navclosex" data-toggle="collapse" data-target="#navbar-collapse" aria-controls="navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
                                        <span></span>
                                        <span></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <ul class="navbar-nav align-items-lg-center ml-lg-auto">
                            <li class="nav-item">
                                <NavLink to="/" className="nav-link nav-linkx" >
                                    <span class="nav-link-inner--text">Home</span>
                                </NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink to="/services" className="nav-link nav-linkx">
                                    <span class="nav-link-inner--text">Services</span>
                                </NavLink>
                            </li>
                            {(() => {
                                if (appState.auth == false) {
                                    return (
                                        <>
                                            <li class="nav-item">
                                                <NavLink to="/login" className="nav-link nav-linkx">
                                                    <span class="nav-link-inner--text">Login</span>
                                                </NavLink>
                                            </li>
                                            <li class="nav-item">
                                                <NavLink to="/register" className="nav-link nav-linkx">
                                                    <span class="nav-link-inner--text">Register</span>
                                                </NavLink>
                                            </li>
                                        </>
                                    )
                                } else {
                                    return (
                                        <>
                                            <li class="nav-item">
                                                <NavLink to="/dashboard" className="nav-link nav-linkx">
                                                    <span class="nav-link-inner--text">dashboard</span>
                                                </NavLink>
                                            </li>
                                        </>
                                    )
                                }


                            })()}
                            {(() => {
                                hideNavX()
                            })()}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )

}

export default Header