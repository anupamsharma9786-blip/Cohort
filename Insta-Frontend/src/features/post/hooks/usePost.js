import { dislikePost, getFeed , likePost} from "../services/post.api";
import { useContext, useEffect } from "react";
import { PostContext } from "../post.context";


export const usePost = () =>{

    const context = useContext(PostContext)

    const { post, setPost, loading, setLoading, feed, setFeed , refresh, setRefresh} = context;

    const handleGetFeed = async () => {
        setLoading(true)
        const data = await getFeed()
        setFeed(data.posts)
        setLoading(false)
    }

    const handleLikePost = async (postId) => {
        const data = await likePost(postId)
        setRefresh(!refresh)
    }

    const handleDislikePost = async (postId) => {
        const data = await dislikePost(postId)
        setRefresh(!refresh)
    }

    return { loading, feed, handleGetFeed, post, handleLikePost, handleDislikePost, refresh}



}