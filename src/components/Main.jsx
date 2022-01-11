import { Routes, Route } from 'react-router-dom'
import "./assets/css/argon.css"
import "./assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
import "./assets/vendor/nucleo/css/nucleo.css"

import App from './App/App'
import Home from './Home/Home'
import FrontPage from './Home/_FrontPage'
import ServicesPage from './Home/_Services'

const Main = () => {

    return (
        <>
            <Routes>
                <Route path="/dashboard/*" element={<App />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/" element={<FrontPage />} />
                <Route path="/*" element={<Home />} />
            </Routes>
        </>
    )

}

export default Main