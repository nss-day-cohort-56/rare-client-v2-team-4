export const getProfiles = () => {
    return fetch("http://localhost:8000/profiles", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}

export const getSingleProfile = (id) => {
    return fetch(`http://localhost:8000/profiles/${id}`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('auth_token')}`
      }
    })
      .then(res => res.json())
  }