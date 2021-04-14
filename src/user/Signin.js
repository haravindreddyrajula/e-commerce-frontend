import React, {useState} from "react"
import Base from "../core/Base"
import { Link, Redirect } from "react-router-dom"
import { signin, authenticate, isAuthenticated } from "../auth/helper"

const Signin = () => {

    const [ values, setValues] = useState({
        email:"a@haravind.com",
        password:"haravind",
        error:"",
        loading: false,
        didRedirect: false
    })

    const { email, password, error, loading, didRedirect } = values

    const { user } = isAuthenticated()

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault()
        setValues({...values, error: false, loading: true})
        signin({email, password})
        .then(data => {
            if (data.error){
                setValues({...values, error: data.error, loading: false})
            } else{
                authenticate(data, () => {
                    setValues({
                        ...values,
                        didRedirect: true
                    })
                })
            }
        })
        .catch(console.log("Error in signin"))
    }

    const performanceRedirect = () => {
        if (didRedirect){
            if (user && user.role === 1){
                return <Redirect to ="/admin/dashboard" />
            } else {
                return <Redirect to ="/user/dashboard" />
            }
        }

        if (isAuthenticated()){
            return <Redirect to="/" />
        }
    }

    const loadingMessage = () => {
        return (
            loading && (
                <div className= "alert alert-info">
                    <h2> Loading... </h2>
                </div>
            )
        )
    }

    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-danger" style={{display: error ? "" : "none"}}>{error}</div>
                </div>
            </div>
        )
    }

    const signInForm = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className = "text-light">Email</label>
                            <input className="form-control" onChange={handleChange("email")} type="email" value={email} />
                        </div>
                        <div className="form-group">
                            <label className = "text-light">Password</label>
                            <input className="form-control" onChange={handleChange("password")} type="password" value={password} />
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <Base title = "Signin page" description="A page for signin">
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performanceRedirect()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signin