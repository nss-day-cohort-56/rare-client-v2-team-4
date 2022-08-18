import React, { useEffect } from "react"
import { useState } from "react"
import { getSingleProfile } from "../../managers/ProfileManager"
import { useParams } from "react-router-dom"
import { FaUserCircle } from 'react-icons/fa';
import { createSubscription, getProfileSubscriptions } from "../../managers/SubscriptionManager";

export const ProfileDetails = (userId) => {
    const [subscriptions, setSubscriptions] = useState([]) // saves all subscriptions where current profile is the author
    const [profile, setProfile] = useState([])
    const { profileId } = useParams()

    //get current user from local storage
    const currentUserId = parseInt(localStorage.getItem('user_id'))
    
    // check if current user is already subscribed to author
    const alreadySubscribed = subscriptions.find(sub => sub.subscriber.id === currentUserId)

    // fetch single profile and subscriptions for profile, save to state variables
    const getProfileAndSubscriptions = () => {
        getSingleProfile(profileId).then(data => setProfile(data))
        getProfileSubscriptions(profileId).then(setSubscriptions)
    }

    // on profileId change, call function above
    useEffect(() => {
        getProfileAndSubscriptions()
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
                {/* if user is not subscribed and user is not profile author, user will see 'subscribe' button
                if user is subscribed, user will see 'subscribed!' text
                if user is the profile author, user will see nothing */}
                {!alreadySubscribed && currentUserId !== profile.user?.id ? <button className="button" onClick={()=> {
                    const newSubscription = {
                        author: profile.user?.id
                    }
                    createSubscription(newSubscription).then(()=>getProfileAndSubscriptions())
                }}>Subscribe</button> : alreadySubscribed ? <p>subscribed!</p> : <></>}
                

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