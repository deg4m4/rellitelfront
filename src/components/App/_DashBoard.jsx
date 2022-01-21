import { Link } from "react-router-dom"
import Footer from "./_Footer"
import { ResponsiveContainer, Tooltip, XAxis, YAxis, AreaChart, Area } from "recharts"
import Env from "../Env"
import { useEffect } from "react/cjs/react.development"

const DashBoard = (prop) => {

    document.title = "Dashboard - " + Env.AppName

    useEffect(() => {
        console.log(prop.userAna);
        if (prop.userAna.yesterday_earn == 0) {
            document.getElementById("y_earn").innerHTML = "no earning yesterday";
        } else {
            var inc = (((prop.userAna.today_earn - prop.userAna.yesterday_earn) / prop.userAna.yesterday_earn) * 100).toFixed(2);
            document.getElementById("y_earn").innerHTML = "<span class='" + (inc > 0 ? "text-success" : "text-danger") + "'>" + (inc > 100 ? "100%+" : inc + "%") + "</span> Since Yesterday";
        }

        if (prop.userAna.prev_7 == 0) {
            document.getElementById("p_earn").innerHTML = "no earning previous 7 days";
        } else {
            var inc = (((prop.userAna.last_7 - prop.userAna.prev_7) / prop.userAna.prev_7) * 100).toFixed(2);
            document.getElementById("p_earn").innerHTML = "<span class='" + (inc > 0 ? "text-success" : "text-danger") + "'>" + (inc > 100 ? "100%+" : inc + "%") + "</span> Since previous 7 days";
        }

        if (prop.userAna.lastm_earn == 0) {
            document.getElementById("m_earn").innerHTML = "no earning last month";
        } else {
            var inc = (((prop.userAna.month_earn - prop.userAna.lastm_earn) / prop.userAna.lastm_earn) * 100).toFixed(2);
            document.getElementById("m_earn").innerHTML = "<span class='" + (inc > 0 ? "text-success" : "text-danger") + "'>" + (inc > 100 ? "100%+" : inc + "%") + "</span> Since last month";
        }

    }, [prop])

    return (
        <>

            <div class="header background-cover-x pb-6">
                <span className="mask bg-gradient-default opacity-7"></span>
                <div class="container-fluid">
                    <div class="header-body">
                        <div class="row align-items-center py-4">
                            <div class="col-lg-6 col-7">
                                <h6 class="h2 text-white d-inline-block mb-0">Dashboard</h6>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-9 col-12">
                                <div class="card card-stats">
                                    <div class="card-body p-0">
                                        <div class="card-header">
                                            <div class="row align-items-center">
                                                <div class="col-12 ">
                                                    <h3 class="mb-0 text-gray">estimated earnings</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <div class="row">
                                                <div className="col-12 col-lg-4 py-4 py-lg-2">
                                                    <div class="row">
                                                        <div class="col">
                                                            <h5 class="card-title text-uppercase text-muted mb-0">today</h5>
                                                            <span class="h2 font-weight-bold mb-0">{prop.userAna.today_earn.toFixed(4)}$</span>
                                                        </div>
                                                    </div>
                                                    <p class="mt-1 mb-0 text-sm" id="y_earn">
                                                        <span class="text-success mr-2" ><i class="fa fa-arrow-up"></i> 3.48%</span>
                                                        <span class="text-nowrap">{prop.userAna.yesterday_earn.toFixed(4)}Since Yesterday</span>
                                                    </p>
                                                </div>
                                                <div className="col-12 col-lg-4 py-4 py-lg-2">
                                                    <div class="row">
                                                        <div class="col">
                                                            <h5 class="card-title text-uppercase text-muted mb-0">Last 7 days</h5>
                                                            <span class="h2 font-weight-bold mb-0">{prop.userAna.last_7.toFixed(4)}$</span>
                                                        </div>
                                                    </div>
                                                    <p class="mt-1 mb-0 text-sm" id="p_earn">
                                                        <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span>
                                                        <span class="text-nowrap">Since last month</span>
                                                    </p>
                                                </div>
                                                <div className="col-12 col-lg-4 py-4 py-lg-2">
                                                    <div class="row">
                                                        <div class="col">
                                                            <h5 class="card-title text-uppercase text-muted mb-0">This Month</h5>
                                                            <span class="h2 font-weight-bold mb-0">{prop.userAna.month_earn.toFixed(4)}$</span>
                                                        </div>
                                                    </div>
                                                    <p class="mt-1 mb-0 text-sm" id="m_earn">
                                                        <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span>
                                                        <span class="text-nowrap">Since last month</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-12">
                                <div class="card card-stats">
                                    <div class="card-body p-0">
                                        <div class="card-header">
                                            <div class="row align-items-center">
                                                <div class="col-12 ">
                                                    <h3 class="mb-0 text-gray">balance</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card-body">
                                            <div class="row">
                                                <div className="col-12 py-4 py-lg-2">
                                                    <div class="row">
                                                        <div class="col">
                                                            <h5 class="card-title text-uppercase text-muted mb-0">Total balance</h5>
                                                            <span class="h2 font-weight-bold mb-0">{prop.userAna.user_balance.toFixed(4)}$</span>
                                                        </div>
                                                    </div>
                                                    <p class="mt-1 mb-0 text-sm">
                                                        <span class="text-nowrap"><Link to="/dashboard/wallet" class="text-success">Wallet</Link></span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid mt--6">
                <div class="row">

                    <div class="col-xl-8">
                        <div class="card bg-default">
                            <div class="card-header bg-transparent">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <h5 class="h3 text-white mb-0">Views Overview</h5>
                                    </div>

                                </div>
                            </div>
                            <div class="card-body">
                                <div class="chart">
                                    <ResponsiveContainer>
                                        <AreaChart width={730} height={350} data={prop.chartData}
                                            margin={{ top: 10, right: 15, left: -30, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                                </linearGradient>
                                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <XAxis axisLine={false} tickSize={false} dataKey="date" stroke="#fff9" fontSize={15} />
                                            <YAxis axisLine={false} tickSize={false} fontSize={15} stroke="#fff9" />

                                            <Tooltip />
                                            <Area type="monotone" dataKey="view" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4">
                        <div class="card">
                            <div class="card-header bg-transparent">
                                <div class="row align-items-center">
                                    <div class="col-7">
                                        <h5 class="h3 mb-0">earnings overview</h5>
                                    </div>

                                </div>
                            </div>
                            <div class="card-body">
                                <div class="chart">
                                    <ResponsiveContainer>
                                        <AreaChart width={730} height={350} data={prop.chartData}
                                            margin={{ top: 10, right: 15, left: -50, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                                </linearGradient>
                                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <XAxis axisLine={false} tickSize={false} fontSize={15} dataKey="date" interval={'preserveEnd'} />
                                            <YAxis axisLine={false} tickSize={false} fontSize={15} stroke="#0000" />

                                            <Tooltip />
                                            <Area type="monotone" dataKey="earn" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />

                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-6">
                        <div class="h-500 card">
                            <div class="card-header border-0">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <h3 class="mb-0">Top Links (Last 7 Days)</h3>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive">
                                <table class="table align-items-center table-flush">
                                    <thead class="thead-light">
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Link</th>
                                            <th scope="col">Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            prop.topLink.map(ele => {
                                                return (
                                                    <tr>
                                                        <th scope="row">
                                                            {ele.l_name}
                                                        </th>
                                                        <td>
                                                            <a target="_blank" href={Env.PageLink + prop.pageSlug + "/" + ele.l_slug + "/"} type="button" class="btn btn-default text-white btn-sm">Open <i class="fa fa-external-link-alt"></i></a>
                                                        </td>
                                                        <td>
                                                            <Link class="btn btn-primary btn-sm" to={"/dashboard/edit/" + ele.l_slug} >Edit <i class="fa fa-external-link-alt"></i></Link>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                    <div className={"px-4 py-" + prop.tMass[1]}>
                                        {prop.tMass[0]}
                                    </div>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-6">
                        <div class="card h-500">
                            <div class="card-header border-0">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <h3 class="mb-0">News</h3>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive">
                                <table class="table align-items-center table-flush">
                                    <thead class="thead-light">
                                        <tr>
                                            <th scope="col">&nbsp;</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            prop.getNews.map((e) => {
                                                if (e.title !== "") {
                                                    return (
                                                        <tr>
                                                            <th scope="row">
                                                                <a target="_blank" href={e.url}>{e.title}</a>
                                                            </th>
                                                        </tr>
                                                    )
                                                }
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        </>
    )

}

export default DashBoard