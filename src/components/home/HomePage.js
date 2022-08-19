import { useEffect } from "react"
import { useState } from "react"
import { getSubscriptionsByUser } from "../../managers/HomePageManger"
import { getPostsByUser } from "../../managers/PostManager"

export const HomePage = () => {
const [posts, setPosts] = useState([])



useEffect(() => {
    getSubscriptionsByUser(localStorage.getItem("user_id")).then(data => setPosts(data))
}, [])
return ""
}