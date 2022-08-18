import React, { useEffect } from "react"
import { useState } from "react"
import { getProfiles, editUserActive, editUserStatus, checkDemoted, createDemotion, updateDemotion } from "../../managers/ProfileManager"
import { Link } from "react-router-dom"

export const ProfileList = (props) => {
    const [profiles, setProfiles] = useState([])
    const [showInactive, setInactive] = useState(false)
    const [showUserType, setUserType] = useState(0)
    const [status, setStatus] = useState()


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


    const userTypeForm = (evt) => {
        setUserType(parseInt(evt.target.id))
    }

    const userDemoteProcess = (profile, status) => {
        if (profile.user.is_staff === true) {
            checkDemoted(profile).then((data)=> {
            if(data.demoteUser != undefined && data.approveUser != localStorage.getItem('user_id')){
                data.secondApproveUser = localStorage.getItem('user_id')
                updateDemotion(data).then(()=> editUserStatus(profile, status).then(()=>setUserType(0)).then(()=> getProfiles().then(data => setProfiles(data))))
                // DEMOTE
            } else {
                // POST fetch
                const demote = {
                    demoteUser: profile.id,
                    approveUser: localStorage.getItem('user_id')
                }
                createDemotion(demote).then(()=> window.alert(`one more admin needed to confirm demotion`))
            }
        })
        } else {
            editUserStatus(profile, status).then(()=>setUserType(0)).then(()=> getProfiles().then(data => setProfiles(data)))
        }
    }

    //if profile.user.is_staff === true, 
    //pull demote obj related to user
    //if secondapproveuser is NULL, print waiting for second approval
    // if not NULL, change user type
    //if not staff, change user type


    return <>
        <button onClick={() => userInactive()}>View Deactivated</button>
        {showInactive
            ? profiles.map(p => {
                if (p.user.is_active === false) {
                    return <>
                        <p>Full Name: {p.user.first_name} {p.user.last_name}</p>
                        <button onClick={(evt) => {
                            evt.preventDefault()
                            if (window.confirm("Are you sure you want to reactivate this user?")) {
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
                            {showUserType === 0 || showUserType != profile.id
                                ? localStorage.getItem('user_id') != profile.id
                                ?<button id={profile.id} onClick={(evt) => userTypeForm(evt)}>Edit User Type</button>
                                : <></>
                                : <></>
                            }
                            {showUserType === profile.id
                                ? <>
                                    <br />
                                    <input type="radio" id="Author" name="status" value="Author"
                                        onChange={
                                            () => {
                                                setStatus(false)
                                            }
                                        } />
                                    <label for="Author">Author</label>
                                    <input type="radio" id="Admin" name="status" value="Admin"
                                        onChange={
                                            () => {
                                                setStatus(true)
                                            }
                                        } />
                                    <label for="Admin">Admin</label>
                                    <button onClick={() => userDemoteProcess(profile, status)}>Save</button>
                                    <button onClick={() => setUserType(0)}>Cancel</button>
                                    <br />
                                </>
                                : <></>
                            }
                            {localStorage.getItem('user_id') != profile.id
                                ? <button onClick={(evt) => {
                                    evt.preventDefault()
                                    if (window.confirm("Are you sure you want to deactivate this user?")) {
                                        return editUserActive(profile).then(() => setInactive(false)).then(() => getProfiles().then(data => setProfiles(data)))
                                    }
                                }}>{userActive(profile.user)}</button>
                                : <></>
                            }
                            <br /><br />
                        </section>
                    }
                })
            }
        </article>
    </>
}