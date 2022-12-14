import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { deleteComment, getCommentsByPostId } from '../../managers/CommentManager' 
import { FaTrashAlt, FaUserCircle, FaEdit } from 'react-icons/fa';


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
                    <strong>{comment.author?.user.first_name} {comment.author?.user.last_name}</strong>
                    <br />
                  </p>
                  <p>Subject: {comment.subject}</p>
                  <p>{comment.content}</p>
                  <p>{comment.created_on}</p>
                </div>

              </div>
              {
                parseInt(userId) === comment.author.id ?
                  <div className="media-right">
                    <span className="icon">
                      <FaEdit onClick={() => navigate(`/comments/${comment.id}/edit`)} />
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
