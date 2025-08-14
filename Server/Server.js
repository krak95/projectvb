const express = require("express");
const cors = require("cors");
const mysql2 = require('mysql2')
const app = express();
// const path = require('path');
// var bcrypt = require('bcryptjs')
// var crypto = require('crypto')
// var salt = bcrypt.genSaltSync(10);

const corsOption = {
    origin: ['http://localhost:3000', 'http://10.76.76.44:3000'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}

app.use(cors(corsOption));
app.use(express.json())
// app.use(express.static(path.join(__dirname, '/static')))

const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "visionbox1"
})

app.post('/newItem', (req, res) => {
    let newItem = req.body.newItem
    let device = req.body.newItem.device
    let codeA = req.body.newItem.codeA
    let codeB = req.body.newItem.codeB
    let codePR = req.body.newItem.codePR
    let codePS = req.body.newItem.codePS
    let codeDR = req.body.newItem.codeDR
    let datet = req.body.newItem.datet
    let project = req.body.newItem.project
    let batch = req.body.newItem.batch
    let fw_version = req.body.newItem.fw_version
    let type0 = req.body.newItem.type0
    let type1 = req.body.newItem.type1
    let type2 = req.body.newItem.type2
    let type3 = req.body.newItem.type3
    let type4 = req.body.newItem.type4
    let issues = req.body.newItem.issues
    console.log(codeA)
    const q = db.query("call newItem (?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
            project,
            batch,
            device,
            codeA,
            codeB,
            codePR,
            codePS,
            codeDR,
            type0,
            type1,
            type2,
            type3,
            type4
        ],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
                console.log(result)
            }
        })
})

app.post('/fetchProjects', (req, res) => {
    const projectSearch = req.body.projectSearch
    const q = db.query('call fetchProjects (?)', [projectSearch],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

app.post('/fetchSO', (req, res) => {
    const projectSearch = req.body.projectSearch
    const soSearch = req.body.soSearch

    const q = db.query('call fetchSO (?,?)', [projectSearch, soSearch],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

app.post('/fetchEquipments', (req, res) => {
    const equipSearch = req.body.equipSearch
    const q = db.query('call fetchEquipments (?)', [equipSearch],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

app.post('/fetchItems', (req, res) => {
    let project = req.body.project
    let equipment = req.body.equipment
    console.log(project, equipment)
    const q = db.query('call fetchItems (?,?)',
        [project, equipment], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})

app.post('/fetchProduction', (req, res) => {
    const projectSearch = req.body.projectSearch
    const soSearch = req.body.soSearch
    const equipSearch = req.body.equipSearch
    const codeaSearch = req.body.codeaSearch
    const codebSearch = req.body.codebSearch
    const codeprSearch = req.body.codeprSearch
    const codepsSearch = req.body.codepsSearch
    const codedrSearch = req.body.codedrSearch
    const type0Search = req.body.type0Search
    const type1Search = req.body.type1Search
    const type2Search = req.body.type2Search
    const type3Search = req.body.type3Search
    const type4Search = req.body.type4Search
    console.log(projectSearch)
    const q = db.query("call fetchProduction (?,?,?,?,?,?,?,?,?,?,?,?,?)", [
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
    ], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
            // console.log(result)
        }

    })
})

const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app)
const io = new Server(server, {
    cors:
    {
        origin: ["http://localhost:3000", "http://10.76.76.44:3000"],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowEIO3: true,
    }
});

io.on("connection", (socket) => {
    socket.on("newUserSocket", (data) => {
        console.log(socket.id, data)
    })
    socket.on("socketNewItem", (data) => {
        io.emit("fetchProduction", data);
        console.log('fetchProduction', data)
    });
    socket.on("issuesFetch", (data) => {
        console.log('issuesFetch')
        socket.broadcast.emit("issuesFetch", data);
    });
    socket.on("socketCheckLogin", (data) => {
        console.log('socketCheckLogin', data)
        socket.broadcast.emit("socketCheckLogin", data);
    });
    socket.on("socketAddItemIssue", (data) => {
        console.log('socketCheckLogin', data)
        io.emit("socketFetchItemIssue", data);
    });
    socket.on("newProject", () => {
        console.log('newProject')
        io.emit("fetchProject")
    })
    socket.on("newSO", () => {
        console.log('newSO')
        io.emit("fetchSO")
    })
    socket.on("newEquip", () => {
        console.log('newequip')
        io.emit("fetchEquips")
    })
    socket.on("newIssue", () => {
        io.emit("fetchIssues")
    })

    socket.on("newWW", () => {
        io.emit("fetchWW")
    })

    socket.on("createChecklistsTemplate", () => {
        io.emit("fetchChecklistsTemplate")
    })

});

server.listen(8000);




