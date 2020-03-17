'use-strict'
function authLogin (email, password) {
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
            getUserValidity(data)
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

function deleteRole (idRole) {
    fetch('http://localhost:8080/roles/' + idRole, {
        method: 'delete'
    })
}

function getUserValidity (datas) {
    console.log('In getUserValidity() ==> ', datas)
    return datas
}

module.exports = {
    authLogin,
    createRole,
    updateRole,
    deleteRole,
    currentUser
}
