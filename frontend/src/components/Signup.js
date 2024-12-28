import React, { useState, useContext } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate
import { UserContext } from '../UserContext'; // Import UserContext
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';

function Signup() {
  const [role, setRole] = useState('user');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Access UserContext
  const { updateUser } = useContext(UserContext);

  // Initialize useNavigate hook for redirection
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8000/signup', {
        email,
        username: name,
        password,
        role
      });
  
      // Check the response and extract the user data
      const { data } = response;
      console.log('API Response:', data); // Log the full API response
  
      // Assuming the user data is nested inside a property (e.g., response.data.user), update accordingly
      const userData = { email, username: name, role }; // Replace with the actual user data you want to store
      updateUser(userData); // Update UserContext with the correct user data
      console.log('User registered successfully:', userData);
  
      // Redirect to home page after successful registration
      navigate('/'); // Navigate to the home page
    } catch (err) {
      console.log('Error during registration:', err);
    }
  };
  

  return (
    <MDBContainer
      fluid
      className='d-flex align-items-center justify-content-center bg-image'
      style={{
        backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)'
      }}
    >
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{ maxWidth: '600px' }}>
        <MDBCardBody className='px-5'>
          <h2 className='text-uppercase text-center mb-5'>Create an account</h2>
          <MDBInput
            wrapperClass='mb-4'
            onChange={(e) => setRole(e.target.value)}
            label='Your Role'
            size='lg'
            id='form1'
            type='text'
          />
          <MDBInput
            wrapperClass='mb-4'
            onChange={(e) => setName(e.target.value)}
            label='Your Name'
            size='lg'
            id='form1'
            type='text'
          />
          <MDBInput
            wrapperClass='mb-4'
            onChange={(e) => setEmail(e.target.value)}
            label='Your Email'
            size='lg'
            id='form2'
            type='email'
          />
          <MDBInput
            wrapperClass='mb-4'
            onChange={(e) => setPassword(e.target.value)}
            label='Password'
            size='lg'
            id='form3'
            type='password'
          />

          <div className='d-flex flex-row justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
          </div>
          <NavLink to='/'>
            <MDBBtn onClick={handleRegister} className='mb-4 w-100 gradient-custom-4' size='lg'>
              Register
            </MDBBtn>
          </NavLink>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Signup;
