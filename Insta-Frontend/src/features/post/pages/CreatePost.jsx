import React from 'react'
import '../styles/createPost.scss'
import { useRef, useState } from 'react'
import { usePost } from '../hooks/usePost'
import { useNavigate } from 'react-router'

const CreatePost = () => {

    const {loading,handleCreatePost} = usePost()

    const postImageInpurFieldRef = useRef(null)

    const [caption, setCaption] = useState("")

    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()

        const file = postImageInpurFieldRef.current.files[0]

        await handleCreatePost(file,caption)

        navigate("/")
        
    }

    if(loading){
        return(
            <main className='create-post-page'>
                <div className="form-container">
                    <h1>Creating post....</h1>
                </div>
            </main>
        )
    }

  return (
    <main className='create-post-page'>
      <div className="form-container">
        <h1>New Post</h1>
        <form onSubmit={handleSubmit}>
          <div className='file-picker'>
            <label htmlFor="postImage" className='file-label'>Select Image</label>
            <input ref={postImageInpurFieldRef} hidden type="file" name="postImage" id="postImage" />
          </div>
          <input 
          onInput={(e)=>{setCaption(e.target.value)}}
          type="text" 
          name="caption" 
          id="caption" 
          placeholder='Enter caption' />
          <button type="submit" className='button primary-button'>Create Post</button>
        </form>
      </div>
    </main>
  )
}

export default CreatePost