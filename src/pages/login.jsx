import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { usePostLogin } from '../API/submit/postLogin';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const postLoginMutation = usePostLogin();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (username === '' || password === '') {
      Swal.fire({
        title: 'Error',
        text: 'Username and password cannot be empty',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    try {
      const response = await postLoginMutation.mutateAsync({
        username,
        password,
      });

      if (response.msg === 'success') {
        const userData = response.data[0];
        console.log(response.msg);
        console.log(userData);
        
        Swal.fire({
          title: 'Success',
          text: 'Login successful',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/index');
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Login failed',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Login failed',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
    
    setUsername('');
    setPassword('');
  };

  return (
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
                <button
                  className="login-btn"
                  onClick={handleSubmit}
                  type="button"
                  id="loginBtn"
                >
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
