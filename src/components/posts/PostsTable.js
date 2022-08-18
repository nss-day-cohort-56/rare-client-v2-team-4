import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllPosts, updatePost } from "../../managers/PostManager";
import { getSingleProfile } from "../../managers/ProfileManager";

export const PostsTable = ({ posts, deleteClickEvent, setPosts }) => {
  let navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const currentUserId = parseInt(localStorage.getItem("user_id"));

  useEffect(() => {
    getSingleProfile(currentUserId).then((data) => setProfile(data));
  }, []);

  const handleApprovalStatus = (post) => {
    const copy = {...post}
    copy.category = post.category.id
    copy.tags = post.tags?.map(t => t.id)
    copy.reactions = post.reactions?.map(r => r.id) 
    switch (post.approved) {
      case false:
        copy.approved = true
        break;
      case true: 
        copy.approved = false
        break;
      default: 
        window.alert("ERROR")
    }
    
    updatePost(post.id, copy).then(()=>getAllPosts()).then((data)=>setPosts(data))
  }

  return (
    <table className="table is-fullwidth">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Publication Date</th>
          <th>Category</th>
          {profile?.user?.is_staff ? <><th>Status</th><th>Approval</th></> : <></>}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {posts
          .sort((a, b) => {
            return b.publication_date.localeCompare(a.publication_date);
          })
          .map((post) => {
            /* if current user is admin, show all posts with approval status */
            return (
              <>
              {profile?.user?.is_staff || post.approved ? <tr key={post.id}>
                <td>
                  <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </td>
                <td>
                  {post.user.user.first_name} {post.user.user.last_name}
                </td>
                <td>{post.publication_date}</td>
                <td>{post.category?.label}</td>
                {profile?.user?.is_staff ? (
                  post.approved ? (
                    <td>approved</td>
                  ) : (
                    <td>pending</td>
                  )
                ) : (
                  <></>
                )}
                {profile?.user?.is_staff ? (
                  post.approved ? (
                    <td><button className="button is-danger" onClick={() => {
                      handleApprovalStatus(post)
                    }}>disapprove</button></td>
                  ) : (
                    <td>
                      <button
                        className="button is-primary"
                        onClick={() => {
                          handleApprovalStatus(post)
                        }}
                      >
                        approve
                      </button>
                    </td>
                  )
                ) : (
                  <></>
                )}
                <td>
                  {deleteClickEvent ? (
                    <div className="buttons">
                      <button
                        className="button is-warning"
                        onClick={() => navigate(`/posts/${post.id}/edit`)}
                      >
                        edit
                      </button>
                      <button
                        className="button is-danger"
                        onClick={(evt) => {
                          evt.preventDefault();
                          if (
                            window.confirm(
                              "Are you sure you want to delete this post?"
                            )
                          ) {
                            return deleteClickEvent(post.id);
                          }
                        }}
                      >
                        delete
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                </td>
              </tr> : <></>}
              </>
              
            );
          })}
      </tbody>
    </table>
  );
};
