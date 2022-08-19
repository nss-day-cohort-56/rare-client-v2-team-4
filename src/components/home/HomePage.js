import { useEffect } from "react"
import { useState } from "react"
import { getSubscriptionsByUser } from "../../managers/HomePageManger"

export const HomePage = () => {
const [posts, setPosts] = useState([])




useEffect(() => {
    getSubscriptionsByUser(localStorage.getItem("user_id")).then(data => { 
        let posts = []
        let postArray = data.map(subscription => subscription.author.posts)
        for (let postList of postArray) {
            for (let post of postList) {
                posts.push(post)
            }
        }
        setPosts(posts)
})}, [])


return (
    <>
    {
        posts.map(post => {
            return <>
            <div>Title: {post?.title}</div>
            <div>Publication Date: {post.publication_date}</div>
            <div>Content: {post.content}</div>
            </>
        })
    }
    </>
)
}