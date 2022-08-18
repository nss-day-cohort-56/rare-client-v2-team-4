import { saveNewComment } from "../../managers/CommentManager"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export const CommentForm = () => {
  const { postId } = useParams()
  const navigate = useNavigate()

  const [comment, setComment] = useState({
    post_id: postId,
    subject: "",
    content: ""
  })

  const handleSave = (event) => {
    event.preventDefault()
    saveNewComment(comment).then(()=> navigate(`/posts/${postId}/comments` )
    )
  }

  const handleUpdate = (evt) => {
    const copy = { ...comment }
    copy[evt.target.name] = evt.target.value
    setComment(copy)
  }

  return (
    <form className="commentForm">
      <div className="card">
      <h2 className="title">Add A New Comment</h2>
        <div className="card-content">

          <fieldset>
            <div className="form-group">
            <label>Subject:</label>
              <div className="control">
              <input className="input" required autoFocus
                type="text"
                value={comment.subject}
                name = "subject"
                onChange={handleUpdate } />
              </div>
            </div>
          </fieldset>
          
          <fieldset>
            <div className="form-group">
            <label>Comment:</label>
              <div className="control">
              <input className="input" required autoFocus
                type="text"
                value={comment.content}
                name = "content"
                onChange={handleUpdate } />
              </div>
            </div>
          </fieldset>

            <br></br>

          <div className="field is-grouped">
            <div className="control">
              <button
                onClick={handleSave}
                className="button is-success">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
