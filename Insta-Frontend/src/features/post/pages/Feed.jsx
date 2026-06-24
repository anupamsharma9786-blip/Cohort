import React from 'react'
import "../styles/feed.scss"
import Post from "../components/Post"
import { usePost } from '../hooks/usePost'
import { useEffect } from 'react'
import Nav from '../../shared/components/Nav'

const Feed = () => {

  const { loading, refresh, feed, handleGetFeed, handleLikePost, handleDislikePost } = usePost()


  useEffect(() => {
    handleGetFeed()
  }, [refresh])

  if(loading || !feed){
    return (
      <div className='loading'>
        <main><p>Feed is Loading...</p></main>
      </div>
    )
  }
  console.log(feed)

  return (
    <main className='feed-page'>
      <Nav/>
      <div className="feed">
        <div className="posts">
          {feed.map((post) => (
            <Post key={post._id} refresh={refresh} post={post} user = {post.user} handleLikePost={handleLikePost} handleGetFeed={handleGetFeed} handleDislikePost={handleDislikePost} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default Feed