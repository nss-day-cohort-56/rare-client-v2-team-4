import { Link, useNavigate } from "react-router-dom"

export const PostsTable = ({ posts, deleteClickEvent }) => {
  let navigate = useNavigate()

  return <table className="table is-fullwidth">
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Publication Date</th>
        <th>Category</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {
        posts.sort((a, b) => { return b.publication_date.localeCompare(a.publication_date) }).map(post => {
          /* Only Display Posts if Posts are approved */
          if (!post.approved) {
            return <></>
          } else {
          return <tr key={post.id}>
            <td><Link to={`/posts/${post.id}`}>{post.title}</Link></td>
            <td>{post.user.user.first_name} {post.user.user.last_name}</td>
            <td>{post.publication_date}</td>
            <td>{post.category?.label}</td>
            <td>
              {
                deleteClickEvent ?
                  <div className="buttons">
                    <button className="button is-warning" onClick={() => navigate(`/posts/${post.id}/edit`)}>edit</button>
                    <button className="button is-danger" onClick={(evt) => {
                        evt.preventDefault()
                        if (window.confirm("Are you sure you want to delete this post?")) {
                            return deleteClickEvent(post.id)
                            }
                    }}>delete</button>
                  </div> : <></>
              }
            </td>
          </tr>
          }
        })
      }
    </tbody>
  </table>
}
