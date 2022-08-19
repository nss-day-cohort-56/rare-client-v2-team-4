import React, { useEffect } from "react"
import { useState } from "react"

import { getSingleProfile } from "../../managers/ProfileManager"
import { useParams, Link } from "react-router-dom"

import { editUserImage, getSingleProfile } from "../../managers/ProfileManager"
import { useParams } from "react-router-dom"

import { FaUserCircle } from 'react-icons/fa';
import { getPostsByUser } from "../../managers/PostManager";
import { getPostById } from "../../managers/PostManager"

export const ProfileDetails = (userId) => {
    const [profile, setProfile] = useState([])
    const [posts, setPosts] = useState([])
    const { profileId } = useParams()
    const { postId } = useParams()

    useEffect(() => {
        getSingleProfile(profileId).then(data => setProfile(data))
        getPostsByUser(profileId).then(data => setPosts(data))
    }, [profileId])



    const [newImg, setImg] = useState("")

    const createImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            setImg(base64ImageString)
        });
    }

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }


    return (
        <article className="profiles">


            <section key={`profile--${profile.id}`} className="profile">
                <header>
                    {
                        profile.profile_image_url === ""
                            ? <figure className="media-left">
                                <span className="icon is-large">
                                    <FaUserCircle size={'3rem'} />
                                </span></figure>

                            : <div className="profile__image">{profile.profile_image_url}</div>

                            : <img className="image" src={`http://localhost:8000${profile.profile_image_url}`} />

                    }

                </header>
                <div className="profile__fullName">{profile.user?.first_name} {profile.user?.last_name}</div>
                <div className="profile__username">{profile.user?.username}</div>
                <div className="profile__email">{profile.user?.email}</div>
                <div className="profile__creationDate">{profile.user?.date_joined}</div>
                <h3>Choose Profile Image:</h3>
                <input type="file" id="game_image" name="action_pic" onChange={createImageString} />
                <input type="hidden" name="game_id" value={profile.id} /> 
                <button onClick={() => {
                    editUserImage(profile, newImg)
                        .then(() => getSingleProfile(profileId).then(data => setProfile(data)))
                }}>Upload</button><br />
                <footer>
                    {
                        profile.user?.is_staff === true
                            ? <div className="profile__usertype">Staff</div>
                            : <div className="profile__usertype">User</div>
                    }
                </footer>

            </section>

            <section className="section">
                <article className="posts">
                    {
                        posts.map(post => {
                            return <section key={`post--${post.id}`} classname="post">
                                <div className="card">
                                    <header className="card-header is-justify-content-center">
                                        <h2 className="title is-size-3 p-3 ">
                                            {post.title}
                                        </h2>
                                    </header>
                                    <div className="card-image">
                                        <figure className="image">
                                            <img src={post?.image_url} alt={post.title} />
                                        </figure>
                                    </div>
                                    <div className="card-content">
                                        <div className="media">
                                            <div className="media-left">
                                                <span className="icon is-large">
                                                    <FaUserCircle size={'3rem'} />
                                                </span>
                                            </div>
                                            <div className="media-content">
                                                <p className="title is-4">{post.user?.user.first_name} {post.user?.user.last_name}</p>
                                                <p className="subtitle is-6">@{post.user?.user.username}</p>
                                            </div>
                                        </div>

                                        <div className="content">
                                            {post.content}
                                            <hr />
                                            <time >{post.publication_date}</time>
                                        </div>
                                    </div>
                                    <footer className="card-footer">
                                        <Link to={`/posts/${postId}/comments`} className="card-footer-item">View Comments</Link>
                                        <Link to={`/posts/${postId}/add-comment`} className="card-footer-item">Add Comments</Link>
                                        {
                                            parseInt(userId) === post.user?.id ? <Link to={`/posts/${postId}/edit`} className="card-footer-item">Edit</Link> : <></>
                                        }
                                    </footer>
                                </div>
                            </section>
                        })
                    }
                </article>
            </section>
        </article>
    )
}