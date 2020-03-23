'use-strict'
var jwt = require('jwt-simple')
var secret = 'xxx'
// TOKEN Encoder and decoder
const decodeData = (token) => {
    return jwt.decode(token, secret)
}

const encodeData = (value) => {
    return jwt.encode(value, secret)
}

const validateEmail = (email) => {
    const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    return !!mailformat.test(email)
}

const authLogin = (email, password, callBack) => {
    const userToSend = {
        email: email,
        password: password
    }
    fetch('http://localhost:8080/auth/login', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userToSend)
    })
        .then(response => response.json())
        .then(data => {
            callBack(data)
        })
}

const logOutUser = () => {
    fetch('http://localhost:8080/auth/logout', {
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => {
        })
}

const getCurrentUser = (token, callBack) => {
    fetch('http://localhost:8080/auth/user', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                fetch('http://localhost:8080/roles/' + data.data.id_role, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token
                    }
                })
                    .then(response => response.json())
                    .then(data2 => {
                        callBack(token, data, data2.data.title)
                    })
            } else {
                callBack(data, '')
            }
        })
}

const addUser = (params, callBack) => {
    fetch('http://localhost:8080/roles', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + params.token
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const find = data.data.filter(role => role.title === params.role_title)
                if (find[0]) {
                    const user = {
                        id_role: find[0]._id,
                        first_name: params.first_name,
                        last_name: params.last_name
                    }

                    fetch('http://localhost:8080/users', {
                        method: 'post',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer ' + params.token
                        },
                        body: JSON.stringify(user)
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                const userLogin = {
                                    id_user: data.data._id,
                                    email: params.email,
                                    password: params.password,
                                    is_active: params.is_active
                                }

                                fetch('http://localhost:8080/logins', {
                                    method: 'post',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                        Authorization: 'Bearer ' + params.token
                                    },
                                    body: JSON.stringify(userLogin)
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        callBack(data.success)
                                    })
                            }
                        })
                } else callBack(false)
            } else callBack(false)
        })
}

const deleteLogin = (token, idLogin, callBack) => {
    fetch('http://localhost:8080/logins/' + idLogin, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(response => response.json())
        .then(data => {
        })
}

export default {
    authLogin,
    logOutUser,
    getCurrentUser,
    encodeData,
    decodeData,
    validateEmail,
    addUser,
    deleteLogin
}
