export const getProfiles = () => {
    return fetch("http://localhost:8000/profiles", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}

export const editUserActive = (user) => {
    return fetch(`http://localhost:8000/profiles/${user.id}/user_active`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
}

export const getSingleProfile = (id) => {
    return fetch(`http://localhost:8000/profiles/${id}`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        }
    })
        .then(res => res.json())
}

export const editUserStatus = (user, status) => {
    return fetch(`http://localhost:8000/profiles/${user.id}/user_status`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ is_staff: status })
    })
}

export const editUserImage = (user, image) => {
    return fetch(`http://localhost:8000/profiles/${user.id}/user_image`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ profile_image_url: image })
    })
}

export const checkDemoted = (user) => {
    return fetch(`http://localhost:8000/demotes?demotedUser=${user.id}`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        }
    })
        .then(res => res.json())
}

export const createDemotion = (demote) => {
    return fetch('http://localhost:8000/demotes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify(demote)
    }).then(res => res.json())
}

export const updateDemotion = (demote) => {
    return fetch(`http://localhost:8000/demotes/${demote.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify(demote)
    })
}