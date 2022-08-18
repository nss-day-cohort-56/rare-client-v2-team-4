import { useEffect, useState } from "react"
import { getAllCategories } from "../../managers/CategoryManager"
import { getAllPosts, getPostsByCategory, getPostsByReaction, getPostsByTag, getPostsByTitle } from "../../managers/PostManager"
import { getAllReactions } from "../../managers/ReactionManager"
import { getAllTags } from "../../managers/TagManager"
import { PostsTable } from "./PostsTable"


export const PostList = () => {
  const [posts, setPosts] = useState([])
  const [categoryList, setCategories] = useState([])
  const [tagList, setTags] = useState([])
  const [reactionList, setReactions] = useState([])
  const [chosenCategory, setChosenCategory] = useState(0)
  const [chosenTag, setChosenTag] = useState(0)
  const [chosenReaction, setChosenReaction] = useState(0)
  const [searchTerms, setSearchTerms] = useState("")
  const [filteredPosts, setFiltered] = useState([])

  const loadPosts = () => getAllPosts().then(data => setPosts(data))

  useEffect(() => {
    loadPosts()
    getAllCategories().then(data => setCategories(data))
    getAllTags().then(data => setTags(data))
    getAllReactions().then(data => setReactions(data))
  }, [])

  useEffect(
    () => {
      if (chosenCategory === 0) {
        setFiltered(posts)
      }
      else {
        getPostsByCategory(chosenCategory)
          .then((data) => {
            setFiltered(data)
          })
      }
    },
    [chosenCategory, posts]
  )

  useEffect(
    () => {
      if (searchTerms !== "") {
        getPostsByTitle(searchTerms).then(data => setFiltered(data))
      }
      else {
        setFiltered(posts)
      }
    },
    [searchTerms, posts]
  )

  useEffect(
    () => {
        if(chosenTag === 0) {
            setFiltered(posts)
        }
        else {
            getPostsByTag(chosenTag)
                .then((data) => {
                    setFiltered(data)
                })
        }
    },
    [chosenTag, posts]
)

useEffect(
  () => {
      if(chosenReaction === 0) {
          setFiltered(posts)
      }
      else {
          getPostsByReaction(chosenReaction)
              .then((data) => {
                  setFiltered(data)
              })
      }
  },
  [chosenReaction, posts]
)

  return <section className="section">
    <article className="panel is-info">
      <p className="panel-heading">
        Posts
      </p>
      <select className="categoryFilter" onChange={(event) => {
        let chosenCategory = event.target.value
        setChosenCategory(parseInt(chosenCategory))
      }}>
        <option value="0">Search by Category...</option>
        {categoryList.map(category => {
            return <option value={`${category.id}`}>{category.label}</option>
        })}
      </select>
      <select className="categoryFilter" onChange={(event) => {
        let chosenTag = event.target.value
        setChosenTag(parseInt(chosenTag))
      }}>
        <option value="0">Search by Tag...</option>
        {tagList.map(tag => {
            return <option value={`${tag.id}`}>{tag.label}</option>
        })}
      </select>
      <select className="categoryFilter" onChange={(event) => {
        let chosenReaction = event.target.value
        setChosenReaction(parseInt(chosenReaction))
      }}>
        <option value="0">Search by Reaction...</option>
        {reactionList.map(reaction => {
            return <option value={`${reaction.id}`}>{reaction.emoji}</option>
        })}
      </select>
      <div className="searchBar">
        <input
          type="text"
          placeholder="Input Title ..."
          onChange={
            (changeEvent) => {
              let search = changeEvent.target.value
              setSearchTerms(search)
            }
          }
        />
      </div>
      <div className="panel-block">
        <PostsTable posts={filteredPosts} setPosts={setPosts}/>
      </div>
    </article>
  </section>
}
