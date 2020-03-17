'use-strict'

function authLogin (email, password, callBack) {
    const userToSend = {
        email: email,
        password: password
    }
    fetch('http://localhost:8080/auth/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userToSend)
    })
        .then(response => response.json())
        .then(data => {
            callBack(data)
        })
}

function getUser (idUser, callBack) {
    fetch('http://localhost:8080/users/' + idUser)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                fetch('http://localhost:8080/roles/' + data.data.id_role)
                    .then(response => response.json())
                    .then(data2 => {
                        if (data2.success) {
                            callBack(data.data, data2.data.title)
                        }
                    })
            }
        })
}

function currentUser () {
    fetch('http://localhost:8080/auth/user')
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
}

function createRole (label) {
    const newRole = { title: label }
    fetch('http://localhost:8080/roles', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRole)
    })
}

function updateRole (idRole, labelRole) {
    const newRole = { title: labelRole }
    fetch('http://localhost:8080/roles/' + idRole, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRole)
    })
}

function updateUser (idUser, idRole) {
    const newRole = { id_role: idRole }
    fetch('http://localhost:8080/users/' + idUser, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRole)
    })
}

function deleteRole (idRole) {
    fetch('http://localhost:8080/roles/' + idRole, {
        method: 'delete'
    })
}

export default {
    authLogin,
    createRole,
    updateRole,
    deleteRole,
    currentUser,
    getUser,
    updateUser
}
