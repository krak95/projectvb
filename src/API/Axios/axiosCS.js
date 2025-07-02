import axios from 'axios'

const axiosBase = axios.create({
    baseURL: 'http://10.76.76.44:5000/api/My',
    headers: {
        'Content-Type': 'application/json',
    },
})

export const logoutAXIOS = ({ username }) => {
    console.log(username)
    return axiosBase.post('/logout', { username })
}

export const registerAXIOS = ({
    fullname,
    admin,
    role,
    username,
    password
}) => {
    console.log({
        fullname,
        admin,
        role,
        username,
        password
    })
    return axiosBase.post('/register', {
        fullname,
        admin,
        role,
        username,
        password
    })
}
export const checkCredsAXIOS = ({ username, password }) => {
    console.log(username, password)
    return axiosBase.post('/checkCreds', { username, password })

}
export const newLoginAXIOS = ({ username, fullname, logDate }) => {
    console.log(username)
    return axiosBase.post('/newLogin', { username, fullname, logDate })
}

export const getCheckLoginAXIOS = ({ username, token }) => {
    console.log(username, token)
    return axiosBase.post('/checkLogin', { username, token })
}

export const refreshLogAXIOS = ({ username, logDate }) => {
    console.log(username, logDate)
    return axiosBase.post('/refreshLog', { username, logDate })
}

export const getALLProductionAXIOS = () => {
    return axiosBase.get('/getProduction',)
}
export const fetchProjectsAXIOS = ({
    project,
    country,
    proj_manager,
    client_name
}) => {
    console.log(project)
    return axiosBase.post('/fetchProjects', {
        project,
        country,
        proj_manager,
        client_name
    })
}

export const fetchSOAXIOS = ({ project, SOref }) => {
    console.log(project, SOref)
    return axiosBase.post('/fetchSO', { project, SOref })
}

export const fetchEquipmentsAXIOS = ({ EquipName: equipment }) => {
    console.log(equipment)
    return axiosBase.post('/fetchEquipments', { EquipName: equipment })
}
export const fetchProductionAXIOS = ({
    Project: projectSearch,
    So: soSearch,
    Equipment: equipSearch,
    CodeA: codeaSearch,
    CodeB: codebSearch,
    CodePR: codeprSearch,
    CodePS: codepsSearch,
    CodeDR: codedrSearch,
    Type0: type0Search,
    Type1: type1Search,
    Type2: type2Search,
    Type3: type3Search,
    Type4: type4Search,
    Tester
}) => {
    console.log(projectSearch, codeaSearch, Tester)
    return axiosBase.post('/fetchProduction',
        {
            Project: projectSearch,
            So: soSearch,
            Equipment: equipSearch,
            CodeA: codeaSearch,
            CodeB: codebSearch,
            CodePR: codeprSearch,
            CodePS: codepsSearch,
            CodeDR: codedrSearch,
            Type0: type0Search,
            Type1: type1Search,
            Type2: type2Search,
            Type3: type3Search,
            Type4: type4Search,
            Tester
        }
    )
}
export const checkProductionAXIOS = ({
    id_prod: id_prod
}) => {
    console.log(
        {
            id_prod: id_prod
        }
    )
    return axiosBase.post('/checkProduction',
        {
            id_prod: id_prod
        }
    )
}

export const updateStatusAXIOS = ({ id_prod, status }) => {
    console.log({ id_prod, status })
    return axiosBase.post('/updateStatus', { id_prod, status })
}
export const fetchCountProductionAXIOS = ({
    Project: projectSearch,
    So: soSearch,
    Equipment: equipSearch,
    CodeA: codeaSearch,
    CodeB: codebSearch,
    CodePR: codeprSearch,
    CodePS: codepsSearch,
    CodeDR: codedrSearch,
    Type0: type0Search,
    Type1: type1Search,
    Type2: type2Search,
    Type3: type3Search,
    Type4: type4Search,
    Tester
}) => {
    console.log(projectSearch, codeaSearch, Tester)
    return axiosBase.post('/fetchCountProduction',
        {
            Project: projectSearch,
            So: soSearch,
            Equipment: equipSearch,
            CodeA: codeaSearch,
            CodeB: codebSearch,
            CodePR: codeprSearch,
            CodePS: codepsSearch,
            CodeDR: codedrSearch,
            Type0: type0Search,
            Type1: type1Search,
            Type2: type2Search,
            Type3: type3Search,
            Type4: type4Search,
            Tester
        }
    )
}

export const newProductionAXIOS = ({
    Project: project,
    So: so,
    Equipment: equipment,
    CodeA: codeA,
    CodeB: codeB,
    CodePR: codePR,
    CodePS: codePS,
    CodeDR: codeDR,
    Type0: type0,
    Type1: type1,
    Type2: type2,
    Type3: type3,
    Type4: type4,
    Tester: tester,
    StartDate: startDate,
    EndDate: endDate
}) => {
    return axiosBase.post('/newProduction', {
        Project: project,
        So: so,
        Equipment: equipment,
        CodeA: codeA,
        CodeB: codeB,
        CodePR: codePR,
        CodePS: codePS,
        CodeDR: codeDR,
        Type0: type0,
        Type1: type1,
        Type2: type2,
        Type3: type3,
        Type4: type4,
        Tester: tester,
        StartDate: startDate,
        EndDate: endDate
    })
}


export const getALLUsersAXIOS = () => {
    return axiosBase.get('/getUsers',)
}

export const delProdAXIOS = (id_prod) => {
    console.log(id_prod)
    return axiosBase.post('/delProd', id_prod)
}

export const newProjectAXIOS = ({
    Project: Project,
    Country: Country,
    Proj_manager: Proj_manager,
    Client_name: Client_name
}) => {
    console.log(
        {
            Project: Project,
            Country: Country,
            Proj_manager: Proj_manager,
            Client_name: Client_name
        }
    )
    return axiosBase.post('/newProjects1', {
        Project: Project,
        Country: Country,
        Proj_manager: Proj_manager,
        Client_name: Client_name
    })
}
export const newSOAXIOS = ({
    'SOref': SOref,
    'project': project
}) => {
    console.log(
        {
            'SOref': SOref,
            'project': project
        }
    )
    return axiosBase.post('/newSO', {
        'SOref': SOref,
        'project': project
    })
}

export const newEquipAXIOS = ({ EquipName }) => {
    return axiosBase.post('/newEquipments', { EquipName })
}


//ISSUES//
export const newIssueAXIOS = ({ ref_issue, description_issue, level_issue }) => {
    console.log({
        ref_issue, description_issue, level_issue
    })
    return axiosBase.post('/newIssue', { ref_issue, description_issue, level_issue })
}

export const fetchIssuesAXIOS = ({ ref_issue, description_issue, level_issue }) => {
    console.log({ ref_issue, description_issue, level_issue })
    return axiosBase.post('/fetchIssues', { ref_issue, description_issue, level_issue })
}

export const addItemIssueAXIOS = ({ id_issue, id_item, comment }) => {
    console.log(id_issue, id_item, comment)
    return axiosBase.post('/addItemIssue', { id_issue, id_item, comment })
}

export const fetchItemIssuesAXIOS = ({ id_item: id_prod }) => {
    console.log({ id_item: id_prod })
    return axiosBase.post('/fetchItemIssues', { id_item: id_prod })
}

export const updateItemIssueStatusAXIOS = ({ iditem_issues, issue_status }) => {
    console.log({ iditem_issues, issue_status })
    return axiosBase.post('/updateItemIssues', { iditem_issues, issue_status })
}

export const deleteItemIssueAXIOS = ({ e }) => {
    console.log(e)
    return axiosBase.post('/deleteItemIssues', { iditem_issues: e })
}