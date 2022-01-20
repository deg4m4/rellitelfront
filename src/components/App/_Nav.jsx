import { useEffect } from "react"
import { NavLink } from "react-router-dom"
import Env from "../Env"
import checkAuth from "../../module/checkauth"
import cookies from "../../module/cookies"

const Nav = () => {


    useEffect(() => {

        //checklogin
        fetch(Env.BackEnd, checkAuth()).then(r => r.json()).then((res) => {

            if (!res.user_auth) {
                cookies.deleteCookie("USER_TOKEN")
                window.location.href = "/"
            }

        }).catch((e) => console.log(e))

        const sideTog = document.getElementsByClassName("side-nav-tog")[0]
        const sideNav = document.getElementsByClassName("admin-side-nav")[0]

        sideTog.addEventListener('click', () => {
            if (sideNav.classList.contains("nav-show")) {
                sideNav.classList.remove("nav-show")
            } else {
                sideNav.classList.add("nav-show")
            }
        })

        const a = sideNav.getElementsByTagName("a")

        for (let i = 0; i < a.length; i++) {
            a[i].addEventListener('click', () => {
                sideNav.classList.remove("nav-show")
            })
        }

    }, [])


    return (
        <>
            <nav className="sidenav admin-side-nav navbar navbar-vertical  fixed-left  navbar-expand-xs navbar-light bg-white" id="sidenav-main">
                <div className="scrollbar-inner">
                    <div className="sidenav-header  align-items-center">
                        <NavLink className="navbar-brand" to="/dashboardjavascript:void(0)">
                            <img src="../assets/img/brand/g61.png" className="navbar-brand-img" alt="..." />
                        </NavLink>
                    </div>
                    <div className="navbar-inner">
                        <div className="collapse navbar-collapse" id="sidenav-collapse-main">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/dashboard">
                                        <i className="fa fa-pager text-red"></i>
                                        <span className="nav-link-text">Dashboard</span>
                                    </NavLink>
                                </li>
                            </ul>
                            <hr className="my-3" />
                            <h6 className="navbar-heading p-0 text-muted">
                                <span className="docs-normal">Manage</span>
                            </h6>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/dashboard/links">
                                        <i className="fa fa-link text-primary"></i>
                                        <span className="nav-link-text">All Links</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/dashboard/new">
                                        <i className="fa fa-plus text-orange"></i>
                                        <span className="nav-link-text">New Link</span>
                                    </NavLink>
                                </li>
                            </ul>
                            <hr className="my-3" />
                            <h6 className="navbar-heading p-0 text-muted">
                                <span className="docs-normal">Account</span>
                            </h6>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/dashboard/wallet">
                                        <i className="fa fa-wallet text-green"></i>
                                        <span className="nav-link-text">Wallet</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/dashboard/setting">
                                        <i className="fa fa-cog text-purple"></i>
                                        <span className="nav-link-text">Page Setting</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/dashboard/profile">
                                        <i className="fa fa-user text-info"></i>
                                        <span className="nav-link-text">Profile</span>
                                    </NavLink>
                                </li>
                            </ul>
                            <hr className="my-3" />
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/dashboard/support">
                                        <i className="fa fa-headset text-pink"></i>
                                        <span className="nav-link-text">Support</span>
                                    </NavLink>
                                </li>
                            </ul>
                            <hr className="my-3" />
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a  data-toggle="modal" data-target="#logoutMod" className="nav-link" to="/logout">
                                        <i className="fa fa-sign-out-alt text-gray"></i>
                                        <span className="nav-link-text">Logout</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

        </>
    )

}

export default Nav