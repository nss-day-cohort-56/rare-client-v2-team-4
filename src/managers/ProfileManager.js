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
