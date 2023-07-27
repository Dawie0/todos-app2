/* eslint react/prop-types: 0 */
import { useState } from 'react'
import axios from 'axios'

const Register = ({ handleRegister }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        password2: ''
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
            const { username, password, password2 } = formData

            if (username.trim() === '' || password.trim() === '') {
                alert('Please fill in all required fields')
                return
            }

            if(password !== password2) {
                alert('Passwords do not match')
                return
            }

            const response = await axios.post(`https://vercel-test-again-amber.vercel.app/users/register`, {
                user: {
                    username: username,
                    password: password
                }
            })
            console.log(response.data.message)

            alert('Registration successful! Please log in.')
            handleRegister()
        }
        catch (error) {
            console.error('Error during registration:', error)
        }
        
    }

    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <div className="header">Register</div>
                <div className="inputs">
                    <input placeholder="Email" className="input" type="text" name='username' autoComplete='new-username' value={formData.username} onChange={handleFormChange} />
                    <input placeholder="Password" className="input" type="password" name='password' value={formData.password} onChange={handleFormChange} />
                    <input placeholder="Re-Enter Password" className="input" type="password" name='password2' value={formData.password2} onChange={handleFormChange} />
                    <button className="sigin-btn" type="submit">Register</button>
                </div>
            </form>
            <button onClick={() => handleRegister()}>Back</button>
        </div>
    )
}

export default Register