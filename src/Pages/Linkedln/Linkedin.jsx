import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const clientId = '867tbg5hd1f1us';
const redirectUri = 'http://localhost:3000';
const scope = 'r_liteprofile r_emailaddress w_member_social';

const Linkedin = () => {
  const token = localStorage.getItem('linkedin')
  const [accessToken, setAccessToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [linkedincode,setlinkedincode] = useState('')
  const [userData,setUserData] = useState({})

  const memoizedAccessToken = useMemo(() => accessToken, [accessToken]);

  const fetchData = async (code) => {
    setLoading(true);
    try {
      const response = await axios.post(`/oauth/v2/accessToken?grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}&client_id=${clientId}&client_secret=${process.env.REACT_APP_LINKEDIN_CLIENT_SECRET}`, {
      });
      localStorage.setItem('linkedin', response.data.access_token);
      // setAccessToken(response.data.access_token);
      setLoading(false);
      
  //     const headers = {
  //       'Authorization': `Bearer ${token}`
  //     };
  //     fetch('/me',{headers})
  //     .then(response => response.json())
  // .then(data => {
  //   // do something with the user info
  //   console.log(data);
  //   setUserData(data)
  // })
  // .catch(error => console.error(error));
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    setlinkedincode(code)
    if (code) {
      fetchData(code);
    }
  }, []);

  useEffect(() => {
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    const fetchUser = async () =>{

      const response = await axios.get('/me',{headers})
      .then(response => response.json())
  .then(data => {
    // do something with the user info
    console.log(data);
    setUserData(data)
  })
  .catch(error => console.error(error));
    }

    fetchUser()
 
  
   
  }, [])
  

  const handleLogin = () => {
    setLoading(true);
    const state = Math.random().toString(36).substring(7);
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;
    window.location.href = authUrl;
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <button onClick={handleLogin}>Sign in with LinkedIn</button>
          {/* {accessToken && (
            <p style={{ width: '100px' }}>Access Token: {accessToken}</p>
          )} */}
          {userData?
          <p>Hello {userData?.localizedFirstName} {userData?.localizedLastName}</p>:""}

        </div>
      )}
    </>
  );
};

export default Linkedin;
