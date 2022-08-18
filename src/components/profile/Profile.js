import React, { useEffect } from "react"
import { useState } from "react"
import { getSingleProfile } from "../../managers/ProfileManager"
import { useParams } from "react-router-dom"
import { FaUserCircle } from 'react-icons/fa';

export const ProfileDetails = (userId) => {
    const [profile, setProfile] = useState([])
    const { profileId } = useParams()

    useEffect(() => {
        getSingleProfile(profileId).then(data => setProfile(data))
    }, [profileId])

    // const [newImg, setImg] = useState({
    //     game: Id,
    //     profile_image_url: ''
    // })

    // const createImageString = (event) => {
    //     getBase64(event.target.files[0], (base64ImageString) => {
    //         const copy = { ...newImg }
    //         copy[event.target.name] = base64ImageString
    //         setImg(copy)
    //     });
    // }

    // const getBase64 = (file, callback) => {
    //     const reader = new FileReader();
    //     reader.addEventListener('load', () => callback(reader.result));
    //     reader.readAsDataURL(file);
    // }

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
                    }

                </header>
                <div className="profile__fullName">{profile.user?.first_name} {profile.user?.last_name}</div>
                <div className="profile__username">{profile.user?.username}</div>
                <div className="profile__email">{profile.user?.email}</div>
                <div className="profile__creationDate">{profile.user?.date_joined}</div>
                {/* <input type="file" id="game_image" name="action_pic" onChange={createImageString} />
                <input type="hidden" name="game_id" value={game.id} /> */}
                {/* <button onClick={() => {
                    createImg(newImg)
                        .then(() => getSingleProfile(profileId).then(data => setProfile(data)))
                }}>Upload</button><br /> */}
                <footer>
                    {
                        profile.user?.is_staff === true
                            ? <div className="profile__usertype">Staff</div>
                            : <div className="profile__usertype">User</div>
                    }
                </footer>

            </section>


        </article>
    )
}