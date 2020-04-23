import React, { Component } from 'react'
import Fetch from '../utilities/fetch-datas'
import { withCookies } from 'react-cookie'
import '../styles/_parent-child.scss'
const variables = require('../utilities/variables').variables

class ParentChild extends Component {
    constructor () {
        super()
        this.state = {
            childList: []
        }
        this.setChildList = this.setChildList.bind(this)
    }

    setChildList (datas) {
        this.setState({ childList: datas })
    }

    componentDidMount () {
        Fetch.user.children(this.props.cookies.get(variables.cookies.token), this.setChildList)
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/parent-child.json') }

    getCurrentUser () {
        const currentUser = this.props.cookies.get(variables.cookies.user)
        return Fetch.decodeData(currentUser)
    }

    render () {
        const lang = this.getLangFile()
        console.log(this.getCurrentUser()._id)
        console.log(this.state.childList)
        return (
            <div className='parent-child'>CHILD LIST</div>
        )
    }
}

export default withCookies(ParentChild)
