import React, { useState, useContext } from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';  // Import UserContext

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");  // Error state to display errors
  const navigate = useNavigate();  // For redirecting after successful login
  const { updateUser } = useContext(UserContext);  // Access updateUser function from context

  const handleSignin = async () => {
    try {
      // Making the API call to the signin route
      const response = await axios.post('http://localhost:8000/signin', {
        email: email,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json', // Ensure proper content type
        }
      });

      // If login is successful, update context and localStorage
      if (response.data.token) {
        console.log("Login successful");

        // Store the token and user data in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userData', JSON.stringify(response.data.user));  // Store user data

        // Update user context with the received user data
        updateUser(response.data.user);  // This will trigger the context update

        // Redirect to the homepage or dashboard after successful login
        navigate('/');
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      // Error handling based on error type
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Error during login.");
      } else {
        setError("Error during login.");
      }
      console.error("Error during login", err);
    }
  }

  return (
    <>
      <MDBContainer fluid className="p-3 my-5">
        <MDBRow>
          <MDBCol col='10' md='6'>
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone image"
            />
          </MDBCol>

          <MDBCol col='4' md='6'>
            <MDBInput
              wrapperClass='mb-4'
              onChange={(e) => setEmail(e.target.value)}
              label='Email address'
              id='formControlLg'
              type='email'
              size="lg"
              value={email}
            />
            <MDBInput
              wrapperClass='mb-4'
              onChange={(e) => setPassword(e.target.value)}
              label='Password'
              id='formControlLg'
              type='password'
              size="lg"
              value={password}
            />

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <div className="d-flex justify-content-between mx-4 mb-4">
              <MDBCheckbox
                name='flexCheck'
                value=''
                id='flexCheckDefault'
                label='Remember me'
              />
              <a href="#!">Forgot password?</a>
            </div>

            <MDBBtn
              onClick={handleSignin}
              className="mb-4 w-100"
              size="lg"
            >
              Sign in
            </MDBBtn>

            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">OR</p>
            </div>

            <MDBBtn className="mb-4 w-100" size="lg" style={{ backgroundColor: '#3b5998' }}>
              <MDBIcon fab icon="facebook-f" className="mx-2" />
              Continue with Facebook
            </MDBBtn>

            <MDBBtn className="mb-4 w-100" size="lg" style={{ backgroundColor: '#55acee' }}>
              <MDBIcon fab icon="twitter" className="mx-2" />
              Continue with Twitter
            </MDBBtn>

            <p className="text-center">
              Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
            </p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default Signin;
