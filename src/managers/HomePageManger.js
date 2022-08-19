export const getSubscriptionsByUser = (subscriberId) => {
    return fetch(`http://localhost:8000/subscriptions?subscriber_id=${subscriberId}`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        }
    })
        .then(res => res.json())
}