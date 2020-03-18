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

function getCurrentUser (callBack) {
    fetch('http://localhost:8080/auth/user', {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => {
            callBack(data)
        })
}

function getUser (idUser, callBack) {
    fetch('http://localhost:8080/users/' + idUser, {
        method: 'GET',
        credentials: 'include'
    })
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

export default {
    authLogin,
    currentUser,
    getUser,
    getCurrentUser
}
