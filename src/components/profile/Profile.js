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