import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import checkAuth from "../../module/checkauth"
import Env from "../Env"

const Header = () => {

    const [userInfo, setUInfo] = useState({
        userfullname: "I Am Robo",
        userphoto: "/assets/img/theme/rakhi.jpg"
    })

    useEffect(() => {


        fetch(Env.BackEnd + "profile", checkAuth()).then(b => b.json()).then(res => {

            if (res.user_info.user_photo == "") {
                var photo = "/assets/img/theme/girl.jpg"
            }

            setUInfo({ userfullname: res.user_info.user_fullname, userphoto: photo })

        }).catch((e) => {

            alert("Sorry")

        })

    }, [])

    return (
        <>

            <nav class="navbar navbar-top navbar-expand navbar-dark bg-gradient-default border-bottom">
                <div class="container-fluid">
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <img src="/assets/img/brand/g60.png" class="navbar-brand-img" class="db-nav-logo" />
                        <ul class="navbar-nav align-items-center ml-auto ml-md-auto ">
                            <li class="nav-item ah-link d-xl-none side-nav-tog">
                                <i class="fas fa-bars"></i>
                            </li>
                            <Link to="/dashboard/new" class="nav-item ah-link side-nav-tog">
                                <i class="fas fa-plus"></i>
                            </Link>
                        </ul>
                        <ul class="navbar-nav align-items-center ml-md-0 ">
                            <li class="nav-item dropdown">
                                <a class="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <div class="media align-items-center">
                                        <span class="avatar avatar-sm rounded-circle">
                                            <img alt={userInfo.userfullname} src={"https://ui-avatars.com/api/?bold=true&size=256&background=random&name=" + userInfo.userfullname} />
                                            {/* <img alt={userInfo.userfullname} src={"https://ui-avatars.com/api/?bold=true&size=256&background=random&name=" + userInfo.userfullname} /> */}
                                        </span>
                                        <div class="media-body  ml-2  d-none d-lg-block">
                                            <span class="mb-0 text-sm  font-weight-bold">{userInfo.userfullname}</span>
                                        </div>
                                    </div>
                                </a>
                                <div class="dropdown-menu  dropdown-menu-right ">
                                    <div class="dropdown-header noti-title">
                                        <h6 class="text-overflow m-0">Welcome!</h6>
                                    </div>
                                    <Link to="/dashboard/profile" class="dropdown-item">
                                        <i class="fa fa-user"></i>
                                        <span>My profile</span>
                                    </Link>
                                    <div class="dropdown-divider"></div>
                                    <a data-toggle="modal" data-target="#logoutMod" to="/logout" class="dropdown-item text-dark">
                                        <i class="fa fa-sign-out-alt"></i>
                                        <span>Logout</span>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div class="modal fade" id="logoutMod" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="logoutModLabel">Logout</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <h2>Are You Sure You want to logout</h2>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <Link type="button" class="btn btn-primary" to="/logout">Logout</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Header