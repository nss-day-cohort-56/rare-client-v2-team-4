import React, { useEffect } from "react"
import { useState } from "react"
import { getProfiles } from "../../managers/ProfileManager"

export const ProfileList = (props) => {
    const [ profiles, setProfiles ] = useState([])

    useEffect(() => {
        getProfiles().then(data => setProfiles(data))
    }, [])

    const userType = (user) => {
        if (user.is_staff === true) {
            return <>Admin</>
        } else {
            return <>Author</>
        }
    }

    return (
        <article className="profiles">
            {
                profiles.sort(((a, b) => { return a.user.username.localeCompare(b.user.username) })).map(profile => {
                    return <section key={`profile--${profile.id}`} className="profile">
                        <div className="profile__fullName">Full Name: {profile.user.first_name} {profile.user.last_name}</div>
                        <div className="profile__userName">Username: {profile.user.username}</div>
                        <div className="profile__userType">User Type: {userType(profile.user)}</div>
                        <br/>
                    </section>
                })
            }
        </article>
    )
}