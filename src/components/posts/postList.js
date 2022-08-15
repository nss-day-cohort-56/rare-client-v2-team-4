import { useEffect, useState } from "react"
import { getAllPosts, getPostsByCategory, getPostsByTitle } from "../../managers/PostManager"
import { PostsTable } from "./PostsTable"


export const PostList = () => {
  const [posts, setPosts] = useState([])
  const [chosenCategory, setChosenCategory] = useState(0)
  const [searchTerms, setSearchTerms] = useState("")
  const [filteredPosts, setFiltered] = useState([])

  const loadPosts = () => getAllPosts().then(data => setPosts(data))

  useEffect(() => {
    loadPosts()
  }, [])

  useEffect(
    () => {
        if(chosenCategory === 0) {
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
        {/* {categoryList.map(category => {
            return <option value={`${category.id}`}>{category.label}</option>
        })} */}
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
        <PostsTable posts={filteredPosts} />
      </div>
    </article>
  </section>
}
