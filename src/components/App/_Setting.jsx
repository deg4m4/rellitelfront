import { useEffect, useState } from "react"
import Footer from "./_Footer"
import checkAuth from "../../module/checkauth"
import Env from "../Env"
import cookies from "../../module/cookies"
import 'react-image-crop/dist/ReactCrop.css';

const Setting = () => {
    var [inputF, setIF] = useState({})
    var [pageInfo, setPageInfo] = useState({})

    var [r1Info, setR1Info] = useState({
        pagename_i: "",
        pageslug_i: "",
        pagedes_i: "",
        pagelogo1_i: "",
        pagelogo2_i: "",
        seo_i: null,
        theme_i: null,
        syt_i: "",
        sfb_i: "",
        stg_i: "",
        sig_i: ""
    })

    const changePageInfo = (e) => {

        const idx = e.target.id;
        const value = e.target.value;

        if (idx === "seo_i") {
            r1Info[idx] = e.target.checked
            console.log(r1Info[idx]);
        } else {
            r1Info[idx] = value
        }

        if (r1Info.pagename_i != "" || r1Info.pageslug_i != "" || r1Info.pagedes_i != "" || r1Info.pagelogo1_i != "" || r1Info.pagelogo2_i != "" || r1Info.seo_i != null || r1Info.theme_i != null || r1Info.syt_i != "" || r1Info.sfb_i != "" || r1Info.stg_i != "" || r1Info.sig_i != "") {
            document.getElementById("u_page_i").removeAttribute("disabled")
        } else {
            document.getElementById("u_page_i").setAttribute("disabled", "")
        }

    }

    const updatePageInfo = (e) => {
        var slugErr = document.getElementsByClassName("slug-error")[0]
        slugErr.classList.add("hide")
        for (const k in inputF) {
            inputF[k].setAttribute("disabled", "")
        }


        e.preventDefault()

        setTimeout(() => {

            let user_token = cookies.getCookie("USER_TOKEN")

            if (user_token === null) {
                user_token = "________"
            }


            fetch(Env.BackEnd + "page/update", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "browser_code": Env.BrwserCode, "token": user_token, "page_info": r1Info })
            }).then(b => b.json()).then(res => {

                if (res.error_code == 200) {

                    if (res.success) {
                        window.location.href = "/dashboard/setting"
                    } else if (res.already) {

                        console.log(slugErr);
                        slugErr.classList.remove("hide")
                        for (const k in inputF) {
                            inputF[k].removeAttribute("disabled")
                        }


                    } else {
                        alert("Sorry...")
                    }

                } else {
                    window.location.href = "/"
                }

            }).catch(() => {
                alert("Sorry...")
            })

        }, 500)

        return false;

    }

    function showImage(src, target, key) {
        var fr = new FileReader();
        fr.onload = function (e) {
            target.src = this.result;
            changePageInfo({
                target: {
                    id: key,
                    value: this.result.replace("data:", "").replace(/^.+,/, "")
                }
            });
        };
        fr.readAsDataURL(src.files[0]);
    }

    const changeImage1 = (e) => {
        showImage(document.getElementById("pagelogo1_i"), document.getElementById("logo_s_1"), "pagelogo1_i")
    }

    const changeImage2 = (e) => {
        showImage(document.getElementById("pagelogo2_i"), document.getElementById("logo_s_2"), "pagelogo2_i")
    }

    useEffect(() => {

        fetch(Env.BackEnd + "page", checkAuth()).then(b => b.json()).then(res => {

            setPageInfo(res.page_info);

            inputF = {
                pagename_i: document.getElementById("pagename_i"),
                pageslug_i: document.getElementById("pageslug_i"),
                pagedes_i: document.getElementById("pagedes_i"),
                pagelogo1_i: document.getElementById("pagelogo1_i"),
                pagelogo2_i: document.getElementById("pagelogo2_i"),
                seo_i: document.getElementById("seo_i"),
                theme_i: document.getElementById("theme_i"),
                syt_i: document.getElementById("syt_i"),
                sfb_i: document.getElementById("sfb_i"),
                stg_i: document.getElementById("stg_i"),
                sig_i: document.getElementById("sig_i")
            }

            setIF(inputF)

            if (res.page_info.seo == true) {
                inputF.seo_i.setAttribute("checked", "");
                r1Info.seo_i = true;
            } else {
                inputF.seo_i.removeAttribute("checked");
                r1Info.seo_i = false;
            }

            inputF["theme_i"].childNodes[res.page_info.page_theme - 1].setAttribute("selected", "");


            for (const k in inputF) {
                inputF[k].removeAttribute("disabled")
            }

        }).catch((e) => {

            alert("Sorry....")

        })

    }, [])


    return (
        <>



            <div className="header mt--6 d-flex align-items-center background-cover" >
                <span className="mask bg-gradient-default opacity-7"></span>
                <div className="container-fluid d-flex align-items-center">
                    <div className="col-lg-7 md-10">
                        <h1 className="display-2 text-white">Page Setting</h1>
                    </div>
                </div>
            </div>
            <div className="container-fluid mt--7">
                <div className="row">

                    <div className="col-xl-12 order-xl-1">
                        <div className="card">
                            
                            <div className="card-body">
                                <form onSubmit={updatePageInfo}>
                                    <h6 className="heading-small text-muted mb-4">Normal information</h6>
                                    <div className="pl-lg-4">
                                        <div class="alert slug-error hide alert-danger alert-dismissible fade show" role="alert">
                                            <span class="alert-text u-info-error" >
                                                Slug Is Alrasdy Exist.
                                            </span>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label className="form-control-label">Page Name</label>
                                                    <input onChange={changePageInfo} id="pagename_i" disabled type="text" className="form-control" placeholder={pageInfo.page_name} name="uname" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label className="form-control-label">Page Slug</label>
                                                    <input onChange={changePageInfo} id="pageslug_i" disabled type="text" className="form-control" placeholder={pageInfo.page_slug} name="uemail" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label class="form-control-label">Page Description</label>
                                                    <textarea rows="4" class="form-control" id="pagedes_i" onChange={changePageInfo} disabled placeholder={pageInfo.des}></textarea>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label class="form-control-label">Page Logo</label>
                                                    <div class="custom-file">
                                                        <input type="file" accept="image/*" onChange={changeImage1} class="custom-file-input" id="pagelogo1_i" disabled lang="en" />
                                                        <label class="custom-file-label" for="customFileLang">Select file</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <img height="70px" src={Env.SURL + "/page_logo/" + pageInfo.logo2} id="logo_s_1" alt="" />
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label class="form-control-label">Page Logo (Square)</label>
                                                    <div class="custom-file">
                                                        <input type="file" accept="image/*" onChange={changeImage2} class="custom-file-input" id="pagelogo2_i" disabled lang="en" />
                                                        <label class="custom-file-label" for="customFileLang">Select file</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <img height="70px" src={Env.SURL + "/page_logo/" + pageInfo.logo} id="logo_s_2" alt="" />
                                            </div>
                                            <hr className="my-4" />
                                            <h6 className="heading-small text-muted mb-4">SEO Option</h6>
                                            <div className="col-lg-12">
                                                <div class="custom-control custom-control custom-checkbox">
                                                    <input class="custom-control-input" onChange={changePageInfo} onClick={changePageInfo} id="seo_i" disabled type="checkbox" />
                                                    <label class="custom-control-label" for="seo_i">
                                                        <span class="text-muted">Google SEO Ranking</span>
                                                    </label>
                                                </div>
                                            </div>

                                            <hr className="my-4" />
                                            <h6 className="heading-small text-muted mb-4">Theme Setting</h6>
                                            <div className="col-lg-12">

                                                <div class="form-group">
                                                    <label for="exampleFormControlSelect1">Active Theme</label>
                                                    <select onChange={changePageInfo} class="form-control" disabled id="theme_i" >
                                                        <option value="1">{Env.AppName}</option>
                                                        <option value="2">{Env.AppName} Purule</option>
                                                        <option value="3">{Env.AppName} Green</option>
                                                        <option value="4">{Env.AppName} Red</option>
                                                        <option value="5">{Env.AppName} Orange</option>
                                                    </select>
                                                </div>

                                            </div>

                                            <hr className="my-4" />
                                            <h6 className="heading-small text-muted mb-4">Social information</h6>

                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label className="form-control-label" htmlFor="input-email">Youtube Link</label>
                                                    <input onChange={changePageInfo} id="syt_i" disabled type="text" className="u-full-i form-control" name="uname" placeholder={pageInfo.s_yt} />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label className="form-control-label" htmlFor="input-email">Telegram Link</label>
                                                    <input onChange={changePageInfo} id="stg_i" disabled type="text" className="u-full-i form-control" name="uname" placeholder={pageInfo.s_tg} />
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label className="form-control-label" htmlFor="input-email">Instagram Link</label>
                                                    <input onChange={changePageInfo} id="sig_i" disabled type="text" className="u-full-i form-control" name="uname" placeholder={pageInfo.s_ig} />
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label className="form-control-label" htmlFor="input-email">Facebook Link</label>
                                                    <input onChange={changePageInfo} id="sfb_i" disabled type="text" className="u-full-i form-control" name="uname" placeholder={pageInfo.s_fb} />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="row align-items-center">
                                        <div className="col-8">

                                        </div>
                                        <div className="col-4 text-right">
                                            <button id="u_page_i" disabled className="u-i-btn btn btn-primary">Update</button>
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

export default Setting