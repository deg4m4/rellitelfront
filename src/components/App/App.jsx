import { Routes, Route } from 'react-router-dom'
import DashBoard from './_DashBoard'
import Links from './_Links'
import Nav from './_Nav'
import Profile from './_Profile'
import Header from './_Header'
import APIs from './_Api'
import Support from './_Support'
import Wallet from './_Wallet'
import Error404 from './_Error404'
import NewLink from './_NewLink'
import Setting from './_Setting'
import EditLink from './_EditLink'
import Delete from './_Delete'
import { useEffect, useState } from "react"
import Env from "../Env"
import checkAuth from "../../module/checkauth"

const App = () => {

    const [userAna, setUserAna] = useState({
        user_balance: 0,
        today_earn: 0,
        yesterday_earn: 0,
        month_earn: 0,
        lastm_earn: 0,
        last_7: 0,
        prev_7: 0,
        top_link: {}
    });

    const [chartData, setCData] = useState([])
    const [topLink, setTopLink] = useState([])
    const [pageSlug, setPaSlug] = useState([])

    useEffect(() => {

        fetch(Env.BackEnd + "analytics", checkAuth()).then(b => b.json()).then(res => {

            if (res.success) {
                var cd = []
                setUserAna(res.user_analytics)
                res.user_analytics.chart_data.forEach(element => {
                    cd.push({ date: element.date, view: element.view, earn: element.earn.toFixed(4) })
                });
                //console.log(res.user_analytics);
                setCData(cd);

                var p = [] 
                res.user_analytics.top_link.forEach(element => {
                    //console.log(element);
                    if (p[element.l_count] === undefined) {
                        p[element.l_count] = []   
                    }
                    p[element.l_count].push(element)
                });
                var topL = []
                var iI = 0
                for (let index = p.length - 1; index > 0; index--) {
                    if (p[index] !== undefined) {
                        for (let index2 = 0; index2 < p[index].length; index2++) {
                            if (iI > 9) {
                                break
                            }
                            topL.push(p[index][index2])
                            iI++
                        }
                    }
                }
            }
            setPaSlug(res.user_analytics.p_slug);
            setTopLink(topL)
        }).catch((e) => {

            alert("Sorry")
            alert(e)

        })

    }, [])

    return (
        <>

            <Nav />

            <div class="main-content main-content-x" id="panel">
                <Header />

                <Routes>

                    <Route path="/" element={<DashBoard userAna={userAna} chartData={chartData} topLink={topLink} pageSlug={pageSlug} />} />
                    <Route path="/links" element={<Links />} />
                    <Route path="/links/:page" element={<Links />} />
                    <Route path="/links/:page/:query" element={<Links />} />
                    <Route path="/new" element={<NewLink />} />
                    <Route path="/edit/:linkSlug" element={<EditLink />} />
                    <Route path="/edit/:linkSlug/:pageNum" element={<EditLink />} />
                    <Route path="/edit/:linkSlug/:pageNum/:pageQuery" element={<EditLink />} />
                    <Route path="/delete/:linkSlug" element={<Delete />} />
                    <Route path="/delete/:linkSlug/:pageNum" element={<Delete />} />
                    <Route path="/delete/:linkSlug/:pageNum/:pageQuery" element={<Delete />} />
                    <Route path="/api" element={<APIs />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/setting" element={<Setting />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/wallet" element={<Wallet />} />
                    <Route path="/*" element={<Error404 />} />

                </Routes>

            </div>

        </>
    )

}

export default App