import { Routes, Route } from 'react-router-dom'
import DashBoard from './_DashBoard'
import Links from './_Links'
import Nav from './_Nav'
import Profile from './_Profile'
import Header from './_Header'
import APIs from './_Api'
import Support from './_Support'
import Withdraw from './_Withdraw'
import Error404 from './_Error404'
import NewLink from './_NewLink'
import Setting from './_Setting'
import EditLink from './_EditLink'
import Delete from './_Delete'

const App = () => {

    return (
        <>

            <Nav />

            <div class="main-content main-content-x" id="panel">
                <Header />

                <Routes>

                    <Route path="/" element={<DashBoard />} />
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
                    <Route path="/Setting" element={<Setting />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/withdraw" element={<Withdraw />} />
                    <Route path="/*" element={<Error404 />} />

                </Routes>
                
            </div>

        </>
    )

}

export default App