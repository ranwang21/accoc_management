'use-strict'

const HOST = 'https://maison-aurore-api.herokuapp.com'
const jwt = require('jwt-simple')
const secret = 'xxx'
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
    fetch(HOST + '/auth/login', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userToSend)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            callBack(data)
        })
}

const logOutUser = () => {
    fetch(HOST + '/auth/logout', {
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => {
        })
}

const getCurrentUser = (token, callBack) => {
    fetch(HOST + '/auth/user', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                fetch(HOST + '/roles/' + data.data.id_role, {
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
    fetch(HOST + '/roles', {
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

                    fetch(HOST + '/users', {
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

                                fetch(HOST + '/logins', {
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

const registerSaveUser = (user, userLogin, callBack) => {
    fetch(HOST + '/users', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                userLogin = {
                    id_user: data.data._id
                }
                fetch(HOST + '/logins', {
                    method: 'post',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userLogin)
                })
                    .then(response => response.json())
                    .then(data => {
                        callBack(data.success, userLogin.id_user)
                    })
            }
        })
}

const getRolesAndDays = (callBack) => {
    fetch(HOST + '/roles')
        .then(response => response.json())
        .then(dataRoles => {
            fetch(HOST + '/days')
                .then(response => response.json())
                .then(dataDays => {
                    callBack(dataRoles.data, dataDays.data)
                })
        })
}

const deleteLogin = (token, idLogin, callBack) => {
    fetch(HOST + '/logins/' + idLogin, {
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

const getImage = (token, callBack) => {
    fetch(HOST + '/users/5e6a3e314554933864b2c3b1/photo', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        }
    })
        .then(response => response.json())
        .then(data => {
            callBack(data)
        })
}

const getAddressFromGoogle = () => {
    const API_KEY = 'AIzaSyCeyah5EQEjXMmGTgWi1lTQyORN4n4Wil0'
    const input = '5217+Trans+island'
    fetch('https://maps.googleapis.com/maps/api/place/findplacefromtext/output?input=' + input + '&key=' + API_KEY)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
}

export default {
    encodeData,
    decodeData,
    authLogin,
    logOutUser,
    getCurrentUser,
    validateEmail,
    addUser,
    deleteLogin,
    getAddressFromGoogle,
    getImage,
    getRolesAndDays,
    registerSaveUser
}
