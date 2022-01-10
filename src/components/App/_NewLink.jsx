import { useState } from "react"
import Footer from "./_Footer"
import Env from "../Env"
import cookies from "../../module/cookies"

const NewLink = () => {

    var [getUri, setUri] = useState()
    var [getUriD, setUriD] = useState({ l_type: "", l_uri: "", l_name: "", l_des: "", pre_i: "", pre_e: "", thu_e: "", thu_i: "", l_visible: "" })
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

        //console.log(getUriD);

    }

    const uriCheck = e => {
        document.getElementById("uri_err").classList.add("hide")
        const mls = document.getElementsByClassName("m-l-s")[0]
        const ucb = document.getElementsByClassName("uri-c-btn")[0]
        e.preventDefault()
        ucb.setAttribute("disabled", "")
        document.getElementsByClassName("uri-i")[0].setAttribute("disabled", "")
        setTimeout(() => {
            fetch(Env.BackEnd + "tools/c", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "browser_code": Env.BrwserCode, "uri": getUri })
            }).then(b => b.json()).then(res => {
                if (res.error_code == 200) {
                    document.getElementsByClassName("uri-c-btn")[0].removeAttribute("disabled")
                    document.getElementsByClassName("uri-i")[0].removeAttribute("disabled")
                    document.getElementById("thuimg_c").classList.add("hide")
                    document.getElementById("preimg_c").classList.add("hide")
                    document.getElementById("thuimg_i").value = ""
                    document.getElementById("preimg_i").value = ""
                    setUriD({ l_type: "", l_uri: getUri, l_name: "", l_des: "", pre_i: "", pre_e: "", thu_e: "", thu_i: "", l_visible: "" })
                    document.getElementById("l_name").value = "";
                    document.getElementById("l_des").value = "";
                    if (res.exist) {
                        document.getElementsByClassName("uri-c-btn")[0].parentElement.classList.add("hide")
                        mls.classList.remove("hide")
                        uriInfo.contant = res.contant.split("/")[0]
                        const utl = document.getElementsByClassName("u-t-l")[0]
                        utl.innerHTML = '<option value="1">Redirect Link</option>'

                        if (uriInfo.contant == "image" || uriInfo.contant == "video") {
                            utl.innerHTML += '<option value="2">Download Link</option>'
                            if (uriInfo.contant == "image") {
                                utl.innerHTML += '<option value="4">Image Link</option>'
                            } else {
                                utl.innerHTML += '<option value="3">Video Link</option>'
                            }
                        }

                    } else {
                        document.getElementById("uri_err").classList.remove("hide")
                    }
                }
            }).catch(e => {
                alert("Sorry...")
            })
        }, 500)

    }

    const clearImage = (e) => {
        if (e.target.id == "clearthu") {
            document.getElementById("thuimg_c").classList.add("hide")
            getUriD.thu_i = ""
            getUriD.thu_e = ""
            document.getElementById("thuimg_i").value = ""
        } else {
            document.getElementById("preimg_c").classList.add("hide")
            getUriD.pre_i = ""
            getUriD.pre_e = ""
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
            } else {
                getUriD.pre_i = this.result.replace("data:", "").replace(/^.+,/, "")
                getUriD.pre_e = src.files[0].name.split(".").slice(-1)[0]
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

    function createLink(e) {

        document.getElementById("url_i").setAttribute("disabled", "")
        document.getElementById("l_name").setAttribute("disabled", "")
        document.getElementById("l_type").setAttribute("disabled", "")
        document.getElementById("l_des").setAttribute("disabled", "")
        document.getElementById("thuimg_i").setAttribute("disabled", "")
        document.getElementById("clearthu").setAttribute("disabled", "")
        document.getElementById("preimg_i").setAttribute("disabled", "")
        document.getElementById("preimg_s").setAttribute("disabled", "")
        document.getElementById("clearpre").setAttribute("disabled", "")
        document.getElementById("crt_btn").setAttribute("disabled", "")

        e.preventDefault()

        setTimeout(() => {

            let user_token = cookies.getCookie("USER_TOKEN")

            if (user_token === null) {
                user_token = "________"
            }

            fetch(Env.BackEnd + "link/new", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "browser_code": Env.BrwserCode, "token": user_token, "link_info": getUriD })
            }).then(b => b.json()).then(res => {

                document.getElementById("f1").classList.add("hide")
                document.getElementById("f2").classList.add("hide")

                if (res.success) {

                    document.getElementsByClassName("link-success")[0].classList.remove("hide")
                    document.getElementById("link_url_x").setAttribute("href", Env.MainUrl + res.link_slug);
                    document.getElementById("link_url_x").innerHTML = Env.PageLink + res.link_slug;

                } else {

                    document.getElementsByClassName("link-error")[0].classList.remove("hide")

                }

            }).catch(() => {
                alert("Sorry...")
            })

        }, 500)

    }

    const copyUrl = () => {
        var uX = document.getElementById("link_url_x").innerHTML;
        navigator.clipboard.writeText(uX);
    }

    return (
        <>

            <div className="header mt--6 d-flex align-items-center background-cover" >
                <span className="mask bg-gradient-default opacity-7"></span>
                <div className="container-fluid d-flex align-items-center">
                    <div className="col-lg-7 md-10">
                        <h1 className="display-2 text-white">New Link</h1>
                    </div>
                </div>
            </div>

            <div className="container-fluid mt--7">

                <div className="row">
                    <div className="col-xl-12 order-xl-1">
                        <div className="card">
                            <div className="card-body">
                                <div class="alert link-error hide alert-danger alert-dismissible fade show" role="alert">
                                    <span class="alert-text" >
                                        Link Create Error, <a href="/dashboard/new">Re-Try</a>
                                    </span>
                                </div>
                                <div className="link-success hide">
                                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                                        <span class="alert-text" >
                                            Link Create Successful...
                                            <br />
                                            <a href="/dashboard/new">Create New Link</a>
                                        </span>
                                    </div>


                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group display-4 ">
                                                <a href="" id="link_url_x" class="url-x text-gray" target="_blank">asdasd</a>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="form-group">
                                                <div className="form-group">
                                                    <button className="btn btn-primary" onClick={copyUrl}>Copy Url</button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <form onSubmit={uriCheck} id="f1">
                                    <div class="alert alert-danger hide alert-dismissible fade show" id="uri_err" role="alert">
                                        <span class="alert-text" >
                                            Invalid URL...
                                        </span>
                                    </div>
                                    <div className="pl-lg-4">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label className="form-control-label">URL</label>
                                                    <input onChange={urlC} className="uri-i form-control c-p-in" placeholder="URL" type="url" id="url_i" />
                                                </div>
                                            </div>
                                            <div className="col-8">

                                            </div>
                                            <div className="col-4 text-right">
                                                <button disabled className="btn uri-c-btn btn-primary n-p-btn">Go</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <form onSubmit={createLink} className="hide m-l-s" id="f2">

                                    <div className="pl-lg-4">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label className="form-control-label">Name</label>
                                                    <input className="form-control c-p-in" onChange={cUriData} id="l_name" placeholder="Link Name" type="text" name="cpass" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label className="form-control-label">Link Type</label>
                                                    <select class="form-control u-t-l" onChange={cUriData} id="l_type" >



                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label className="form-control-label">Description</label>
                                                    <textarea class="form-control" onChange={cUriData} id="l_des" >



                                                    </textarea>
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label className="form-control-label">Thumbline</label>
                                                    <div class="custom-file">
                                                        <input type="file" onChange={loadimage} accept="image/*" class="custom-file-input" id="thuimg_i" lang="en" />
                                                        <label class="custom-file-label" for="customFileLang">Select file</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="" id="thuimg_c" class="hide">
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
                                                    <div class="custom-file">
                                                        <input type="file" onChange={loadimage} accept="image/*" class="custom-file-input" id="preimg_i" lang="en" />
                                                        <label class="custom-file-label" for="customFileLang">Select file</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="" id="preimg_c" class="hide">
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
                                                <button className="btn uri-c-btn btn-primary n-p-btn" id="crt_btn">Create</button>
                                            </div>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        </>
    )

}

export default NewLink