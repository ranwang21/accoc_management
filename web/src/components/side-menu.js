import React, { Component } from 'react'
import '../styles/_header.scss'

class SideMenu extends Component {
    getLangFile () {
        return require('../lang/' + this.props.lang + '/header.json')
    }

    render () {
        const lang = this.props.lang
        return (
            <div>This is side Menu</div>
        )
    }
}

export default SideMenu
