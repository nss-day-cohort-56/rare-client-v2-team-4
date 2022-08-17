import React, { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { getProfiles } from "../../managers/ProfileManager"

export const ProfileList = (props) => {
    const [profiles, setProfiles] = useState([])

    useEffect(() => {
        getProfiles().then(data => setProfiles(data))
    }, [])

    return (
        <article className="profiles">

            {
                profiles.map(profile => {
                    return <section key={`profile--${profile.id}`} className="profile">
                        <div className="profile__fullName">{profile.user.first_name} {profile.user.last_name}</div>
                        <Link to={`/profiles/${profile.id}`} className="button is-Link is-light">{profile.user.username}</Link>
                    </section>
                    })
            }
        </article>
    )
}