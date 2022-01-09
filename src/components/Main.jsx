import { Routes, Route } from 'react-router-dom'
import "./assets/css/argon.css"
import "./assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
import "./assets/vendor/nucleo/css/nucleo.css"

import App from './App/App'
import Home from './Home/Home'

const Main = () => {

    return (
        <>
            <Routes>

                <Route path="/*" element={<Home />} />
                <Route path="/dashboard/*" element={<App />} />

            </Routes>
            
        </>
    )

}

export default Main