import React from 'react'
import "../styles/form.scss"

const Login = () => {
  return (
    <main>
        <div className="form-container">
            <h1>INSTY</h1>
            <h2>Login</h2>
            <form>
                <input type='text' name='username' placeholder='Enter Username' required />
                <input type='password' name='password' placeholder='Enter Password' required />
                <button type='submit'>Login</button>
            </form>
        </div>
    </main>
  )
}

export default Login