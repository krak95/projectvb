import axios from 'axios'

const axiosBase = axios.create({
    baseURL: 'http://localhost:5000/api/My',
    headers: {
        'Content-Type': 'application/json',
    },
})

export const getALLProductionAXIOS = () => {
    return axiosBase.get('/getProduction',)
}
export const getALLUsersAXIOS = () => {
    return axiosBase.get('/getUsers',)
}