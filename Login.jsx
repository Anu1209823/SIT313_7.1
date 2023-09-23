import React, { useState } from 'react';
import './login.css';
import Forminputs from '../forminputs/Forminputs';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, auth } from '../firebase'; // Import Firebase authentication functions

const Login = () => {
  const navigate = useNavigate();

  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
    errorMessage: "", // Add errorMessage field
    required: true,
  });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "",
      required: true,
      label: "Email",
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "",
      required: true,
      label: "Password",
    },
  ];

  const handleChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { email, password } = inputValues;
  
    if (!email || !password) {
      setInputValues({
        ...inputValues,
        errorMessage: "Please fill in both email and password fields.",
      });
      return; // Exit the function
    }
  
    try {
      // Sign in the user with email and password
      await signInWithEmailAndPassword(auth, email, password);
  
      // If login is successful, navigate to the home page
      console.log('Login successful');
      navigate('/'); // Redirect to the homepage
    } catch (error) {
      // Handle login error here
      console.error('Login error:', error.message);
  
      // Update the errorMessage state with the error message
      setInputValues({ ...inputValues, errorMessage: error.message });
    }
  };

  const handleSignUpClick = () => {
    navigate('/register');
  };

  return (
    <div className='login'>
      <button
        onClick={handleSignUpClick}
        style={{
          width: '80px',
          height: '30px',
          backgroundColor: 'white',
          color: 'blue',
          border: '2px solid blue',
          fontSize: '14px',
          marginLeft: '280px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Sign Up
      </button>

      <form onSubmit={handleSubmit}>
        <h2>Login to Your Account</h2>

        {/* Display the error message */}
        {inputValues.errorMessage && (
          <div className="error-message">{inputValues.errorMessage}</div>
        )}

        {inputs.map((input) => (
          <div key={input.id} className="input-container">
            <label htmlFor={input.name}>{input.label}</label>
            <Forminputs
              {...input}
              value={inputValues[input.name]}
              onChange={handleChange}
              id={input.id}
            />
          </div>
        ))}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
