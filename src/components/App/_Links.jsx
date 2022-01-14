import { useEffect, useState } from "react"
import Footer from "./_Footer"
import Env from "../Env"
import cookies from "../../module/cookies"
import { useParams, Link, useNavigate } from "react-router-dom"
const Links = () => {

    // page, query

    const history = useNavigate();

    let getParams = useParams();
    const [pList, pLSet] = useState({})
    const [nList, setNL] = useState({ "n": 1, "q": "" })

    useEffect(() => {


        var pNum = 1;
        var pQuery = "";

        if (getParams.hasOwnProperty('page')) {
            pNum = parseInt(getParams.page)
            if (pNum < 1) {
                pNum = 1
            }
        }

        if (getParams.hasOwnProperty('query')) {
            pQuery = getParams.query
        }
        setNL({ "n": pNum, "q": pQuery })

        let user_token = cookies.getCookie("USER_TOKEN")

        if (user_token === null) {
            user_token = "________"
        }

        document.getElementById("link_tb").style.opacity = .3

        fetch(Env.BackEnd + "link", {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "browser_code": Env.BrwserCode, "token": user_token, "links_page": pNum, "links_query": pQuery })

        }).then(b => b.json()).then(res => {

            pLSet(res)
            console.log(res);
            document.getElementById("link_tb").style.opacity = 1


        }).catch(e => {

            alert("Sorry...")

        })

    }, [getParams])

/*     function copyURI(e) {
        navigator.clipboard.writeText(e.target.getAttribute("go"));
    } */

    function tConvert(time) {
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) {
            time = time.slice(1);
            time[5] = +time[0] < 12 ? 'AM' : 'PM';
            time[0] = +time[0] % 12 || 12;
        }
        return time.join(''); // return adjusted time or original string
    }

    const searchQuery = () => {
        history("/dashboard/links/1/" + document.getElementById("search_i").value)
    }


    return (
        <>

            <div className="header mt--6 d-flex align-items-center background-cover" >
                <span className="mask bg-gradient-default opacity-7"></span>
                <div className="container-fluid d-flex align-items-center">
                    <div className="col-lg-7 md-10">
                        <h1 className="display-2 text-white">All Links</h1>
                    </div>
                </div>
            </div>

            <div className="container-fluid mt--7">
                <div className="row">
                    <div className="col-12 order-xl-1">
                        <div class="card">
                            <div class="card-header border-0">
                                <h3 class="mb-0"></h3>
                            </div>
                            <div className="mt--3">
                                <div class="input-group mb-3 pl-4 pr-4">
                                    <input type="text" id="search_i" class="form-control" placeholder="Search..." aria-describedby="button-addon2" />
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-primary" onClick={searchQuery} type="button" id="button-addon2"><i className="fa fa-search"></i></button>
                                    </div>
                                </div>
                                {(() => {
                                    if (nList.q) {
                                        return (
                                            <div class="input-group mb-3 pl-4 pr-4">
                                                Searching Result For "{getParams.query}"
                                            </div>
                                        )
                                    }
                                })()}
                                {(() => {
                                    if (pList.link_count == 0) {
                                        return (
                                            <h2 class="input-group mb-3 pl-4 pr-4">
                                                No Link Found
                                            </h2>
                                        )
                                    }
                                })()}
                            </div>
                            <div class="table-responsive">


                                <table id="link_tb" class="table align-items-center table-flush">
                                    {(() => {
                                        if (pList.link_count != 0) {
                                            return (
                                                <thead class="thead-light">
                                                    <tr>
                                                        <th scope="col">Link Name</th>
                                                        <th scope="col">Link Edit</th>
                                                        <th scope="col">Link Type</th>
                                                        <th scope="col">Original Link</th>
                                                        <th scope="col">Link</th>
                                                        <th scope="col">Visiblity</th>
                                                        <th scope="col">Time</th>
                                                        <th scope="col">Delete</th>
                                                    </tr>
                                                </thead>
                                            )
                                        }
                                    })()}
                                    <tbody class="list">

                                        {(() => {
                                            let retVal = [];
                                            for (let w = 0; w < pList.link_count; w++) {
                                                retVal.push(
                                                    <tr>
                                                        <th scope="row">
                                                            ({pList.links_data[w].l_pid}) <span class="name mb-0 text-sm">{pList.links_data[w].l_name}</span>
                                                        </th>
                                                        <td class="budget">
                                                            <Link type="button" to={"/dashboard/edit/" + pList.links_data[w].l_slug + "/" + nList.n + "/" + (nList.q != undefined ? nList.q : "")} class="text-white btn btn-sm btn-primary">
                                                                Edit <i className="fa fa-external-link-alt"></i>
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            {(() => {
                                                                if (pList.links_data[w].l_type == 1) {
                                                                    return (
                                                                        <>
                                                                            <i className="fa fa-directions"></i> Redirect
                                                                        </>
                                                                    )
                                                                } else if (pList.links_data[w].l_type == 2) {
                                                                    return (
                                                                        <>
                                                                            <i className="fa fa-download"></i> Download
                                                                        </>
                                                                    )
                                                                } else if (pList.links_data[w].l_type == 3) {
                                                                    return (
                                                                        <>
                                                                            <i className="fa fa-video"></i> Video
                                                                        </>
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <>
                                                                            <i className="far fa-image"></i> Image
                                                                        </>
                                                                    )
                                                                }
                                                            })()}
                                                        </td>
                                                        <td class="budget">
                                                            <a type="button" target="_blank" href={pList.links_data[w].l_uri} class="text-white btn btn-sm btn-default">
                                                                Open <i className="fa fa-external-link-alt"></i>
                                                            </a>
                                                            {/*  <button onClick={copyURI} type="button" go={pList.links_data[w].l_uri} class="text-white btn btn-sm btn-default">
                                                                <i className="far fa-copy"></i>
                                                            </button> */}
                                                        </td>
                                                        <td>
                                                            {(() => {
                                                                var lC = pList.links_data[w].l_visible == 3 ? "disabled" : ""
                                                                return (
                                                                    <>
                                                                        <a type="button" target="_blank" href={Env.PageLink + pList.page_name + "/" + pList.links_data[w].l_slug} class={"text-white btn btn-sm btn-default " + lC}>
                                                                            Open <i className="fa fa-external-link-alt"></i>
                                                                        </a>
                                                                        {/* (() => {
                                                                            if (pList.links_data[w].l_visible == 3) {
                                                                                return (
                                                                                    <button onClick={copyURI} type="button" disabled go={Env.PageLink + pList.page_name + "/" + pList.links_data[w].l_slug} class="text-white btn btn-sm btn-default">
                                                                                        <i className="far fa-copy"></i>
                                                                                    </button>
                                                                                )
                                                                            } else {
                                                                                return (
                                                                                    <button onClick={copyURI} type="button" go={Env.PageLink + pList.page_name + "/" + pList.links_data[w].l_slug} class="text-white btn btn-sm btn-default">
                                                                                        <i className="far fa-copy"></i>
                                                                                    </button>
                                                                                )
                                                                            }
                                                                        })() */}
                                                                    </>
                                                                )
                                                            })()}
                                                        </td>
                                                        <td>
                                                            {(() => {
                                                                if (pList.links_data[w].l_visible == 1) {
                                                                    return (
                                                                        <>
                                                                            <i className="far fa-eye"></i> Public
                                                                        </>
                                                                    )
                                                                } else if (pList.links_data[w].l_visible == 2) {
                                                                    return (
                                                                        <>
                                                                            <i className="far fa-eye-slash"></i> Unlist
                                                                        </>
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <>
                                                                            <i className="fa fa-lock"></i> Private
                                                                        </>
                                                                    )
                                                                }
                                                            })()}
                                                        </td>
                                                        <td>
                                                            {(() => {
                                                                var timex = pList.links_data[w].l_time.split(" ")[1].split(":")
                                                                var datex = pList.links_data[w].l_time.split(" ")[0].split("-")
                                                                return (
                                                                    [<i class='far fa-calendar-alt'></i>, " " + parseInt(datex[1]) + "/" + parseInt(datex[2]) + "/" + datex[0] + " ", <i class='far fa-clock'></i>, " " + tConvert(timex[0] + ":" + timex[1])]
                                                                )
                                                            })()}
                                                        </td>
                                                        <td class="">
                                                            <Link type="button" to={"/dashboard/delete/" + pList.links_data[w].l_slug + "/" + nList.n + "/" + (nList.q != undefined ? nList.q : "")} class="text-white btn btn-sm btn-danger">
                                                                <i className="far fa-trash-alt"></i>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                            return retVal
                                        }
                                        )()}

                                    </tbody>
                                </table>
                            </div>
                            <div class="card-footer py-4">
                                <nav aria-label="...">
                                    <ul class="pagination justify-content-end mb-0">

                                        {(() => {
                                            nList.n = isNaN(nList.n) ? 1 : nList.n
                                        })()}

                                        {(() => {
                                            var setC = nList.n == 1 || nList.n > pList.total_page ? "disabled" : "";
                                            //console.log(nList.n, pList.total_page);
                                            return (
                                                <div className="text-right">
                                                    <Link to={"/dashboard/links/" + (nList.n - 1) + "/" + nList.q} className={"u-i-btn btn btn-primary " + setC}><i class="fas fa-chevron-left"></i></Link>
                                                </div>
                                            )
                                        })()}

                                        <div className="text-right">
                                            <Link to="#" className="disabled u-i-btn btn btn-secondary">
                                                {(() => {
                                                    return (
                                                        nList.n + " "
                                                    )
                                                })()}
                                                /
                                                {(() => {
                                                    return (
                                                        " " + pList.total_page
                                                    )
                                                })()}
                                            </Link>
                                        </div>

                                        {(() => {
                                            var setC = nList.n >= pList.total_page ? "disabled" : "";
                                            return (
                                                <div className="text-right">
                                                    <Link to={"/dashboard/links/" + (nList.n + 1) + "/" + nList.q} className={"u-i-btn btn btn-primary " + setC}><i class="fas fa-chevron-right"></i></Link>
                                                </div>
                                            )
                                        })()}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        </>
    )

}

export default Links