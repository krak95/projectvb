export const getData = () => {
    var user = localStorage.getItem('User')
    console.log(user)
    if (user === null || user === '') {
        return false
    } else {
        return { username: JSON.parse(localStorage.getItem('User')).username, token: JSON.parse(localStorage.getItem('User')).token }
    }
}