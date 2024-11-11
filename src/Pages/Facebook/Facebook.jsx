import React, { useEffect, useState } from "react";
import Pageposts from "./Pageposts";

const Facebook = () => {
  const [name, setName] = useState("");
  const [userid, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [pagesData, setPagesData] = useState([]);
  // const appAccessToken = `${process.env.REACT_APP_FACEBOOK_APP_ID}|${process.env.REACT_APP_FACEBOOK_APP_SECRET}`;

  // const getAppDetails = () => {
  //   window.FB.api(
  //     `/1227372158534623`, // Replace with your app ID if not using env variables
  //     "GET",
  //     {
  //       access_token:
  //         "EAAGAJTP6wkcBO0sHOSqq5rtWdpV9UvmNQhfdgrpXNCN18tjkZB7lhPOBr1hjIrj3R02bzzasJN30ZCxvypkEsEmECskQsiKN84WZAfEMph2POzUiot1n8m86NkOdNwpV3tn2PDEVYVP2neBlcUoBkKp72Iy1OcEKxZBgaT8AhZBWHMRtWZAnpzZAwZA4OWoLOXS16Q6ZB4Vw33MZCWzQ33Lf79jAlSEqDvCSvkBZCs0GQ8A4dMuwqq0kAYMprm2qPcyGgZDZD",
  //     },
  //     function (response) {
  //       if (response && !response.error) {
  //         console.log("App Data:", response);
  //       } else {
  //         console.error("Error fetching app data:", response.error);
  //       }
  //     }
  //   );
  // };

  const onLoginClick = () => {
    if (!window.FB) {
      console.error("Facebook SDK not loaded yet.");
      return;
    }
    window.FB.login(
      function (response) {
        if (response.authResponse) {
          window.FB.api("/me", function (response) {
            setName(response.name);
            setUserId(response.id);
          });
        } else {
          console.log("User cancelled login or did not fully authorize.");
        }
        window.FB.getLoginStatus(function (response) {
          if (response.status === "connected") {
            const userAccessToken = response.authResponse.accessToken;
            setAccessToken(userAccessToken); // This is the user's access token

            // Now, use the app access token if you need to fetch data on behalf of the app
            const appAccessToken =
              `${process.env.REACT_APP_FACEBOOK_APP_ID}|${process.env.REACT_APP_FACEBOOK_APP_SECRET}`
            window.FB.api(
              `/me/accounts`,
              { access_token: appAccessToken },
              function (response) {
                if (response && !response.error) {
                  setPagesData(response.data);
                }
              }
            );
          }
        });
      },
      { scope: "pages_show_list,pages_read_engagement,pages_manage_posts" }
    );
  };

  const getposts = () => {
    window.FB.api(
      "/me",
      "GET",
      { fields: "id,name,posts" },
      function (response) {
        console.log(response);
      }
    );
  };
  const addPost = () => {
    window.FB.api(
      "/103928712660324/feed",
      "POST",
      {
        message: message,
        access_token: accessToken,
      },
      function (response) {
        if (!response || response.error) {
          console.log("Error occurred: " + response.error.message);
        } else {
          console.log("Post ID: " + response.id);
        }
      }
    );
  };
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    console.log("Effect running"); // Verify that useEffect is called
  
    // Define fbAsyncInit function before loading the SDK
    window.fbAsyncInit = function() {
      console.log("fbAsyncInit called"); // Check if fbAsyncInit is called
  
      window.FB.init({
        appId: '1227372158534623',
        xfbml: true,
        version: 'v21.0'
      });
  
      // Log a page view
      window.FB.AppEvents.logPageView();
  
      // Check login status
      window.FB.getLoginStatus(response => {
        console.log("FB.getLoginStatus response:", response);
        
        if (response.status) {
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
      });
    };
  
    // Load the Facebook SDK script asynchronously
    (function(d, s, id) {
      console.log("Attempting to load Facebook SDK script"); // Check if SDK load is initiated
  
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        console.log("Facebook SDK script already loaded"); // Script already exists
        return;
      }
  
      js = d.createElement(s); 
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
  
      // Log script load success or failure
      js.onload = () => {
        console.log("Facebook SDK loaded successfully.");
        if (typeof window.FB === 'undefined') {
          console.error("Facebook SDK did not initialize properly");
        }
      };
      js.onerror = () => console.error("Failed to load Facebook SDK.");
  
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  
    // Backup initialization if fbAsyncInit does not trigger
    const checkFBInitialization = setInterval(() => {
      if (window.FB) {
        clearInterval(checkFBInitialization);
        console.log("Backup: FB SDK detected");
        window.FB.getLoginStatus(response => {
          console.log("FB.getLoginStatus response (backup):", response);
        });
      }
    }, 1000); // Check every 1 second
  }, []);
  
  
  const getAppDetails = () => {
    const clientToken = process.env.REACT_APP_FACEBOOK_CLIENT_TOKEN;
    window.FB.api(
      '/1227372158534623', // Replace with your app ID if not using env variables
      "GET",
      { access_token: 'EAARcSdmEQ98BOZBUYAFeRsZAwYfxATIqVtco3GdI5LbqZBR7lQiRIDABaljiJ34X7B6FQc2w5EYPqgNwBJcFRcLLkSh5dHBH0MkAwx3toda7OzRbiMgZBCvZBrAyYXZAZCIgredBw0ehd77oTf05eWEFFRIk847kuVBxfiI5GKOTemlBX7487uehbstKPWxofRQRNC2TzIFi6ZA1ihpDfz8tDtCtikaIKJwtRyOPsZCCUnpsuZCIBLkK7C47QMQVY12wZDZD' },
      function (response) {
        if (response && !response.error) {
          console.log("App Data:", response);
        } else {
          console.error("Error fetching app data:", response.error);
        }
      }
    );
  };
  
  
  
  
  
  return (
    <div className="App">
      <button onClick={onLoginClick}>Login with Facebook</button>
      <button onClick={getAppDetails}>Get App Data</button>
<p>{isConnected ? 'Facebook SDK Connected' : 'Connecting to Facebook SDK...'}</p>
      <h3>{name ? "Hello " + name : ""}</h3>
      <h3 style={{ textDecoration: "underline" }}>Pages</h3>
      {pagesData.map((pages) => (
        <div
          key={pages.id}
          style={{
            border: "1px solid white",
            marginTop: "10px",
            width: "200px",
            padding: "10px",
          }}
        >
          <h5>Page name : {pages.name}</h5>
          <h5>Page category : {pages.category}</h5>
          <Pageposts id={pages.id} access_token={pages.access_token} />
        </div>
      ))}

      {/* <button onClick={getposts}>get posts</button> */}
      {/* <br/> */}
      {/* <input type="text" placeholder='input value' onChange={(e)=>setMessage(e.target.value)}></input>
          <button onClick={addPost}>add a post </button> */}
    </div>
  );
};

export default Facebook;
