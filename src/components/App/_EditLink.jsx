import { useEffect, useState } from "react"
import Footer from "./_Footer"
import Env from "../Env"
import cookies from "../../module/cookies"
import { useParams, Link } from "react-router-dom"

const EditLink = () => {

    let { linkSlug, pageNum, pageQuery } = useParams();

    var [getUri, setUri] = useState()
    var [getUriD, setUriD] = useState({ l_type: "", l_name: "", l_des: "", pre_i: "", pre_e: "", pre_c: false, thu_e: "", thu_i: "", thu_c: false, l_visible: "", l_con: "" })
    var [uriInfo, sUriInfo] = useState({})

    const urlC = (e) => {
        const mls = document.getElementsByClassName("m-l-s")[0]
        const ucb = document.getElementsByClassName("uri-c-btn")[0]
        mls.classList.add("hide")
        ucb.parentElement.classList.remove("hide")

        getUri = e.target.value;

        const setBtn = document.getElementsByClassName("uri-c-btn")[0]
        if (getUri == "") {
            setBtn.setAttribute("disabled", "")
        } else {
            setBtn.removeAttribute("disabled")
        }
    }

    const cUriData = (e) => {

        getUriD[e.target.id] = e.target.value;

        console.log(getUriD);

    }

    const clearImage = (e) => {
        if (e.target.id == "clearthu") {
            document.getElementById("thuimg_c").classList.add("hide")
            getUriD.thu_i = ""
            getUriD.thu_e = ""
            getUriD.thu_c = true
            document.getElementById("thuimg_i").value = ""
        } else {
            document.getElementById("preimg_c").classList.add("hide")
            getUriD.pre_i = ""
            getUriD.pre_e = ""
            getUriD.pre_c = true
            document.getElementById("preimg_i").value = ""
        }
    }

    function showImage(src, target, key) {
        var fr = new FileReader();
        fr.onload = function (e) {
            target.src = this.result;
            if (key == "1") {
                getUriD.thu_i = this.result.replace("data:", "").replace(/^.+,/, "")
                getUriD.thu_e = src.files[0].name.split(".").slice(-1)[0]
                getUriD.thu_c = false
            } else {
                getUriD.pre_i = this.result.replace("data:", "").replace(/^.+,/, "")
                getUriD.pre_e = src.files[0].name.split(".").slice(-1)[0]
                getUriD.pre_c = false
            }
        };
        fr.readAsDataURL(src.files[0]);
    }

    const loadimage = (e) => {
        if (e.target.id == "thuimg_i") {
            showImage(document.getElementById("thuimg_i"), document.getElementById("thuimg_s"), "1")
            document.getElementById("thuimg_c").classList.remove("hide")
        } else if (e.target.id == "preimg_i") {
            showImage(document.getElementById("preimg_i"), document.getElementById("preimg_s"), "2")
            document.getElementById("preimg_c").classList.remove("hide")
        }
    }

    function updateLink(e) {

        e.preventDefault()

        setTimeout(() => {

            let user_token = cookies.getCookie("USER_TOKEN")

            if (user_token === null) {
                user_token = "________"
            }

            fetch(Env.BackEnd + "link/edit", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "browser_code": Env.BrwserCode, "token": user_token, "link_slug": linkSlug, "link_info": getUriD, l_visible: "" })
            }).then(b => b.json()).then(res => {

                document.getElementById("edit_form").classList.add("hide")

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

    useEffect(() => {
        let user_token = cookies.getCookie("USER_TOKEN")

        if (user_token === null) {
            user_token = "________"
        }

        fetch(Env.BackEnd + "link/info", {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "browser_code": Env.BrwserCode, "token": user_token, "link_slug": linkSlug })

        }).then(b => b.json()).then(res => {

            if (res.link_info.l_visible == 1) {
                document.getElementById("l_visible").childNodes[0].setAttribute("selected", "")
            } else if (res.link_info.l_visible == 2) {
                document.getElementById("l_visible").childNodes[1].setAttribute("selected", "")
            } else {
                document.getElementById("l_visible").childNodes[2].setAttribute("selected", "")
            }

            document.getElementById("l_name").setAttribute("placeholder", res.link_info.l_name)
            document.getElementById("l_url").setAttribute("placeholder", res.link_info.l_uri)
            document.getElementById("l_des").setAttribute("placeholder", res.link_info.l_des)
            document.getElementById("l_con").setAttribute("placeholder", res.link_info.l_con)

            if (res.link_info.thu_i != "") {
                document.getElementById("thuimg_s").src = Env.SURL + "/images/" + res.link_info.thu_i
            } else {
                document.getElementById("thuimg_c").classList.add("hide")
            }

            if (res.link_info.pre_i != "") {
                document.getElementById("preimg_s").src = Env.SURL + "/images/" + res.link_info.pre_i
            } else {
                document.getElementById("preimg_c").classList.add("hide")
            }

            document.getElementById("l_name").removeAttribute("disabled")

            document.getElementById("l_des").removeAttribute("disabled")
            document.getElementById("thuimg_i").removeAttribute("disabled")
            document.getElementById("preimg_i").removeAttribute("disabled")
            document.getElementById("up_btn").removeAttribute("disabled")

            if (res.link_info.l_count == 0 || !res.success) {
                document.getElementById("link404_error").classList.remove("hide")
                document.getElementById("edit_form").classList.add("hide")
            }

            const utl = document.getElementsByClassName("u-t-l")[0]
            const ltl = document.getElementById("ltl")
            if (res.link_info.l_uri.substring(0, 6).toLowerCase() === "magnet") {
                utl.innerHTML = '<option value="1">Magnet Link</option>'
                document.getElementById("l_type").removeAttribute("disabled")
            } else {
                fetch(Env.BackEnd + "tools/c", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ "browser_code": Env.BrwserCode, "uri": res.link_info.l_uri })
                }).then(b => b.json()).then(resx => {
                    uriInfo.contant = resx.contant.split("/")[0]
                    utl.innerHTML = '<option value="1">Redirect Link</option>'

                    if (uriInfo.contant == "image" || uriInfo.contant == "video") {
                        utl.innerHTML += '<option value="2">Download Link (not working all browser)</option>'
                        if (uriInfo.contant == "image") {
                            utl.innerHTML += '<option value="4">Image Link</option>'
                        } else {
                            utl.innerHTML += '<option value="3">Video Link</option>'
                        }
                    }
                    if (res.link_info.l_type == 1) {
                        utl.childNodes[0].setAttribute("selected", "")
                    } else if (res.link_info.l_type == 2) {
                        if (utl.childNodes[1]) {
                            utl.childNodes[1].setAttribute("selected", "")
                        } else {
                            utl.childNodes[0].setAttribute("selected", "")
                            utl.innerHTML = '<option value="1">Invalid Download Link</option>'
                            ltl.classList.add("text-danger")
                        }
                    } else if (res.link_info.l_type == 3 || res.link_info.l_type == 4) {
                        if (utl.childNodes[2]) {
                            utl.childNodes[2].setAttribute("selected", "")
                        } else {
                            utl.childNodes[0].setAttribute("selected", "")
                            utl.innerHTML = res.link_info.l_type == 3 ? '<option value="1">Invalid Video Link</option>' : '<option value="1">Invalid Image Link</option>';
                            ltl.classList.add("text-danger")
                        }
                    }
                }).catch(e => {
                    alert("Sorry...")
                    alert(e)
                })
                document.getElementById("l_type").removeAttribute("disabled")
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
                        <h1 className="display-2 text-white">Edit Link</h1>
                    </div>
                </div>
            </div>

            <div className="container-fluid mt--7">

                <div className="row">
                    <div className="col-xl-12 order-xl-1">
                        <div className="card">

                            <div className="card-body">
                                <div className="alert link-error hide alert-danger alert-dismissible fade show" role="alert">
                                    <span className="alert-text" >
                                        Link Update Error, <a href={window.location.href}>Re-Try</a>
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
                                            Link Edit Successful...
                                            <br />
                                            {(() => {
                                                var pN = pageNum == undefined ? "" : pageNum
                                                return (
                                                    <Link to={"/dashboard/links/" + pN}>View All Links</Link>
                                                )
                                            })()}
                                        </span>
                                    </div>

                                </div>
                                <form onSubmit={updateLink} className="" id="edit_form">
                                    <div className="pl-lg-4">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label className="form-control-label">Name</label>
                                                    <input className="form-control c-p-in" disabled onChange={cUriData} id="l_name" placeholder="Link Name" type="text" name="cpass" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label className="form-control-label">URL</label>
                                                    <input onChange={urlC} disabled className="uri-i form-control c-p-in" id="l_url" placeholder="URL" type="url" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label className="form-control-label" id="ltl">Link Type</label>
                                                    <select className="form-control u-t-l" disabled onChange={cUriData} id="l_type" >



                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label className="form-control-label">Description</label>
                                                    <textarea className="form-control" disabled onChange={cUriData} id="l_des" >



                                                    </textarea>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label className="form-control-label">Content</label>
                                                    <textarea class="form-control" onChange={cUriData} id="l_con" >



                                                    </textarea>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label className="form-control-label">Thumbline <a data-toggle="modal" className="text-primary" data-target="#thu-mod"><i class="far fa-question-circle"></i></a></label>
                                                    <div className="custom-file">
                                                        <input type="file" onChange={loadimage} disabled accept="image/*" className="custom-file-input" id="thuimg_i" lang="en" />
                                                        <label className="custom-file-label" for="customFileLang">Select file</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="" id="thuimg_c" className="">
                                                <div className="col-md-12">
                                                    <img width="50%" id="thuimg_s" src="http://localhost:3000/assets/img/brand/g61.png" alt="" />
                                                </div>
                                                <div className="col-md-12 mt-3">
                                                    <div className="form-group">
                                                        <button type="button" id="clearthu" onClick={clearImage} className="btn btn-primary">Clear</button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label className="form-control-label">Preview Image</label>
                                                    <div className="custom-file">
                                                        <input type="file" onChange={loadimage} disabled accept="image/*" className="custom-file-input" id="preimg_i" lang="en" />
                                                        <label className="custom-file-label" for="customFileLang">Select file</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="" id="preimg_c" className="">
                                                <div className="col-12">
                                                    <img width="100%" id="preimg_s" src="http://localhost:3000/assets/img/brand/g61.png" alt="" />
                                                </div>
                                                <div className="col-12 mt-3">
                                                    <div className="form-group">
                                                        <button type="button" id="clearpre" onClick={clearImage} className="btn btn-primary">Clear</button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label className="form-control-label">Link Visibility</label>
                                                    <select class="form-control u-t-l" onChange={cUriData} id="l_visible" >

                                                        <option value="1">Public</option>
                                                        <option value="2">Unlist</option>
                                                        <option value="3">Private</option>

                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-12"></div>

                                            <div className="col-md-8">

                                            </div>
                                            <div className="col-md-4 text-right">
                                                <button className="btn btn-primary" disabled id="up_btn">Update</button>

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

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="thu-mod" tabindex="-1" role="dialog" aria-labelledby="thu-mod" aria-hidden="true">
                    <div class="modal-dialog modal- modal-dialog-centered modal-" role="document">
                        <div class="modal-content">

                            <div class="modal-header">
                                <h6 class="modal-title" id="modal-title-default">Type your modal title</h6>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>

                            <div class="modal-body">

                                <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                                <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>

                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary">Save changes</button>
                                <button type="button" class="btn btn-link  ml-auto" data-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        </>
    )

}

export default EditLink