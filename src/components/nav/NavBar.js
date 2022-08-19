import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Logo from "./rare.jpeg"

export const NavBar = ({ token, setToken, setStaff }) => {
  const navigate = useNavigate()
  const navbar = useRef()
  const hamburger = useRef()
  // const [staff, setStaff] = useState(JSON.parse(localStorage.getItem("is_staff")))
  const [staff, setStaffState] = useState()

  useEffect(() => {
    setStaffState(localStorage.getItem("is_staff"))
  }, [setStaff])

  const showMobileNavbar = () => {
    hamburger.current.classList.toggle('is-active')
    navbar.current.classList.toggle('is-active')
  }

  return (
    <nav className="navbar is-success mb-3" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src={Logo} height="3rem" alt="Rare Logo" /> <h1 className="title is-4">Rare Publishing</h1>
        </a>

        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={showMobileNavbar} ref={hamburger}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className="navbar-menu" ref={navbar}>
        <div className="navbar-start">
          {
            token
              ? <>  
                  <Link to="/home" className="navbar-item">Home</Link> 
                  <Link to="/posts" className="navbar-item">Posts</Link>
                  <Link to="/my-posts" className="navbar-item">My Posts</Link>
                  <Link to="/posts/create" className="navbar-item">New Post</Link>    
                  { staff === "true"
                  ?<><Link to="/profiles" className="navbar-item">User Profiles</Link>
                  <Link to="/categories" className="navbar-item">Category Management</Link>
                  <Link to="/reactions" className="navbar-item">Reaction Management</Link>
                  <Link to="/tags" className="navbar-item">Tag Management</Link></>
                  :<></>
                  }
              </>
              :
              ""
          }
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {
                token
                  ? <>
                  <button className="button is-outlined" onClick={() => {
                    setToken('')
                    setStaff('')
                    navigate('/login')
                  }}>Logout</button>
                  </>
                  :
                  <>
                    <Link to="/register" className="button is-link">Register</Link>
                    <Link to="/login" className="button is-outlined">Login</Link>
                  </>
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
