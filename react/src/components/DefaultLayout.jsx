import { useEffect } from "react";
import { Navigate, Outlet, Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";


export default function DefaultLayout() {
    const {user, token, setUser, setToken} = useStateContext()

    if (!token) {
        return <Navigate to="/login" />
    }

    const onLogout = (ev) => {
        ev.preventDefault()

        axiosClient.post('/logout')
            .then(() => {
                setUser({})
                setToken(null)
            })
    }

    useEffect(() => {
        axiosClient.get('/user')
            .then(({data}) => {
                setUser(data)
            })

    }, [])

    return (
            <div id="defaultLayout">

                <div className="content">
                    <header>
                        <div>Приветики {user.name}</div>
                        <div>
                            <a href='#' onClick={onLogout} className="btn-logout">Logout</a>
                        </div>
                    </header>
                    <main>
                      <Outlet/>
                    </main>
                </div>
            </div>
    )
}