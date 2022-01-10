import { Routes, Route, Redirect } from 'react-router-dom'
import Header from './_Header'
import Footer from './_Footer'
import FrontPage from './_FrontPage'
import Login from './_Login'
import Register from './_Register'
import ForgotPass from './_ForgotPass'
import NewPass from './_NewPass'
import Logout from './_Logout'
import Error404 from './_Error404'
import Verify from './_Verify'
import ResetPass from './_ResetPass'
import RedirectPage from './_RedirectPage'

const Home = () => {

        return(
            <>

                <Header />

                    <Routes>
                        <Route path="/" element={<FrontPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/fp" element={<ForgotPass />} />
                        <Route path="/np/:id" element={<NewPass />} />
                        <Route path="/services" element={<NewPass />} />
                        <Route path="/verify/:email/:code" element={<Verify />} />
                        <Route path="/fp/:email/:code" element={<ResetPass />} />
                        <Route path="/:page/:link" element={<RedirectPage />} />
                        <Route path="/*" element={<Error404 />} />
                    </Routes>

                <Footer />

            </>
        )

}

export default Home