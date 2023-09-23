import React, { useState } from 'react';
import './register.css';
import Forminputs from '../forminputs/Forminputs';
import { createAuthUserWithEmailAndPassword, auth, createuserdocfromAuth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling

const Register = () => {
  const navigate = useNavigate();

  const [inputValues, setInputValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    errorMessage: '',
    required: true,
  });

  const inputs = [
    {
      id: 1,
      name: 'username',
      type: 'text',
      label: 'Username',
      placeholder: 'Username',
      errorMessage: 'Username should be 3-16 characters',
      required: true,
    },
    {
      id: 2,
      name: 'lastname', // Placeholder input field for last name
      type: 'text',
      placeholder: 'Last Name',
      errorMessage: 'Last Name is required',
      required: true,
      minLength: 1, // Minimum length required
      maxLength: 50,
    },
    {
      id: 3,
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      errorMessage: 'Email is required',
      required: true,
    },
    {
      id: 4,
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      errorMessage: 'Password should be at least 8 characters',
      required: true,
      minLength: 8,
    },
    {
      id: 5,
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirm Password',
      errorMessage: 'Confirm Password should match the Password',
      required: true,
    },
  ];
  const handleRedirectToLogin = () => {
    // Use inputValues.email to get the email from the state
    const emailValue = inputValues.email;
    navigate(`/login?email=${emailValue}`);
  };

  const handleChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { email, password, username } = inputValues;

    try {
      const userCredential = await createAuthUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      await createuserdocfromAuth(user, { displayName: username });

      console.log('Registration successful:', user);

      // Show a welcome notification
      toast.success(`Welcome, ${username}! User created successfully.`);

      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error.message);
      toast.error(`Registration error: ${error.message}`);
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleRegister}>
        <h2>Create a Dev@Deakin account</h2>
        {inputs.map((input) => (
          <div key={input.id} className="input-container">
            <label htmlFor={input.name} className="label-bold">
              {input.label}
            </label>
            <Forminputs
              key={input.id}
              {...input}
              value={inputValues[input.name]}
              onChange={handleChange}
              id={input.id}
            />
          </div>
        ))}

        <button type="submit">Create</button>
      </form>

      {/* Add ToastContainer to display notifications */}
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} />
    </div>
  );
};

export default Register;
