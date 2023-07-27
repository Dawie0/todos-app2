/* eslint react/prop-types: 0 */
import { useState } from "react"
import axios from "axios"
import Register from "./Register"


const Login = ({ handleLogin }) => {
    

    const [isLoggingIn, setIsLoggingIn] = useState(true)
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    

    const handleFormChange = (e) => {
        const { name, value } = e.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { username, password } = formData

            const response = await axios.post(`https://vercel-test-again-amber.vercel.app/users/login`, {
                user: {
                    username: username,
                    password: password
                }
            })

            const { token } = response.data

            localStorage.setItem('token', token)

            handleLogin()
        }
        catch(error) {
            console.error('Error during login:', error)
        }
        
    }

    const handleRegistration = () => {
        setIsLoggingIn((prev) => !prev)
    }
    return (
        <div>
            {isLoggingIn ? 
                <form className="form" onSubmit={handleSubmit}>
                <div className="header">Sign In</div>
                <div className="inputs">
                    <input placeholder="Email" className="input" type="text" name="username" autoComplete='username' onChange={handleFormChange} />
                    <input placeholder="Password" className="input" type="password" name="password" onChange={handleFormChange} />
                    <div className="checkbox-container">
                        <label className="checkbox">
                        <input type="checkbox" id="checkbox" />
                        </label>
                        <label htmlFor="checkbox" className="checkbox-text">Remember me</label>
                    </div>
                    <button className="sigin-btn" type="submit">Submit</button>
                    <a className="forget" href="#">Forget password ?</a>
                    <p className="signup-link">{"Don't have an account? "}<a href="#" onClick={handleRegistration}>Sign up</a></p>
                </div>
            </form> :
            <Register handleRegister={handleRegistration}/>
            }
        </div>
        
    )
}

export default Login