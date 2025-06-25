export const getData = () => {
    const user = JSON.parse(localStorage.getItem('User'))
    console.log(user)
    if (user === null) {
        return false
    } else {
        return { username: user.username, token: user.token }
    }
}