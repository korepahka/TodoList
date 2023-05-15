import { Link } from "react-router-dom";
import {createRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";



export default function Login() {

    const emailRef = createRef()
    const passwordRef = createRef()

    const {setUser, setToken} = useStateContext()
    const [errors, setErrors] = useState(null)

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
          }

          setErrors(null);
          
          axiosClient.post('/login', payload)
            .then(({data}) => {
              setUser(data.user);
              setToken(data.token);
              localStorage.setItem('currentUserId', data.user.id);
            })
            .catch(err => {
              const response = err.response;
              if (response && response.status === 422) {
                if (response.data.errors) {
                     setErrors(response.data.errors)
                } else {
                    setErrors({
                        email: [response.data.message]
                    })

                }
              }
            })
            
    }

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">
                        Войдите в ваш аккаунт
                    </h1>
                    {errors &&
                        <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                        </div>
                    }
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Зарегистрироваться? <Link to="/signup">Cоздать аккаунт</Link> 
                    </p>
                </form>
            </div>
        </div>
    )
}