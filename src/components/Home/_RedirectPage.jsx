import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Env from "../Env"

const RedirectPage = () => {
    const g = useParams()
    useEffect(() => {
        window.location.href = Env.PageLink + g.page + "/" + g.link
    }, [])
    return(
        <>
        </>
    )
}

export default RedirectPage