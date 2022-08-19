export const getProfileSubscriptions = (profileId) => {
    return fetch(`http://localhost:8000/subscriptions?author=${profileId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}
export const createSubscription = (subscription) => {
    return fetch("http://localhost:8000/subscriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Token ${localStorage.getItem('auth_token')}`
      },
      body: JSON.stringify(subscription)
    })
      .then(res => res.json())
  }