import React,{useEffect, useState} from 'react'
import Pageposts from './Pageposts'

const Facebook = () => {
    const [name,setName] = useState('')
    const [userid,setUserId] =useState('')
    const [message,setMessage] = useState('')
    const [accessToken,setAccessToken] = useState('')
    const [pagesData,setPagesData] = useState([])
    const onLoginClick = () => {
        window.FB.login(function (response) {
          if (response.authResponse) {
            console.log("Welcome! Fetching your information.... ");
            window.FB.api("/me", function (response) {
              console.log(response, "Res");
            //   console.log("Good to see you, " + response.name + ".");
            setName(response.name)
            setUserId(response.id)
            });
          } else {
            console.log("User cancelled login or did not fully authorize.");
          }
          window.FB.getLoginStatus(function (response) {
            if (response.status === "connected") {
              var accessToken = response.authResponse.accessToken;
              console.log(accessToken, "toekn");
            //   setAccessToken(accessToken)
            }
          });

          window.FB.api(
            `/me/accounts`,
            function (response) {
              if (response && !response.error) {
                /* handle the result */
                // console.log(response.data[0].access_token,"account")
                // setAccessToken(response.data[0].access_token)
                setPagesData(response.data)
              }
            }
        );
        });
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
      const addPost = () =>{
        window.FB.api(
            '/103928712660324/feed',
            'POST',
            {
              message: message,
              access_token:accessToken
            },
            function(response) {
              if (!response || response.error) {
                console.log('Error occurred: ' + response.error.message);
              } else {
                console.log('Post ID: ' + response.id);
              }
            }
          );
      }
      // useEffect(() => {
      //   window.fbAsyncInit = () => {
      //     window.FB.init({
      //       appId: "235498918870773",
      //       autoLogAppEvents: true,
      //       xfbml: true,
      //       version: "v11.0",
      //     });
      //   };
      //   (function (d, s, id) {
      //     var js,
      //       fjs = d.getElementsByTagName(s)[0];
      //     if (d.getElementById(id)) {
      //       return;
      //     }
      //     js = d.createElement(s);
      //     js.id = id;
      //     js.src = "https://connect.facebook.net/en_US/sdk.js";
      //     fjs.parentNode.insertBefore(js, fjs);
      //   })(document, "script", "facebook-jssdk");
      // }, []);
      return (
        <div className="App">
          <button onClick={onLoginClick}>Login with Facebook</button>
          <h3>{name ?"Hello "+name:""}</h3>
          <h3 style={{textDecoration:"underline"}}>Pages</h3>
          {pagesData.map((pages)=>(

          <div key={pages.id} style={{border:"1px solid white",marginTop:"10px",width:"200px",padding:"10px"}}>
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
}

export default Facebook