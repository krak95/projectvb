export const setData = ({ username, token, fullname }) => {
    localStorage.setItem('User', JSON.stringify({
        username: username,
        token: token,
        fullname: fullname
    }))
}