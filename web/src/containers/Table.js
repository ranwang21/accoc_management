import React, { Component } from 'react'
import TableListMenu from '../components/table-list-menu'
import TableListContainer from '../components/table-list-container'
import ClassRoomList from '../components/classroom-list'
import '../styles/_table.scss'

class Table extends Component {
    getLangFile () {
        return require('../lang/' + this.props.lang + '/footer.json')
    }

    render () {
        // const lang = this.getLangFile()
        return (
            <div className='menu table'>
                <TableListMenu lang={this.props.lang} userType={this.props.userType} />
                {/* <TableListContainer /> */}
                <ClassRoomList lang={this.props.lang} userType={this.props.userType} />
            </div>
        )
    }
}

export default Table
