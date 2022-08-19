import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllCategories } from "../../managers/CategoryManager"
import { createPost } from "../../managers/PostManager"
import { getSingleProfile } from "../../managers/ProfileManager"
import { getAllReactions } from "../../managers/ReactionManager"
import { getAllTags } from "../../managers/TagManager"

export const PostForm = () => {
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [reactions, setReactions] = useState([])

  const [profile, setProfile] = useState({}) // set current user profile
  const [post, setPost] = useState({
    image_url: ''
  })
  const [tagsForPost, setTagsForPost] = useState([])
  const [reactionsForPost, setReactionsForPost] = useState([])
  const currentUserId = parseInt(localStorage.getItem('user_id')) //get current user id from local storage
  let navigate = useNavigate()

  useEffect(() => {
    getAllCategories().then(categoriesData => setCategories(categoriesData))
    getAllTags().then(tagsData => setTags(tagsData))
    getAllReactions().then(reactionsData => setReactions(reactionsData))
    getSingleProfile(currentUserId).then(data => setProfile(data)) // get user profile for current user
  }, [])


  

  const updateTags = (tagId) => {
    let tagsCopy = [...tagsForPost]
    const index = tagsCopy.indexOf(tagId)
    if (index < 0) {
      tagsCopy.push(tagId)
    } else {
      tagsCopy.splice(index, 1)
    }
    setTagsForPost(tagsCopy)
  }

  const updateReactions = (reactionId) => {
    let reactionsCopy = [...reactionsForPost]
    const index = reactionsCopy.indexOf(reactionId)
    if (index < 0) {
      reactionsCopy.push(reactionId)
    } else {
      reactionsCopy.splice(index, 1)
    }
    setReactionsForPost(reactionsCopy)
  }

  const [urlImg, setUrlImg] = useState("")

    const createUrlImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            setUrlImg(base64ImageString)
        });
    }

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    let todayDate = new Date()
    const postData = {
      ...post,
      publication_date: todayDate.toISOString().split('T')[0],
      tags: tagsForPost,
      reactions: reactionsForPost,
      image_url: urlImg
      
    }
    /* if user is admin, post is approved */
    if (profile?.user?.is_staff) {
      postData.approved = true // add approved key with true value 
    } else {
      postData.approved = false // add approved key with false value
    }
    createPost(postData).then( (post) => 
      navigate(`/posts/${post.id}`)
    )
  }

  const handleChange = (event) => {
    const newPost = { ...post }
    newPost[event.target.name] = event.target.value
    setPost(newPost)
  }
  

  return (
    <section className="section">
      <article className="panel is-info">
        <h2 className="panel-heading">Create post</h2>
        <div className="panel-block">
          <form style={{ width: "100%" }}>
            <div className="field">
              <label htmlFor="title" className="label">Title: </label>
              <div className="control">
                <input type="text" name="title" required className="input"
                  placeholder="Title"
                  value={post.title}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="image_url" className="label">Image URL: </label>
              <div className="url-header">
              <input type="file" id="url_image" onChange={createUrlImageString} />
              <input type="hidden" name="post_id" value={post.id} />
          </div>
            </div>
            <div className="field">
              <label htmlFor="content" className="label">Content: </label>
              <div className="control">
                <div className="control">
                  <textarea
                    className="textarea"
                    name="content"
                    value={post.content}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="field">
              <label htmlFor="category_id" className="label">Category: </label>
              <div className="control">
                <div className="select">
                  <select name="category"
                    value={post.category_id}
                    onChange={handleChange}>
                    <option value="0">Select a category</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <label htmlFor="content" className="label">Tags: </label>
              {
                tags.map(tag => {
                  return (
                    <div className="field" key={`tag--${tag.id}`}>
                      <div className="control">
                        <label className="checkbox" htmlFor={tag.label}>
                          <input type="checkbox" name={tag.label}
                            checked={tagsForPost.includes(tag.id)}
                            onChange={() => {
                              updateTags(tag.id)
                            }} />
                          {tag.label}
                        </label>
                      </div>
                    </div>
                  )
                })

              }
            </div>
            <div className="field">
              <label htmlFor="content" className="emoji">Reactions: </label>
              {
                reactions.map(reaction => {
                  return (
                    <div className="field" key={`reaction--${reaction.id}`}>
                      <div className="control">
                        <label className="checkbox" htmlFor={reaction.emoji}>
                          <input type="checkbox" name={reaction.emoji}
                            checked={reactionsForPost.includes(reaction.id)}
                            onChange={() => {
                              updateReactions(reaction.id)
                            }} />
                          {reaction.emoji}
                        </label>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className="field">
              <div className="control">
                <button type="submit"
                  onClick={handleSubmit}
                  className="button is-link">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </article>
    </section>
  )
}
