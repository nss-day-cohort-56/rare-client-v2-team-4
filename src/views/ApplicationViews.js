import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { TagList } from "../components/tags/TagList"
import { CategoriesList } from "../components/categories/CategoriesList"
import { MyPost } from "../components/posts/MyPost"
import { PostDetails } from "../components/posts/PostDetails"
import { PostForm } from "../components/posts/PostForm"
import { PostList } from "../components/posts/postList"
import { EditPost } from "../components/posts/EditPost"
import { CommentForm } from "../components/comments/CommentForm"
import { CommentsList } from "../components/comments/CommentList"
import { ProfileList } from "../components/profile/ProfileList"
import { UpdateComment } from "../components/comments/EditComment"
import { ProfileDetails } from "../components/profile/Profile"
import { ReactionList } from "../components/reactions/ReactionList"



export const ApplicationViews = ({ token, setToken, setUserId, userId }) => {
  return <Routes>
    <Route path="/login" element={<Login setToken={setToken} setUserId={setUserId} />} />
    <Route path="/register" element={<Register setToken={setToken} setUserId={setUserId} />} />
    <Route element={<Authorized token={token} />}>
      {/* Add Routes here */}
      <Route path="/tags" element={<TagList />} />
      <Route path="/reactions" element={<ReactionList />} />

      <Route path="/posts" element={<PostList />} />
      <Route path="/my-posts" element={<MyPost />} />
      <Route path="/posts/create" element={<PostForm />} />
      <Route path="/posts/:postId/edit" element={<EditPost />} />

      <Route path="/categories" element={<CategoriesList />} />
      <Route path="/posts/:postId/comments" element={<CommentsList userId={userId} />} />
      <Route path="/comments/:commentId/edit" element={<UpdateComment userId={userId} />} />
      <Route path="/posts/:postId" element={<PostDetails userId={userId} />} />
      <Route path="/posts/:postId/add-comment" element={<CommentForm />} />

      <Route path="/profiles" element={<ProfileList />} />
      <Route path="/profiles/:profileId" element={<ProfileDetails />} />
      
    </Route>
  </Routes>
}
