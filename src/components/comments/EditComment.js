import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getSingleComment, updateComment } from "../../managers/CommentManager"


export const UpdateComment = () => {
    const navigate = useNavigate()
    
    const { commentId, postId } = useParams()

    const [comment, setComment] = useState({})


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
    
    
                <button type="submit" onClick={evt => {
                    evt.preventDefault()
                  
                    const updatedComment = {
                        content: comment.content,
                        subject: comment.subject,
                        id: commentId
                        
                    }
                    // Send POST request to API
                    updateComment(updatedComment)
                    .then(() => navigate(`/posts/${comment.post.id}/comments`))
                }}
                className="btn btn-primary">Update</button>
            </div>
          </div>
        </form>
      )
              }