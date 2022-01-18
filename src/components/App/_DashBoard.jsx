import { Link } from "react-router-dom"
import Footer from "./_Footer"
import { ResponsiveContainer, Tooltip, XAxis, YAxis, AreaChart, Area } from "recharts"
import { useState } from "react"

const cData = [

    {
        name: "React",
        student: 14,
        fees: 30
    },
    {
        name: "Python",
        student: 13,
        fees: 14
    },
    {
        name: "React",
        student: 14,
        fees: 22
    },
    {
        name: "Python",
        student: 13,
        fees: 23
    },
    {
        name: "React",
        student: 14,
        fees: 30
    },
    {
        name: "Python",
        student: 13,
        fees: 23
    },
    {
        name: "React",
        student: 14,
        fees: 30
    }, {
        name: "React",
        student: 14,
        fees: 30
    },
    {
        name: "Python",
        student: 13,
        fees: 14
    },
    {
        name: "React",
        student: 14,
        fees: 22
    },
    {
        name: "Python",
        student: 13,
        fees: 23
    },
    {
        name: "React",
        student: 14,
        fees: 35
    },
    {
        name: "Python",
        student: 13,
        fees: 23
    },
    {
        name: "React",
        student: 14,
        fees: 30
    }, {
        name: "React",
        student: 14,
        fees: 30
    },
    {
        name: "Python",
        student: 40,
        fees: 14
    },
    {
        name: "React",
        student: 14,
        fees: 22
    },
    {
        name: "Python",
        student: 13,
        fees: 23
    },
    {
        name: "React",
        student: 14,
        fees: 30
    },
    {
        name: "Python",
        student: 13,
        fees: 23
    },
    {
        name: "React",
        student: 14,
        fees: 40
    }, {
        name: "React",
        student: 14,
        fees: 30
    },
    {
        name: "Python",
        student: 20,
        fees: 30
    },
    {
        name: "React",
        student: 14,
        fees: 22
    },
    {
        name: "Python",
        student: 13,
        fees: 23
    },
    {
        name: "React",
        student: 14,
        fees: 30
    },
    {
        name: "Python",
        student: 27,
        fees: 23
    },
    {
        name: "React",
        student: 14,
        fees: 50
    },
    {
        name: "React",
        student: 20,
        fees: 30
    },
    {
        name: "Python",
        student: 13,
        fees: 14
    },
    {
        name: "React",
        student: 25,
        fees: 22
    },
    {
        name: "Python",
        student: 13,
        fees: 23
    },
    {
        name: "React",
        student: 14,
        fees: 30
    },
    {
        name: "Python",
        student: 13,
        fees: 30
    },
    {
        name: "React",
        student: 14,
        fees: 54
    }
]
const cData2 = [

    {
        name: "React",
        student: 14,
        fees: 30
    },
    {
        name: "Python",
        student: 13,
        fees: 14
    },
    {
        name: "React",
        student: 14,
        fees: 22
    },
    {
        name: "Python",
        student: 13,
        fees: 23
    }, {
        name: "React",
        student: 14,
        fees: 30
    },
    {
        name: "Python",
        student: 13,
        fees: 14
    },
    {
        name: "React",
        student: 14,
        fees: 22
    },
    {
        name: "Python",
        student: 13,
        fees: 23
    },
    {
        name: "React",
        student: 14,
        fees: 30
    },
    {
        name: "Python",
        student: 13,
        fees: 23
    },
    {
        name: "React",
        student: 14,
        fees: 30
    }, {
        name: "React",
        student: 14,
        fees: 30
    },
    {
        name: "Python",
        student: 13,
        fees: 14
    },
]


const DashBoard = (prop) => {
    const [charData, setData] = useState(cData);
    const dataC = () => {
        if (charData == cData) {
            setData(cData2)
        } else {
            setData(cData)
        }
    }
    console.log(prop);

    return (
        <>

            <div class="header bg-gradient-info pb-6">
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
                                                    <p class="mt-1 mb-0 text-sm">
                                                        <span class="text-success mr-2" ><i class="fa fa-arrow-up"></i> 3.48%</span>
                                                        <span class="text-nowrap">{prop.userAna.yesterday_earn.toFixed(4)}Since last month</span>
                                                    </p>
                                                </div>
                                                <div className="col-12 col-lg-4 py-4 py-lg-2">
                                                    <div class="row">
                                                        <div class="col">
                                                            <h5 class="card-title text-uppercase text-muted mb-0">Last 7 days</h5>
                                                            <span class="h2 font-weight-bold mb-0">{prop.userAna.last_7.toFixed(4)}$</span>
                                                        </div>
                                                    </div>
                                                    <p class="mt-1 mb-0 text-sm">
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
                                                    <p class="mt-1 mb-0 text-sm">
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
                                    <div class="col">
                                        <ul class="d-flex justify-content-end m-0">
                                            <button type="button" onClick={dataC} class="btn btn-primary btn-sm">30 Days</button>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="chart">
                                    <ResponsiveContainer>
                                        <AreaChart width={730} height={350} data={charData}
                                            margin={{ top: 10, right: 15, left: -35, bottom: 0 }}>
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
                                            <XAxis axisLine={false} tickSize={false} dataKey="name" />
                                            <YAxis axisLine={false} tickSize={false} />

                                            <Tooltip />
                                            <Area type="monotone" dataKey="student" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
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
                                    <div class="col-5">
                                        <ul class="d-flex justify-content-end m-0">
                                            <button type="button" class="btn btn-primary btn-sm">30 Days</button>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="chart">
                                    <ResponsiveContainer>
                                        <AreaChart width={730} height={350} data={cData}
                                            margin={{ top: 10, right: 15, left: -40, bottom: 0 }}>
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
                                            <XAxis axisLine={false} tickSize={false} dataKey="name" />
                                            <YAxis axisLine={false} tickSize={false} />

                                            <Tooltip />
                                            <Area type="monotone" dataKey="fees" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />

                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header border-0">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <h3 class="mb-0">Top Links</h3>
                                    </div>
                                    <div class="col text-right">
                                        <ul class="d-flex justify-content-end m-0">
                                            <button type="button" class="btn btn-primary btn-sm">7 Days</button>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive">
                                <table class="table align-items-center table-flush">
                                    <thead class="thead-light">
                                        <tr>
                                            <th scope="col">Page name</th>
                                            <th scope="col">Visitors</th>
                                            <th scope="col">Unique users</th>
                                            <th scope="col">Bounce rate</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">
                                                /argon/
                                            </th>
                                            <td>
                                                4,569
                                            </td>
                                            <td>
                                                340
                                            </td>
                                            <td>
                                                <i class="fas fa-arrow-up text-success mr-3"></i> 46,53%
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                /argon/index.html
                                            </th>
                                            <td>
                                                3,985
                                            </td>
                                            <td>
                                                319
                                            </td>
                                            <td>
                                                <i class="fas fa-arrow-down text-warning mr-3"></i> 46,53%
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                /argon/charts.html
                                            </th>
                                            <td>
                                                3,513
                                            </td>
                                            <td>
                                                294
                                            </td>
                                            <td>
                                                <i class="fas fa-arrow-down text-warning mr-3"></i> 36,49%
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                /argon/tables.html
                                            </th>
                                            <td>
                                                2,050
                                            </td>
                                            <td>
                                                147
                                            </td>
                                            <td>
                                                <i class="fas fa-arrow-up text-success mr-3"></i> 50,87%
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                /argon/profile.html
                                            </th>
                                            <td>
                                                1,795
                                            </td>
                                            <td>
                                                190
                                            </td>
                                            <td>
                                                <i class="fas fa-arrow-down text-danger mr-3"></i> 46,53%
                                            </td>
                                        </tr>
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