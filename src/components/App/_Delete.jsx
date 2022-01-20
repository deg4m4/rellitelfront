import { useEffect, useState } from "react"
import Footer from "./_Footer"
import Env from "../Env"
import cookies from "../../module/cookies"
import { useParams, Link } from "react-router-dom"

const Delete = () => {

    document.title = "Delete Link - " + Env.AppName

    let { linkSlug, pageNum, pageQuery } = useParams();

    function deleteLink(e) {

        e.preventDefault()

        document.getElementById("d_btn").setAttribute("disabled", "")

        setTimeout(() => {

            let user_token = cookies.getCookie("USER_TOKEN")

            if (user_token === null) {
                user_token = "________"
            }


            fetch(Env.BackEnd + "link/delete", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "browser_code": Env.BrwserCode, "token": user_token, "link_slug": linkSlug })
            }).then(b => b.json()).then(res => {

                document.getElementById("d_body").classList.add("hide")

                if (res.success) {

                    document.getElementsByClassName("link-success")[0].classList.remove("hide")

                } else {

                    document.getElementsByClassName("link-error")[0].classList.remove("hide")

                }

            }).catch(() => {

                alert("Sorry...")
            })

        }, 500)

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

    useEffect(() => {
        document.getElementById("d_body").style.opacity = .3
        let user_token = cookies.getCookie("USER_TOKEN")

        if (user_token === null) {
            user_token = "________"
        }

        fetch(Env.BackEnd + "link/info", {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "browser_code": Env.BrwserCode, "token": user_token, "link_slug": linkSlug })

        }).then(b => b.json()).then(res => {

            if (res.link_info.l_count == 0 || !res.success) {
                document.getElementById("link404_error").classList.remove("hide")
                document.getElementById("d_body").classList.add("hide")
            } else {

                document.getElementById("l_name").innerHTML = res.link_info.l_name
                document.getElementById("l_uri").innerHTML = res.link_info.l_uri
                document.getElementById("l_uri").setAttribute("href", res.link_info.l_uri)
                if (res.link_info.l_des != "" && res.link_info.l_des != " ") {
                    document.getElementById("l_des").innerHTML = res.link_info.l_des
                } else {
                    document.getElementById("des_c").classList.add("hide")
                }
                var l_v = "Public"
                switch (res.link_info.l_visible) {
                    case 1:
                        l_v = "Public"
                        break;
                    case 2:
                        l_v = "Unlist"
                        break;
                    case 3:
                        l_v = "Private"
                        break;
                    default:
                        l_v = "Public"
                        break;
                }

                var l_t = "Redirect"
                switch (res.link_info.l_type) {
                    case 1:
                        l_t = "Redirect"
                        break;
                    case 2:
                        l_t = "Download"
                        break;
                    case 3:
                        l_t = "Video"
                        break;
                    case 4:
                        l_t = "Image"
                        break;
                    default:
                        l_t = "Redirect"
                        break;
                }

                document.getElementById("l_mark").innerHTML = l_v + " | " + l_t
                var timex = res.link_info.l_time.split(" ")[1].split(":")
                var datex = res.link_info.l_time.split(" ")[0].split("-")
                document.getElementById("l_time").innerHTML = "<i class='far fa-calendar-alt'></i> " + parseInt(datex[1]) + "/" + parseInt(datex[2]) + "/" + datex[0] + " <i class='far fa-clock'></i> " + tConvert(timex[0] + ":" + timex[1])
                if (res.link_info.thu_i != "") {
                    document.getElementById("thuimg_s").src = Env.SURL + "images/" + res.link_info.thu_i
                } else {
                    document.getElementById("thuimg_c").classList.add("hide")
                }

                if (res.link_info.pre_i != "") {
                    document.getElementById("preimg_s").src = Env.SURL + "/images/" + res.link_info.pre_i
                } else {
                    document.getElementById("preimg_c").classList.add("hide")
                }
                document.getElementById("d_body").style.opacity = 1
                document.getElementById("d_btn").removeAttribute("disabled")

            }

        }).catch(() => {
            alert("Sorry...")
        })

    }, [])

    return (
        <>

            <div className="header mt--6 d-flex align-items-center background-cover" >
                <span className="mask bg-gradient-default opacity-7"></span>
                <div className="container-fluid d-flex align-items-center">
                    <div className="col-lg-7 md-10">
                        <h1 className="display-2 text-white">Delete Link</h1>
                    </div>
                </div>
            </div>

            <div className="container-fluid mt--7">

                <div className="row">
                    <div className="col-xl-12 order-xl-1">
                        <div className="card">

                            <div className="card-body" id="">
                                <div className="alert link-error hide alert-danger alert-dismissible fade show" role="alert">
                                    <span className="alert-text" >
                                        Link Delete Error, <a href={window.location.href}>Re-Try</a>
                                    </span>
                                </div>
                                <div id="link404_error" className="alert hide alert-danger alert-dismissible fade show" role="alert">
                                    <span className="alert-text" >
                                        404, No Link Found...
                                    </span>
                                </div>
                                <div className="link-success hide">
                                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                                        <span className="alert-text" >
                                            Link Delete Successful...
                                            <br />
                                            {(() => {
                                                var pN = pageNum == undefined ? "" : pageNum
                                                return (
                                                    <Link to={"/dashboard/links/" + pN + "/" + (pageQuery != undefined ? pageQuery : "")}>View All Links</Link>
                                                )
                                            })()}
                                        </span>
                                    </div>

                                </div>
                                <div id="d_body" className="pl-lg-4">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h1 id="l_name">Link Name</h1>
                                            <h3 class="text-primary mt--2">
                                                <a href="" target="_blank" id="l_uri">
                                                    Link
                                                </a>
                                            </h3>
                                            <h4 id="l_mark" class='mt--1 text-gray'>Public | Image</h4>
                                            <h4 id="l_time" class='mt--1 text-gray'>4/12/2000 6:51PM</h4>
                                        </div>
                                        <div className="col-md-12" id="des_c">
                                            <label className="form-control-label">Description</label>
                                            <h3 id="l_des" class="mt--2">Link Description</h3>
                                        </div>

                                        <div className="col-md-12" id="thuimg_c">
                                            <label className="form-control-label">Thumbline</label>
                                            <div className="col-md-12">
                                                <img width="50%" id="thuimg_s" src="http://localhost:3000/assets/img/brand/g61.png" alt="" />
                                            </div>
                                        </div>


                                        <div className="col-md-12" id="preimg_c">
                                            <label className="form-control-label">Preview Image</label>
                                            <div className="col-12">
                                                <img width="100%" id="preimg_s" src="http://localhost:3000/assets/img/brand/g61.png" alt="" />
                                            </div>
                                        </div>

                                        <div className="col-12"></div>

                                        <div className="col-md-8">

                                        </div>
                                        <div className="col-md-4 mt-4 text-right">
                                            <form onSubmit={deleteLink} action="">
                                                <button className="btn btn-danger" disabled id="d_btn">Delete</button>
                                            </form>

                                        </div>
                                        {(() => {
                                            if (pageNum != undefined) {
                                                return (
                                                    <div className="col-12">
                                                        <div className="">
                                                            <Link to={"/dashboard/links/" + pageNum + "/" + (pageQuery != undefined ? pageQuery : "")}><i className="fa fa-arrow-left"></i> Back</Link>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })()}
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

export default Delete