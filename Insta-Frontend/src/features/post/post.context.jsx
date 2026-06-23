import { createContext, useState } from "react"

export const PostContext = createContext()

export function PostContextProvider({children}) {

    const [loading, setLoading] = useState(false)
    const [post, setPost] = useState(null)
    const [feed, setFeed] = useState([])
    const [refresh, setRefresh] = useState(false)

    return (
        <PostContext.Provider value={{post, setPost, loading, setLoading, feed, setFeed ,refresh, setRefresh}}>
            {children}
        </PostContext.Provider>
    )
}