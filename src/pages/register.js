import React from "react"
import "../css/login.css"
import "../css/register.css"
import { useNavigate } from "react-router-dom";
export default function Register() {

    const navigate = useNavigate();
    const [formdata, setformdata] = React.useState({
        user: "", password: "", confirmpassword: ""
    })

    const [required, setrequired] = React.useState({
        state: false,
        state1: false,
        style: { color: "red", marginLeft: '30px' }
    })


    const [matchError, setmatchError] = React.useState({
        state: false,
        style: { color: "red" }
    })

    const [checkEmailError, setCheckEmailError] = React.useState({
        state: false,
        style: { color: "red" }
    })

    const [checkError, setCheckError] = React.useState({
        state: false,
        style: { color: "red" }
    })

    const [alreadyExists, setAlreadyExists] = React.useState({
        state: false,
        style: { color: "red", marginLeft: '30px' }
    })

    const [emailError, setEmailError] = React.useState({
        state: false,
        style: { color: "red" }
    })


    function handleSubmit() {
        var userCheck = /^[A-Za-z. ]{3,30}$/;
        var email=/^[A-Za-z_]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/;
        if(!formdata.email||!formdata.password||!formdata.user){
            setrequired((prev) => {
                return {
                    ...prev,
                    state: true
                }
            })
        }
        else if (!formdata.email.includes('@gmail.com')) setEmailError((prev) => {
            return {
                ...prev,
                state: true
            }
        })
        else if(!email.test(formdata.email)){
            setCheckEmailError((prev) => {
                return {
                    ...prev,
                    state: true
                }
            })
        }
        else if(!userCheck.test(formdata.user)){
            setCheckError((prev)=>{
                return{
                    ...prev,
                    state:true
                }
            })
        }
        else {
            console.log("ueee")
            fetch("http://localhost:3003/signup", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(formdata)
            }).then((res) => {
                if (res.status === 403) {
                    setrequired((prev) => {
                        return {
                            ...prev,
                            state: true
                        }
                    })
                }
                return res.json()
            }).then((res) => {
                if(res.exists){
                    setAlreadyExists(prev=>{
                        return {
                            ...prev,
                            state:true
                        }
                    })
                }
                else
                navigate('/login')
            })
        }

    }

    function handleChange(event) {
        if (required.state)
            setrequired((prev) => {
                return {
                    ...prev,
                    state: false
                }
            })
        if (event.target.name === "password" || event.target.name === "confirmpassword") {
            if (event.target.value === formdata.password) {
                setmatchError(prev => {
                    return {
                        ...prev,
                        state: false
                    }
                })
            }
            else {
                setmatchError(prev => {
                    return {
                        ...prev,
                        state: true
                    }
                })
            }
        }
        setformdata(
            (prev) => {
                return {
                    ...prev,
                    [event.target.name]: event.target.value
                }
            }
        )
    }
    console.log(formdata);

    return (
        <div className="page">
            <div className="register-form">
                <h2 className="register-title">Register</h2>
                <div className="input-container">
                    <div style={{ flex: "50%" }}>
                        <label className="labels" htmlFor="username">Username: </label> <br />
                        <input type="text" className="fieldss"
                            id='username'
                            name='user'
                            value={formdata.user || ""}
                            onChange={handleChange}></input>
                    </div>
                    <div style={{ flex: "50%" }}>
                        <label className="labels" htmlFor="email">Email: </label> <br />
                        <input type="email" className="fieldss"
                            id='email'
                            name='email'
                            value={formdata.email|| ""}
                            onChange={handleChange}></input>
                        {emailError.state ? <p className="error1" style={{ color: 'red' }}> <> Email must include '@gmail.com'</> </p> : <></>}
                        {checkEmailError.state ? <p className="error1" style={{ color: 'red' }}> <>Email not valid  [special characters and numbers are not allowed] '</> </p> : <></>}

                    </div>

                </div>
                <br />
                <div className="input-container">
                    <div style={{ flex: "50%" }}>
                        <label className="labels" htmlFor="password">Password: </label> <br />
                        <input type="password" className="fieldss"
                            id='password'
                            name='password'
                            value={formdata.password}
                            onChange={handleChange|| ""}></input>
                    </div>
                    <div style={{ flex: "50%" }}>
                        <label className="labels" htmlFor="confirm password">Confirm Password: </label> <br />
                        <input type="password" className="fieldss"
                            id='confirm-password'
                            name='confirmpassword'
                            value={formdata.confirmpassword|| ""}
                            onChange={handleChange}></input>

                        {matchError.state ? <p className="error1" style={{ color: 'red' }}> <> Passwords do not match</> </p> : <p style={{ height: '6px' }}></p>}
                    </div>
                </div>
                <br />
                {required.state ? <p style={required.style} className="error"> <small style={required.style}>You need to fill all fields</small> </p> : ""}
                {alreadyExists.state ? <p style={alreadyExists.style} className="error"> <small style={alreadyExists.style}>Username Already Exists</small> </p> : ""}
                {checkError.state ? <p style={alreadyExists.style} className="error"> <small style={alreadyExists.style}>Input is invalid [special characters and numbers are not allowed in input] </small> </p> : ""}
                <a className="signup" href="/login">Login</a>
                {!matchError.state ? <button className="register-button" onClick={!matchError.state ? () => { handleSubmit() } : () => { }} >Register</button> : <button className="register-button" disabled >Register</button>}
            </div>
        </div>

    )
}