import { useEffect } from "react"
import { useState } from "react"
import { getSubscriptionsByUser } from "../../managers/HomePageManger"

export const HomePage = () => {
const [posts, setPosts] = useState([])



useEffect(() => {
    getSubscriptionsByUser(localStorage.getItem("user_id")).then(data => setPosts(data))
}, [])
return (
    <>
    <div>
    {posts.title}
    </div>
    <div>
    {posts.author} 
    </div>
    <div>
        
    </div>
    <div>
        
    </div>
    </>
)
}