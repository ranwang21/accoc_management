'use-strict'

function authLogin (email, password, callBack) {
    const userToSend = {
        email: email,
        password: password
    }
    fetch('http://localhost:8080/auth/login', {
        method: 'post',
        credentials: 'include',
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
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => {
            fetch('http://localhost:8080/roles/' + data.data.id_role, {
                credentials: 'include'
            })
                .then(response => response.json())
                .then(data2 => {
                    callBack(data.data, data2.data.title)
                })
        })
}

export default {
    authLogin,
    getCurrentUser
}
