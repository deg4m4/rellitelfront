import { Link } from 'react-router-dom'
import Env from '../Env'

const FrontPage = () => {

    //window.location.href = Env.PageLink
    document.title = "App " + Env.AppName
    return (
        <>
            <Link to="/dashboard">Dashboard</Link>
        </>
    )

}

export default FrontPage