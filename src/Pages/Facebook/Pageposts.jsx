import React, { useState } from 'react'

const Pageposts = ({id,access_token}) => {
    const [posts,setPosts] = useState([])
    const [message,setMessage] = useState('')
    const [likescount,setLikesCount] = useState(null)
    const [commentcount,setcommentCount] = useState(null)
    const ViewPosts = () =>{

        window.FB.api(
            `/${id}/feed`,
            'GET',
            {
              access_token:access_token
            },
            function(response) {
              if (!response || response.error) {
                console.log('Error occurred: ' + response.error.message);
              } else {
                console.log(response.data)
                setPosts(response.data)
              }
            }
          );
        
    }

    const addPost = () =>{
        console.log(id,access_token)
        window.FB.api(
            `/${id}/feed`,
            'POST',
            {
              message: message,
              access_token:access_token
            },
            function(response) {
              if (!response || response.error) {
                console.log('Error occurred: ' + response.error);
              } else {
                ViewPosts()
              }
            }
          );
      }

      const viewPostDetails = (id) =>{
        
        const fetchlikes = () =>{

          window.FB.api(
            `/${id}/likes`,
            'GET',
            {
              access_token:access_token
            },
            function (response) {
              if (response && !response.error) {
                /* handle the result */
                console.log(response,"likes")
                setLikesCount(response.data.length)
              }
            }
        );
        }

        const fetchcomments = () =>{
          window.FB.api(
            `/${id}/comments`,
            'GET',
            {
              access_token:access_token
            },
            function (response) {
              if (response && !response.error) {
                /* handle the result */
                console.log(response,"comments")
                setcommentCount(response.data.length)
              }
            }
        );
        }

        Promise.all([fetchlikes(),fetchcomments()])

      }
  return (
    <>
    <button onClick={ViewPosts}>view posts</button>
   
     <input type="text" placeholder='input value' onChange={(e)=>setMessage(e.target.value)}></input>
          <button onClick={addPost}>add a post </button>
    <h3 style={{textDecoration:"underline"}}>posts</h3>
    {posts?.map((post,key)=>(
        <div key={key}>
            <h3>{key+1}.{post.message}</h3>
            <button onClick={()=>viewPostDetails(post.id)}>view details</button>
            
        </div>
    ))}
    Likes: {likescount}
    Comments : {commentcount}
  
    </>
  )
}

export default Pageposts