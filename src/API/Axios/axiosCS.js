import axios from 'axios'

const axiosBase = axios.create({
    // baseURL: 'http://10.76.76.44:5000/api/My',
    baseURL: 'http://localhost:5000/api/My',
    headers: {
        'Content-Type': 'application/json',
    },
})

export const logoutAXIOS = ({ username }) => {
    console.log(username)
    return axiosBase.post('/logout', { username })
}

export const fetchUsersAXIOS = ({ fullname }) => {
    console.log(fullname)
    return axiosBase.post('/fetchUsers', { fullname })
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
export const newLoginAXIOS = ({ username, fullname, logDate, role, admin }) => {
    console.log(role)
    return axiosBase.post('/newLogin', { username, fullname, logDate, role, admin })
}

export const getCheckLoginAXIOS = ({ username, token }) => {
    console.log(username, token)
    return axiosBase.post('/checkLogin', { username, token })
}

export const refreshLogAXIOS = ({ username, logDate, role, admin }) => {
    console.log(username, logDate, role)
    return axiosBase.post('/refreshLog', { username, logDate, role, admin })
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
    Tester,
    ww_number
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
            Tester,
            ww_number
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

export const updateStatusAXIOS = ({ id_prod, status, endDate }) => {
    console.log({ id_prod, status, endDate })
    return axiosBase.post('/updateStatus', { id_prod, status, endDate })
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
    Tester,
    ww_number
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
            Tester,
            ww_number
        }
    )
}
export const assignRolesAXIOS = ({ fullname, role }) => {
    console.log(fullname, role)
    return axiosBase.post('/assignRoles', { fullname, role })

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
    EndDate: endDate,
    hipotValue: hipotValue,
    hipotModel: hipotModel,
    hipotMultimeterModel: hipotMultimeterModel
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
        EndDate: endDate,
        hipotValue: hipotValue,
        hipotModel: hipotModel,
        hipotMultimeterModel: hipotMultimeterModel
    })
}


export const getALLUsersAXIOS = () => {
    return axiosBase.get('/getUsers',)
}
export const fetchRolesAXIOS = ({ rolename }) => {
    return axiosBase.post('/fetchRoles', { rolename })
}
export const delProdAXIOS = ({ id_prod, tester }) => {
    console.log({ id_prod, tester })
    return axiosBase.post('/delProd', { id_prod, tester })
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

export const updateItemIssueStatusAXIOS = ({ iditem_issues, issue_status, action }) => {
    console.log({ iditem_issues, issue_status, action })
    return axiosBase.post('/updateItemIssues', { iditem_issues, issue_status, action })
}

export const deleteItemIssueAXIOS = ({ e }) => {
    console.log(e)
    return axiosBase.post('/deleteItemIssues', { iditem_issues: e })
}

export const deleteProjectAXIOS = ({ id_proj }) => {
    console.log({ id_proj })
    return axiosBase.post('/deleteProject', { id_proj })
}
export const deleteSOAXIOS = ({ idSO }) => {
    console.log({ idSO })
    return axiosBase.post('/deleteSO', { idSO })
}

export const deleteEquipAXIOS = ({ idequipments }) => {
    console.log({ idequipments })
    return axiosBase.post('/delEquip', { idequipments })
}


export const deleteIssuesAXIOS = ({ id_issues }) => {
    console.log({ id_issues })
    return axiosBase.post('/delIssues', { id_issues })
}

//JOB//
export const addJobAXIOS = ({ equipment, model, quantityNeed, jobNumber, jobProject }) => {
    console.log({ equipment, model, quantityNeed, jobNumber, jobProject })
    return axiosBase.post('/addJob', { equipment, model, quantityNeed, jobNumber, jobProject })
}
export const fetchJobAXIOS = ({ equipment, model, jobNumber, jobProject, jobDone }) => {
    console.log({ equipment, model, jobNumber, jobProject, jobDone })
    return axiosBase.post('/fetchJobs', { equipment, model, jobNumber, jobProject, jobDone })
}


//WORKWEEKS

export const fetchWorkWeeksAXIOS = ({ ww_number }) => {
    console.log({ ww_number })
    return axiosBase.post('/fetchWorkWeeks', { ww_number })
}
export const fetchWorkWeeksNRAXIOS = () => {
    return axiosBase.post('/fetchWorkWeeksNR')
}