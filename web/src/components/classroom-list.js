import React, { Component } from 'react'
import List from '@material-ui/core/List'
import ClassRoom from './classroom'
import '../styles/_table.scss'

class ClassRoomList extends Component {
    getLangFile () {
        return require('../lang/' + this.props.lang + '/user-buttons.json')
    }

    renderSearchBarPlaceHolder () {
        return require('../lang/' + this.props.lang + '/form-placeholders.json')
    }

    render () {
        const lang = this.getLangFile()

        return (
            <List className='classroom-list'>
                <ClassRoom lang={this.props.lang} userType={this.props.userType} />
            </List>
        )
    }
}

export default ClassRoomList
