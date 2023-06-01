import React, { useState } from 'react';
import '../assets/style.css';
import Swal from 'sweetalert2';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const showAlert = () => {
    if (username === '' || password === '') {
      Swal.fire({
        title: 'Error',
        text: 'Username and password cannot be empty',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } else {
      Swal.fire({
        title: 'Success',
        text: 'Login successful',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    }
  };

  return(
    <>
      <div className="login-page">
        <div className="container login-container">
          <div className="left">
            <div className="login">
              <img
                alt=""
                src="src\assets\img\5L_logo-white2.png"
                height="300px"
                className="company-logo"
              />
            </div>
          </div>
          <div className="right">
            <div className="login-form">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="btn-div">
                <button className='login-btn' onClick={showAlert} type="button" id="loginBtn">
                  Log in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
