import { useState, useEffect } from "react"
import { getAllCategories, deleteCategory } from "../../managers/CategoryManager"
import { CategoryForm } from "./CategoryForm"

export const CategoriesList = () => {
  const [categories, setCategories] = useState([])
  const [editCategory, setEditCategory] = useState({ label: '' })
  const [deleteActive, setDeleteActive] = useState(false);
  const [categoryId, setCategoryId] = useState(0)


  const loadCategories = () => {
    getAllCategories().then(categoriesData => setCategories(categoriesData))
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const handleDelete = (categoryId) => {
    setDeleteActive(true)
    setCategoryId(categoryId)
  }

  return (<>
  <section className="section">
    <div className="columns">
      <div className="column">
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>Categories</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              categories.map(category => (
                <tr key={category.id}>
                  <td>{category.label}</td>
                  <td>
                    <div className="buttons">
                      <button className="button is-warning" onClick={() => { setEditCategory(category) }}>edit</button>
                      <button className="button is-danger" onClick={() => { handleDelete(category.id) }}>delete</button>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div className="column">
        <CategoryForm loadCategories={loadCategories} category={editCategory} setCategory={setEditCategory} />
      </div>
    </div>
  </section>

<div className={deleteActive ? "modal is-active" : "modal"}>
<div className="modal-background"></div>
<div className="modal-card">
    <header className="modal-card-head">
        <p className="modal-card-title">Delete Category?</p>
    </header>
    <section className="modal-card-body">
        Are you sure you want to delete this category?
    </section>
    <footer className="modal-card-foot">
        <button className="button is-success" onClick={() => {
            deleteCategory(categoryId)
            .then(loadCategories).then(() => {
                setDeleteActive(false)
                setCategoryId(0)
            })
        }}>Delete</button>
        <button className="button" onClick={() => { setDeleteActive(false) }}>Cancel</button>
    </footer>
</div>
</div>
  </>)
}
