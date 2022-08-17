import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { deleteComment, getCommentsByPostId } from '../../managers/CommentManager' 
import { FaTrashAlt, FaUserCircle, FaEdit } from 'react-icons/fa';
import { UpdateComment } from "./EditForm";


export const CommentsList = ({ userId }) => {
  const [comments, setComments] = useState([])
  const { postId } = useParams()
  const navigate = useNavigate()

  const loadComments = useCallback(() => {
    getCommentsByPostId(postId).then((commentsData) => {
      setComments(commentsData)
    })
  }, [postId])
  
  useEffect(() => {
    loadComments()
  }, [loadComments])

  const handleDelete = (id) => {
    deleteComment(id).then(() => {
      loadComments()
    })
  }

  return <section className="section">
    <button onClick={() => navigate(`/posts/${postId}`)}>⬅️ Back to Posts</button>
    <article className="panel is-info">
      <p className="panel-heading">
        Comments
      </p>
      {
        comments.map(comment => {
          return <div className="panel-block" key={comment.id}>
            <article className="media is-flex-grow-1">
              <figure className="media-left">
                <span className="icon is-large">
                  <FaUserCircle size={'3rem'} />
                </span>
              </figure>
              <div className="media-content">
                <div className="content">
                  <p>
                    <strong>{comment.author_id?.user.first_name} {comment.author_id?.user.last_name}</strong>
                    <br />
                  </p>
                  <p>Subject: {comment.subject}</p>
                  <p>{comment.content}</p>
                  <p>Date of Comment: {comment.date}</p>
                </div>

              </div>
              {
                parseInt(userId) === comment.author_id.id ?
                  <div className="media-right">
                    <span className="icon">
                      <FaEdit onClick={() => navigate(`/comments/update/${comment.id}`)} />
                    </span>
                    <span className="icon">
                      <FaTrashAlt onClick={() => handleDelete(comment.id)} />
                    </span>
                  </div>
                  :
                  <></>
              }
            </article>
          </div>
        })
      }
    </article>
  </section>
}
