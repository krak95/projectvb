import axios from 'axios'

const axiosBase = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
    },
})


export const fileuploadAXIOS = (files) => {
    console.log(files)
    return axiosBase.post('/fileupload', files)
}

export const newItemAXIOS = (newItem) => {
    console.log(newItem)
    return axiosBase.post('/newItem', { newItem })
}

export const fetchProjectsAXIOS = ({projectSearch}) => {
    return axiosBase.post('/fetchProjects', {projectSearch})
}

export const fetchSOAXIOS = ({projectSearch, soSearch}) => {
    return axiosBase.post('/fetchSO', {projectSearch, soSearch})
}

export const fetchEquipmentsAXIOS = ({equipSearch}) => {
    return axiosBase.post('/fetchEquipments', {equipSearch})
}

export const fetchProductionAXIOS = ({
    projectSearch,
    soSearch,
    equipSearch,
    codeaSearch,
    codebSearch,
    codeprSearch,
    codepsSearch,
    codedrSearch,
    type0Search,
    type1Search,
    type2Search,
    type3Search,
    type4Search,
}) => {
    return axiosBase.post('/fetchProduction', {
        projectSearch,
        soSearch,
        equipSearch,
        codeaSearch,
        codebSearch,
        codeprSearch,
        codepsSearch,
        codedrSearch,
        type0Search,
        type1Search,
        type2Search,
        type3Search,
        type4Search,
    })
}

export const fetchItemsAXIOS = ({ project, equipment }) => {
    console.log({ project, equipment })
    return axiosBase.post('/fetchItems', { project, equipment })
}
