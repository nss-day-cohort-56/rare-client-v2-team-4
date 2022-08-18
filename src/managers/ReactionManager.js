export const getAllReactions = () => {
    return fetch('http://localhost:8000/reactions', {
        headers: {
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        }
    }).then(res => res.json())
}

export const getReactionsByPost = (postId) => {
    return fetch(`http://localhost:8000/reactions/posts?post_id=${postId}`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        }
    }).then(res => res.json())
}

export const createReaction = (reaction) => {
    return fetch('http://localhost:8000/reactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify(reaction)
    }).then(res => res.json())
}

export const updateReaction = (reaction) => {
    return fetch(`http://localhost:8000/reactions/${reaction.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify(reaction)
    })
}

export const deleteReaction = (reactionId) => {
    return fetch(`http://localhost:8000/reactions/${reactionId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Token ${localStorage.getItem('auth_token')}`
        }
    })
}