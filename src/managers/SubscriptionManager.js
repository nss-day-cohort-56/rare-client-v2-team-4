export const getProfileSubscriptions = (profileId) => {
    return fetch(`http://localhost:8000/subscriptions?author=${profileId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}