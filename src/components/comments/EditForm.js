import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getSingleComment, updateComment } from "../../managers/CommentManager"


export const UpdateComment = () => {
    const navigate = useNavigate()
    
    const { commentId } = useParams()

    const [comment, setComment] = useState({
        id: commentId,
        subject: "",
        content: "",
        date: ""
      })

    /* UseEffect for single comment by id */
    useEffect(() => {
        getSingleComment(commentId).then(data => setComment(data))
    },
        [commentId]
    )

    const changeCommentState = (domEvent) => {
        // TODO: Complete the onChange function
        const copyUpdatedComment = {...comment}
        copyUpdatedComment[domEvent.target.name] = domEvent.target.value
        setComment(copyUpdatedComment)
    }

    const handleSave = (event) => {
        event.preventDefault()
        updateComment(comment)
        navigate(`/posts/${comment.post_id.id}/comments`)
      }

    return (
        <form className="commentForm">
          <div className="card">
          <h2 className="title">Edit Comment</h2>
            <div className="card-content">
    
              <fieldset>
                <div className="form-group">
                <label>Subject:</label>
                  <div className="control">
                  <input className="input" required autoFocus
                    type="text"
                    value={comment.subject}
                    name = "subject"
                    onChange={changeCommentState } />
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
                    onChange={changeCommentState } />
                  </div>
                </div>
              </fieldset>
    
                <br></br>
    
                <fieldset>
                <div className="form-group">
                <label>Date:</label>
                  <div className="control">
                  <input className="input" required autoFocus
                    type="date"
                    value={comment.date}
                    name = "date"
                    onChange={changeCommentState } />
                  </div>
                </div>
              </fieldset>
    
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