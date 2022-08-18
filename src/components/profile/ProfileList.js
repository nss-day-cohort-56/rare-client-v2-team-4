import React, { useEffect } from "react"
import { useState } from "react"
import { getProfiles, editUserActive } from "../../managers/ProfileManager"
import { Link } from "react-router-dom"

export const ProfileList = (props) => {
    const [profiles, setProfiles] = useState([])
    const [showInactive, setInactive] = useState(false)

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

    const userActive = (user) => {
        if (user.is_active === true) {
            return <>Deactivate</>
        } else {
            return <>Activate</>
        }
    }

    const userInactive = () => {
        setInactive(!showInactive)
    }


    return <>
        <button onClick={() => userInactive()}>View Deactivated</button>
        {showInactive
            ? profiles.map(p => {
                if (p.user.is_active === false) {
                    return <>
                        <p>Full Name: {p.user.first_name} {p.user.last_name}</p>
                        <button onClick={(evt) => {
                            evt.preventDefault()
                            if (window.confirm("Are you sure?")) {
                                return editUserActive(p).then(() => getProfiles().then(data => setProfiles(data)))
                            }
                        }}>Reactivate</button>
                    </>
                }
            })

            : <></>
        }
        <article className="profiles">
            <br />
            <h2><b>Active Users</b></h2>
            {
                profiles.sort(((a, b) => { return a.user.username.localeCompare(b.user.username) })).map(profile => {
                    if (profile.user?.is_active) {
                        return <section key={`profile--${profile.id}`} className="profile">
                            <div className="profile__fullName">Full Name: {profile.user.first_name} {profile.user.last_name}</div>
                            <Link to={`/profiles/${profile.id}`} className="button is-Link is-light">Username: {profile.user.username}</Link>
                            <div className="profile__userType">User Type: {userType(profile.user)}</div>
                            <button onClick={(evt) => {
                                evt.preventDefault()
                                if (window.confirm("Are you sure?")) {
                                    return editUserActive(profile).then(()=>setInactive(false)).then(() => getProfiles().then(data => setProfiles(data)))
                                }
                            }}>{userActive(profile.user)}</button>
                            <br /><br />
                        </section>
                    }
                })
            }
        </article>
    </>
}