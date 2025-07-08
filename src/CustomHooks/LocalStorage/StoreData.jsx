export const setData = ({ username, token, fullname, role, admin }) => {
    console.log(role)
    localStorage.setItem('User', JSON.stringify({
        username: username,
        token: token,
        fullname: fullname,
        role: role,
        admin: admin
    }))
}