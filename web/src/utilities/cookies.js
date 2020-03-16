'use strict'
import Cookie from 'react-cookies'
import Crypto from 'simple-crypto-js'

const secretKey = 'some-unique-key'
const simpleCrypto = new Crypto(secretKey)
const userTokenTemplate = {
    isConnected: false,
    role: '',
    userId: ''
}

const dataToJson = (data) => (JSON.parse(data))
const jsonToString = (json) => (JSON.stringify(json, null, 4))
const encryptToken = (value) => (simpleCrypto.encrypt(value))
const decryptToken = (value) => (simpleCrypto.decrypt(value))

function setUser (isConnected, role) {
    userTokenTemplate.isConnected = isConnected
    userTokenTemplate.role = role
}

module.exports = {
    readDatas,
    readData
}
